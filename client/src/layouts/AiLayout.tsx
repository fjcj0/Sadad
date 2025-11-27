import { Outlet, useLocation } from "react-router-dom";
import BottomMenu from "../components/BottomMenu";
import NavigateBack from "../ui/navigators/NavigateBack";
const AiLayout = () => {
    const path = useLocation();
    return (
        <div className="w-screen min-h-[100vh] pb-32">
            {
                path.pathname != '/dashboard/home' && path.pathname != '/dashboard/scan' &&
                <NavigateBack />
            }
            <Outlet />
            <BottomMenu />
        </div>
    );
}
export default AiLayout;