import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SettingsPanelProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    highPriority: number;
  };
  onClearCompleted: () => void;
  onToggleAll: (completed: boolean) => void;
  onClose: () => void;
}

function SettingsPanel({ stats, onClearCompleted, onToggleAll, onClose }: SettingsPanelProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearCompleted = () => {
    if (window.confirm('Are you sure you want to delete all completed todos?')) {
      onClearCompleted();
      setShowConfirm(false);
    }
  };

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h3>Settings & Actions</h3>
        <button type="button" className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="settings-content">
        <section className="settings-section">
          <h4>Bulk Actions</h4>
          <div className="settings-buttons">
            <button
              type="button"
              className="button secondary"
              onClick={() => onToggleAll(true)}
              disabled={stats.active === 0}
            >
              Mark All as Done
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => onToggleAll(false)}
              disabled={stats.completed === 0}
            >
              Mark All as Active
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h4>Danger Zone</h4>
          <button
            type="button"
            className="button danger"
            onClick={handleClearCompleted}
            disabled={stats.completed === 0}
          >
            Clear Completed Todos ({stats.completed})
          </button>
        </section>
      </div>
    </div>
  );
}

export default SettingsPanel;
