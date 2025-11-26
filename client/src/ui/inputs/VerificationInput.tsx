import type { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
const VerificationInput = ({ id, value, onChange, hasError }: {
    id: string;
    value: string;
    onChange: (value: string) => void;
    hasError: boolean;
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (/^\d?$/.test(inputValue)) {
            onChange(inputValue);
        }
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !value && e.currentTarget.previousElementSibling instanceof HTMLInputElement) {
            e.currentTarget.previousElementSibling.focus();
        }
    };
    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const numbers = pastedData.replace(/\D/g, '');
        if (numbers.length === 5) {
            const inputs = document.querySelectorAll<HTMLInputElement>('[id^="verification-input-"]');
            numbers.split('').forEach((num, index) => {
                if (inputs[index] && /^\d$/.test(num)) {
                    inputs[index].value = num;
                    const event = new Event('input', { bubbles: true });
                    inputs[index].dispatchEvent(event);
                }
            });
            if (inputs[4]) inputs[4].focus();
        }
    };
    return (
        <input
            id={id}
            dir="ltr"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={`w-14 h-14 flex py-2 px-2 items-center justify-center text-center rounded-xl border-[0.5px] ${hasError
                ? 'border-red-600 text-red-600 focus:border-red-600'
                : 'border-gray-300 focus:border-blue-primary'
                }`}
            maxLength={1}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
        />
    );
};
export default VerificationInput;