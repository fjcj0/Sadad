const SendMessage = () => {
    return (
        <div className="fixed bottom-0 w-screen ">
            <div className="w-full flex items-center p-5 justify-center gap-4 rounded-t-3xl bg-white/50 backdrop-filter backdrop-blur-sm  border-t-[0.3px] border-t-gray-400 h-[7.5rem]">
                <div>
                    <button type="button" className="cursor-pointer w-10 h-10  rounded-full bg-blue-primary hover:bg-blue-700 duration-300 transition-all flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                        </svg>
                    </button>
                </div>
                <div className="w-full relative" dir="ltr">
                    <input type="text" className="w-full rounded-4xl bg-[#F8F8F8] px-5 py-5 text-sm placeholder:text-sm placeholder:text-[#AAAFB5] text-[#AAAFB5]" placeholder="تحدث مع اي-سداد AI" />
                    <button type="button" className="cursor-pointer absolute right-5 top-5">
                        <img src="/icons/sendIcon.png" alt="send icon" className="" />
                    </button>
                </div>
                <button type="button" className="cursor-pointer w-10 h-10 rounded-full items-center justify-center">
                    <img src="/icons/camera.png" alt="microphone" className="w-6" />
                </button>
            </div>
        </div>
    )
}
export default SendMessage