import { useState, useMemo } from "react";
import Search from "../../ui/search/Search";
import { companies } from "../../constants/data";
import CardCompany from "../../components/AiPages/CardCompany";
const CompaniesPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const filteredCompanies = useMemo(() => {
        if (!searchValue.trim()) {
            return companies;
        }
        return companies.filter(comp =>
            comp.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [searchValue, companies]);
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
                        image={comp.image}
                        title={comp.title}
                    />
                ))}
            </div>
        </div>
    );
}
export default CompaniesPage;