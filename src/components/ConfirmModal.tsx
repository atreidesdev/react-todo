import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ConfirmModalProps = {
    isOpen: boolean;
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal = ({
    isOpen,
    title = 'Подтверждение',
    message,
    confirmLabel = 'Удалить',
    cancelLabel = 'Отмена',
    onConfirm,
    onCancel
}: ConfirmModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return createPortal(
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
                <p className="text-sm text-gray-600 mb-6 whitespace-pre-line">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};


