import React, { useEffect, useState } from 'react';
import { Plus, Settings, Download, Upload } from 'lucide-react';
import type { Todo, SortBy, FilterBy } from './types';
import { storage } from './storage';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import Statistics from './components/Statistics';
import SettingsPanel from './components/SettingsPanel';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterBy>('all');
  const [sortBy, setSortBy] = useState<SortBy>('date-created');
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    const loaded = storage.load();
    setTodos(loaded);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    storage.save(todos);
  }, [todos]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: `todo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    setShowForm(false);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              ...updates,
              completedAt: updates.completed ? Date.now() : undefined,
            }
          : todo,
      ),
    );
    setEditingId(null);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const toggleAll = (completed: boolean) => {
    setTodos((prev) => prev.map((todo) => ({ ...todo, completed })));
  };

  const exportTodos = () => {
    const json = storage.export();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importTodos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (storage.import(content)) {
        const loaded = storage.load();
        setTodos(loaded);
        alert('Todos imported successfully!');
      } else {
        alert('Failed to import todos. Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

  // Filter todos
  let filtered = todos;

  if (filter === 'active') {
    filtered = filtered.filter((t) => !t.completed);
  } else if (filter === 'completed') {
    filtered = filtered.filter((t) => t.completed);
  } else if (filter === 'high') {
    filtered = filtered.filter((t) => t.priority === 'high');
  } else if (filter === 'medium') {
    filtered = filtered.filter((t) => t.priority === 'medium');
  } else if (filter === 'low') {
    filtered = filtered.filter((t) => t.priority === 'low');
  }

  // Search todos
  if (searchQuery) {
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  // Sort todos
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'due-date':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'date-created':
      default:
        return b.createdAt - a.createdAt;
    }
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
    highPriority: todos.filter((t) => t.priority === 'high' && !t.completed).length,
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>✓ Todo List</h1>
            <p className="subtitle">Organize your tasks with local storage persistence</p>
          </div>
          <div className="header-actions">
            <button className="icon-button" onClick={() => setShowSettings(!showSettings)} title="Settings">
              <Settings size={20} />
            </button>
            <button className="icon-button" onClick={exportTodos} title="Export todos">
              <Download size={20} />
            </button>
            <label className="icon-button" title="Import todos">
              <Upload size={20} />
              <input type="file" accept=".json" onChange={importTodos} style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      </header>

      <main className="app-main">
        {showSettings && (
          <SettingsPanel
            stats={stats}
            onClearCompleted={clearCompleted}
            onToggleAll={toggleAll}
            onClose={() => setShowSettings(false)}
          />
        )}

        <Statistics stats={stats} />

        <div className="todo-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search todos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <FilterBar
            currentFilter={filter}
            currentSort={sortBy}
            onFilterChange={setFilter}
            onSortChange={setSortBy}
          />

          {showForm ? (
            <TodoForm
              onAdd={addTodo}
              onCancel={() => setShowForm(false)}
              editingTodo={editingId ? todos.find((t) => t.id === editingId) : undefined}
              onUpdate={editingId ? (updates) => updateTodo(editingId, updates) : undefined}
            />
          ) : (
            <button className="add-button" onClick={() => setShowForm(true)}>
              <Plus size={20} /> Add Todo
            </button>
          )}

          {sorted.length > 0 ? (
            <TodoList
              todos={sorted}
              onToggle={(id) => {
                const todo = todos.find((t) => t.id === id);
                if (todo) updateTodo(id, { completed: !todo.completed });
              }}
              onEdit={(id) => setEditingId(id)}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ) : (
            <div className="empty-state">
              <p>No todos yet. Create one to get started!</p>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Your todos are saved locally in your browser. No account required.</p>
      </footer>
    </div>
  );
}

export default App;
