export type WorldClockItem = {
  id: number
  city: string
  timezone: string
}

export type WorldClockFormData = {
  city: string
  timezone: string
}

export type DrawerProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  initialData: WorldClockItem | null
  onSave: (data: WorldClockFormData) => void
}
