import { Outlet } from "react-router-dom";
import BottomMenu from "../components/BottomMenu";
const AiLayout = () => {
    return (
        <div className="w-screen min-h-[100vh] pb-32">
            <Outlet />
            <BottomMenu />
        </div>
    );
}
export default AiLayout;