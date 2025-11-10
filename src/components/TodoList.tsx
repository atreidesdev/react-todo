import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

type TodoListProps = {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (todo: { id: string; text: string }) => void;
    onEdit: (todo: { id: string; text: string }) => void;
}

export const TodoList = ({todos, onToggle, onDelete, onEdit}: TodoListProps) => {
    if (todos.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <p className="text-gray-500 text-lg">
                    Задачи не найдены. Добавьте новую задачу, чтобы начать!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3 min-h-[200px]">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};
