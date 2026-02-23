export interface HealthMetric {
  icon: string
  label: string
  value: string
  progress: number
  color: 'primary' | 'success' | 'warning' | 'danger'
}

export interface ActivityData {
  name: string
  value: number
  fill: string
  total: number
}

export interface HealthAppProps {
  isOpen: boolean
  onClose: () => void
}
