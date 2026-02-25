import prisma from "../config/PrismClinet.js";
import { AskAi } from "../utils/AskAi.js";
import { getInvoices } from "./data.controller.js";
export const getMessages = async (request, response) => {
    try {
        if (!request.userId) {
            return response.status(405).json({ success: false, error: "Method not allowed" });
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
        const conversationHistory = messages
            .map(msg => `${msg.role === "ai" ? "AI" : "User"}: ${msg.message}`)
            .join("\n");
        const invoices = await getInvoices();
        const invoicesNumbers = invoices.map(inv => String(inv.number));
        const invoiceRegex = /\d{6,}/g;
        const userInvoiceNumbers = (question.match(invoiceRegex) || []).map(n => String(n));
        const matchedInvoice = userInvoiceNumbers.find(num => invoicesNumbers.includes(num));
        let cleanMessage = "";
        let link = null;
        if (matchedInvoice) {
            cleanMessage = `تم إرسالك إلى الفاتورة رقم ${matchedInvoice}.`;
            link = `/dashboard/bill/${matchedInvoice}`;
        } else if (userInvoiceNumbers.length > 0) {
            cleanMessage = "عذرًا، لا يمكن عرض هذه الفاتورة حفاظًا على الخصوصية.";
        } else {
            const aiRawAnswer = await AskAi(`
أنت تطبيق E-SADAD.
- لا تعطي أي روابط للفواتير.
- الرد على أي سؤال عام أو استعلام بدون رقم محدد يجب أن يكون نصًا مفيدًا للمستخدم.
- المحادثة السابقة: ${conversationHistory}
- رسالة المستخدم: ${question}
            `);
            cleanMessage = aiRawAnswer.replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
        }
        await prisma.message.create({
            data: { role: "ai", message: cleanMessage, userId: request.userId },
        });
        return response.status(200).json({
            success: true,
            message: cleanMessage,
            link
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
};