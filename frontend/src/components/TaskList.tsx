import React from 'react';
import { Task } from '../types/task';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onTaskDeleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, loading, onTaskDeleted }) => {
  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center py-8 text-gray-600">No tasks found</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onDeleted={onTaskDeleted} />
      ))}
    </div>
  );
};

export default TaskList;
