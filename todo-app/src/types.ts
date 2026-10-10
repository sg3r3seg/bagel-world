export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
  createdAt: number;
  completedAt?: number;
}

export type SortBy = 'date-created' | 'due-date' | 'priority' | 'alphabetical';
export type FilterBy = 'all' | 'active' | 'completed' | 'high' | 'medium' | 'low';
