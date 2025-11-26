const Message = ({
    role,
    message,
    time,
}: {
    role: string,
    message: string,
    time: string
}) => {
    return (
        <div className={`w-[80%] rounded-xl text-xs h-auto flex flex-col p-5 ${role === 'user' ? 'self-start bg-blue-primary' : 'self-end bg-white shadow-sm'}`}>
            <p className={`${role === 'user' ? 'text-white' : 'text-[#232323]'} mb-2`}>{message}</p>
            <p className={`${role === 'user' ? 'text-white' : 'text-[#232323]'} self-end text-[0.7rem] opacity-70`}>{time}</p>
        </div>
    )
}
export default Message;