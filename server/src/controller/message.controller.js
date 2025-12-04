import prisma from "../config/PrismClinet.js";
import { invoices } from "../constants/data.js";
import { AskAi } from "../utils/AskAi.js";
export const getMessages = async (request, response) => {
    try {
        if (!request.userId) {
            return response.status(405).json({
                success: false,
                error: "Method not allowed",
            });
        }
        const messages = await prisma.message.findMany({
            where: { userId: request.userId },
            select: { role: true, message: true, created_at: true },
            orderBy: { created_at: "asc" },
        });
        return response.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`,
        });
    }
};
export const sendMessage = async (request, response) => {
    try {
        const { question } = request.body || {};
        if (!question) {
            return response.status(400).json({ success: false, error: "Question is required" });
        }
        if (!request.userId) {
            return response.status(405).json({ success: false, error: "Method not allowed" });
        }
        await prisma.message.create({
            data: { role: "user", message: question, userId: request.userId },
        });
        let messages = await prisma.message.findMany({
            where: { userId: request.userId },
            select: { role: true, message: true, created_at: true },
            orderBy: { created_at: "asc" },
        });
        const conversationHistory = messages
            .map(msg => `${msg.role === "ai" ? "AI" : "User"}: ${msg.message}`)
            .join("\n");
        let verifiedUser = null;
        const detectedNumbers = question.match(/\d+/g);
        if (detectedNumbers) {
            for (let num of detectedNumbers) {
                let found = invoices.find(inv => inv.invoiceNumber === num);
                if (found) verifiedUser = found;
            }
        }
        invoices.forEach(inv => {
            if (question.trim() === inv.username) verifiedUser = inv;
        });
        const aiGreeted = messages.some(msg => msg.role === "ai" && msg.message.includes("مرحبا"));
        if (verifiedUser && detectedNumbers) {
            const invoiceNumber = detectedNumbers[0];
            const invoice = invoices.find(inv => inv.invoiceNumber === invoiceNumber && inv.username === verifiedUser.username);
            if (invoice) {
                const userAgreed = question.toLowerCase().includes("نعم");
                if (userAgreed) {
                    await prisma.message.create({
                        data: {
                            role: "ai",
                            message: `حسنًا، هذا رابط الفاتورة: ${invoice.link}`,
                            userId: request.userId,
                        },
                    });
                    return response.status(200).json({ success: true, answer: `حسنًا، هذا رابط الفاتورة: ${invoice.link}` });
                } else {
                    await prisma.message.create({
                        data: {
                            role: "ai",
                            message: `هل تريد مني إرسال رابط الفاتورة رقم ${invoiceNumber}?`,
                            userId: request.userId,
                        },
                    });
                    return response.status(200).json({ success: true, answer: `هل تريد مني إرسال رابط الفاتورة رقم ${invoiceNumber}?` });
                }
            }
        }
        if (verifiedUser && question.includes("كل فواتيري")) {
            const userInvoices = invoices.filter(inv => inv.username === verifiedUser.username);
            const invoiceList = userInvoices
                .map(inv => `- رقم الفاتورة: ${inv.invoiceNumber}, الشركة: ${inv.company}`)
                .join("\n");
            await prisma.message.create({
                data: { role: "ai", message: invoiceList, userId: request.userId },
            });
            return response.status(200).json({ success: true, answer: `هذه جميع فواترك:\n${invoiceList}` });
        }
        let systemPrompt = `
أنت الآن تطبيق الدفع الذكي "E‑SADAD".
مطورك: شركة بيلسان.

### قواعد مهمة:
1. يمنع عرض أي فاتورة أو رابط أو مبلغ قبل التحقق من الهوية.
2. التحقق يتم عبر الاسم الصحيح **بدقة حرف بحرف** أو رقم الفاتورة الصحيح.
3. إذا لم يقدم المستخدم هوية صحيحة → اطلب بلطف الاسم الكامل أو رقم الفاتورة.
4. قدم نفسك فقط إذا سألك المستخدم: "من أنت؟"
5. الردود ودية وواضحة، ولا تكرر الترحيب إذا تم الترحيب مسبقًا.
6. إذا تم التحقق من الهوية، قدم الفاتورة الصحيحة فقط من البيانات المتوفرة.
7. يمنع اختراع روابط أو أرقام غير موجودة.
8. يمنع استخدام المحادثة السابقة لتجاوز التحقق، لكن يمكنك استخدامها لفهم سياق السؤال.

### بيانات الفواتير:
${invoices.map(inv => `
- المستخدم: ${inv.username}
  رقم الفاتورة: ${inv.invoiceNumber}
  الشركة: ${inv.company}
  رابط الفاتورة: ${inv.link}
`).join("\n")}
`;
        if (verifiedUser) {
            systemPrompt += `
المستخدم تم التحقق منه.
يمكنك الآن عرض الفاتورة عند طلبه.
الفاتورة الخاصة به:
- الاسم: ${verifiedUser.username}
- رقم الفاتورة: ${verifiedUser.invoiceNumber}
- الشركة: ${verifiedUser.company}
- رابط الفاتورة: ${verifiedUser.link}
`;
        } else {
            systemPrompt += `
لم يتم التحقق من هوية المستخدم بعد.
إذا طلب رابط فاتورة أو دفع → اطلب الاسم الكامل أو رقم الفاتورة أولًا.
`;
        }
        systemPrompt += aiGreeted
            ? "\nلقد رحبت بالمستخدم مسبقًا، لا تكرر الترحيب."
            : "\nاستجب للتحية فقط إذا ظهرت في الرسالة.";
        const finalPrompt = `
${systemPrompt}
### المحادثة السابقة:
${conversationHistory}

### الآن أجب عن:
"${question}"
`;
        const answer = await AskAi(finalPrompt);
        await prisma.message.create({
            data: { role: "ai", message: answer, userId: request.userId },
        });
        return response.status(200).json({ success: true, answer });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`,
        });
    }
};