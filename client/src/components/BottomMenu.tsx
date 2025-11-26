import { bottomMenuLinks } from "../constants/data";
import { Link, useLocation } from "react-router-dom";
const BottomMenu = () => {
    const path = useLocation();
    return (
        <div className="fixed z-50 bottom-0 w-screen flex items-center justify-center">
            <div dir="ltr" className="font-bold w-full bg-white/50 backdrop-filter backdrop-blur-sm h-[6rem] text-white border-t-[0.2px] border-gray-400  rounded-t-4xl flex items-center justify-between px-14">
                {
                    bottomMenuLinks.map((link, index) => {
                        const isActive = path.pathname == link.direction;
                        return (
                            <Link
                                to={link.direction}
                                key={index}
                                className={`h-full relative flex flex-col gap-2 items-center justify-center ${isActive && 'border-b-blue-primary'}`}
                            >
                                <img src={isActive ? link.iconActive : link.icon} alt={link.title} className="w-7" />
                                <p className={`${isActive ? 'text-blue-primary' : 'text-[#999999]'} font-medium`}>
                                    {link.title}
                                </p>
                                {
                                    isActive &&
                                    <div className=" absolute bottom-0 w-full rounded-t-3xl h-[0.4rem] bg-blue-primary " />
                                }
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    )
}
export default BottomMenu;