const Button = ({ onPress, title, isLoading }: {
    onPress: () => Promise<void> | void;
    title: string;
    isLoading: boolean;
}) => {
    return (
        <button
            onClick={onPress}
            disabled={isLoading}
            className={`bg-blue-primary text-white py-4 w-full rounded-xl hover:bg-blue-700 duration-300 transition-all cursor-pointer ${isLoading && 'opacity-50'}`}>
            {isLoading ? 'انتظر...' : title}
        </button>
    );
};

export default Button;