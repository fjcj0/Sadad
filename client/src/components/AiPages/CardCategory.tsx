
const CardCategory = ({
    title,
    image
}: {
    title: string,
    image: string
}) => {
    return (
        <div className="bg-white shadow-sm w-full h-[6.5rem] px-3 flex flex-col py-3 rounded-xl items-center justify-center gap-3">
            <div className="px-3 py-2 flex items-center justify-center bg-blue-primary rounded-md">
                <img src={image} alt={title} />
            </div>
            <p className="max-md:text-xs text-lg text-center">{title}</p>
        </div>
    )
}
export default CardCategory;
