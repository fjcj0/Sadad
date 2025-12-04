import FloatInput from "../../../ui/inputs/FloatInput";
import { useState, useEffect } from "react";
import Button from "../../../ui/buttons/Button";
import { useLocation, useNavigate } from "react-router";
import NavigateBack from "../../../ui/navigators/NavigateBack";
import { useUserStore } from "../../../store/authStore";
import { warningIcon } from "../../../constants/data";
const ForgetPasswordPage = () => {
    const { error, isLoading, sendVerficationCode } = useUserStore();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isResetPassword: boolean = queryParams.get("isResetPassword") === "true";
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
    const [errorMobileNumber, setErrorMobileNumber] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (mobilePhoneNumber.length === 0) {
            setErrorMobileNumber('');
        } else if (!/^05[69]\d{7}$/.test(mobilePhoneNumber)) {
            setErrorMobileNumber('رقم الهاتف يجب أن يبدأ بـ 059 أو 056 ويحتوي على 10 أرقام');
        } else {
            setErrorMobileNumber('');
        }
    }, [mobilePhoneNumber]);
    const handleMobileNumberChange = (value: string) => {
        setMobilePhoneNumber(value);
    };
    const handleSendCode = async () => {
        if (errorMobileNumber || !mobilePhoneNumber) {
            return;
        }
        try {
            sendVerficationCode(mobilePhoneNumber, isResetPassword);
            navigate(`/verify-code?isResetPassword=true&phone=${mobilePhoneNumber}`);
        } catch (error) {
            console.log(error);
        }
    };
    const handleResendCode = () => {
        try {

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex max-w-xl min-h-[100vh] mx-auto items-start justify-center flex-col">
            <NavigateBack />
            <div className="p-3 w-full">
                <h1 className="font-bold text-3xl">نسيت كلمة المرور؟</h1>
                <p className="text-opacity mt-2 text-sm">لا تقلق، ادخل رقم هاتفك المرتبط بالحساب</p>
                <div className="mt-3 bg-white h-[30rem] shadow-sm rounded-xl w-full flex flex-col">
                    <div className="w-full">
                        <div className="p-3">
                            <h1 className="font-medium text-xl">ادخل رقم الهاتف المرتبط بالحساب</h1>
                            <p className="text-xs mt-2">سنرسل لك رمز تحقق برسالة نصية لتأكيد هويتك وإعادة تعيين كلمة المرور</p>
                        </div>
                        <hr className="border-gray-400 border-t" />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-1 p-3 mt-3">
                        <FloatInput
                            label="ادخل رقم الهاتف الخاص بك"
                            setValue={handleMobileNumberChange}
                            value={mobilePhoneNumber}
                            isPassword={false}
                            error={errorMobileNumber}
                            type="text"
                            headText="رقم الهاتف"
                        />
                        {
                            error &&
                            <p className="text-red-500 flex items-center justify-center">
                                <img src={warningIcon} alt="warning icon" className="w-4 h-4" />
                                {error}
                            </p>
                        }
                    </div>
                    <div className="mt-auto w-full p-3">
                        <div className="flex flex-col items-center justify-center gap-y-5">
                            <Button
                                title="ارسال الكود"
                                onPress={handleSendCode}
                                isLoading={isLoading}
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