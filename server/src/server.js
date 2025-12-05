import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import { upload } from './lib/upload.js';
import { TransbictAudio } from './config/TransbictAudio.js';
import authRoute from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';
import job from './config/Cron.js';
import { verifyToken } from './middleware/VerifyToken.js';
import path from 'path';
const __dirname = path.resolve();
console.log(__dirname);
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}
const app = express();
app.set('trust proxy', 1);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan('dev'));
if (process.env.NODE_ENV !== 'development') {
    job.start();
}
app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Connected successfully'
    });
});
app.post('/transbict-text', verifyToken, upload.single('audio'), async (req, res) => {
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
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));