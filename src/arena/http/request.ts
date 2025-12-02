/**
 * Arena 独立请求层
 * 使用独立的 API base，不影响现有 utils/request.js
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 独立环境变量，与现有 BASE_URL 隔离
const API_BASE_URL = process.env.NEXT_PUBLIC_CHAT_BATTLE_API_BASE || 'http://localhost:6066/v1';
const API_TIMEOUT = 30000;

// 请求配置扩展
export interface ArenaRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

// API 错误类
export class ArenaApiError extends Error {
  code: number | string;
  data?: unknown;
  status?: number;

  constructor(message: string, code: number | string, data?: unknown, status?: number) {
    super(message);
    this.name = 'ArenaApiError';
    this.code = code;
    this.data = data;
    this.status = status;
  }
}

// 获取 token（从 Cookie idToken 读取，兼容 v1 现有体系）
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  // 优先读取 Cookie idToken（v1 体系）
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'idToken') {
      return value;
    }
  }
  
  // 兼容 localStorage（调试用）
  return localStorage.getItem('arena_token');
};

// 创建独立 axios 实例
function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig & ArenaRequestConfig) => {
      if (!config.skipAuth) {
        const token = getAuthToken();
        if (token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: unknown) => Promise.reject(error)
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      const { data } = response;

      // 格式1: { success: true, data: ... }
      if (data && typeof data === 'object' && 'success' in data) {
        if (data.success && data.data !== undefined) {
          return data.data;
        }
        if (!data.success) {
          throw new ArenaApiError(
            data.message || data.error || 'Request failed',
            'API_ERROR',
            data,
            response.status
          );
        }
      }

      // 格式2: 直接返回数据
      if (data && typeof data === 'object' && !('success' in data) && !('code' in data)) {
        return data;
      }

      // 格式3: { result: 'success', ... }
      if (data && data.result === 'success') {
        return data;
      }

      // 格式4: { code: xxx, message: ... }
      if (data && data.code && data.code !== 200 && data.code !== 0) {
        throw new ArenaApiError(data.message || 'Request failed', data.code, data, response.status);
      }

      return data;
    },
    (error: any) => {
      if (!error.response) {
        return Promise.reject(new ArenaApiError('网络错误，请检查连接', 'NETWORK_ERROR'));
      }

      const { status, data } = error.response;
      let message = '请求失败';
      let code: string | number = status;

      if (data && typeof data === 'object') {
        message = data.message || data.error || message;
        code = data.code || code;
      }

      return Promise.reject(new ArenaApiError(message, code, data, status));
    }
  );

  return instance;
}

const axiosInstance = createAxiosInstance();

// SSE 流式请求（使用 fetch）
async function streamRequest<T = unknown>(
  url: string,
  data?: unknown,
  config?: ArenaRequestConfig
): Promise<ReadableStream<T>> {
  const token = getAuthToken();
  const fullUrl = `${API_BASE_URL}${url}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'text/event-stream',
  };

  if (token && !config?.skipAuth) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(data ? { ...data, stream: true } : { stream: true }),
  });

  if (!response.ok) {
    throw new ArenaApiError(`HTTP error! status: ${response.status}`, response.status);
  }

  if (!response.body) {
    throw new ArenaApiError('Response body is null', 'NO_BODY');
  }

  return response.body as ReadableStream<T>;
}

// 导出请求方法
export const arenaRequest = {
  get: <T = unknown>(url: string, config?: ArenaRequestConfig): Promise<T> => {
    return axiosInstance.get<unknown, T>(url, config);
  },

  post: <T = unknown>(url: string, data?: unknown, config?: ArenaRequestConfig): Promise<T> => {
    return axiosInstance.post<unknown, T>(url, data, config);
  },

  put: <T = unknown>(url: string, data?: unknown, config?: ArenaRequestConfig): Promise<T> => {
    return axiosInstance.put<unknown, T>(url, data, config);
  },

  delete: <T = unknown>(url: string, config?: ArenaRequestConfig): Promise<T> => {
    return axiosInstance.delete<unknown, T>(url, config);
  },

  patch: <T = unknown>(url: string, data?: unknown, config?: ArenaRequestConfig): Promise<T> => {
    return axiosInstance.patch<unknown, T>(url, data, config);
  },

  stream: streamRequest,
};

export { getAuthToken };
export default arenaRequest;
