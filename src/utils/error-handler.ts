/**
 * 请求错误处理工具
 */
import { message } from "antd";
import type { AxiosError } from "axios";

/**
 * 错误码映射
 */
export const ERROR_CODE_MAP: Record<number, string> = {
  400: "请求参数错误",
  401: "登录已过期，请重新登录",
  403: "没有权限访问该资源",
  404: "请求的资源不存在",
  405: "请求方法不允许",
  408: "请求超时",
  500: "服务器错误，请稍后重试",
  502: "网关错误",
  503: "服务不可用",
  504: "网关超时",
};

/**
 * 业务错误码映射（根据实际业务调整）
 */
export const BUSINESS_ERROR_CODE_MAP: Record<number, string> = {
  1001: "用户名或密码错误",
  1002: "用户已被禁用",
  1003: "验证码错误",
  1004: "验证码已过期",
  2001: "数据不存在",
  2002: "数据已存在",
  2003: "数据已被删除",
  3001: "文件上传失败",
  3002: "文件格式不支持",
  3003: "文件大小超出限制",
};

/**
 * 处理 HTTP 错误
 * @param error Axios 错误对象
 */
export function handleHttpError(error: AxiosError): void {
  const status = error.response?.status;

  if (!status) {
    message.error("网络错误，请检查网络连接");
    return;
  }

  const errorMessage = ERROR_CODE_MAP[status] || "请求失败";
  message.error(errorMessage);
}

/**
 * 处理业务错误
 * @param code 错误码
 * @param defaultMessage 默认错误信息
 */
export function handleBusinessError(
  code: number,
  defaultMessage?: string,
): void {
  const errorMessage =
    BUSINESS_ERROR_CODE_MAP[code] || defaultMessage || "操作失败";
  message.error(errorMessage);
}

/**
 * 处理网络错误
 */
export function handleNetworkError(): void {
  if (!window.navigator.onLine) {
    message.error("网络连接失败，请检查网络");
  } else {
    message.error("网络异常，请稍后重试");
  }
}

/**
 * 处理超时错误
 */
export function handleTimeoutError(): void {
  message.error("请求超时，请稍后重试");
}

/**
 * 统一错误处理
 * @param error 错误对象
 */
export function handleError(error: any): void {
  console.error("请求错误:", error);

  // Axios 错误
  if (error.isAxiosError) {
    const axiosError = error as AxiosError;

    // 请求超时
    if (
      axiosError.code === "ECONNABORTED" ||
      axiosError.message.includes("timeout")
    ) {
      handleTimeoutError();
      return;
    }

    // 网络错误
    if (!axiosError.response) {
      handleNetworkError();
      return;
    }

    // HTTP 错误
    handleHttpError(axiosError);
    return;
  }

  // 业务错误
  if (error.code) {
    handleBusinessError(error.code, error.message);
    return;
  }

  // 其他错误
  message.error(error.message || "操作失败");
}
