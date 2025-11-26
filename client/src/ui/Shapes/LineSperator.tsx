const LineSperator = () => {
    return (
        <div className="flex items-center justify-center w-full max-w-md mx-auto my-5">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent to-gray-400"></div>
            <div className="flex items-center justify-center px-4">
                <p className="text-gray-700 font-medium text-lg">او</p>
            </div>
            <div className="flex-grow h-px bg-gradient-to-l from-transparent to-gray-400"></div>
        </div>
    );
}
export default LineSperator;