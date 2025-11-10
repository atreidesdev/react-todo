import type {Todo} from '../types/todo';

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (todo: { id: string; text: string }) => void;
    onEdit: (todo: { id: string; text: string }) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
    const formatDate = (date: Date) => {
        const d = new Date(date);
        const dateStr = d.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short'
        });
        const timeStr = d.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        return `${dateStr}, ${timeStr}`;
    };

    return (
        <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all group">
            <div className="flex-shrink-0 pt-1">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    id={`todo-${todo.id}`}
                    className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400 focus:ring-offset-2 cursor-pointer"
                    aria-label={todo.completed ? 'Отметить как невыполненное' : 'Отметить как выполненное'}
                />
            </div>

            <div className="flex-1 min-w-0 w-full">
                <div
                    onClick={() => onToggle(todo.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') onToggle(todo.id);
                    }}
                    className={`block text-lg leading-relaxed break-words whitespace-pre-wrap max-h-40 overflow-y-auto pr-2 outline-none cursor-pointer ${
                        todo.completed
                            ? 'line-through text-gray-500'
                            : 'text-gray-900'
                    }`}
                    aria-label="Переключить задачу"
                >
                    {todo.text}
                </div>

                <div className="flex items-center justify-between gap-4 mt-2">
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <span className="text-gray-400">📅</span>
                            Создано: {formatDate(todo.createdAt)}
                        </span>
                        {todo.completedAt && (
                            <span className="flex items-center gap-1">
                                <span className="text-gray-400">✅</span>
                                Выполнено: {formatDate(todo.completedAt)}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <button
                            onClick={() => onEdit({ id: todo.id, text: todo.text })}
                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                            aria-label="Редактировать задачу"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => onDelete({ id: todo.id, text: todo.text })}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
                            aria-label="Удалить задачу"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
