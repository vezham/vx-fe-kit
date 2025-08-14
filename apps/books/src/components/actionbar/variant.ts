import { cn } from '@heroui/react'

// Button styles — default to light mode to avoid forcing dark unintentionally
export const getButtonVariantClasses = ({
  color = 'default',
  isDarkMode = false
}: {
  color?: 'default' | 'primary' | 'danger'
  isDarkMode?: boolean
}) => {
  return cn(
    '!rounded-full duration-200',
    // Base fill so light mode is clearly visible
    isDarkMode ? 'text-white' : 'text-black',
    // Hover states
    isDarkMode ? 'hover:bg-white/10' : 'hover:bg-neutral-200',
    // Color variants
    color === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
    color === 'danger' &&
      (isDarkMode
        ? 'text-red-400 hover:bg-red-900/40'
        : 'text-red-600 hover:bg-red-100')
  )
}

// Soft pill container behind button groups
export const getBaseContainerClasses = (isDarkMode = false) =>
  cn(
    'overflow-hidden rounded-full shadow-sm',
    isDarkMode
      ? 'bg-white/5 text-white'
      : 'bg-white text-black backdrop-blur-md'
  )

// Dropdown menu panel styling — apply this on <DropdownMenu/>
export const getDropdownMenuClasses = (isDarkMode = false) =>
  cn(
    'rounded-lg shadow-lg',
    isDarkMode
      ? 'bg-neutral-800 text-white'
      : 'border border-neutral-200 bg-white text-black'
  )

// Trigger button styling for the three-dots button
export const getDropdownTriggerClasses = (isDarkMode = false) =>
  cn(getButtonVariantClasses({ color: 'default', isDarkMode }), '!rounded-full')
