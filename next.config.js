console.log('process.env.NEXT_PUBLIC_API_BASE_URL', process.env.NEXT_PUBLIC_API_BASE_URL)

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    PLAY_GROUND_BASE_URL: process.env.NEXT_PLAY_GROUND_BASE_URL,
    // Chat Battle 独立 API Base（与现有接口隔离）
    NEXT_PUBLIC_CHAT_BATTLE_API_BASE: process.env.NEXT_PUBLIC_CHAT_BATTLE_API_BASE,
    NEXT_PUBLIC_CHAT_BATTLE_REQUIRE_AUTH: process.env.NEXT_PUBLIC_CHAT_BATTLE_REQUIRE_AUTH
  },
  compiler: {
    styledComponents: true
  },
  serverRuntimeConfig: {
    maxHeaderSize: 100 * 1024 // 配置最大接收请求长度 100KB
  }
}

module.exports = nextConfig
