const CardCompany = ({
    title,
    image
}: {
    title: string,
    image: string
}) => {
    return (
        <div className="group relative flex items-center justify-start w-full px-3 py-5 rounded-xl border-[0.5px] border-[#EEEEEE] gap-2 overflow-hidden transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-out"></div>
            <div className="relative z-10 flex items-center gap-2">
                <img src={image} alt={title} className=" " />
                <p className="font-medium transition-colors duration-300 group-hover:text-white">{title}</p>
            </div>
        </div>
    );
}

export default CardCompany;