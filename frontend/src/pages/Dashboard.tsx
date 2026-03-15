import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setTasks, setLoading } from '../redux/slices/taskSlice';
import { taskService } from '../services/taskService';
import TaskList from '../components/TaskList';
import TaskFilters from '../components/TaskFilters';
import CreateTaskModal from '../components/CreateTaskModal';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { items: tasks, filters, loading } = useSelector((state: RootState) => state.tasks);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const loadTasks = async () => {
    try {
      dispatch(setLoading(true));
      const tasksData = await taskService.getAllTasks(filters);
      dispatch(setTasks(tasksData));
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            New Task
          </button>
        </div>

        <TaskFilters onFiltersChange={() => loadTasks()} />
        <TaskList tasks={tasks} loading={loading} onTaskDeleted={() => loadTasks()} />
      </div>

      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
          onTaskCreated={() => {
            setShowCreateModal(false);
            loadTasks();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
