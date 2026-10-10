import React from 'react';
import { Trash2, Edit2, ChevronDown, ChevronUp, Calendar, Tag } from 'lucide-react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function TodoItem({ todo, isExpanded, onToggleExpand, onToggle, onEdit, onDelete }: TodoItemProps) {
  const priorityClass = `priority-${todo.priority}`;
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${priorityClass}`}>
      <div className="todo-main">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="todo-checkbox"
          aria-label="Toggle todo completion"
        />
        <div className="todo-content" onClick={onToggleExpand} style={{ cursor: 'pointer', flex: 1 }}>
          <h3 className="todo-title">{todo.title}</h3>
          <div className="todo-meta">
            {todo.priority && <span className={`badge priority ${todo.priority}`}>{todo.priority}</span>}
            {todo.category && <span className="badge category">{todo.category}</span>}
            {todo.dueDate && (
              <span className={`badge due-date ${isOverdue ? 'overdue' : ''}`}>
                <Calendar size={14} /> {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          className="expand-button"
          onClick={onToggleExpand}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="todo-expanded">
          {todo.description && <p className="todo-description">{todo.description}</p>}
          {todo.completedAt && (
            <p className="todo-completed-at">
              Completed on {new Date(todo.completedAt).toLocaleDateString()}
            </p>
          )}
          <div className="todo-actions">
            <button type="button" className="action-button edit" onClick={onEdit} title="Edit todo">
              <Edit2 size={16} /> Edit
            </button>
            <button type="button" className="action-button delete" onClick={onDelete} title="Delete todo">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
