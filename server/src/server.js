import 'dotenv/config';
import express from 'express';
import { AskAi } from './utils/AskAi.js';
import cors from 'cors';
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
app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))