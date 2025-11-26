import { bill } from "../../constants/data";
import BillCard from "../../components/AiPages/BillCard"; // Adjust the import path as needed
import Button from "../../ui/buttons/Button";

const BillPage = () => {
    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col p-5 items-center justify-center gap-y-3">
            <h1 className="text-2xl font-medium">تفاصيل الفاتورة</h1>
            <img src="/pictures/mar.png" alt="mar picture" />
            {bill.map((b, index) => (
                <div key={index} className="p-3 w-full flex flex-col items-start justify-start  gap-y-4">
                    <div className="w-full">
                        <div className="flex flex-col p-5 gap-4 rounded-3xl w-full mt-3 border-[0.5px] border-[#EDEDED]">
                            <h1 className="font-bold">معلومات صاحب الفاتورة</h1>
                            <BillCard title="الاسم:" value={b.billOwnerInfo.name} />
                            <BillCard title="الهاتف:" value={b.billOwnerInfo.phone} />
                            <BillCard title="العنوان:" value={b.billOwnerInfo.address} />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col p-5 gap-4 rounded-3xl w-full mt-3 border-[0.5px] border-[#EDEDED]">
                            <h1 className="font-bold">معلومات الفاتورة</h1>
                            <BillCard title="الشركة:" value={b.billInfo.company} />
                            <BillCard title="الخدمة:" value={b.billInfo.service} />
                            <BillCard title="رقم الفاتورة:" value={b.billInfo.billNumber} />
                            <BillCard title="التاريخ:" value={b.billInfo.date} />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col p-5 gap-4 rounded-3xl w-full mt-3 border-[0.5px] border-[#EDEDED]">
                            <h1 className="font-bold">المعلومات المالية</h1>
                            <BillCard title="المبلغ:" value={`${b.moneyInfo.money} ${b.moneyInfo.currency}`} />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col p-5 gap-4 rounded-3xl w-full mt-3 border-[0.5px] border-[#EDEDED]">
                            <h1 className="font-bold">ملاحظات</h1>
                            <BillCard title="ملاحظة:" value={b.note} />
                        </div>
                    </div>
                </div>
            ))}
            <Button isLoading={false} title="ادفع الان" onPress={() => console.log('')} />
        </div>
    );
}
export default BillPage;