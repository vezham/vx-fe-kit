export interface ContainerActionsProps {
  showSearch?: boolean
  showAdd?: boolean
  showMore?: boolean
  onSave?: (data: WorldClockFormData) => void

  onSearch?: (value: string) => void
  onNewReminder?: () => void
  onNewList?: () => void
}

export type WorldClockFormData = {
  city: string
  timezone: string
}
