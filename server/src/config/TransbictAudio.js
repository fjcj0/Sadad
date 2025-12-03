import Groq from "groq-sdk";
import fs from "fs";
import 'dotenv/config';
const groq = new Groq({ apiKey: process.env.API_KEY });
export const TransbictAudio = async (filePath) => {
    const transcription = await groq.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-large-v3-turbo",
        temperature: 0,
        response_format: "verbose_json",
        language: 'ar'
    });
    return transcription.text;
};