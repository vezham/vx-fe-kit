// export interface ContainerActionsProps {
//   showSearch?: boolean
//   showAdd?: boolean
//   showMore?: boolean

//   onSearch?: (value: string) => void
//   onAdd?: () => void
// }

export type ContainerActionItem = {
  key: string
  icon?: string
  label?: string
  visible?: boolean
  onPress?: () => void
  type?: 'button' | 'dropdown'
  items?: {
    key: string
    label: string
    onPress?: () => void
  }[]
}

export interface ContainerActionsProps {
  actions: ContainerActionItem[]
}

export type HeaderAction = {
  key: string
  icon: string
  onClick?: () => void
  visible?: boolean
}

export type HeaderProps = {
  showBack?: boolean
  onBack?: () => void

  showClose?: boolean
  onClose?: () => void

  actions?: HeaderAction[]

  currentIndex?: number
  total?: number

  onPrev?: () => void
  onNext?: () => void
}
