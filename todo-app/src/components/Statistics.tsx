import React from 'react';
import { CheckCircle2, AlertCircle, Zap, ListTodo } from 'lucide-react';

interface StatisticsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    highPriority: number;
  };
}

function Statistics({ stats }: StatisticsProps) {
  const completionPercent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="statistics">
      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(88, 166, 255, 0.1)' }}>
          <ListTodo size={24} color="#58a6ff" />
        </div>
        <div className="stat-content">
          <p className="stat-label">Total Todos</p>
          <p className="stat-value">{stats.total}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(3, 102, 214, 0.1)' }}>
          <CheckCircle2 size={24} color="#0366d6" />
        </div>
        <div className="stat-content">
          <p className="stat-label">Completed</p>
          <p className="stat-value">{stats.completed}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(248, 113, 113, 0.1)' }}>
          <AlertCircle size={24} color="#f87171" />
        </div>
        <div className="stat-content">
          <p className="stat-label">Active Tasks</p>
          <p className="stat-value">{stats.active}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(249, 115, 22, 0.1)' }}>
          <Zap size={24} color="#f97316" />
        </div>
        <div className="stat-content">
          <p className="stat-label">High Priority</p>
          <p className="stat-value">{stats.highPriority}</p>
        </div>
      </div>

      <div className="stat-card progress-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${completionPercent}%` }} />
        </div>
        <p className="progress-text">Completion: {completionPercent}%</p>
      </div>
    </div>
  );
}

export default Statistics;
