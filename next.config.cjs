 
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
const assetPrefix = {
  development: '',
  pre: '',
  test: 'https://a.ew6.cn/testagicto',
  prod: 'https://a.ew6.cn/agicto'
}

module.exports = {
  images: {
    domains: ['ew6.cn']
  },
  ...withMDX({
    options: {
      remarkPlugins: [require("remark-gfm")],
      rehypePlugins: [],
    },
    assetPrefix: assetPrefix[process.env.INIT_ENV],
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
  })
}
