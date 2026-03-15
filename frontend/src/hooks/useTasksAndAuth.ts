import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useCallback } from 'react';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';

export const useTasks = () => {
  const { items, currentTask, loading, error, filters } = useSelector(
    (state: RootState) => state.tasks
  );

  const fetchTasks = useCallback(async () => {
    try {
      const tasks = await taskService.getAllTasks(filters);
      return tasks;
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  }, [filters]);

  const createTask = useCallback(async (data: any) => {
    try {
      const task = await taskService.createTask(data);
      return task;
    } catch (err) {
      console.error('Failed to create task:', err);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (taskId: string, data: any) => {
    try {
      const task = await taskService.updateTask(taskId, data);
      return task;
    } catch (err) {
      console.error('Failed to update task:', err);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
    } catch (err) {
      console.error('Failed to delete task:', err);
      throw err;
    }
  }, []);

  return {
    tasks: items,
    currentTask,
    loading,
    error,
    filters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};

export const useAuth = () => {
  const { user, tokens, loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    user,
    tokens,
    loading,
    error,
    isAuthenticated,
  };
};
