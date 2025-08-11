import { cn } from '@heroui/react'

export const getNavbarContainerClasses = ({
  bgColorClass = '',
  isDarkMode = false
}) => {
  return cn(
    'fixed bottom-0 z-50 flex w-full',
    'px-4 pt-4 pb-8', // 16px top, 32px bottom, 32px sides
    'sm:hidden',
    bgColorClass,
    isDarkMode ? 'dark' : ''
  )
}

export const getNavbarButtonClasses = ({
  isSelected = false,
  textColorClass = 'text-gray-500',
  isDarkMode = false
}) => {
  return cn(
    'flex flex-col items-center px-3 text-xs font-medium transition-colors duration-200 focus:outline-none',

    isSelected
      ? isDarkMode
        ? 'font-bold text-blue-400'
        : 'font-bold text-blue-600'
      : textColorClass,
    'hover:text-blue-500'
  )
}

export const getNavbarIconClasses = ({
  isSelected = false,
  isDarkMode = false
}) => {
  return cn(
    'h-5 w-5',
    isSelected
      ? isDarkMode
        ? 'text-blue-400'
        : 'text-blue-600'
      : isDarkMode
        ? 'text-gray-400'
        : 'text-gray-500',
    'group-hover:text-blue-500'
  )
}

export const getDrawerHeaderClasses = ({ isDarkMode = false }) => {
  return cn(
    'text-center font-semibold',
    isDarkMode ? 'text-gray-200' : 'text-gray-800'
  )
}

export const getDrawerContentClasses = ({ isDarkMode = false }) => {
  return cn(
    'relative flex flex-col rounded-t-2xl',
    isDarkMode
      ? [
          'bg-black/5 backdrop-blur-lg dark:bg-black/5',
          "[&_[aria-label='Close']]:bg-transparent",
          "[&_[aria-label='Close']]:shadow-none",
          "[&_[aria-label='Close']:hover]:bg-white/10",
          "[&_[aria-label='Close']:hover]:backdrop-blur-lg"
        ]
      : [
          'bg-white/50 text-white backdrop-blur-md',
          "[&_[aria-label='Close']]:shadow-none",
          "[&_[aria-label='Close']:hover]:bg-white/40"
        ]
  )
}

export const getDrawerButtonClasses = ({
  isSelected = false,
  isDarkMode = false
}) => {
  return cn(
    'flex flex-col items-center text-center text-xs transition-colors duration-200',
    isSelected
      ? isDarkMode
        ? 'font-bold text-blue-400'
        : 'font-bold text-blue-600'
      : isDarkMode
        ? 'text-gray-400'
        : 'text-gray-500',
    'hover:text-blue-500'
  )
}

export const getNavbarMenuContainerClasses = ({
  isDarkMode = false,
  hasMoreAction = false,
  itemCount = 0
}) => {
  return cn(
    'flex items-center rounded-full p-2 shadow-xl',
    'inline-flex', // Make container width fit content
    isDarkMode
      ? 'bg-white/5 dark:backdrop-blur-md'
      : 'bg-white backdrop-blur-md'
  )
}

export const getSearchButtonClasses = ({ isDarkMode = false }) => {
  return cn(
    'ml-4 flex h-13 w-13 items-center justify-center rounded-full shadow-xl',
    isDarkMode
      ? 'bg-white/5 text-gray-300 dark:backdrop-blur-md'
      : 'bg-white text-gray-500 backdrop-blur-md'
  )
}
