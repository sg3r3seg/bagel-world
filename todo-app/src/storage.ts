import type { Todo } from './types';

const STORAGE_KEY = 'bagel_todos';
const VERSION = '1';

interface StorageData {
  version: string;
  todos: Todo[];
}

export const storage = {
  load(): Todo[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const parsed: StorageData = JSON.parse(data);
      if (parsed.version !== VERSION) return [];
      
      return Array.isArray(parsed.todos) ? parsed.todos : [];
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return [];
    }
  },

  save(todos: Todo[]): void {
    try {
      const data: StorageData = {
        version: VERSION,
        todos,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  export(): string {
    const todos = this.load();
    return JSON.stringify(todos, null, 2);
  },

  import(jsonString: string): boolean {
    try {
      const todos = JSON.parse(jsonString);
      if (!Array.isArray(todos)) return false;
      this.save(todos);
      return true;
    } catch (error) {
      console.error('Error importing todos:', error);
      return false;
    }
  },
};
