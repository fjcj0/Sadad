import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.AI_KEY });
const greetings = ["مرحبا", "أهلا", "اهلا", "السلام عليكم", "سلام عليكم"];
export const AskAi = async (prompt) => {
    try {
        if (greetings.some(greet => question.includes(greet))) {
            return "أهلاً بك! أنا تطبيق E-SADAD الذكي، مطور بواسطة شركة بيلسان. يمكنني مساعدتك في عرض معلومات فواتيرك المستحقة بعد التحقق من هويتك، ويمكنني أيضًا توجيهك إلى شاشة الدفع إذا رغبت في ذلك. من فضلك زودني باسمك أو رقم الفاتورة للبدء.";
        }
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return result.text;
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        throw new Error(error instanceof Error ? error.message : String(error));
    }
};