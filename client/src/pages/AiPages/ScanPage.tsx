import { useState } from "react";
import Button from "../../ui/buttons/Button";
import ScanQR from "../../components/ScanQR";
const ScanPage = () => {
    const [isScan, setIsScan] = useState<boolean>(false);
    if (isScan) return <ScanQR onClose={() => setIsScan(false)} />;
    return (
        <div className="w-full min-h-[85vh] p-3 flex flex-col items-center justify-between">
            <div className="pt-20">
                <h1 className="font-medium text-xl">امسح رمز الفاتورة التي تريد دفعها</h1>
            </div>
            <img src="/pictures/qrcode.png" alt="scan image" />
            <div className="w-full max-w-xl">
                <Button title="مسح" onPress={() => setIsScan(true)} isLoading={false} />
            </div>
        </div>
    );
}
export default ScanPage;