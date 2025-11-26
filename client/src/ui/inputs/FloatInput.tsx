import { closeEye, openEye, warningIcon } from "../../constants/data";
import { useState } from "react";

const FloatInput = ({
    value,
    setValue,
    isPassword,
    label,
    error,
    type,
    headText
}: {
    value: string;
    setValue: (value: string) => void;
    isPassword: boolean;
    label: string;
    error?: string | null | undefined;
    type: "text" | "email" | "password" | "number" | "tel" | "url";
    headText: string;
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const shouldFloat = isFocused || value.length > 0;
    const eyeIcon = showPassword ? openEye : closeEye;
    const eyeAlt = showPassword ? "Hide password" : "Show password";

    const getInputType = (): string => {
        if (isPassword) {
            return showPassword ? "text" : "password";
        }
        return type;
    };

    const getLabelColor = (): string => {
        if (error) {
            return 'text-red-600';
        }
        if (isFocused) {
            return 'text-blue-500';
        }
        return 'text-gray-600';
    };

    return (
        <div className='w-full relative flex flex-col mb-4'>
            <div className="relative">
                <div className="flex flex-col gap-y-3">
                    <p className="text-sm font-medium text-gray-700">{headText}</p>
                    <div className="relative">
                        <input
                            value={value}
                            type={getInputType()}
                            className={`w-full px-3 pt-5 border-[0.5px] pb-2 rounded-xl bg-transparent outline-none transition-colors duration-200 
                                ${error ? 'border-red-600 text-red-600 placeholder-red-400'
                                    : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                                }`}
                            onChange={(e) => setValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder=""
                        />
                        <label
                            className={`absolute right-3 transition-all duration-200 pointer-events-none ${getLabelColor()} ${shouldFloat
                                ? 'top-2 text-xs -translate-y-1'
                                : 'top-1/2 text-sm -translate-y-1/2'
                                }`}
                        >
                            {label}
                        </label>
                        {isPassword && (
                            <button
                                type="button"
                                className="absolute left-3 top-1/2 -translate-y-1/2 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <img
                                    src={eyeIcon}
                                    alt={eyeAlt}
                                    className="w-5 h-5"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {error && (
                <div className="flex items-center mt-2">
                    <p className="text-red-600 text-sm">{error}</p>
                    <img src={warningIcon} className="w-4 h-4 mr-1" alt="Error" />
                </div>
            )}
        </div>
    );
}

export default FloatInput;