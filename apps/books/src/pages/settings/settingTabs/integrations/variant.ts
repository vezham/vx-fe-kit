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

export const getPanelClassName = (isDarkMode?: boolean) =>
  cn(isDarkMode ? 'bg-neutral-800 text-white' : 'bg-default-100')

export const getCardClassName = (isDarkMode?: boolean) =>
  cn(
    isDarkMode
      ? 'border-default-700 border bg-neutral-800 text-white'
      : 'bg-default-100'
  )

export const getStatusColor = (isConnected: boolean) =>
  isConnected ? 'bg-primary-500' : 'bg-success-500'

export const getStatusText = (isConnected: boolean) =>
  isConnected ? 'Connected' : 'Available'

// 🔹 Card body wrapper
export const cardBodyClass = 'p-6'

// 🔹 Title, subtitle, description, lastSync text
export const titleClass = 'text-lg font-medium'
export const subtitleClass = 'text-default-500 mt-1 text-sm'
export const descriptionClass = 'text-default-500 mb-2'
export const lastSyncClass = 'text-default-500 mb-6'

// 🔹 Header + Info Layouts
export const headerWrapperClass = 'mb-4 flex justify-between'
export const headerLeftClass = 'flex-1'
export const headerLogoClass = 'ml-4 flex items-start justify-center text-2xl'

// 🔹 Footer section
export const footerWrapperClass =
  'mt-auto flex w-full items-center justify-between'
export const statusWrapperClass = 'flex items-center gap-2'
export const statusDotClass = 'h-2 w-2 rounded-full'

// 🔹 Panel header + body
export const panelHeaderClass = 'mt-1 flex flex-col items-start gap-2'
export const panelTitleClass = 'text-lg leading-none font-medium'
export const panelSubtitleClass = 'text-default-500 text-sm'
export const panelBodyClass = 'pb-6'
export const gridWrapperClass = 'grid gap-6 md:grid-cols-2'
