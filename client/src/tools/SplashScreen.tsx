import LoadingCss from "../ui/Loaders/LoadingCss";

const SplashScreen = () => {
    return (
        <div className="w-screen min-h-[100vh] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <img src="/logos/sadalogo.png" alt="Main Background" className="w-48" />
                <LoadingCss />
                <p className="mt-3">انتظر سيتم نقلك...</p>
            </div>
        </div>
    );
}

export default SplashScreen;