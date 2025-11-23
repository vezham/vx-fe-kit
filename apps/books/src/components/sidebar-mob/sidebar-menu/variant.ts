import { cn } from '@vezham/react/v2'

export const getNavbarContainerClasses = ({
  bgColorClass = '',
  isDarkMode = false
}) => {
  return cn(
    'fixed bottom-0 z-50 flex w-full md:hidden',
    'px-8 pt-4 pb-8', // padding
    bgColorClass,
    isDarkMode ? 'dark' : ''
  )
}

export const getNavbarMenuContainerClasses = ({ isDarkMode = false }) => {
  return cn(
    'flex inline-flex items-center rounded-full p-2 shadow-xl',
    isDarkMode
      ? 'bg-white/5 dark:backdrop-blur-md'
      : 'bg-white backdrop-blur-md'
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
    'h-4 w-4',
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

export const getSearchButtonClasses = ({ isDarkMode = false }) => {
  return cn(
    'ml-4 flex h-13 w-13 items-center justify-center rounded-full shadow-xl',
    isDarkMode
      ? 'bg-white/5 text-gray-300 hover:bg-white/20 dark:backdrop-blur-md'
      : 'hover:bg-default/20 bg-white text-gray-500 backdrop-blur-md'
  )
}

export const getDrawerHeaderClasses = ({ isDarkMode = false }) => {
  return cn(
    'relative flex items-center justify-center px-5 py-5 text-center font-semibold',
    isDarkMode ? 'text-gray-200' : 'text-gray-800'
  )
}

export const getDrawerCloseButtonClasses = ({ isDarkMode = false }) => {
  return cn(
    'absolute right-6 rounded-full p-2 transition-colors',
    isDarkMode
      ? 'text-gray-300 hover:bg-white/10 hover:backdrop-blur-lg'
      : 'text-gray-600 hover:bg-black/5'
  )
}

export const getDrawerBodyClasses = () => {
  return cn(
    'max-h-[45vh] overflow-y-auto transition-all duration-300 ease-in-out'
  )
}

export const getDrawerContentClasses = ({ isDarkMode = false }) => {
  return cn(
    'relative rounded-t-2xl py-2',
    '!fixed bottom-0 left-0 w-full max-w-full', // force bottom and full width
    // isDarkMode
    //   ? ['bg-black/25 dark:bg-black/5', "[&_[aria-label='Close']]:hidden"]
    //   : ['bg-default/15', "[&_[aria-label='Close']]:hidden"]
    isDarkMode
      ? ['bg-black/80 dark:bg-black/5', "[&_[aria-label='Close']]:hidden"]
      : ['bg-white', "[&_[aria-label='Close']]:hidden"]
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

export const getDrawerGridClasses = () => {
  return cn('grid gap-10 p-2', 'grid-cols-3 sm:grid-cols-4')
}

export const getDrawerGridItemInnerClasses = (buttonTextColor: string) => {
  return cn('flex flex-col items-center gap-2', buttonTextColor)
}
