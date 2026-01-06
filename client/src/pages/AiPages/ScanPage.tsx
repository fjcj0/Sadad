import { useState } from "react";
import Button from "../../ui/buttons/Button";
import ScanQRSmall from "../../components/ScanQRSmall";
import { motion } from "framer-motion";
const ScanPage = () => {
    const [isScan, setIsScan] = useState<boolean>(false);
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 100, duration: 0.5 },
        },
    };
    return (
        <motion.div
            className="w-full min-h-[85vh] p-3 flex flex-col items-center justify-between"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="pt-20" variants={itemVariants}>
                <h1 className="font-medium text-xl">
                    امسح رمز الفاتورة التي تريد دفعها
                </h1>
            </motion.div>
            <motion.div className="w-full max-w-xl flex items-center justify-center" variants={itemVariants}>
                {isScan ? (
                    <ScanQRSmall onClose={() => setIsScan(false)} />
                ) : (
                    <img src="/pictures/qrcode.png" alt="scan image" />
                )}
            </motion.div>
            <motion.div className="w-full max-w-xl" variants={itemVariants}>
                <Button
                    title={isScan ? "تبديل الكاميرا" : "مسح"}
                    onPress={() => setIsScan(true)}
                    isLoading={false}
                />
            </motion.div>
        </motion.div>
    );
};
export default ScanPage;