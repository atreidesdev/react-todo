import { useState } from 'react';

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<{ id: string; text: string } | null>(null);

    const openModal = (todo: { id: string; text: string }) => {
        setEditingTodo(todo);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setEditingTodo(null);
    };

    return {
        isOpen,
        editingTodo,
        openModal,
        closeModal,
    };
};
