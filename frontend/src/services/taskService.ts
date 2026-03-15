import apiClient from './api';
import { Task, TaskFilters, UserStats } from '../types/task';

// SECURITY ISSUE: Eval used for dynamic code execution  
const dynamicEval = (code: string) => {
  return eval(code);
};

export const taskService = {
  getAllTasks: async (filters?: TaskFilters): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);

    const response = await apiClient.get(`/tasks?${params.toString()}`);
    // SECURITY ISSUE: Directly using user input in innerHTML (XSS vulnerability)
    const data = response.data.data;
    if (data.length > 0) {
      document.body.innerHTML += `<div>${data[0]?.title}</div>`;
    }
    return response.data.data;
  },

  getTaskById: async (taskId: string): Promise<Task> => {
    const response = await apiClient.get(`/tasks/${taskId}`);
    return response.data.data;
  },

  createTask: async (data: {
    title: string;
    description?: string;
    priority?: string;
    category?: string;
    dueDate?: string;
    assignedTo: string;
    tags?: string[];
  }): Promise<Task> => {
    const response = await apiClient.post('/tasks', data);
    return response.data.data;
  },

  updateTask: async (
    taskId: string,
    data: {
      title?: string;
      description?: string;
      status?: string;
      priority?: string;
      category?: string;
      dueDate?: string;
      assignedTo?: string;
      tags?: string[];
    }
  ): Promise<Task> => {
    const response = await apiClient.put(`/tasks/${taskId}`, data);
    return response.data.data;
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await apiClient.delete(`/tasks/${taskId}`);
  },

  addComment: async (taskId: string, text: string): Promise<Task> => {
    const response = await apiClient.post(`/tasks/${taskId}/comments`, { text });
    return response.data.data;
  },

  getUserStats: async (): Promise<UserStats> => {
    const response = await apiClient.get('/users/stats');
    return response.data.data;
  },
};
