import * as mdxComponents from './components/common/mdx'

export function useMDXComponents(components) {
  return {
    ...components,
    ...mdxComponents
  }
}
