/**
 * Arena 服务层
 * chat-battle 页面所需的 API 接口
 * 
 * 鉴权机制：直接使用现有 idToken (Cookie) 进行鉴权
 */
import { ArenaApiError } from '../http/request';
import { getCookie } from '@/src/utils';

// ============ 类型定义 ============

export interface ApiKey {
  id: string;
  key: string;
  name?: string;
  created_at?: string;
  last_used_at?: string;
  status?: 'active' | 'inactive';
}

export interface ChatCompletionMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatCompletionMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface VoteRequest {
  upModel: string[];
  downModel: string[];
}

export interface VoteRankItem {
  model: string;
  companyName: string;
  vote: number;
  score: number;
}

export interface VoteRankResponse {
  code: number;
  data: VoteRankItem[];
  message?: string;
}

export interface ChatCompletionChoice {
  index: number;
  message: ChatCompletionMessage;
  finish_reason: string;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface StreamChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface Model {
  id: string;
  name: string;
  provider?: string;
  model_name?: string; // 兼容 v1 格式
}

// ============ API 端点 ============

// v1 现有服务端点（使用 idToken 鉴权）
const V1_ENDPOINTS = {
  KEY_LIST: '/service/keyList',           // 获取用户 API keys
  MODEL_LIST: '/service/chatCode/modelList', // 获取模型列表
} as const;

// Arena 端点（使用 API key 鉴权）
const API_ENDPOINTS = {
  CHAT_COMPLETIONS: '/chat/completions',
  PUBLIC_MODELS: '/public/models',
  LEADERBOARD: '/arena/leaderboard',
  PUBLIC_LEADERBOARD: '/public/leaderboard',
} as const;

// ============ Arena 服务类 ============

// V1 API Base URL（现有服务）
const V1_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.agicto.cn';

// Arena API Base URL（独立调试）
const ARENA_API_BASE = process.env.NEXT_PUBLIC_CHAT_BATTLE_API_BASE || 'http://localhost:6066/v1';

class ArenaService {
  private static instance: ArenaService;
  private cachedApiKey: string | null = null;
  private cachedModels: Model[] | null = null;

  public static getInstance(): ArenaService {
    if (!ArenaService.instance) {
      ArenaService.instance = new ArenaService();
    }
    return ArenaService.instance;
  }

  /**
   * 获取 idToken（使用现有鉴权）
   */
  private getIdToken(): string | null {
    return getCookie('idToken');
  }

  /**
   * 获取用户 API Key 列表（通过 v1 服务）
   * v1 API 返回格式: { code: 0, data: { recordList: [...] } }
   */
  async getKeyList(): Promise<ApiKey[]> {
    const idToken = this.getIdToken();
    if (!idToken) {
      throw new ArenaApiError('未登录，请先登录获取 API Key', 'NOT_AUTHENTICATED');
    }

    const response = await fetch(`${V1_BASE_URL}/v1${V1_ENDPOINTS.KEY_LIST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new ArenaApiError('获取 Key 列表失败', response.status);
    }

    const res = await response.json();
    console.log('getKeyList response:', res);
    
    // v1 API 返回格式: { code: 0, data: { recordList: [...] } }
    // 字段: id, name, openKey, status(1=启用,2=禁用), createTime
    if (res?.code === 0 && res?.data?.recordList) {
      return res.data.recordList
        .filter((item: any) => item.status === 1) // 只返回启用的 key
        .map((item: any) => ({
          id: item.id,
          key: item.openKey, // 注意: v1 使用 openKey 字段
          name: item.name,
          created_at: item.createTime,
          status: item.status === 1 ? 'active' : 'inactive',
        }));
    }
    
    // 兼容其他格式
    if (Array.isArray(res?.data)) {
      return res.data;
    }
    if (Array.isArray(res)) {
      return res;
    }
    
    return [];
  }

  /**
   * 获取当前可用的 API Key（优先使用缓存）
   */
  async getApiKey(): Promise<string> {
    // 如果已缓存，直接返回
    if (this.cachedApiKey) {
      console.log('Using cached API key');
      return this.cachedApiKey;
    }

    // 调试模式：检查 localStorage 是否有手动设置的 key
    if (typeof window !== 'undefined') {
      const debugKey = localStorage.getItem('arena_api_key');
      if (debugKey) {
        console.log('Using debug API key from localStorage');
        this.cachedApiKey = debugKey;
        return debugKey;
      }
    }

    // 从 v1 服务获取 key 列表
    const keys = await this.getKeyList();
    console.log('Fetched keys:', keys);
    
    // 获取第一个可用的 key（已在 getKeyList 中过滤了禁用的）
    const activeKey = keys[0];
    
    if (!activeKey || !activeKey.key) {
      throw new ArenaApiError('没有可用的 API Key，请先创建', 'NO_API_KEY');
    }

    console.log('Using API key:', activeKey.key.substring(0, 10) + '...');
    this.cachedApiKey = activeKey.key;
    return activeKey.key;
  }

  /**
   * 清除缓存的 API Key
   */
  clearApiKeyCache(): void {
    this.cachedApiKey = null;
  }

  /**
   * 获取模型列表（通过 v1 服务）
   * v1 API 返回格式: { code: 0, data: { recordList: [...] } } 或 { code: 0, data: [...] }
   */
  async fetchModels(): Promise<Model[]> {
    const idToken = this.getIdToken();
    
    try {
      const response = await fetch(`${V1_BASE_URL}/v1${V1_ENDPOINTS.MODEL_LIST}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({ typeId: 1 }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }

      const res = await response.json();
      
      // v1 API 返回格式解析
      let rawModels: any[] = [];
      
      if (res?.code === 0) {
        // 格式1: { code: 0, data: { recordList: [...] } }
        if (res?.data?.recordList) {
          rawModels = res.data.recordList;
        }
        // 格式2: { code: 0, data: { modelList: [...] } }
        else if (res?.data?.modelList) {
          rawModels = res.data.modelList;
        }
        // 格式3: { code: 0, data: [...] }
        else if (Array.isArray(res?.data)) {
          rawModels = res.data;
        }
      } else if (Array.isArray(res)) {
        rawModels = res;
      }
      
      if (rawModels.length === 0) {
        console.warn('No models returned from API, using defaults');
        return this.getDefaultModels();
      }
      
      // 标准化模型格式
      return rawModels.map((m: any) => ({
        id: m.id || m.modelId || m.model_name || m.modelName || m.name,
        name: m.name || m.modelName || m.model_name || m.id || m.modelId,
        provider: m.provider || m.companyName || this.inferProvider(m.id || m.modelId || m.model_name),
      }));
    } catch (error) {
      console.warn('Failed to fetch models from API, using defaults:', error);
      return this.getDefaultModels();
    }
  }

  /**
   * 获取可用模型列表（带缓存）
   */
  async getModels(): Promise<Model[]> {
    if (this.cachedModels) {
      return this.cachedModels;
    }

    this.cachedModels = await this.fetchModels();
    return this.cachedModels;
  }

  /**
   * 刷新模型列表缓存
   */
  async refreshModels(): Promise<Model[]> {
    this.cachedModels = null;
    return this.getModels();
  }

  /**
   * 推断模型提供商
   */
  private inferProvider(modelId: string): string {
    if (!modelId) return 'Unknown';
    const id = modelId.toLowerCase();
    if (id.includes('gpt') || id.includes('openai')) return 'OpenAI';
    if (id.includes('claude')) return 'Anthropic';
    if (id.includes('tencent') || id.includes('hunyuan')) return 'Tencent';
    if (id.includes('ernie') || id.includes('wenxin')) return 'Baidu';
    if (id.includes('baichuan')) return 'Baichuan';
    if (id.includes('moonshot') || id.includes('kimi')) return 'Moonshot';
    if (id.includes('doubao') || id.includes('skylark')) return 'ByteDance';
    if (id.includes('qwen') || id.includes('tongyi')) return 'Alibaba';
    if (id.includes('glm') || id.includes('zhipu')) return 'Zhipu';
    return 'Other';
  }

  /**
   * 非流式聊天完成（使用 API Key）
   */
  async chatCompletion(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    const apiKey = await this.getApiKey();
    
    const response = await fetch(`${ARENA_API_BASE}${API_ENDPOINTS.CHAT_COMPLETIONS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ ...request, stream: false }),
    });

    if (!response.ok) {
      throw new ArenaApiError(`Chat completion failed: ${response.status}`, response.status);
    }

    return response.json();
  }

  /**
   * 流式聊天完成（SSE，使用 API Key）
   */
  async chatCompletionStream(request: ChatCompletionRequest): Promise<ReadableStream<Uint8Array>> {
    const apiKey = await this.getApiKey();

    const response = await fetch(`${ARENA_API_BASE}${API_ENDPOINTS.CHAT_COMPLETIONS}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ ...request, stream: true }),
    });

    if (!response.ok) {
      throw new ArenaApiError(`Stream request failed: ${response.status}`, response.status);
    }

    if (!response.body) {
      throw new ArenaApiError('Response body is null', 'NO_BODY');
    }

    return response.body;
  }

  /**
   * 默认模型列表（接口不可用时使用）
   */
  getDefaultModels(): Model[] {
    return [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI' },
      { id: 'tencent-ChatStd', name: 'Tencent ChatStd', provider: 'Tencent' },
      { id: 'tencent-ChatPro', name: 'Tencent ChatPro', provider: 'Tencent' },
      { id: 'ERNIE-4.0-Turbo-8K', name: 'ERNIE 4.0 Turbo', provider: 'Baidu' },
      { id: 'Baichuan2-53B', name: 'Baichuan2 53B', provider: 'Baichuan' },
      { id: 'Baichuan3-Turbo-128k', name: 'Baichuan3 Turbo', provider: 'Baichuan' },
      { id: 'moonshot-v1-128k', name: 'Moonshot v1 128k', provider: 'Moonshot' },
      { id: 'moonshot-v1-32k', name: 'Moonshot v1 32k', provider: 'Moonshot' },
      { id: 'moonshot-v1-8k', name: 'Moonshot v1 8k', provider: 'Moonshot' },
      { id: 'Doubao-pro-128k', name: 'Doubao Pro 128k', provider: 'ByteDance' },
      { id: 'Doubao-pro-32k', name: 'Doubao Pro 32k', provider: 'ByteDance' },
    ];
  }

  /**
   * 获取随机两个模型（匿名对战用）
   */
  async getRandomModelPair(): Promise<[Model, Model]> {
    const models = await this.getModels();
    if (models.length < 2) {
      const defaults = this.getDefaultModels();
      return [defaults[0], defaults[1]];
    }
    const shuffled = [...models].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
  }

  /**
   * 投票（仅匿名对战模式使用）
   * @param upModel - 点赞的模型名称数组
   * @param downModel - 点踩的模型名称数组
   */
  async vote(request: VoteRequest): Promise<void> {
    const idToken = this.getIdToken();
    if (!idToken) {
      throw new ArenaApiError('未登录', 401);
    }

    const response = await fetch(`${V1_BASE_URL}/v1/inner/model/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new ArenaApiError(error.error?.message || 'Failed to vote', response.status);
    }
  }

  /**
   * 获取投票排行榜
   */
  async getVoteRank(): Promise<VoteRankItem[]> {
    const idToken = this.getIdToken();
    
    const response = await fetch(`${V1_BASE_URL}/v1/inner/model/voteRank`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {}),
      },
    });

    if (!response.ok) {
      throw new ArenaApiError('获取排行榜失败', response.status);
    }

    const res = await response.json();
    
    if (res?.code === 0 && Array.isArray(res?.data)) {
      return res.data;
    }
    
    return [];
  }
}

// 单例导出
export const arenaService = ArenaService.getInstance();

// 便捷 API 导出
export const arenaApi = {
  // Key 管理
  getKeyList: () => arenaService.getKeyList(),
  getApiKey: () => arenaService.getApiKey(),
  clearApiKeyCache: () => arenaService.clearApiKeyCache(),
  
  // 模型
  getModels: () => arenaService.getModels(),
  refreshModels: () => arenaService.refreshModels(),
  getDefaultModels: () => arenaService.getDefaultModels(),
  getRandomModelPair: () => arenaService.getRandomModelPair(),
  
  // 对话
  chatCompletion: (request: ChatCompletionRequest) => arenaService.chatCompletion(request),
  chatCompletionStream: (request: ChatCompletionRequest) => arenaService.chatCompletionStream(request),
  
  // 投票（仅匿名对战）
  vote: (request: VoteRequest) => arenaService.vote(request),
  
  // 排行榜
  getVoteRank: () => arenaService.getVoteRank(),
};

export { ArenaApiError };
export default arenaService;
