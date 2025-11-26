import SendMessage from "../../../components/SendMessage";
import { messages } from "../../../constants/data";
import Message from "../../../ui/messages/Message";

const ChatPage = () => {
    return (
        <div className="w-screen min-h-[100vh] flex flex-col items-center justify-start">
            <div className="fixed w-screen bg-white/50 backdrop-filter backdrop-blur-sm flex items-center h-[5rem]  justify-center">
                <h1 className="text-2xl font-medium">دردش مع E-SADAD</h1>
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