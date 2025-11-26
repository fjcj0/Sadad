import LinkAi from "../../ui/links/LinkAi";
const AiPage = () => {
    return (
        <div className="w-full min-h-[85vh] flex flex-col items-center p-3 justify-center gap-5">
            <h1>مرحبا بعودتك! رحلتك الذكية تبدا مع مساعد</h1>
            <h1 className="text-blue-primary font-bold">اي-سداد بالذكاء الاصطناعي.</h1>
            <img src={'/pictures/ai.png'} alt="ai picture" />
            <div className="w-full flex gap-5 flex-col items-center text-center justify-center">
                <h1>كيف يمكنني مساعدتك في ادارة فواتيرك اليوم؟</h1>
                <p className="text-[#7D7E83] text-xs leading-5">استخدم مساعد الذكاء الاصطناعي للعثور على إجابات دقيقة، إرشادات مفيدة، وحلول فورية لأسئلتك.</p>
                <div className="w-full max-w-md flex items-center justify-between">
                    <LinkAi image="/icons/message.png" direction="/chat" />
                    <LinkAi image="/icons/microphone.png" direction="/dashboard/call" />

                </div>
            </div>
        </div>
    )
}
export default AiPage;