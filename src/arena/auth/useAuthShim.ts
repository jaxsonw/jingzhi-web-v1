/**
 * Arena 鉴权适配层
 * 基于 v1 现有的 Cookie idToken 体系
 * 调试期间可通过 NEXT_PUBLIC_CHAT_BATTLE_REQUIRE_AUTH 开关控制
 */

// 是否强制要求登录（默认 false 便于调试）
const REQUIRE_AUTH = process.env.NEXT_PUBLIC_CHAT_BATTLE_REQUIRE_AUTH === 'true';

/**
 * 从 Cookie 获取 idToken
 */
export function getIdToken(): string | null {
  if (typeof window === 'undefined') return null;

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'idToken') {
      return value;
    }
  }
  return null;
}

/**
 * 检查是否已登录
 */
export function isAuthenticated(): boolean {
  // 调试模式下跳过登录检查
  if (!REQUIRE_AUTH) {
    return true;
  }
  return !!getIdToken();
}

/**
 * 跳转到登录页
 */
export function redirectToLogin(): void {
  if (typeof window !== 'undefined') {
    window.location.href = '/signin';
  }
}

/**
 * React Hook: 鉴权状态
 */
export function useArenaAuth() {
  const token = typeof window !== 'undefined' ? getIdToken() : null;
  const authenticated = isAuthenticated();

  return {
    token,
    isAuthenticated: authenticated,
    requireAuth: REQUIRE_AUTH,
    redirectToLogin,
  };
}

export default useArenaAuth;
