import { http } from "@/utils/request";
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
  TaskFilterParams,
} from "@/types/task";
import { ApiResponse } from "@/types/api";

// Mock data store
let mockTasks: Task[] = [
  {
    id: "1",
    title: "Implement Login",
    status: "Done",
    priority: "High",
    dueDate: "2023-10-01",
    assignee: "Alice",
    tags: ["Frontend", "Auth"],
    createdAt: "2023-09-20",
  },
  {
    id: "2",
    title: "Design Dashboard",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2023-10-05",
    assignee: "Bob",
    tags: ["Design", "UI"],
    createdAt: "2023-09-22",
  },
  {
    id: "3",
    title: "API Integration",
    status: "To Do",
    priority: "High",
    dueDate: "2023-10-10",
    assignee: "Charlie",
    tags: ["Backend", "API"],
    createdAt: "2023-09-25",
  },
];

const USE_MOCK = true;

export const taskApi = {
  getTasks: async (params?: TaskFilterParams): Promise<ApiResponse<Task[]>> => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let tasks = [...mockTasks];
          if (params?.status) {
            tasks = tasks.filter((t) => t.status === params.status);
          }
          if (params?.priority) {
            tasks = tasks.filter((t) => t.priority === params.priority);
          }
          resolve({
            code: 200,
            data: tasks,
            message: "ok",
          } as ApiResponse<Task[]>);
        }, 500);
      });
    }
    return http.get<Task[]>("/tasks", params);
  },

  getTaskById: async (id: string): Promise<ApiResponse<Task>> => {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const task = mockTasks.find((t) => t.id === id);
          if (task) {
            resolve({
              code: 200,
              data: task,
              message: "ok",
            } as ApiResponse<Task>);
          } else {
            reject({ message: "Task not found" });
          }
        }, 300);
      });
    }
    return http.get<Task>(`/tasks/${id}`);
  },

  createTask: async (data: CreateTaskDto): Promise<ApiResponse<Task>> => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            status: data.status || "To Do",
            priority: data.priority || "Medium",
            dueDate: data.dueDate || new Date().toISOString(),
            createdAt: new Date().toISOString(),
          };
          mockTasks.push(newTask);
          resolve({
            code: 200,
            data: newTask,
            message: "ok",
          } as ApiResponse<Task>);
        }, 500);
      });
    }
    return http.post<Task>("/tasks", data);
  },

  updateTask: async (
    id: string,
    data: UpdateTaskDto,
  ): Promise<ApiResponse<Task>> => {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = mockTasks.findIndex((t) => t.id === id);
          if (index !== -1) {
            mockTasks[index] = { ...mockTasks[index], ...data };
            resolve({
              code: 200,
              data: mockTasks[index],
              message: "ok",
            } as ApiResponse<Task>);
          } else {
            reject({ message: "Task not found" });
          }
        }, 500);
      });
    }
    return http.put<Task>(`/tasks/${id}`, data);
  },

  deleteTask: async (id: string): Promise<ApiResponse<void>> => {
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = mockTasks.findIndex((t) => t.id === id);
          if (index !== -1) {
            mockTasks.splice(index, 1);
            resolve({
              code: 200,
              data: undefined as any,
              message: "ok",
            } as ApiResponse<void>);
          } else {
            reject({ message: "Task not found" });
          }
        }, 500);
      });
    }
    return http.delete<void>(`/tasks/${id}`);
  },
};
