export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  assignee: string;
  tags?: string[];
}

export interface User {
  id: string;
  name: string;
  role: "admin" | "user";
  avatar?: string;
}

export interface Template {
  id: string;
  name: string;
  usage: number;
  content: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
