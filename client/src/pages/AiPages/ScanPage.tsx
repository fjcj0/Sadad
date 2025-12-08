import { useState } from "react";
import Button from "../../ui/buttons/Button";
import ScanQRSmall from "../../components/ScanQRSmall";
const ScanPage = () => {
    const [isScan, setIsScan] = useState<boolean>(false);
    return (
        <div className="w-full min-h-[85vh] p-3 flex flex-col items-center justify-between">
            <div className="pt-20">
                <h1 className="font-medium text-xl">امسح رمز الفاتورة التي تريد دفعها</h1>
            </div>
            <div className="w-full max-w-xl flex items-center justify-center">
                {isScan ? (
                    <ScanQRSmall onClose={() => setIsScan(false)} />
                ) : (
                    <img src="/pictures/qrcode.png" alt="scan image" />
                )}
            </div>
            <div className="w-full max-w-xl">
                <Button
                    title={isScan ? "تبديل الكاميرا" : "مسح"}
                    onPress={() => setIsScan(true)}
                    isLoading={false}
                />
            </div>
        </div>
    );
};
export default ScanPage;