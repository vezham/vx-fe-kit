import type { Node } from '@vezham/docs-core/page-tree'

type Props = {
  docsBase: string
  nodes: Node[]
  prefix: string
}

const filterNodes = ({ docsBase, nodes, prefix }: Props): Node[] =>
  nodes.flatMap((node): Node[] => {
    if (node.type === 'page') {
      const path = node.url.slice(docsBase.length + 1)
      return path === prefix || path.startsWith(`${prefix}/`) ? [node] : []
    }
    if (node.type !== 'folder') return []

    const children = filterNodes({
      docsBase,
      nodes: node.children,
      prefix
    })
    const index = node.index
      ? filterNodes({
          docsBase,
          nodes: [node.index],
          prefix
        })[0]
      : undefined

    return children.length || index
      ? [
          {
            ...node,
            defaultOpen: true,
            root: false,
            children,
            index: index?.type === 'page' ? index : undefined
          }
        ]
      : []
  })

export const filterPlatformPageTree = (props: Props): Node[] => {
  const nodes = filterNodes(props)
  if (nodes.length !== 1 || nodes[0].type !== 'folder') return nodes

  const { children, index } = nodes[0]
  return index?.type === 'page' ? [index, ...children] : children
}
