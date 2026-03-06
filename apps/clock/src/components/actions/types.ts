// export interface ContainerActionsProps {
//   showSearch?: boolean
//   showAdd?: boolean
//   showMore?: boolean
//   onSave?: (data: WorldClockFormData) => void

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

export type WorldClockFormData = {
  city: string
  timezone: string
}
