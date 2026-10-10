import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Todo } from '../types';

interface TodoFormProps {
  onAdd: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  editingTodo?: Todo;
  onUpdate?: (updates: Partial<Todo>) => void;
}

function TodoForm({ onAdd, onCancel, editingTodo, onUpdate }: TodoFormProps) {
  const [title, setTitle] = useState(editingTodo?.title || '');
  const [description, setDescription] = useState(editingTodo?.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(editingTodo?.priority || 'medium');
  const [dueDate, setDueDate] = useState(editingTodo?.dueDate || '');
  const [category, setCategory] = useState(editingTodo?.category || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTodo && onUpdate) {
      onUpdate({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || undefined,
        category: category.trim() || undefined,
      });
    } else {
      onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || undefined,
        category: category.trim() || undefined,
        completed: false,
      });
    }

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setCategory('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>{editingTodo ? 'Edit Todo' : 'Create New Todo'}</h3>
        <button type="button" className="close-button" onClick={onCancel}>
          <X size={18} />
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          maxLength={100}
          autoFocus
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description (optional)"
          maxLength={500}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as any)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Work, Personal, etc."
          maxLength={50}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="button secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="button primary">
          {editingTodo ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
