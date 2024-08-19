const env = process.env.NODE_ENV
const nextConfig = {
  basePath: env === 'development' ? '' : '/model',
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
  }
}

module.exports = nextConfig
