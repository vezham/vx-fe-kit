import { cn } from '@heroui/react'

export const getButtonVariantClasses = ({
  color = 'default',
  isDarkMode = false
}) => {
  return cn(
    'transition-colors duration-200',
    color === 'default' &&
      cn('rounded-full', isDarkMode ? 'text-white' : 'text-black'),
    color === 'primary' && 'bg-blue-600 text-white',
    color === 'danger' &&
      cn(
        'text-red-500',
        isDarkMode ? 'hover:bg-red-900/50' : 'hover:bg-red-100'
      )
  )
}

export const getBaseContainerClasses = (isDarkMode = false) =>
  cn(
    'rounded-full shadow-sm',
    isDarkMode
      ? 'bg-white/10 text-white hover:bg-white/40'
      : 'bg-white text-black'
  )
