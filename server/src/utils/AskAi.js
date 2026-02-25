import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: process.env.AI_KEY });
export const AskAi = async (prompt) => {
    try {
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