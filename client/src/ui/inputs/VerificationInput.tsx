import type { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
const VerificationInput = ({
    id,
    value,
    index,
    onChange,
    setCode
}: {
    id: string;
    value: string;
    index: number;
    onChange: (value: string) => void;
    setCode: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (/^\d?$/.test(inputValue)) {
            onChange(inputValue);
        }
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !value) {
            const prev = document.getElementById(`verification-input-${index - 1}`);
            if (prev) prev.focus();
        }
    };
    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!pastedData) return;
        setCode((prev) => {
            const updated = [...prev];
            let pos = index;
            pastedData.split("").forEach((digit) => {
                if (pos < updated.length) {
                    updated[pos] = digit;
                    pos++;
                }
            });
            const next = document.getElementById(`verification-input-${pos}`);
            if (next) next.focus();

            return updated;
        });
    };
    return (
        <input
            id={id}
            dir="ltr"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-14 h-14 flex py-2 px-2 items-center justify-center text-center rounded-xl border-[0.5px] border-gray-300 focus:border-blue-primary"
            maxLength={1}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
        />
    );
};
export default VerificationInput;