import BillCard from "../../components/AiPages/BillCard";
import Button from "../../ui/buttons/Button";
import { useEffect, useState } from "react";
import { baseUrl } from "../../utils/baseUrl";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import SplashScreen from "../../tools/SplashScreen";
import { motion } from "framer-motion";
axios.defaults.withCredentials = true;
interface Bill {
    icon: string;
    name: string;
    phone: string;
    address: string;
    company: string;
    service: string;
    number: string;
    created_at: string;
    price: number;
    notes: string;
}
const BillPage = () => {
    const { number } = useParams<{ number: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [bill, setBill] = useState<Bill | null>(null);
    const handleBill = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/api/bill/${number}`);
            setBill(response.data.bill);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsFetched(true);
        }
    };
    useEffect(() => {
        handleBill();
    }, []);
    if (isLoading) return <SplashScreen />;
    if (isFetched && !isLoading && !bill) return <Navigate to={"/PageNotFound"} />;
    if (!bill) return null;
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring" as const, stiffness: 100 } },
    };
    return (
        <motion.div
            className="w-full max-w-3xl mx-auto flex flex-col p-5 items-center justify-center gap-y-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 className="text-2xl font-medium" variants={itemVariants}>
                تفاصيل الفاتورة
            </motion.h1>
            <motion.img
                src={bill.icon}
                alt="صورة الشركة"
                className="w-14 h-14"
                variants={itemVariants}
            />
            <motion.div className="w-full" variants={itemVariants}>
                <div className="flex flex-col p-5 gap-4 rounded-3xl w-full mt-3 border-[0.5px] border-[#EDEDED]">
                    <h1 className="font-bold">معلومات صاحب الفاتورة</h1>
                    <BillCard title="الاسم:" value={bill.name} />
                    <BillCard title="الهاتف:" value={bill.phone} />
                    <BillCard title="العنوان:" value={bill.address} />
                </div>
            </motion.div>
            <motion.div className="w-full" variants={itemVariants}>
                <div className="flex flex-col p-5 gap-4 rounded-3xl w-full mt-3 border-[0.5px] border-[#EDEDED]">
                    <h1 className="font-bold">معلومات الفاتورة</h1>
                    <BillCard title="الشركة:" value={bill.company} />
                    <BillCard title="الخدمة:" value={bill.service} />
                    <BillCard title="رقم الفاتورة:" value={bill.number} />
                    <BillCard title="التاريخ:" value={new Date(bill.created_at).toLocaleDateString()} />
                </div>
            </motion.div>
            <motion.div className="w-full" variants={itemVariants}>
                <div className="flex flex-col p-5 gap-4 rounded-3xl w-full mt-3 border-[0.5px] border-[#EDEDED]">
                    <h1 className="font-bold">المعلومات المالية</h1>
                    <BillCard title="المبلغ:" value={`${bill.price} ₪`} />
                </div>
            </motion.div>
            <motion.div className="w-full" variants={itemVariants}>
                <div className="flex flex-col p-5 gap-4 rounded-3xl w-full mt-3 border-[0.5px] border-[#EDEDED]">
                    <h1 className="font-bold">الملاحظات</h1>
                    <BillCard title="ملاحظة:" value={bill.notes} />
                </div>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full">
                <Button
                    isLoading={false}
                    title="ادفع الان"
                    onPress={() => console.log('تم الضغط على الدفع')}
                />
            </motion.div>
        </motion.div>
    );
};
export default BillPage;