import LinkAi from "../../ui/links/LinkAi";
import { motion } from "framer-motion";
const AiPage = () => {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15 }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 100, duration: 0.5 }
        }
    };
    return (
        <motion.div
            className="w-full min-h-[85vh] flex flex-col items-center p-3 justify-center gap-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 variants={itemVariants}>
                مرحبا بعودتك! رحلتك الذكية تبدا مع مساعد
            </motion.h1>
            <motion.h1 className="text-blue-primary font-bold" variants={itemVariants}>
                اي-سداد بالذكاء الاصطناعي.
            </motion.h1>
            <motion.img src={'/pictures/ai.png'} alt="ai picture" variants={itemVariants} />
            <motion.div
                className="w-full flex gap-y-5 flex-col items-center text-center justify-center"
                variants={itemVariants}
            >
                <h1>كيف يمكنني مساعدتك في ادارة فواتيرك اليوم؟</h1>
                <p className="text-[#7D7E83] text-xs leading-5">
                    استخدم مساعد الذكاء الاصطناعي للعثور على إجابات دقيقة، إرشادات مفيدة، وحلول فورية لأسئلتك.
                </p>
                <div className="w-full max-w-md flex items-center justify-between">
                    <LinkAi image="/icons/message.png" direction="/chat" />
                    <LinkAi image="/icons/microphone.png" direction="/dashboard/call" />
                </div>
            </motion.div>
        </motion.div>
    )
}
export default AiPage;