import type { ElementType } from 'react'

import defaultMdxComponents from '@vezham/docs-react/mdx'

type MDXComponents = Record<string, ElementType>

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...components
  } satisfies MDXComponents
}
