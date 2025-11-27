import { useNavigate } from "react-router";
import SendMessage from "../../../components/SendMessage";
import { messages } from "../../../constants/data";
import Message from "../../../ui/messages/Message";
import { ArrowLeft } from 'lucide-react'
const ChatPage = () => {
    const navigate = useNavigate();
    return (
        <div className="w-screen min-h-[100vh] flex flex-col items-start justify-start">
            <div className="fixed w-screen bg-white/50 backdrop-filter backdrop-blur-sm flex items-center h-[5rem]  justify-end" dir="rtl">
                <div className="w-[60%] px-3 max-md:w-[100%]  flex items-start justify-between">
                    <h1 className="text-2xl font-medium">دردش مع E-SADAD</h1>
                    <button onClick={() => {
                        navigate(-1);
                    }} type="button" className="cursor-pointer">
                        <ArrowLeft />
                    </button>
                </div>
            </div>
            <div className="w-full h-[100vh] flex flex-col gap-5 overflow-y-auto px-5 pb-36 pt-23">
                {
                    messages.map((msg, index) => (
                        <Message
                            key={index}
                            message={msg.message}
                            time={msg.time}
                            role={msg.role}
                        />
                    ))
                }
                {
                    messages.map((msg, index) => (
                        <Message
                            key={index}
                            message={msg.message}
                            time={msg.time}
                            role={msg.role}
                        />
                    ))
                }
            </div>
            <SendMessage />
        </div>
    );
}
export default ChatPage;