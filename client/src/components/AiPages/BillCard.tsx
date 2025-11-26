const BillCard = ({ title, value }: {
    title: string,
    value: string
}) => {
    return (
        <div className="w-full mt-5 flex  items-center justify-between">
            <p className='text-blue-primary'>{title}</p>
            <p className='text-[#84849D]'>{value}</p>
        </div>
    )
}

export default BillCard
