const Search = ({
    setValue,
    placeHolder,
}: {
    setValue: (value: string) => void,
    placeHolder: string
}) => {
    return (
        <div className="relative w-[60%]">
            <input type="text" className="w-full px-9 py-3 text-sm rounded-2xl placeholder:text-sm placeholder:text-white bg-[#5D7AE6]" placeholder={placeHolder} onChange={(e) => setValue(e.target.value)} />
            <img src="/icons/search-white.png" alt="search icon" className=" absolute top-3 right-2" />
        </div>
    )
}
export default Search;