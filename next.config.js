const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

const assetPrefix = {
  development: '',
  pre: '',
  test: 'https://a.ew6.cn/testagicto',
  test2: 'https://a.ew6.cn/testagicto',
  test3: 'https://a.ew6.cn/testagicto',
  prod: 'https://a.ew6.cn/agicto',
  prodpro: 'https://a.ew6.cn/agicto'
}

module.exports = {
  ...withMDX({
    assetPrefix: assetPrefix[process.env.INIT_ENV],
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
  })
}
