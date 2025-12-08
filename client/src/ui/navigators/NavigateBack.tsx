import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
const NavigateBack = () => {
    const navigate = useNavigate();
    const path = useLocation();
    return (
        <div dir="ltr" className={`p-3 ${path.pathname.startsWith('/dashboard/companies/') && 'bg-blue-primary'}`}>
            <button onClick={() => {
                navigate(-1);
            }} type="button" className="cursor-pointer">
                <ArrowLeft />
            </button>
        </div>
    );
}
export default NavigateBack;