import { useNavigate } from "react-router-dom";

const CardCategory = ({
    id,
    title,
    image
}: {
    id: number,
    title: string,
    image: string
}) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => {
                navigate(`/dashboard/companies/${id}`);
            }}
            type="button" className="bg-white cursor-pointer hover:scale-110 hover:bg-blue-500/50 active:scale-75 duration-300 transition-all ease shadow-sm w-full h-[6.5rem] px-3 flex flex-col py-3 rounded-xl items-center justify-center gap-3">
            <div className="px-3 py-2 flex items-center justify-center bg-blue-primary rounded-md">
                <img src={image} alt={title} />
            </div>
            <p className="max-md:text-xs text-lg text-center">{title}</p>
        </button>
    )
}
export default CardCategory;