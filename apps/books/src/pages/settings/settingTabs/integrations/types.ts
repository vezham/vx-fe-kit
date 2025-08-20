export type Integration = {
  name: string
  description: string
  subtitle?: string
  logo: string
  isConnected: boolean
  lastSync: string
}

export interface IntegrationProps {
  isDarkMode?: boolean
  className?: string
}
