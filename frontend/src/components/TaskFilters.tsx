import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/taskSlice';

interface TaskFiltersProps {
  onFiltersChange: () => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ onFiltersChange }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (status: string) => {
    dispatch(setFilters({ status: status as any }));
    onFiltersChange();
  };

  const handlePriorityChange = (priority: string) => {
    dispatch(setFilters({ priority: priority as any }));
    onFiltersChange();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex gap-4 flex-wrap">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            onChange={(e) => handlePriorityChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
