import axios from 'axios';
import { Task, Template, User } from '../types';

const API_BASE_URL = 'http://localhost:3004';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 响应拦截器处理数据结构
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const taskService = {
  getAll: () => api.get<Task[]>('/tasks').then((res) => res.data),
  getById: (id: string) => api.get<Task>(`/tasks/${id}`).then((res) => res.data),
  create: (task: Omit<Task, 'id'>) => api.post<Task>('/tasks', task).then((res) => res.data),
  update: (id: string, task: Partial<Task>) => api.put<Task>(`/tasks/${id}`, task).then((res) => res.data),
  delete: (id: string) => api.delete(`/tasks/${id}`).then((res) => res.data),
};

export const templateService = {
  getAll: () => api.get<Template[]>('/templates').then((res) => res.data),
  create: (template: Omit<Template, 'id'>) => api.post<Template>('/templates', template).then((res) => res.data),
};

export const userService = {
  getAll: () => api.get<User[]>('/users').then((res) => res.data),
};

export default api;
