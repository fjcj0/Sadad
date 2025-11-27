import FloatInput from "../../../ui/inputs/FloatInput";
import { useState } from "react";
import Button from "../../../ui/buttons/Button";
import { useNavigate } from "react-router";
import NavigateBack from "../../../ui/navigators/NavigateBack";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handlePasswordConfirmChange = (value: string) => {
        setPasswordConfirm(value);
    };

    const handleResetPassword = () => {
        console.log('تم تعيين كلمة المرور الجديدة بنجاح');
        navigate('/dashboard/home');
    };

    return (
        <div className="flex max-w-xl min-h-[100vh] mx-auto items-start justify-center flex-col">
            <NavigateBack />
            <div className="p-3 w-full">
                <h1 className="font-bold text-3xl">إعادة تعيين كلمة المرور</h1>
                <p className="text-opacity mt-2 text-sm">ادخل كلمة المرور الجديدة لحسابك</p>
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
                            setValue={handlePasswordChange}
                            value={password}
                            isPassword={true}
                            error=""
                            type="text"
                            headText="كلمة المرور الجديدة"
                        />
                        <FloatInput
                            label="تأكيد كلمة المرور الجديدة"
                            setValue={handlePasswordConfirmChange}
                            value={passwordConfirm}
                            isPassword={true}
                            error=""
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
                                isLoading={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;