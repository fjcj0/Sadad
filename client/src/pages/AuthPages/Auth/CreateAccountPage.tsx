import { Link, useNavigate } from "react-router-dom";
import FloatInput from "../../../ui/inputs/FloatInput";
import { useState } from "react";
import Button from "../../../ui/buttons/Button";
import LineSperator from "../../../ui/Shapes/LineSperator";
import TransparentButton from "../../../ui/buttons/TransparentButton";
import NavigateBack from "../../../ui/navigators/NavigateBack";

const CreateAccountPage = () => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleMobileNumberChange = (value: string) => {
        setMobileNumber(value);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handlePasswordConfirmChange = (value: string) => {
        setPasswordConfirm(value);
    };

    const handleCreateAccount = async () => {
        console.log('تم إنشاء الحساب - جاهز للإرسال');
        navigate('/dashboard/home');
    };

    return (
        <div className="flex max-w-xl min-h-[100vh] mx-auto items-start justify-center flex-col">
            <NavigateBack />
            <div className="p-3 w-full">
                <h1 className="font-bold text-3xl">ابدا مع <span className="text-blue-primary">اي-سداد</span></h1>
                <p className="text-opacity mt-2 text-sm">انشئ حسابا وابدا بدفع فواتيرك بسهولة وبسرعة.</p>
                <div className="mt-3 bg-white shadow-sm rounded-xl w-full flex flex-col items-start justify-start">
                    <div className="w-full">
                        <div className="p-3">
                            <h1 className="font-medium text-xl">انشاء حساب</h1>
                            <p className="text-xs mt-2">لديك حساب بالفعل <Link to={'/login'} className="text-blue-primary">
                                سجل دخولك
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
                            error=""
                            type="text"
                            headText="رقم الهاتف"
                        />
                        <FloatInput
                            label="ادخل كلمة السر الخاصة بك"
                            setValue={handlePasswordChange}
                            value={password}
                            isPassword={true}
                            error=""
                            type="password"
                            headText="كلمة السر"
                        />
                        <FloatInput
                            label="تاكيد كلمة السر الخاصة بك"
                            setValue={handlePasswordConfirmChange}
                            value={passwordConfirm}
                            isPassword={true}
                            error=""
                            type="password"
                            headText="تاكيد كلمة السر"
                        />
                    </div>
                    <div className="w-full flex items-center justify-center p-3 flex-col">
                        <Button
                            title="انشاء الحساب"
                            onPress={handleCreateAccount}
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

export default CreateAccountPage;