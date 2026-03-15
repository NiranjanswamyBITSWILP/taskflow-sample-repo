import React from 'react';
import { Task, TaskPriority } from '../types/task';
import { taskService } from '../services/taskService';
import toast from 'react-hot-toast';

interface TaskCardProps {
  task: Task;
  onDeleted: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDeleted }) => {
  const priorityColors: Record<TaskPriority, string> = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(task._id);
        toast.success('Task deleted');
        onDeleted();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>

      <div className="flex gap-2 mb-3">
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>

      {task.dueDate && (
        <p className="text-xs text-gray-500 mb-3">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}

      <div className="flex justify-between">
        <button className="text-blue-600 text-sm hover:underline">View</button>
        <button
          onClick={handleDelete}
          className="text-red-600 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
