import React, { useEffect } from 'react';
import Button from '../buttons/Button';
const Modal = ({
    isOpen,
    onClose,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    image,
    title,
    paragraph,
    isSuccess
}: {
    isOpen: boolean;
    onClose: () => void;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    image: string;
    title: string;
    paragraph: string;
    isSuccess: boolean;
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (closeOnEscape && e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.classList.add('overflow-hidden');
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen, onClose, closeOnEscape]);
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
            onClose();
        }
    };
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div className={`absolute inset-0 bg-white/50 backdrop-filter backdrop-blur-sm`} />
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto transform transition-all duration-300">
                <div className='w-full flex flex-col gap-5 items-center justify-center p-6'>
                    <img src={image} alt="Modal status" />
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className='text-black/50 text-center'>{paragraph}</p>
                    <Button
                        title={isSuccess ? 'الرجوع لتسجيل الدخول' : 'اعادة تعيين'}
                        onPress={onClose}
                        isLoading={false}
                    />
                </div>
            </div>
        </div>
    );
};
export default Modal;