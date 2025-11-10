import { useState, useEffect } from 'react';
import type {Todo, FilterType} from '../types/todo';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const stored = localStorage.getItem('todos');
        return stored ? JSON.parse(stored) : [];
    });

    const [filter, setFilter] = useState<FilterType>('all');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Math.random().toString(36).substring(7),
            text,
            completed: false,
            createdAt: new Date(),
            completedAt: null,
        };
        setTodos(prev => [newTodo, ...prev]);
    };

    const toggleTodo = (id: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? {
                        ...todo,
                        completed: !todo.completed,
                        completedAt: !todo.completed ? new Date() : null
                    }
                    : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const updateTodo = (id: string, text: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, text } : todo
            )
        );
    };

    const filteredTodos = todos.filter(todo => {
        switch (filter) {
            case 'active': return !todo.completed;
            case 'completed': return todo.completed;
            default: return true;
        }
    });

    const activeCount = todos.filter(todo => !todo.completed).length;

    return {
        todos: filteredTodos,
        allTodos: todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        setFilter,
        filter,
        activeCount,
    };
};
