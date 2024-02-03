// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
//   experimental: {
//     mdxRs: true
//   }
// })

// const assetPrefix = {
//   development: '',
//   pre: '',
//   test: 'https://a.ew6.cn/testagicto',
//   prod: 'https://a.ew6.cn/agicto'
// }

// const nextConfig = {
//   // assetPrefix: assetPrefix[process.env.INIT_ENV],
//   // pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

//   // images: {
//   //   domains: ['ew6.cn']
//   // },
//   // Configure `pageExtensions` to include MDX files
//   pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
//   // Optionally, add any other Next.js config below
// }

// module.exports = withMDX(nextConfig)

// // module.exports = withMDX({
// //   assetPrefix: assetPrefix[process.env.INIT_ENV],
// //   pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

// //   images: {
// //     domains: ['ew6.cn']
// //   },

// //   webpack: (config, { isServer, defaultLoaders }) => {
// //     // 在这里添加额外的配置

// //     // 在任何目录下识别 .mdx 文件
// //     config.module.rules.push({
// //       test: /\*.mdx?$/,
// //       include: path.resolve(__dirname, 'app'), // 你的 MDX 文件所在的目录
// //       use: [
// //         defaultLoaders.babel,
// //         {
// //           loader: '@mdx-js/loader',
// //           options: {
// //             remarkPlugins: [require('remark-gfm')]
// //           }
// //         }
// //       ]
// //     })

// //     // 返回修改后的配置
// //     return config
// //   }

// //   // ...其他配置
// // })

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

const nextConfig = {
  // Uncomment and configure assetPrefix if necessary
  // assetPrefix: assetPrefix[process.env.INIT_ENV],

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  images: {
    domains: ['ew6.cn']
  }

  // ...other Next.js configuration...
}

module.exports = withMDX(nextConfig)
