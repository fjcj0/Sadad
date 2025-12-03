import 'dotenv/config';
import express from 'express';
import { AskAi } from './utils/AskAi.js';
import cors from 'cors';
import fs from 'fs';
import { upload } from './lib/upload.js';
import { TransbictAudio } from './config/TransbictAudio.js';
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}
const app = express();
app.use(cors());
app.use(express.json());
app.get(`/`, async (request, response) => {
    return response.status(200).json({
        success: true,
        message: 'Connected successfully'
    });
});
app.post('/ask/ai', async (request, response) => {
    try {
        const { question } = request.body;
        if (!question) {
            return response.status(400).json({
                error: `Error you didn't ask ai anything`,
                success: false
            });
        }
        let answer = await AskAi(question);
        return response.status(200).json(answer);
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: `Fatal Internal Server Error: ${error instanceof Error ? error.message : error}`
        });
    }
});
app.post('/transbict-text', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No audio file received." });
        }
        const audioPath = req.file.path;
        const text = await TransbictAudio(audioPath);
        fs.unlink(audioPath, (err) => {
            if (err) console.error("Delete error:", err);
        });
        return res.json({ text });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))