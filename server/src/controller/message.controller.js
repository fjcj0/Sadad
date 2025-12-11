import prisma from "../config/PrismClinet.js";
import { AskAi } from "../utils/AskAi.js";
import { getInvoices } from "./data.controller.js";
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
        const invoices = await getInvoices();
        const invoicesList = invoices.map(inv => `رقم الفاتورة: ${inv.number}`).join("\n");
        let verifiedInvoice = null;
        const detectedNumbers = question.match(/\d+/g);
        if (detectedNumbers) {
            for (let num of detectedNumbers) {
                const invoice = invoices.find(inv => inv.number === num);
                if (invoice) verifiedInvoice = invoice;
            }
        }
        if (question.trim() === "نعم") {
            const lastNumberMsg = messages.slice().reverse().find(m => m.message.match(/\d+/));
            if (lastNumberMsg) {
                const num = lastNumberMsg.message.match(/\d+/)[0];
                const invoice = invoices.find(inv => inv.number === num);
                if (invoice) {
                    await prisma.message.create({
                        data: { role: "ai", message: `تم إرسال رابط الفاتورة.`, userId: request.userId },
                    });
                    return response.status(200).json({
                        success: true,
                        answer: `تم إرسال رابط الفاتورة رقم ${invoice.number} إليك مباشرةً من الخادم.`,
                        link: `/dashboard/bill/${invoice.number}`
                    });
                }
            }
        }
        if (verifiedInvoice && detectedNumbers) {
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
- لا تنشئ روابط بنفسك، إلا بعد التحقق من الفواتير في قاعدة البيانات.
- الروابط فقط تأتي من الخادم وليس منك.
- تحقق دائمًا من وجود الفاتورة باستخدام الرقم فقط قبل الرد.
- هذه هي الفواتير المتوفرة حاليًا:
${invoicesList}
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
};