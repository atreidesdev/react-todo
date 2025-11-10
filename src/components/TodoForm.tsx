import React, { useState } from 'react';

type TodoFormProps = {
    onAdd: (text: string) => void;
}

export const TodoForm = ({ onAdd }: TodoFormProps) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Введите новую задачу..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    aria-label="Новая задача"
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors whitespace-nowrap"
                >
                    Добавить задачу
                </button>
            </div>
        </form>
    );
};
