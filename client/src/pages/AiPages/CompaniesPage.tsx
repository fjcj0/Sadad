import { useState, useMemo, useEffect } from "react";
import Search from "../../ui/search/Search";
import CardCompany from "../../components/AiPages/CardCompany";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { baseUrl } from "../../utils/baseUrl";
import SplashScreen from "../../tools/SplashScreen";
import { Navigate } from "react-router-dom";
axios.defaults.withCredentials = true;
type Company = {
    id: number,
    title: string,
    icon: string
};
const CompaniesPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const handleCompanies = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${baseUrl}/api/data/company/${id}`);
            setCompanies(response.data.companies);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
            setIsFetched(true);
        }
    };
    useEffect(() => {
        handleCompanies();
    }, []);
    const filteredCompanies = useMemo(() => {
        if (!searchValue.trim()) {
            return companies;
        }
        return companies.filter(comp =>
            comp.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [searchValue, companies]);
    if (isLoading) return <SplashScreen />;
    if (!isLoading && isFetched && companies.length === 0)
        return <Navigate to={'/PageNotFound'} />;
    return (
        <div className="w-full flex flex-col items-center justify-center gap-3">
            <div className="w-full flex flex-col items-center justify-center bg-blue-primary pb-5 rounded-b-4xl">
                <div className="w-full text-white p-3 flex flex-col items-center justify-center gap-5">
                    <h1 className="font-medium text-lg">شركات الانترنت</h1>
                    <p className="text-xs">يمكنك اختيار الشركة التي ترغب بتسديد فاتورتها</p>
                    <Search placeHolder="ابحث عن الشركة التي تريدها..." setValue={setSearchValue} />
                </div>
            </div>
            <div className="w-full p-3 flex flex-col items-center justify-center gap-4">
                {filteredCompanies.map((comp, index) => (
                    <CardCompany
                        key={index}
                        image={comp.icon}
                        title={comp.title}
                    />
                ))}
            </div>
        </div>
    );
};
export default CompaniesPage;