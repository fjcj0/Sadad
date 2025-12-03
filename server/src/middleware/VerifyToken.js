import 'dotenv/config';
import jwt from 'jsonwebtoken';
import prisma from '../config/PrismClinet.js';
export const verifyToken = async (request, response, next) => {
    const token = request.cookies.token;
    if (!token) {
        return response.status(404).json({ success: false, message: 'Unauthorized - no token provided!!' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return response.status(404).json({ success: false, message: 'Unauthorized - invalid token!!' })
        request.userId = decoded.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: request.userId
            },
            select: {
                isVerified: true
            }
        });
        if (!user.isVerified) return response.status(405).json({
            success: false,
            error: `Method not allowed`
        });
        next();
    }
    catch (error) {
        return response.status(400).json({ success: false, message: error.message });
    }
};