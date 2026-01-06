import { useEffect, useState } from "react";
import CardCategory from "../../components/AiPages/CardCategory";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import SplashScreen from "../../tools/SplashScreen";
import { motion } from "framer-motion";
axios.defaults.withCredentials = true;
type Category = {
    title: string,
    id: number,
    icon: string
};
const CategoriesPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const handleCategories = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/api/data/category`);
            setCategories(response.data.categories);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        handleCategories();
    }, []);
    const [search, setSearch] = useState("");
    const filteredCategories = categories.filter(cat =>
        cat.title.toLowerCase().includes(search.toLowerCase())
    );
    if (isLoading) return (<SplashScreen />);
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
                <div className="w-full mx-3 items-center justify-center">
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-10 place-items-center place-content-around">
                        {filteredCategories.map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                className="w-full"
                            >
                                <motion.div

                                    className="w-full"
                                >
                                    <CardCategory
                                        id={cat.id}
                                        title={cat.title}
                                        image={cat.icon}
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CategoriesPage;