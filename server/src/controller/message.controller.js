import prisma from "../config/PrismClinet.js";
import { AskAi } from "../utils/AskAi.js";
import { getInvoices } from "./data.controller.js";
export const getMessages = async (request, response) => {
  try {
    if (!request.userId) {
      return response.status(405).json({
        success: false,
        error: "Method not allowed"
      });
    }
    const messages = await prisma.message.findMany({
      where: { userId: request.userId },
      select: { role: true, message: true, created_at: true },
      orderBy: { created_at: "asc" }
    });
    return response.status(200).json({
      success: true,
      messages
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : error
    });
  }
};
export const sendMessage = async (request, response) => {
  try {
    const { question, type } = request.body || {};
    if (!question) {
      return response.status(400).json({
        success: false,
        error: "Question is required"
      });
    }
    if (!request.userId) {
      return response.status(405).json({
        success: false,
        error: "Method not allowed"
      });
    }
    if (type !== "voice") {
      await prisma.message.create({
        data: {
          role: "user",
          message: question,
          userId: request.userId
        }
      });
    }
    const lastMessages = await prisma.message.findMany({
      where: { userId: request.userId },
      select: { role: true, message: true },
      orderBy: { created_at: "desc" },
      take: 4
    });
    const conversationHistory = lastMessages
      .reverse()
      .map(msg => ({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.message
      }));
    const invoices = await getInvoices();
    const invoiceNumbers = invoices.map(inv => String(inv.number));
    const invoiceListText = invoiceNumbers.length
      ? invoiceNumbers.join(" , ")
      : "لا يوجد فواتير";

    const systemPrompt = `
أنت تطبيق E-SADAD.

أرقام الفواتير المتاحة فقط:
${invoiceListText}

التعليمات:
- إذا طلب المستخدم رقم فاتورة موجود ضمن القائمة أعلاه، ضع نفس الرقم في invoiceNumber.
- إذا لم يكن الرقم موجودًا ضمن القائمة، invoiceNumber يجب أن يكون null.
- لا تخترع أرقامًا.
- اذا الارقام ذكرت بالعربية حولها للانجليزية للمقارنة بشكل صحيح.
- الرد يجب أن يكون JSON فقط بهذا الشكل:

{
  "message": "نص الرد",
  "invoiceNumber": null
}

لا تضف أي نص خارج JSON.
`;
    const aiRawAnswer = await AskAi([
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: question }
    ]);
    let aiAnswer;
    try {
      aiAnswer = JSON.parse(aiRawAnswer.trim());
    } catch {
      aiAnswer = {
        message: aiRawAnswer,
        invoiceNumber: null
      };
    }
    let link = null;
    if (aiAnswer.invoiceNumber) {
      const invoiceExists = invoices.find(
        inv => String(inv.number) === String(aiAnswer.invoiceNumber)
      );
      if (invoiceExists) {
        link = `/dashboard/bill/${invoiceExists.number}`;
      } else {
        aiAnswer.invoiceNumber = null;
      }
    }
    if (type !== "voice") {
      await prisma.message.create({
        data: {
          role: "ai",
          message: aiAnswer.message,
          userId: request.userId
        }
      });
    }
    return response.status(200).json({
      success: true,
      message: aiAnswer.message,
      link
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : error
    });
  }
};