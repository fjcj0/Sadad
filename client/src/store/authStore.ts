import { create } from 'zustand';
import axios, { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import type { austhStoreInterface } from '../global';
import { baseUrl } from '../utils/baseUrl';
axios.defaults.withCredentials = true;
export const useUserStore = create<austhStoreInterface>((set, get) => ({
    user: null,
    isLoading: false,
    isCheckingVerify: true,
    isVerified: false,
    error: null,
    checkAuth: async () => {
        set({ isCheckingVerify: true });
        try {
            const response = await axios.get(`${baseUrl}/api/auth/check-auth`);
            set({ isVerified: true, user: response.data.user });
        } catch (error: unknown) {
            set({ isVerified: false, user: null });
        } finally {
            set({ isCheckingVerify: false });
        }
    },
    create_account: async (phone: string, password: string, confirm_password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${baseUrl}/api/auth/create-account`, {
                phone,
                password,
                confirm_password
            });
            if (response.status === 201) {
                toast.success(response?.data?.message);
            }
        } catch (error: unknown) {
            if (isAxiosError(error) && error?.response?.data?.error) {
                set({ error: error?.response?.data?.error });
                throw new Error(error?.response?.data?.error);
            }
            else {
                error instanceof Error ? set({ error: error.message }) : set({ error: String(error) });
                throw new Error(error instanceof Error ? error.message : String(error));
            }
        } finally {
            set({ isLoading: false });
        }
    },
    login: async (phone: string, password: string): Promise<true | false | void> => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${baseUrl}/api/auth/login`, {
                phone,
                password
            });
            if (response.status === 200) {
                set({ isVerified: true, user: response.data.user });
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                toast.error(error?.response?.data?.error);
                return false;
            } else {
                error instanceof Error ? set({ error: error.message }) : set({ error: String(error) });
                throw new Error(error instanceof Error ? error.message : String(error));
            }
        } finally {
            set({ isLoading: false });
        }
    },
    sendVerficationCode: async (phone: string, isResetPassword: boolean): Promise<void | boolean> => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${baseUrl}/api/auth/send-verification-code`, {
                phone,
                isResetPassword
            });
            toast.success(response.data.message);
            return true;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                set({ error: error?.response?.data?.error });
            } else {
                error instanceof Error ? set({ error: error.message }) : set({ error: String(error) });
            }
            return false;
        } finally {
            set({ isLoading: false });
        }
    },
    verifyCode: async (code: string, isResetPassword: boolean): Promise<void | string> => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${baseUrl}/api/auth/verify-code`, {
                code,
                isResetPassword
            });
            if (isResetPassword) {
                return response.data.resetToken;
            }
            set({ isVerified: true, user: response.data.user });
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                set({ error: error?.response?.data?.error });
                throw new Error(error?.response?.data?.error);
            } else {
                error instanceof Error ? set({ error: error.message }) : set({ error: String(error) });
                throw new Error(error instanceof Error ? error.message : String(error));
            }
        } finally {
            set({ isLoading: false });
        }
    },
    resendUserCode: async (phone: string, isResetPassword: boolean) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${baseUrl}/api/auth/resend-code`, {
                phone,
                isResetPassword
            });
            if (response.status === 200) {
                toast.success(response.data.message);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                set({ error: error?.response?.data?.error });
                throw new Error(error?.response?.data?.error);
            } else {
                error instanceof Error ? set({ error: error.message }) : set({ error: String(error) });
                throw new Error(error instanceof Error ? error.message : String(error));
            }
        } finally {
            set({ isLoading: false });
        }
    },
    changePassword: async (token: string, newPassword: string) => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${baseUrl}/api/auth/change-password`, {
                token,
                newPassword
            });
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                set({ error: error?.response?.data?.error });
                throw new Error(error?.response?.data?.error);
            } else {
                error instanceof Error ? set({ error: error.message }) : set({ error: String(error) });
                throw new Error(error instanceof Error ? error.message : String(error));
            }
        } finally {
            set({ isLoading: false });
        }
    },
    logout: async () => {
        try {
            await axios.post(`${baseUrl}/api/auth/logout`);
            toast.success(`تم تسجيل الخروج بنجاح`);
            set({ user: null, isVerified: false });
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : String(error));
        }
    }
}));