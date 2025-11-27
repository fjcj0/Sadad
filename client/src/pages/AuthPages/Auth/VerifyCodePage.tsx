import { useState } from "react";
import Button from "../../../ui/buttons/Button";
import VerificationInput from "../../../ui/inputs/VerificationInput";
import { warningIcon } from "../../../constants/data";
import Modal from "../../../ui/Modals/Modal";
import { useNavigate } from "react-router";
import NavigateBack from "../../../ui/navigators/NavigateBack";

const VerifyCodePage = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState<string[]>(['', '', '', '', '']);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCodeChange = (value: string, index: number) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 4) {
            const nextInput = document.getElementById(`verification-input-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleVerify = () => {
        setIsSuccess(true);
        setIsModalOpen(true);
        console.log('Verification code:', code.join(''));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate('/login');
    };

    return (
        <div className="flex max-w-xl min-h-[100vh] mx-auto items-start justify-center flex-col">
            <NavigateBack />
            <Modal
                image={isSuccess ? '/pictures/sucess.png' : '/pictures/fail.png'}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={isSuccess ? 'تم تغيير كلمة المرور بنجاح' : 'لم نتمكن من تغيير كلمة المرور'}
                paragraph={isSuccess ? 'لقد قمت بتحديث كلمة المرور الخاصة بك بنجاح. يمكنك الان استخدام الكلمة الجديدة لتسجيل الدخول الى حسابك' : 'يرجى التاكد من ادخال رمز التحقق الصحيح وكلمة المرور مطابقة للشروط. ثم المحاولة مرة اخرى'}
                isSuccess={isSuccess}
            />
            <div className="p-3 w-full">
                <h1 className="font-bold text-3xl">رمز التحقق</h1>
                <p className="text-opacity mt-2 text-sm">لقد ارسلنا رمز تحقق مكون من ٥ ارقام الى رقم هاتفك المسجل.</p>
                <div className="mt-3 bg-white h-[30rem] shadow-sm rounded-xl w-full flex flex-col">
                    <div className="w-full">
                        <div className="p-3">
                            <h1 className="font-medium text-xl">ادخل رمز التحقق</h1>
                            <p className="text-xs mt-2">
                                لم يصلك الرمز بعد{" "}
                                <button
                                    type="button"
                                    className="cursor-pointer text-blue-primary"
                                >
                                    اعد الارسال بعد بعد 00:30 ثانية
                                </button>
                            </p>
                        </div>
                        <hr className="border-gray-400 border-t" />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div
                            dir="ltr"
                            className="w-full flex items-center justify-center gap-3 p-3 mt-3"
                        >
                            {[0, 1, 2, 3, 4].map((index) => (
                                <VerificationInput
                                    key={index}
                                    id={`verification-input-${index}`}
                                    value={code[index]}
                                    onChange={(value) => handleCodeChange(value, index)}
                                    hasError={false}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-auto w-full p-3">
                        <div className="flex flex-col items-center justify-center gap-y-5">
                            <Button
                                title="تحقق"
                                onPress={handleVerify}
                                isLoading={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyCodePage;