import { Link, useNavigate } from "react-router-dom";
import FloatInput from "../../../ui/inputs/FloatInput";
import { useState, useEffect } from "react";
import Button from "../../../ui/buttons/Button";
import LineSperator from "../../../ui/Shapes/LineSperator";
import TransparentButton from "../../../ui/buttons/TransparentButton";
const LoginPage = () => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');
    const [errorMobileNumber, setErrorMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const validateMobileNumber = (number: string) => {
        if (number.length === 0) {
            return 'رقم الهاتف عنصر مهم';
        }
        if (number.length > 0 && !number.startsWith('+970') && !number.startsWith('+972')) {
            return 'الرقم يجب ان يبدا ب+970 او +972';
        }
        return '';
    };
    const validatePassword = (pass: string) => {
        if (pass.length === 0) {
            return 'كلمة السر عنصر مهم';
        }
        if (pass.length > 0 && pass.length < 8) {
            return 'كلمة السر يجب ان تحتوى على ثمان ارقام او اكثر';
        }
        return '';
    };
    const handleMobileNumberChange = (value: string) => {
        setMobileNumber(value);
        setErrorMobileNumber(validateMobileNumber(value));
    };
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setErrorPassword(validatePassword(value));
    };
    useEffect(() => {
        const mobileError = validateMobileNumber(mobileNumber);
        const passwordError = validatePassword(password);
        setHasError(mobileError !== '' || passwordError !== '');
    }, [mobileNumber, password]);
    const handleLogin = async () => {
        const mobileError = validateMobileNumber(mobileNumber);
        const passwordError = validatePassword(password);
        setErrorMobileNumber(mobileError);
        setErrorPassword(passwordError);
        if (mobileError === '' && passwordError === '') {
            navigate('/dashboard/home');
            console.log('Done - جاهز للإرسال');
        } else {
            console.log('يوجد أخطاء في النموذج');
        }
    };
    return (
        <div className="flex max-w-xl min-h-[100vh] mx-auto items-start justify-center flex-col">
            <div className="p-3 w-full">
                <h1 className="font-bold text-3xl">مرحبا بعودتك الى <span className="text-blue-primary">اي-سداد</span></h1>
                <p className="text-opacity mt-2 text-sm">سجل الدخول لمتابعة دفع فواتيرك بكل سهولة وسرعة.</p>
                <div className="mt-3 bg-white shadow-sm rounded-xl w-full flex flex-col items-start justify-start">
                    <div className="w-full">
                        <div className="p-3">
                            <h1 className="font-medium text-xl">تسجيل الدخول</h1>
                            <p className="text-xs mt-2">ليس لديك حسابك؟ <Link to={'/create-account'} className="text-blue-primary">
                                انشئ حسابا الان
                            </Link></p>
                        </div>
                        <hr className="border-gray-400 border-t" />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-1 p-3 mt-3">
                        <FloatInput
                            label="ادخل رقم الهاتف الخاص بك"
                            setValue={handleMobileNumberChange}
                            value={mobileNumber}
                            isPassword={false}
                            error={errorMobileNumber}
                            type="text"
                            headText="رقم الهاتف"
                        />
                        <FloatInput
                            label="ادخل كلمة السر الخاصة بك"
                            setValue={handlePasswordChange}
                            value={password}
                            isPassword={true}
                            error={errorPassword}
                            type="password"
                            headText="كلمة السر"
                        />
                        <Link to={'/forget-password'} className="text-blue-primary text-sm hover:underline duration-300 transition-all ease">نسيت كلمة السر</Link>
                    </div>
                    <div className="w-full flex items-center justify-center p-3 flex-col">
                        <Button
                            title="تسجيل الدخول"
                            onPress={handleLogin}
                            isLoading={false}
                        />
                        <LineSperator />
                        <TransparentButton
                            icon="/icons/google.png"
                            title="المتابعة باستخدام كلمة المرور"
                            isLoading={false}
                            onPress={() => console.log('Hello')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;