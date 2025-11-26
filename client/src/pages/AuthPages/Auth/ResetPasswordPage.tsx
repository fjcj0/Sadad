import FloatInput from "../../../ui/inputs/FloatInput";
import { useState, useEffect } from "react";
import Button from "../../../ui/buttons/Button";
const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const validatePassword = (password: string) => {
        if (password.length === 0) {
            return 'كلمة المرور عنصر مهم';
        }
        if (password.length < 8) {
            return 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
        }
        return '';
    };
    const validateConfirmPassword = (confirmPassword: string, password: string) => {
        if (confirmPassword.length === 0) {
            return 'تأكيد كلمة المرور عنصر مهم';
        }
        if (confirmPassword !== password) {
            return 'كلمات المرور غير متطابقة';
        }
        return '';
    };
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setErrorPassword(validatePassword(value));
    };
    const handlePasswordConfirmChange = (value: string) => {
        setPasswordConfirm(value);
        setErrorConfirmPassword(validateConfirmPassword(value, password));
    };
    useEffect(() => {
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(passwordConfirm, password);
        setHasError(passwordError !== '' || confirmPasswordError !== '');
    }, [password, passwordConfirm]);
    const handleResetPassword = () => {
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(passwordConfirm, password);
        setErrorPassword(passwordError);
        setErrorConfirmPassword(confirmPasswordError);
        if (passwordError === '' && confirmPasswordError === '') {
            console.log('تم تعيين كلمة المرور الجديدة بنجاح');
        } else {
            console.log('يوجد أخطاء في النموذج');
        }
    };
    return (
        <div className="flex max-w-xl min-h-[100vh] mx-auto items-start justify-center flex-col">
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
                            error={errorPassword}
                            type="text"
                            headText="كلمة المرور الجديدة"
                        />
                        <FloatInput
                            label="تأكيد كلمة المرور الجديدة"
                            setValue={handlePasswordConfirmChange}
                            value={passwordConfirm}
                            isPassword={true}
                            error={errorConfirmPassword}
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