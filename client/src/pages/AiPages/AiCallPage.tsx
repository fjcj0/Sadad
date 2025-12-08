import { useState } from "react";
import LinkAi from "../../ui/links/LinkAi";
import Animation from "../../utils/Animation";
import blueAnimationRecord from '../../animation/BlueAudio.json';
import { StopCircle } from "lucide-react";
const AiCallPage = () => {
    const [isRecording, setIsRecording] = useState(false);
    return (
        <div className="w-full min-h-[85vh] flex flex-col items-center justify-center gap-5">
            <h1 className="mt-3">سدد فاتورتك بسهولة من خلال التحدث الى</h1>
            <h1 className="text-blue-primary font-bold">مساعد اي-سداد الذكي.</h1>
            <img src={'/pictures/listen.png'} alt="ai picture" className="w-50 rounded-full" />
            <div className="w-full flex gap-5 flex-col items-center text-center justify-center">
                <p className="text-[#7D7E83] text-xs leading-5">اريد تسديد مخالفة المرور الخاص في محمد رزق ابو علي مخالفة رقم 456789 عن طريق تطبيق مركبتي</p>
                <div className="w-full max-w-md flex items-center justify-between p-3">
                    {
                        isRecording ?
                            <div>
                                <button onClick={() => {
                                    setIsRecording(!isRecording)
                                }} type="button" className="cursor-pointer active:opacity-50 active:scale-75 duration-300 ease transition-all w-12 h-12 flex items-center justify-center bg-red-400 rounded-full">
                                    <StopCircle color="white" />
                                </button>
                            </div>
                            : <LinkAi image="/icons/message.png" direction="/chat" />
                    }
                    {
                        isRecording ?
                            <div className="mb-14">
                                <Animation animation={blueAnimationRecord} width={400} height={400} />
                            </div>

                            :
                            <button
                                onClick={() => {
                                    setIsRecording(!isRecording)
                                }}
                                type="button" className="cursor-pointer active:scale-75 duration-300 ease transition-all flex mb-14 items-center justify-center">
                                <img src="/icons/microphone-call.png" alt="" />
                            </button>
                    }
                    <LinkAi image="/icons/x.png" direction="/dashboard/ai" />
                </div>
            </div>
        </div>
    );
}
export default AiCallPage;