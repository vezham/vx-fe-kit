import { cn } from '@vezham/react/v2'

export const getNavbarContainerClasses = ({
  bgColorClass = '',
  isDarkMode = false
}: {
  bgColorClass?: string
  isDarkMode?: boolean
}): string => {
  return cn(
    'fixed bottom-0 z-50 flex w-full md:hidden',
    'px-6 pt-4 pb-6',
    bgColorClass,
    isDarkMode && 'dark'
  )
}

export const getNavbarMenuContainerClasses = ({
  isDarkMode = false
}: {
  isDarkMode?: boolean
}): string => {
  return cn(
    'flex items-center rounded-full p-2 shadow-xl backdrop-blur-md',
    isDarkMode ? 'bg-white/5' : 'bg-white'
  )
}

export const getNavbarButtonClasses = ({
  isSelected = false,
  textColorClass = 'text-gray-500',
  isDarkMode = false
}: {
  isSelected?: boolean
  textColorClass?: string
  isDarkMode?: boolean
}): string => {
  return cn(
    'group flex flex-col items-center px-3 text-xs font-medium transition-colors duration-200 focus:outline-none',

    isSelected
      ? isDarkMode
        ? '!font-bold !text-blue-400'
        : '!font-bold !text-blue-600'
      : isDarkMode
        ? 'text-gray-400'
        : textColorClass,

    !isSelected && 'hover:text-blue-500'
  )
}

export const getNavbarIconClasses = ({
  isSelected = false,
  isDarkMode = false
}: {
  isSelected?: boolean
  isDarkMode?: boolean
}): string => {
  return cn(
    'h-5 w-5 transition-colors duration-200',

    isSelected
      ? isDarkMode
        ? '!text-blue-400'
        : '!text-blue-600'
      : isDarkMode
        ? 'text-gray-400'
        : 'text-gray-500',

    !isSelected && 'group-hover:text-blue-500'
  )
}

export const getSearchButtonClasses = ({
  isDarkMode = false
}: {
  isDarkMode?: boolean
}): string => {
  return cn(
    'ml-4 flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-colors',

    isDarkMode
      ? 'bg-white/5 text-gray-300 backdrop-blur-md hover:bg-white/20'
      : 'bg-white text-gray-500 backdrop-blur-md hover:bg-gray-100'
  )
}

export const getDrawerHeaderClasses = ({
  isDarkMode = false
}: {
  isDarkMode?: boolean
}): string => {
  return cn(
    'relative flex items-center justify-center px-5 py-5 text-center font-semibold',
    isDarkMode ? 'text-gray-200' : 'text-gray-800'
  )
}

export const getDrawerCloseButtonClasses = ({
  isDarkMode = false
}: {
  isDarkMode?: boolean
}): string => {
  return cn(
    'absolute right-6 rounded-full p-2 transition-colors',

    isDarkMode
      ? 'text-gray-300 backdrop-blur-lg hover:bg-white/10'
      : 'text-gray-600 hover:bg-black/5'
  )
}

export const getDrawerBodyClasses = (): string => {
  return cn('max-h-[45vh] overflow-y-auto')
}

export const getDrawerContentClasses = ({
  isDarkMode = false
}: {
  isDarkMode?: boolean
}): string => {
  return cn(
    'fixed bottom-0 left-0 w-full max-w-full rounded-t-2xl py-2',

    isDarkMode ? 'bg-black/80 backdrop-blur-md' : 'bg-white',

    "[&_[aria-label='Close']]:hidden"
  )
}

export const getDrawerButtonClasses = ({
  isSelected = false,
  isDarkMode = false
}: {
  isSelected?: boolean
  isDarkMode?: boolean
}): string => {
  return cn(
    'group flex flex-col items-center text-center text-xs transition-colors duration-200',

    isSelected
      ? isDarkMode
        ? '!font-bold !text-blue-400'
        : '!font-bold !text-blue-600'
      : isDarkMode
        ? 'text-gray-400'
        : 'text-gray-500',

    !isSelected && 'hover:text-blue-500'
  )
}

export const getDrawerGridClasses = (): string => {
  return cn('grid grid-cols-3 gap-8 p-4 sm:grid-cols-4')
}

export const getDrawerGridItemInnerClasses = (
  buttonTextColor: string
): string => {
  return cn('flex flex-col items-center gap-2', buttonTextColor)
}
