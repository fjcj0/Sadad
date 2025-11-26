import { useState } from "react";
import Ad from "../../components/AuthPagesComponents/Ad";

const AdsPage = () => {
    const [screenNumber, setScreenNumber] = useState(1);
    if (screenNumber == 1) {
        return (
            <Ad title="كل فواتيرك في مكان واحد"
                parargraph="يتيح لك دفع فواتير الكهرباء والمياه وغيرهم المزيد بسهولة وسرعة من خلال تطبيق واحد امن وموثوق"
                screenNumber={screenNumber}
                picture={['/backgrounds/bg1.png']}
                isTwoPicture={false}
                isLastScreen={false}
                spanText="اي-سداد"
                setScreenNumber={setScreenNumber}
            />
        );
    }
    else if (screenNumber == 2) {
        return (
            <Ad title="اضف وادفع في ثواني"
                parargraph="اختر القسم، حدد الشركة، اضف بيانات الحساب، وحدد طريقة الدفع - كل ذلك خلال خطوات بسيطة"
                screenNumber={screenNumber}
                picture={['/backgrounds/bg2.png', '/backgrounds/bg3.png']}
                isTwoPicture={true}
                isLastScreen={false}
                spanText="اي-سداد"
                setScreenNumber={setScreenNumber}
            />
        );

    }
    else if (screenNumber == 3) {
        return (
            <Ad title="هيا نبدا!"
                parargraph="سجل الدخول لحسابك او انشئ حسابا جديدا في دفع فواتيرك بكل سهولة وامان."
                screenNumber={screenNumber}
                picture={['/backgrounds/bg2.png']}
                isTwoPicture={false}
                isLastScreen={true}
                spanText="اي-سداد"
                setScreenNumber={setScreenNumber}
            />
        );
    }
}
export default AdsPage;