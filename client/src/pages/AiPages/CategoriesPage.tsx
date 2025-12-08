import { useState } from "react";
import { categories } from "../../constants/data";
import CardCategory from "../../components/AiPages/CardCategory";
const CategoriesPage = () => {
    const [search, setSearch] = useState("");
    const filteredCategories = categories.filter(cat =>
        cat.title.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="w-full flex flex-col items-center justify-center gap-3 p-5">
            <div className="w-[20rem] px-3 py-2 gap-1 rounded-xl flex bg-[#F8F8F8] items-center justify-start">
                <img src="/icons/search.png" alt="search icon" />
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="ابحث عن الشركات التي تريدها..."
                    className="text-xs font-light text-[#A8A8A8] bg-transparent outline-none w-full"
                />
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-3">
                <div dir="ltr" className="w-full">
                    <h1 className="font-bold text-2xl">E-Sadad</h1>
                </div>
                <div className="w-full items-center justify-center">
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-5 place-items-center place-content-around">
                        {
                            filteredCategories.map((cat, index) => (
                                <CardCategory
                                    key={index}
                                    id={cat.id}
                                    title={cat.title}
                                    image={cat.icon}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CategoriesPage;