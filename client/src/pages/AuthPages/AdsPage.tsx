import { useState } from "react";
import Ad from "../../components/AuthPagesComponents/Ad";
import { motion, AnimatePresence } from "framer-motion";
const AdsPage = () => {
    const [screenNumber, setScreenNumber] = useState(1);
    const variants = {
        enter: { opacity: 0, x: 100, scale: 0.95 },
        center: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: -100, scale: 0.95 },
    };
    return (
        <div className="w-full h-screen relative">
            <AnimatePresence mode="wait">
                {screenNumber === 1 && (
                    <motion.div
                        key="screen1"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.6 }}
                        className="absolute w-full h-full"
                    >
                        <Ad
                            title="كل فواتيرك في مكان واحد"
                            parargraph="يتيح لك دفع فواتير الكهرباء والمياه وغيرهم المزيد بسهولة وسرعة من خلال تطبيق واحد امن وموثوق"
                            screenNumber={screenNumber}
                            picture={['/backgrounds/bg1.png']}
                            isTwoPicture={false}
                            isLastScreen={false}
                            spanText="اي-سداد"
                            setScreenNumber={setScreenNumber}
                        />
                    </motion.div>
                )}
                {screenNumber === 2 && (
                    <motion.div
                        key="screen2"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.6 }}
                        className="absolute w-full h-full"
                    >
                        <Ad
                            title="اضف وادفع في ثواني"
                            parargraph="اختر القسم، حدد الشركة، اضف بيانات الحساب، وحدد طريقة الدفع - كل ذلك خلال خطوات بسيطة"
                            screenNumber={screenNumber}
                            picture={['/backgrounds/bg2.png', '/backgrounds/bg3.png']}
                            isTwoPicture={true}
                            isLastScreen={false}
                            spanText="اي-سداد"
                            setScreenNumber={setScreenNumber}
                        />
                    </motion.div>
                )}
                {screenNumber === 3 && (
                    <motion.div
                        key="screen3"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.6 }}
                        className="absolute w-full h-full"
                    >
                        <Ad
                            title="هيا نبدا!"
                            parargraph="سجل الدخول لحسابك او انشئ حسابا جديدا في دفع فواتيرك بكل سهولة وامان."
                            screenNumber={screenNumber}
                            picture={['/backgrounds/bg2.png']}
                            isTwoPicture={false}
                            isLastScreen={true}
                            spanText="اي-سداد"
                            setScreenNumber={setScreenNumber}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default AdsPage;