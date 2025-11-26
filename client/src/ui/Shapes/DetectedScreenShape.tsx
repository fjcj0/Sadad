const DetectedScreenShape = ({ screenNumber }: { screenNumber: number }) => {
    return (
        <div className="flex items-center justify-center gap-x-1 flex-row-reverse">
            {
                [1, 2, 3].map((i, index) => (
                    <div key={index} className={`${i === screenNumber ? 'w-10 h-2 rounded-lg' : ' w-2 h-2 rounded-full'} bg-blue-500`} />
                ))
            }
        </div>
    );
}
export default DetectedScreenShape;