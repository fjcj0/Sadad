import LinkAi from "../../ui/links/LinkAi";
import NavigateBack from "../../ui/navigators/NavigateBack";
const AiCallPage = () => {
    return (
        <div className="w-full min-h-[85vh] flex flex-col items-center justify-center gap-5">
            <h1 className="mt-3">سدد فاتورتك بسهولة من خلال التحدث الى</h1>
            <h1 className="text-blue-primary font-bold">مساعد اي-سداد الذكي.</h1>
            <img src={'/pictures/listen.png'} alt="ai picture" className="w-50 rounded-full" />
            <div className="w-full flex gap-5 flex-col items-center text-center justify-center">
                <p className="text-[#7D7E83] text-xs leading-5">اريد تسديد مخالفة المرور الخاص في محمد رزق ابو علي مخالفة رقم 456789 عن طريق تطبيق مركبتي</p>
                <div className="w-full max-w-md flex items-center justify-between p-3">
                    <LinkAi image="/icons/message.png" direction="/chat" />
                    <button type="button" className="flex mb-14 items-center justify-center">
                        <img src="/icons/microphone-call.png" alt="" />
                    </button>
                    <LinkAi image="/icons/x.png" direction="/dashboard/ai" />
                </div>
            </div>
        </div>
    );
}
export default AiCallPage;