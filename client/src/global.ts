export interface austhStoreInterface {
    isCheckingVerify: boolean,
    isLoading: boolean,
    user: null | {
        isVerified: boolean,
        phone: string,
        id: number
    },
    error: null | string,
    isVerified: boolean,
    checkAuth: () => Promise<void>,
    create_account: (phone: string, password: string, confirm_password: string) => Promise<void>,
    login: (phone: string, password: string) => Promise<true | false | void>,
    sendVerficationCode: (phone: string, isResetPassword: boolean) => Promise<void | boolean>,
    verifyCode: (code: string, isResetPassword: boolean) => Promise<void | string>,
    resendUserCode: (phone: string, isResetPassword: boolean) => Promise<void>,
    changePassword: (token: string, newPassword: string) => Promise<void>,
    logout: () => Promise<void>,
}