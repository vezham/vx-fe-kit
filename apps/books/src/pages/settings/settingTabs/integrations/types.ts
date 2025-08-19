export type Integration = {
  name: string
  description: string
  emoji: string
  isConnected: boolean
  lastSync: string
}

export interface IntegrationProps {
  isDarkMode?: boolean
  className?: string
}
