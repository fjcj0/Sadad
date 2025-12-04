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
            select: {
                role: true,
                message: true,
                created_at: true,
            },
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
        if (!request.userId) {
            return response.status(405).json({ success: false, error: "Method not allowed" });
        }
        const { question } = request.body;
        await prisma.message.create({
            data: {
                role: "user",
                message: question,
                userId: request.userId,
            },
        });
        let messages = await prisma.message.findMany({
            where: { userId: request.userId },
            select: { role: true, message: true, created_at: true },
        });
        const conversationHistory = messages
            .map((msg, index) => `${index + 1}. ${msg.role === "ai" ? "انت:" : "المستخدم:"} ${msg.message}`)
            .join("\n");
        let verifiedUser = null;
        const detectedNumbers = question.match(/\d+/g);
        if (detectedNumbers) {
            for (let num of detectedNumbers) {
                let found = invoices.find((inv) => inv.invoiceNumber === num);
                if (found) verifiedUser = found;
            }
        }
        invoices.forEach((inv) => {
            if (question.includes(inv.username)) verifiedUser = inv;
        });
        if (verifiedUser && question.includes("كل فواتيري")) {
            const userInvoices = invoices.filter(inv => inv.username === verifiedUser.username);
            const invoiceList = userInvoices.map(inv => `- رقم الفاتورة: ${inv.invoiceNumber}, الشركة: ${inv.company}`).join("\n");
            await prisma.message.create({
                data: { role: "ai", message: invoiceList, userId: request.userId },
            });
            return response.status(200).json({ success: true, asnwer: `هذه جميع فواترك:\n${invoiceList}` });
        }
        if (verifiedUser && detectedNumbers) {
            const invoiceNumber = detectedNumbers[0];
            const invoice = invoices.find(inv => inv.invoiceNumber === invoiceNumber && inv.username === verifiedUser.username);
            if (invoice) {
                await prisma.message.create({
                    data: { role: "ai", message: `هل تريد رابط الفاتورة رقم ${invoiceNumber}?`, userId: request.userId },
                });
                return response.status(200).json({ success: true, asnwer: `هل تريد رابط الفاتورة رقم ${invoiceNumber}?` });
            }
        }
        let systemPrompt = `
أنت الآن تطبيق الدفع الذكي "E‑SADAD".
مطورك: شركة بيلسان.

### قواعد مهمة:
1. يمنع عرض أي فاتورة أو رابط أو مبلغ قبل التحقق من الهوية.
2. التحقق يتم عبر الاسم الصحيح أو رقم الفاتورة الصحيح.
3. إذا لم يقدم المستخدم هوية صحيحة → اطلب بلطف (الاسم أو رقم الفاتورة).
4. قدم نفسك فقط إذا سألك المستخدم: "من أنت؟"
5. الردود ودودة وواضحة، بدون تحية إلا إذا بدأ المستخدم بها.
6. إذا تم التحقق من الهوية، قدم الفاتورة الصحيحة فقط من البيانات التالية.
7. يمنع اختراع روابط أو أرقام غير موجودة.
8. يمنع استخدام المحادثة السابقة لتجاوز التحقق.

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
المستخدم معرف بنجاح.
يحق لك الآن عرض رابط الفاتورة أو تفاصيلها عند طلبه.

الفاتورة الخاصة به هي:
الاسم: ${verifiedUser.username}
رقم الفاتورة: ${verifiedUser.invoiceNumber}
الشركة: ${verifiedUser.company}
رابط الفاتورة: ${verifiedUser.link}
`;
        } else {
            systemPrompt += `
لم يتم التحقق من هوية المستخدم حتى الآن.
إذا طلب رابط فاتورة أو دفع → اطلب منه الاسم أو رقم الفاتورة أولًا.
`;
        }

        const finalPrompt = `
${systemPrompt}

### المحادثة السابقة:
${conversationHistory}

### الآن أجب عن:
"${question}"
`;
        const asnwer = await AskAi(finalPrompt);
        await prisma.message.create({
            data: {
                role: "ai",
                message: asnwer,
                userId: request.userId,
            },
        });
        return response.status(200).json({ success: true, asnwer });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Internal Server Error: ${error instanceof Error ? error.message : error}`,
        });
    }
};