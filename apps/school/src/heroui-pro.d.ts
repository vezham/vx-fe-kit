declare module '@heroui-pro/react' {
  import type { ComponentType, ReactNode } from 'react'
  export { Agenda, useAgenda } from '@heroui-pro/react/agenda'

  type ProProps = {
    children?: ReactNode
    [key: string]: unknown
  }

  type CompoundComponent = ComponentType<ProProps> & {
    Trigger: ComponentType<ProProps>
    Popover: ComponentType<ProProps>
    Menu: ComponentType<ProProps>
    Item: ComponentType<ProProps>
    Separator: ComponentType<ProProps>
    SubmenuTrigger: ComponentType<ProProps>
    SubmenuIndicator: ComponentType<ProProps>
  }

  export const ContextMenu: CompoundComponent
  export const EmojiPicker: CompoundComponent & {
    Content: ComponentType<ProProps>
    Grid: ComponentType<ProProps>
  }
  export const FileTree: ComponentType<ProProps> & {
    Item: ComponentType<ProProps>
  }
  export const EmptyState: ComponentType<{ children?: ReactNode }>
  export function useFileTreeDrag(options: Record<string, unknown>): {
    dragAndDropHooks: unknown
  }
}
