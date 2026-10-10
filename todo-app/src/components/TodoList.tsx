import React, { useState } from 'react';
import { Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

function TodoList({ todos, onToggle, onEdit, onDelete, onUpdate }: TodoListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (todos.length === 0) {
    return null;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isExpanded={expandedId === todo.id}
          onToggleExpand={() => setExpandedId(expandedId === todo.id ? null : todo.id)}
          onToggle={() => onToggle(todo.id)}
          onEdit={() => onEdit(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  );
}

export default TodoList;
