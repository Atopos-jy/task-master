import { http } from "@/utils/request";
import { ApiResponse } from "@/types/api";

export interface DashboardStats {
  todo: number;
  inProgress: number;
  done: number;
  efficiency: number;
}

export interface TrendData {
  date: string;
  new: number;
  completed: number;
}

export interface PriorityData {
  name: string;
  value: number;
}

const USE_MOCK = true;

export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 200,
            data: {
              todo: 12,
              inProgress: 5,
              done: 28,
              efficiency: 92,
            },
            message: "ok",
          } as ApiResponse<DashboardStats>);
        }, 300);
      });
    }
    return http.get<DashboardStats>("/dashboard/stats");
  },

  getTrend: async (): Promise<ApiResponse<TrendData[]>> => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 200,
            data: [
              { date: "Mon", new: 120, completed: 220 },
              { date: "Tue", new: 132, completed: 182 },
              { date: "Wed", new: 101, completed: 191 },
              { date: "Thu", new: 134, completed: 234 },
              { date: "Fri", new: 90, completed: 290 },
              { date: "Sat", new: 230, completed: 330 },
              { date: "Sun", new: 210, completed: 310 },
            ],
            message: "ok",
          } as ApiResponse<TrendData[]>);
        }, 300);
      });
    }
    return http.get<TrendData[]>("/dashboard/trend");
  },

  getPriorityDistribution: async (): Promise<ApiResponse<PriorityData[]>> => {
    if (USE_MOCK) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 200,
            data: [
              { value: 1048, name: "High" },
              { value: 735, name: "Medium" },
              { value: 580, name: "Low" },
            ],
            message: "ok",
          } as ApiResponse<PriorityData[]>);
        }, 300);
      });
    }
    return http.get<PriorityData[]>("/dashboard/priority");
  },
};
