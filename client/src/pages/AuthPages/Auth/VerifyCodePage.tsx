import { useState, useEffect } from "react";
import Button from "../../../ui/buttons/Button";
import VerificationInput from "../../../ui/inputs/VerificationInput";
import Modal from "../../../ui/Modals/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import NavigateBack from "../../../ui/navigators/NavigateBack";
import { useUserStore } from "../../../store/authStore";
import { warningIcon } from "../../../constants/data";
const VerifyCodePage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const phone: string = queryParams.get("phone") ?? "";
    const isResetPassword: boolean = queryParams.get("isResetPassword") === "true";
    const { isLoading, verifyCode, error, resendUserCode } = useUserStore();
    const navigate = useNavigate();
    const [code, setCode] = useState<string[]>(['', '', '', '', '']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [resendTimer, setResendTimer] = useState(90);
    const [token, setToken] = useState<string>("");
    useEffect(() => {
        if (resendTimer <= 0) return;
        const timer = setInterval(() => setResendTimer(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [resendTimer]);
    const handleCodeChange = (value: string, index: number) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value && index < 4) {
            const nextInput = document.getElementById(`verification-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };
    const handleVerify = async () => {
        const codeValue = code.join('');
        if (codeValue.length < 5) {
            setShowError(true);
            return;
        }
        if (isResetPassword) {
            try {
                const resultToken = await verifyCode(codeValue, isResetPassword);
                setToken(resultToken || "");
                setIsSuccess(true);
                setShowError(false);
                setIsModalOpen(true);
            } catch (error) {
                console.log(error);
            }
            return;
        }
        try {
            await verifyCode(codeValue, isResetPassword);
        } catch (error) {
            console.log(error);
        }
    };
    const handleCloseModal = (passedToken?: string) => {
        setIsModalOpen(false);
        if (isSuccess && passedToken) {
            navigate(`/reset-password/${passedToken}`);
        }
    };
    const handleResend = async () => {
        try {
            await resendUserCode(phone, isResetPassword);
        } catch (error) {
            console.log(error);
        }
        setResendTimer(90);
        setCode(['', '', '', '', '']);
        setShowError(false);
    };
    return (
        <div className="flex max-w-xl min-h-[100vh] mx-auto items-start justify-center flex-col">
            <NavigateBack />

            <Modal
                image={isSuccess ? '/pictures/sucess.png' : '/pictures/fail.png'}
                isOpen={isModalOpen}
                onClose={() => handleCloseModal(token)}
                title={isSuccess ? 'تم تغيير كلمة المرور بنجاح' : 'لم نتمكن من تغيير كلمة المرور'}
                paragraph={
                    isSuccess
                        ? 'لقد قمت بتحديث كلمة المرور الخاصة بك بنجاح. يمكنك الآن استخدام الكلمة الجديدة لتسجيل الدخول.'
                        : 'يرجى التأكد من إدخال رمز التحقق الصحيح ثم المحاولة مجددًا.'
                }
                isSuccess={isSuccess}
            />
            <div className="p-3 w-full">
                <h1 className="font-bold text-3xl">رمز التحقق</h1>
                <p className="text-opacity mt-2 text-sm">
                    لقد أرسلنا رمز تحقق مكون من ٥ أرقام إلى رقم هاتفك المسجل.
                </p>
                <div className="mt-3 bg-white h-[30rem] shadow-sm rounded-xl w-full flex flex-col">
                    <div className="w-full p-3">
                        <h1 className="font-medium text-xl">ادخل رمز التحقق</h1>
                        <p className="text-xs mt-2">
                            لم يصلك الرمز بعد{" "}
                            <button
                                type="button"
                                className={`cursor-pointer text-blue-primary ${resendTimer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleResend}
                                disabled={resendTimer > 0}
                            >
                                {resendTimer > 0 ? `اعد الإرسال بعد ${resendTimer} ثانية` : 'إعادة الإرسال'}
                            </button>
                        </p>
                        <hr className="border-gray-400 border-t mt-2" />
                    </div>
                    <div className="flex flex-col items-center justify-center mt-3">
                        <div dir="ltr" className="w-full flex items-center justify-center gap-3 p-3">
                            {[0, 1, 2, 3, 4].map((index) => (
                                <VerificationInput
                                    key={index}
                                    id={`verification-input-${index}`}
                                    value={code[index]}
                                    index={index}
                                    setCode={setCode}
                                    onChange={(value) => handleCodeChange(value, index)}
                                />
                            ))}
                        </div>
                        {error && (
                            <p className="text-red-500 flex items-center justify-center mt-2">
                                <img src={warningIcon} alt="warning icon" className="w-4 h-4 mr-1" />
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="mt-auto w-full p-3">
                        <div className="flex flex-col items-center justify-center gap-y-5">
                            <Button
                                title="تحقق"
                                onPress={handleVerify}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VerifyCodePage;