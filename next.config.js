const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
console.log('first', process.env.INIT_ENV)
const assetPrefix = {
  development: '',
  pre: '',
  test: 'https://a.ew6.cn/testagicto',
  prod: 'https://a.ew6.cn/agicto'
}

module.exports = {
  ...withMDX({
    assetPrefix: assetPrefix[process.env.INIT_ENV],
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
  })
}
