import Button from "../../ui/buttons/Button";

const ScanPage = () => {
    return (
        <div className="w-full min-h-[85vh] p-3 flex flex-col items-center justify-between">
            <div className="pt-20">
                <h1 className="font-medium text-xl">امسح رمز الفاتورة التي تريد دفعها</h1>
            </div>
            <img src="/pictures/qrcode.png" alt="scan image" />
            <div className="w-full max-w-xl">

                <Button title="مسح" onPress={() => console.log('')} isLoading={false} />
            </div>

        </div>
    );
}
export default ScanPage;