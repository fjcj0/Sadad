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
        const conversationHistory = messages.map(msg => `${msg.role === "ai" ? "AI" : "User"}: ${msg.message}`).join("\n");
        const invoices = await getInvoices();
        const invoicesList = invoices.map(inv => `رقم الفاتورة: ${inv.number}`).join("\n");
        const aiRawAnswer = await AskAi(`
أنت تطبيق E-SADAD.
- رد فقط بصيغة JSON:
{
  "message": "نص الرد",
  "invoiceNumber": "رقم الفاتورة إذا موجود، أو null"
}
- لا تكتب JSON داخل نص آخر.
- المحادثة السابقة: ${conversationHistory}
- الفواتير المتوفرة: ${invoicesList}
- رسالة المستخدم: ${question}
`);
        let aiAnswer;
        try {
            const cleanText = aiRawAnswer.trim().replace(/^```json\s*|\s*```$/g, '');
            aiAnswer = JSON.parse(cleanText);
        } catch {
            aiAnswer = { message: aiRawAnswer, invoiceNumber: null };
        }
        let link = null;
        if (aiAnswer.invoiceNumber) {
            link = `/dashboard/bill/${aiAnswer.invoiceNumber}`;
        }
        await prisma.message.create({
            data: { role: "ai", message: aiAnswer.message, userId: request.userId },
        });
        return response.status(200).json({
            success: true,
            message: aiAnswer.message,
            link
        });

    } catch (error) {
        return response.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
};