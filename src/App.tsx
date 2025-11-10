import { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { useModal } from './hooks/useModal';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { EditModal } from './components/EditModal';
import { ConfirmModal } from './components/ConfirmModal';
import type {FilterType} from './types/todo';

function App() {
    const {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        setFilter,
        filter,
        activeCount,
    } = useTodos();

    const { isOpen, editingTodo, openModal, closeModal } = useModal();
    const [todoToDelete, setTodoToDelete] = useState<{ id: string; text: string } | null>(null);

    const handleDeleteRequest = (todo: { id: string; text: string }) => {
        setTodoToDelete(todo);
    };

    const handleConfirmDelete = () => {
        if (todoToDelete) {
            deleteTodo(todoToDelete.id);
            setTodoToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setTodoToDelete(null);
    };

    const filters: { key: FilterType; label: string }[] = [
        { key: 'all', label: 'Все' },
        { key: 'active', label: 'Активные' },
        { key: 'completed', label: 'Выполненные' },
    ];

    const getTaskWord = (count: number): string => {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return 'задач';
        }

        if (lastDigit === 1) {
            return 'задача';
        }

        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'задачи';
        }

        return 'задач';
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Список задач
                    </h1>
                </header>

                <main className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 border border-white/20">
                    <TodoForm onAdd={addTodo} />

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-white/50 rounded-2xl">
                        <div className="text-sm font-semibold text-gray-700 px-3 py-1.5 bg-blue-100 rounded-full">
                            {activeCount} {getTaskWord(activeCount)} осталось
                        </div>

                        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                            {filters.map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        filter === key
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <TodoList
                        todos={todos}
                        onToggle={toggleTodo}
                        onDelete={handleDeleteRequest}
                        onEdit={openModal}
                    />
                </main>

                <EditModal
                    isOpen={isOpen}
                    todo={editingTodo}
                    onSave={updateTodo}
                    onClose={closeModal}
                />

                <ConfirmModal
                    isOpen={Boolean(todoToDelete)}
                    title="Удалить задачу"
                    message={todoToDelete ? `Вы уверены, что хотите удалить задачу «${todoToDelete.text}»?` : ''}
                    confirmLabel="Удалить"
                    cancelLabel="Отмена"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            </div>
        </div>
    );
}

export default App;
