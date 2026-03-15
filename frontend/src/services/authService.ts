import apiClient from './api';
import { AuthTokens, User } from '../types/auth';

export const authService = {
  register: async (data: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{ user: User; tokens: AuthTokens }> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data.data;
  },

  login: async (email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
    const response = await apiClient.post('/auth/refresh-token', { refreshToken });
    return response.data.data.tokens;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get('/users/profile');
    return response.data.data;
  },

  updateProfile: async (data: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  }): Promise<User> => {
    const response = await apiClient.put('/users/profile', data);
    return response.data.data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await apiClient.post('/users/change-password', { currentPassword, newPassword });
  },
};
