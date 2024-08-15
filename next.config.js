const nextConfig = {
  // 如果需要使用不同环境的 assetPrefix，可以取消注释以下行
  // assetPrefix: assetPrefix[process.env.INIT_ENV],
  images: {
    domains: ['ew6.cn']
  },
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true
  },
  compiler: {
    styledComponents: true
  }
}

// 如果你还需要使用 MDX，可以取消注释并配置相应的插件
// const withMDX = nextMDX({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins,
//     rehypePlugins,
//     recmaPlugins
//   }
// })

module.exports = nextConfig
