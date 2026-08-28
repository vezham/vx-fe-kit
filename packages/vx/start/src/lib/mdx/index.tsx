import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { ElementType } from 'react'

type MDXComponents = Record<string, ElementType>

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...components
  } satisfies MDXComponents
}
