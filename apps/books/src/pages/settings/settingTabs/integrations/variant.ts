import { cn } from '@heroui/react'

export const getButtonClass = (isConnected: boolean, isDarkMode?: boolean) => {
  if (isConnected) {
    return isDarkMode
      ? 'border border-gray-500 text-white hover:bg-gray-700'
      : '' // default bordered style in light mode
  }
  return isDarkMode
    ? 'bg-gray-700 text-white hover:bg-gray-600'
    : 'bg-black text-white hover:bg-gray-800'
}

export const getChipColor = (isConnected: boolean, isDarkMode?: boolean) => {
  if (isConnected) return isDarkMode ? 'success' : 'success' // softer green in dark mode
  return 'default'
}

export const getPanelClassName = (isDarkmode?: boolean) =>
  cn(isDarkmode ? 'bg-neutral-800 text-white' : 'bg-default-100')

export const getCardClassName = (isDarkmode?: boolean) =>
  cn(
    isDarkmode
      ? 'border-default-700 border bg-neutral-800 text-white'
      : 'bg-default-100'
  )
