import FloatInput from "../../../ui/inputs/FloatInput";
import { useState, useEffect } from "react";
import Button from "../../../ui/buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import NavigateBack from "../../../ui/navigators/NavigateBack";
import { useUserStore } from "../../../store/authStore";
import Modal from "../../../ui/Modals/Modal";
const ResetPasswordPage = () => {
    const { token } = useParams();
    const { changePassword, isLoading } = useUserStore();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    useEffect(() => {
        if (!password) {
            setErrorPassword("");
        } else if (password.length < 8) {
            setErrorPassword("كلمة المرور يجب أن تكون ٨ أحرف على الأقل");
        } else {
            setErrorPassword("");
        }
    }, [password]);
    useEffect(() => {
        if (!passwordConfirm) {
            setErrorPasswordConfirm("");
        } else if (passwordConfirm !== password) {
            setErrorPasswordConfirm("كلمة المرور غير مطابقة");
        } else {
            setErrorPasswordConfirm("");
        }
    }, [passwordConfirm, password]);
    const handleResetPassword = async () => {
        if (errorPassword || errorPasswordConfirm || !password || !passwordConfirm) {
            return;
        }
        try {
            await changePassword(token || "", password);
            setIsSuccess(true);
            setIsOpen(true);
        } catch (error) {
            setIsSuccess(false);
            setIsOpen(true);
        }
    };
    const handleOnClose = () => {
        setIsOpen(false);
        if (isSuccess) {
            navigate("/login");
        } else {
            navigate("/forget-password");
        }
    };
    return (
        <div className="flex max-w-xl min-h-[100vh] mx-auto items-start justify-center flex-col">
            <NavigateBack />
            <Modal
                isOpen={isOpen}
                onClose={handleOnClose}
                isSuccess={isSuccess}
                image={isSuccess ? "/pictures/sucess.png" : "/pictures/fail.png"}
                title={isSuccess ? "تم تغيير كلمة المرور" : "فشل تغيير كلمة المرور"}
                paragraph={
                    isSuccess
                        ? "يمكنك الرجوع لتسجيل الدخول وكتابة كلمة المرور الجديدة"
                        : "ارجع لشاشة إرسال رمز سري وأعد المحاولة"
                }
            />
            <div className="p-3 w-full">
                <h1 className="font-bold text-3xl">إعادة تعيين كلمة المرور</h1>
                <p className="text-opacity mt-2 text-sm">
                    ادخل كلمة المرور الجديدة لحسابك
                </p>
                <div className="mt-3 bg-white h-[30rem] shadow-sm rounded-xl w-full flex flex-col">
                    <div className="w-full">
                        <div className="p-3">
                            <h1 className="font-medium text-xl">تعيين كلمة مرور جديدة</h1>
                            <p className="text-xs mt-2">اختر كلمة مرور قوية لحسابك</p>
                        </div>
                        <hr className="border-gray-400 border-t" />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-1 p-3 mt-3">
                        <FloatInput
                            label="ادخل كلمة المرور الجديدة"
                            setValue={setPassword}
                            value={password}
                            isPassword={true}
                            error={errorPassword}
                            type="text"
                            headText="كلمة المرور الجديدة"
                        />
                        <FloatInput
                            label="تأكيد كلمة المرور الجديدة"
                            setValue={setPasswordConfirm}
                            value={passwordConfirm}
                            isPassword={true}
                            error={errorPasswordConfirm}
                            type="text"
                            headText="تأكيد كلمة المرور"
                        />
                        <label className="flex items-center justify-center gap-x-1 text-xs">
                            <input type="checkbox" className="rounded-3xl" />
                            تذكرني
                        </label>
                    </div>
                    <div className="mt-auto w-full p-3">
                        <div className="flex flex-col items-center justify-center gap-y-5">
                            <Button
                                title="تعيين كلمة المرور الجديدة"
                                onPress={handleResetPassword}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ResetPasswordPage;