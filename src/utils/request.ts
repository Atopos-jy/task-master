import axios from "axios";
import { handleError, handleBusinessError } from "@/utils/error-handler";
import { ApiResponse } from "@/types/api";

const request = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (response) => {
    const res = response.data;
    // Unified business error handling
    if (res.code && res.code !== 200) {
      const code = res.code || 500;
      const msg = res.message || "Error";
      handleBusinessError(code, msg);
      return Promise.reject(new Error(msg));
    }
    return res;
  },
  (error) => {
    handleError(error);
    return Promise.reject(error);
  },
);

export const http = {
  get: <T>(url: string, params?: any, config?: any) =>
    request.get<any, ApiResponse<T>>(url, { params, ...config }),
  post: <T>(url: string, data?: any, config?: any) =>
    request.post<any, ApiResponse<T>>(url, data, config),
  put: <T>(url: string, data?: any, config?: any) =>
    request.put<any, ApiResponse<T>>(url, data, config),
  delete: <T>(url: string, params?: any, config?: any) =>
    request.delete<any, ApiResponse<T>>(url, { params, ...config }),
  patch: <T>(url: string, data?: any, config?: any) =>
    request.patch<any, ApiResponse<T>>(url, data, config),
};

export { request };
export default request;
