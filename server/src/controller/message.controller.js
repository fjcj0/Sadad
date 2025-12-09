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
        return response.status(200).json({ success: true, messages });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
};
export const sendMessage = async (request, response) => {
    try {
        const { question } = request.body || {};
        if (!question) return response.status(400).json({ success: false, error: "Question is required" });
        if (!request.userId) return response.status(405).json({ success: false, error: "Method not allowed" });
        await prisma.message.create({
            data: { role: "user", message: question, userId: request.userId },
        });
        const messages = await prisma.message.findMany({
            where: { userId: request.userId },
            select: { role: true, message: true, created_at: true },
            orderBy: { created_at: "asc" },
        });
        const conversationHistory = messages.map(msg => `${msg.role === "ai" ? "AI" : "User"}: ${msg.message}`).join("\n");
        let verifiedUser = null;
        const detectedNumbers = question.match(/\d+/g);
        if (detectedNumbers) {
            for (let num of detectedNumbers) {
                const found = invoices.find(inv => inv.invoiceNumber === num);
                if (found) verifiedUser = found;
            }
        }
        invoices.forEach(inv => {
            if (question.trim() === inv.username) verifiedUser = inv;
        });
        if (question.trim() === "نعم") {
            const lastNumberMsg = messages.slice().reverse().find(m => m.message.match(/\d+/));
            if (lastNumberMsg) {
                const num = lastNumberMsg.message.match(/\d+/)[0];
                const invoice = invoices.find(inv => inv.invoiceNumber === num);
                if (invoice) {
                    await prisma.message.create({
                        data: { role: "ai", message: `تم إرسال رابط الفاتورة.`, userId: request.userId },
                    });
                    return response.status(200).json({
                        success: true,
                        answer: `تم إرسال رابط الفاتورة.`,
                        link: invoice.link
                    });
                }
            }
        }
        if (verifiedUser && detectedNumbers) {
            const invoiceNumber = detectedNumbers[0];
            await prisma.message.create({
                data: { role: "ai", message: `هل تريد مني إرسال رابط الفاتورة رقم ${invoiceNumber}?`, userId: request.userId },
            });
            return response.status(200).json({
                success: true,
                answer: `هل تريد مني إرسال رابط الفاتورة رقم ${invoiceNumber}?`
            });
        }
        const aiAnswer = await AskAi(`
أنت الآن تطبيق E-SADAD.
مهمتك:
- اذا أحدهم سألك عن مطورك قل لهم مطوري هو شركة بيلسان.
- لا تنشئ روابط بنفسك، إلا بعد التحقق.
- الروابط فقط تأتي من الخادم وليس منك.
- إذا ذكر المستخدم رقم الفاتورة بالكلمات العربية (مثال: "ثلاثة صفر صفر واحد")، قم بتحويله إلى أرقام (مثال: 3001).
- إذا ذكر المستخدم اسمه أو رقم الفاتورة، تحقق من وجوده في سجلات الفواتير.
- إذا كان الرقم موجودًا وأكد المستخدم، أرسل رابط الفاتورة مباشرة من الخادم.
- المحادثة السابقة: 
${conversationHistory}
- رسالة المستخدم: ${question}
`);
        await prisma.message.create({
            data: { role: "ai", message: aiAnswer, userId: request.userId },
        });
        return response.status(200).json({ success: true, answer: aiAnswer });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
}