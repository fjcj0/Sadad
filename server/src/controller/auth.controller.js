import prisma from '../config/PrismClinet.js';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
export const createAccount = async (request, response) => {
    try {
        const { phone, password, confirm_password } = request.body;
        if (!phone || !password || !confirm_password) {
            return response.status(400).json({ success: false, error: "جميع الحقول مطلوبة" });
        }
        if (password !== confirm_password) {
            return response.status(400).json({ success: false, error: "كلمات المرور غير متطابقة" });
        }
        const existingUser = await prisma.user.findUnique({ where: { phone } });
        if (existingUser) {
            return response.status(400).json({ success: false, error: "رقم الهاتف مستخدم مسبقًا" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();
        const now = Date.now();
        const created_user = await prisma.user.create({
            data: {
                phone,
                password: hashedPassword,
                verificationCode,
                verificationExpiresAt: new Date(now + 86400000),
                resendCode: new Date(now + 90000)
            },
            select: {
                id: true
            }
        });
        generateTokenAndSetCookie(response, created_user.id);
        return response.status(201).json({
            success: true,
            message: "تم إنشاء الحساب بنجاح، يرجى التحقق من الرمز المرسل"
        });
    } catch (error) {
        return response.status(500).json({ success: false, error: error.message });
    }
};
export const login = async (request, response) => {
    try {
        const { phone, password } = request.body;
        if (!phone || !password) {
            return response.status(400).json({ success: false, error: "جميع الحقول مطلوبة" });
        }
        const user = await prisma.user.findUnique({
            where: { phone },
            select: { id: true, phone: true, isVerified: true, password: true }
        });
        if (!user) return response.status(400).json({ success: false, error: "رقم الهاتف غير موجود" });
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) return response.status(400).json({ success: false, error: "بيانات الدخول غير صحيحة" });
        if (!user.isVerified) {
            return response.status(401).json({ success: false, message: "يرجى توثيق حسابك أولاً" });
        }
        generateTokenAndSetCookie(response, user.id);
        const { password: _, ...userWithoutPassword } = user;
        return response.status(200).json({ success: true, user: userWithoutPassword });
    } catch (error) {
        return response.status(500).json({ success: false, error: error.message });
    }
};
export const sendVerficationCode = async (request, response) => {
    try {
        const { phone, isResetPassword } = request.body;
        if (!phone) {
            return response.status(400).json({ success: false, error: "رقم الهاتف مطلوب" });
        }
        const user = await prisma.user.findUnique({ where: { phone } });
        if (!user) return response.status(400).json({ success: false, error: "لم يتم العثور على المستخدم" });
        const now = Date.now();
        const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();
        if (isResetPassword) {
            await prisma.user.update({
                where: { phone },
                data: {
                    verificationResetCode: verificationCode,
                    resetVerificationCodeExpiresAt: new Date(now + 86400000),
                    resendCode: new Date(now + 90000)
                }
            });
            return response.status(200).json({
                success: true,
                message: "تم إرسال رمز استعادة كلمة المرور"
            });
        }
        await prisma.user.update({
            where: { phone },
            data: {
                verificationCode,
                verificationExpiresAt: new Date(now + 86400000),
                resendCode: new Date(now + 90000)
            }
        });
        return response.status(200).json({
            success: true,
            message: "تم إرسال رمز التحقق"
        });
    } catch (error) {
        return response.status(500).json({ success: false, error: error.message });
    }
};
export const verifyCode = async (request, response) => {
    try {
        const { code, isResetPassword } = request.body;
        if (!code || code.length !== 5) {
            return response.status(400).json({
                success: false,
                error: "يجب أن يحتوي الرمز على 5 أرقام"
            });
        }
        let user;
        if (isResetPassword) {
            user = await prisma.user.findFirst({
                where: {
                    verificationResetCode: code,
                    resetVerificationCodeExpiresAt: { gt: new Date() }
                }
            });
            if (!user) {
                return response.status(400).json({
                    success: false,
                    error: "الرمز غير صحيح أو انتهت صلاحيته"
                });
            }
            const resetToken = crypto.randomBytes(32).toString("hex");
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    verificationResetCode: null,
                    resetVerificationCodeExpiresAt: null,
                    resendCode: null,
                    verificationTokenPageRest: resetToken
                }
            });
            return response.status(200).json({
                success: true,
                message: "تم التحقق بنجاح",
                resetToken,
            });
        }
        user = await prisma.user.findFirst({
            where: {
                verificationCode: code,
                verificationExpiresAt: { gt: new Date() }
            },
            select: {
                id: true,
                isVerified: true,
                phone: true,
            }
        });
        if (!user) {
            return response.status(400).json({
                success: false,
                error: "الرمز غير صحيح أو انتهت صلاحيته"
            });
        }
        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationCode: null,
                verificationExpiresAt: null,
                resendCode: null,
            }
        });
        generateTokenAndSetCookie(response, user.id);
        return response.status(200).json({
            success: true,
            message: "تم التحقق بنجاح",
            user
        });
    } catch (error) {
        return response.status(500).json({ success: false, error: error.message });
    }
};
export const resendUserCode = async (request, response) => {
    try {
        const { phone, isResetPassword } = request.body;
        if (!phone)
            return response.status(400).json({ success: false, error: "رقم الهاتف مطلوب" });

        const user = await prisma.user.findUnique({
            where: { phone },
            select: { resendCode: true }
        });
        if (!user)
            return response.status(400).json({ success: false, error: "لم يتم العثور على المستخدم" });
        const now = Date.now();
        if (user.resendCode && now < new Date(user.resendCode).getTime()) {
            return response.status(400).json({
                success: false,
                error: "انتظر حتى ينتهي العداد"
            });
        }
        const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();
        if (isResetPassword) {
            await prisma.user.update({
                where: { phone },
                data: {
                    verificationResetCode: verificationCode,
                    resetVerificationCodeExpiresAt: new Date(now + 86400000),
                    resendCode: new Date(now + 90000)
                }
            });
        } else {
            await prisma.user.update({
                where: { phone },
                data: {
                    verificationCode,
                    verificationExpiresAt: new Date(now + 86400000),
                    resendCode: new Date(now + 90000)
                }
            });
        }
        return response.status(200).json({
            success: true,
            message: "تم إرسال الرمز بنجاح"
        });
    } catch (error) {
        return response.status(500).json({ success: false, error: error.message });
    }
};
export const changePassword = async (request, response) => {
    try {
        const { token, newPassword } = request.body;
        if (!token || !newPassword) {
            return response.status(400).json({ success: false, error: "جميع الحقول مطلوبة" });
        }
        const user = await prisma.user.findFirst({
            where: { verificationTokenPageRest: token }
        });
        if (!user) {
            return response.status(400).json({
                success: false,
                error: "الرابط غير صالح أو منتهي"
            });
        }
        const hashed = await bcryptjs.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashed,
                verificationTokenPageRest: null
            }
        });
        return response.status(200).json({
            success: true,
            message: "تم تغيير كلمة السر بنجاح"
        });
    } catch (error) {
        return response.status(500).json({ success: false, error: error.message });
    }
};