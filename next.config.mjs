import nextMDX from '@next/mdx'
import { recmaPlugins } from './mdx/recma.mjs'
import { rehypePlugins } from './mdx/rehype.mjs'
import { remarkPlugins } from './mdx/remark.mjs'
import withSearch from './mdx/search.mjs'
// import remarkGfm from 'remark-gfm'
// import rehypePrism from '@mapbox/rehype-prism'

// import withMarkdoc from '@markdoc/next.js'

const assetPrefix = {
  development: '',
  pre: '',
  test: 'https://a.ew6.cn/testagicto',
  prod: 'https://a.ew6.cn/agicto'
}

const nextConfig = {
  assetPrefix: assetPrefix[process.env.INIT_ENV],
  images: {
    domains: ['ew6.cn']
  },
  pageExtensions: ['js', 'jsx', 'tsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    images: {
      allowFutureImage: true
    }
  }
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins
  }
})

export default withSearch(withMDX(nextConfig))
