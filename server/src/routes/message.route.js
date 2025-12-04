import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.js';
import { getMessages, sendMessage } from '../controller/message.controller.js';
const router = express.Router();
router.get('/get-messages', verifyToken, getMessages);
router.post('/send-message', verifyToken, sendMessage);
export default router;