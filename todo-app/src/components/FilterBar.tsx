import React from 'react';
import type { FilterBy, SortBy } from '../types';

interface FilterBarProps {
  currentFilter: FilterBy;
  currentSort: SortBy;
  onFilterChange: (filter: FilterBy) => void;
  onSortChange: (sort: SortBy) => void;
}

function FilterBar({ currentFilter, currentSort, onFilterChange, onSortChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="filter-select">Filter:</label>
        <select id="filter-select" value={currentFilter} onChange={(e) => onFilterChange(e.target.value as FilterBy)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <optgroup label="By Priority">
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </optgroup>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={currentSort} onChange={(e) => onSortChange(e.target.value as SortBy)}>
          <option value="date-created">Date Created (Newest)</option>
          <option value="due-date">Due Date</option>
          <option value="priority">Priority (Highest)</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
