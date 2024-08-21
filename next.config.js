const nextConfig = {
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  reactStrictMode: false,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    images: {
      allowFutureImage: true
    }
  },
  compiler: {
    styledComponents: true
  },
  serverRuntimeConfig: {
    maxHeaderSize: 100 * 1024, // 配置最大接收请求长度 100KB
  },
}

module.exports = nextConfig
