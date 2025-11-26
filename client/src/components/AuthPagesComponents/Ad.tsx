import { Link } from "react-router-dom";
import DetectedScreenShape from "../../ui/Shapes/DetectedScreenShape";
import Button from "../../ui/buttons/Button";
const Ad = ({ title, picture, parargraph, isLastScreen, screenNumber, spanText, isTwoPicture, setScreenNumber }: {
    title: string,
    picture: string[],
    parargraph: string,
    isLastScreen: boolean,
    screenNumber: number,
    spanText?: string,
    isTwoPicture: boolean,
    setScreenNumber: (pageNumber: number) => void;
}) => {
    return (
        <div className="w-full min-h-[100vh] flex items-center justify-center flex-col gap-5 p-3">
            <div className="relative flex items-center justify-center">
                {!isTwoPicture ? (
                    <img src={picture[0]} alt="bg1.png" />
                ) : (
                    picture.map((picture, index) => (
                        <img
                            key={index}
                            src={picture}
                            alt={picture}
                            className={`${index === 1 && 'absolute top-3'}`}
                        />
                    ))
                )}
                <div className="absolute -bottom-3 left-0 right-0 h-30 bg-gradient-to-t from-white/100 via-white/100 to-transparent pointer-events-none" />            </div>
            <div className="mt-5">
                <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex items-center justify-between gap-x-8">
                        <p className="font-bold text-xl">{title}</p>
                        <DetectedScreenShape screenNumber={screenNumber} />
                    </div>
                    <p> {spanText && <span className="text-blue-500">{spanText}</span>} {parargraph}</p>
                </div>
                <div className="mt-3">
                    {
                        !isLastScreen ?
                            <div className="flex items-center justify-center flex-col gap-5 w-full">
                                <Button onPress={() => setScreenNumber(screenNumber + 1)} title={'التالي'} isLoading={false} />
                                <Link to={'/create-account'} className="text-opacity">
                                    تخطي
                                </Link>
                            </div>
                            :
                            <div className="flex items-center justify-center gap-3">
                                <Link to={'/login'} className="cursor-pointer px-4 py-4 bg-transparent rounded-xl border-[0.5px] border-black">
                                    تسجيل الدخول
                                </Link>
                                <Link to={'/create-account'} className="cursor-pointer px-4 py-4  rounded-xl bg-blue-primary hover:bg-blue-700 text-white duration-300 transition-all">
                                    انشاء حساب
                                </Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Ad;