/**
 * Arena 模块统一导出
 * 鉴权使用现有的 idToken (Cookie) 机制
 */

// 请求层
export { arenaRequest, ArenaApiError, getAuthToken } from './http/request';
export type { ArenaRequestConfig } from './http/request';

// 服务层
export { arenaService, arenaApi } from './services/arena';
export type {
  ApiKey,
  ChatCompletionMessage,
  ChatCompletionRequest,
  ChatCompletionResponse,
  StreamChatCompletionResponse,
  Model,
} from './services/arena';
