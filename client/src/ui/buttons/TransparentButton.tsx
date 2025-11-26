const TransparentButton = ({ onPress, title, isLoading, icon }: {
    onPress: () => Promise<void> | void;
    title: string;
    isLoading: boolean;
    icon?: string
}) => {
    return (
        <button
            onClick={onPress}
            disabled={isLoading}
            className={`bg-transparent flex items-center justify-center gap-1 text-black border-[0.5px] border-gray-400 py-4 w-full rounded-xl duration-300 transition-all cursor-pointer ${isLoading && 'opacity-50 border-blue-primary text-blue-primary'}`}>
            {isLoading ? 'انتظر...' : title}
            {
                icon && !isLoading &&
                <img src={icon} alt={icon} />
            }
        </button>
    );
};
export default TransparentButton;