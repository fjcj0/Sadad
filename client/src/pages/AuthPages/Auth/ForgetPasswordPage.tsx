import FloatInput from "../../../ui/inputs/FloatInput";
import { useState } from "react";
import Button from "../../../ui/buttons/Button";
import { useNavigate } from "react-router";
import NavigateBack from "../../../ui/navigators/NavigateBack";

const ForgetPasswordPage = () => {
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleMobileNumberChange = (value: string) => {
        setMobilePhoneNumber(value);
    };

    const handleSendCode = async () => {
        console.log('تم إرسال الكود - جاهز للإرسال');
        navigate('/verify-code')
    };

    const handleResendCode = () => {
        console.log('إعادة إرسال كود التحقق');
    };

    return (
        <div className="flex max-w-xl min-h-[100vh] mx-auto items-start justify-center flex-col">
            <NavigateBack />
            <div className="p-3 w-full">
                <h1 className="font-bold text-3xl">نسيت كلمة المرور؟</h1>
                <p className="text-opacity mt-2 text-sm">لا تقلق ادخل رقم هاتفك المرتبط بالحساب</p>
                <div className="mt-3 bg-white h-[30rem] shadow-sm rounded-xl w-full flex flex-col">
                    <div className="w-full">
                        <div className="p-3">
                            <h1 className="font-medium text-xl">ادخل رقم الهاتف المرتبط بالحساب</h1>
                            <p className="text-xs mt-2">سنرسل لك رمز تحقق برسالة نصية لتاكيد هويتك واعادة تعيين كلمة المرور</p>
                        </div>
                        <hr className="border-gray-400 border-t" />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-1 p-3 mt-3">
                        <FloatInput
                            label="ادخل رقم الهاتف الخاص بك"
                            setValue={handleMobileNumberChange}
                            value={mobilePhoneNumber}
                            isPassword={false}
                            error=""
                            type="text"
                            headText="رقم الهاتف"
                        />
                    </div>
                    <div className="mt-auto w-full p-3">
                        <div className="flex flex-col items-center justify-center gap-y-5">
                            <Button
                                title="ارسال الكود"
                                onPress={handleSendCode}
                                isLoading={false}
                            />
                            <button
                                type="button"
                                className="cursor-pointer text-sm"
                                onClick={handleResendCode}
                            >
                                اعادة ارسال كود التحقق
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordPage;