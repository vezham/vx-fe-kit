export interface FooterProps {
  isCompact: boolean
  isDarkMode: boolean
  isRightSidebar: boolean
  isRtl: boolean
  toggleTheme: () => void
  toggleTextDirection: () => void
  toggleDirection: () => void
  buttonTextColor: string
}
