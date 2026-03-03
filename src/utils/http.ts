/**
 * HTTP 请求方法封装
 * 提供 GET、POST、PUT、DELETE 等常用方法
 */

import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { request } from '@/utils/request';

/**
 * 通用响应接口
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * HTTP 请求类
 */
class Http {
  /**
   * GET 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return request.get(url, { params, ...config });
  }

  /**
   * POST 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return request.post(url, data, config);
  }

  /**
   * PUT 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return request.put(url, data, config);
  }

  /**
   * DELETE 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  delete<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return request.delete(url, { params, ...config });
  }

  /**
   * PATCH 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return request.patch(url, data, config);
  }

  /**
   * 上传文件
   * @param url 请求地址
   * @param formData 表单数据
   * @param config 请求配置
   */
  upload<T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return request.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
  }

  /**
   * 下载文件
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  download(url: string, params?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return request.get(url, {
      params,
      responseType: 'blob',
      ...config,
    });
  }
}

/**
 * 导出 HTTP 实例
 */
export const http = new Http();

/**
 * 导出默认实例
 */
export default http;
