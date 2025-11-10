import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type EditModalProps = {
    isOpen: boolean;
    todo: { id: string; text: string } | null;
    onSave: (id: string, text: string) => void;
    onClose: () => void;
}

export const EditModal = ({ isOpen, todo, onSave, onClose }: EditModalProps) => {
    const [text, setText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && todo) {
            setText(todo.text);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, todo]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (todo && text.trim()) {
            onSave(todo.id, text.trim());
            onClose();
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-md transform transition-all"
                role="dialog"
                aria-labelledby="modal-title"
                aria-modal="true"
            >
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 id="modal-title" className="text-2xl font-bold text-gray-900 mb-6">
                        Редактировать задачу
                    </h2>
                    <input
                        ref={inputRef}
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                        placeholder="Редактируйте вашу задачу..."
                        aria-label="Редактировать задачу"
                    />
                    <div className="flex justify-end space-x-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={!text.trim()}
                            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Сохранить изменения
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};
