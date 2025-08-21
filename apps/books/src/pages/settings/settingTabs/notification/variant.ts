import { cn } from '@heroui/react'

export const getCardClassName = (isDarkmode?: boolean) =>
  cn(
    isDarkmode
      ? 'bg-neutral-800 text-white shadow-none'
      : 'border border-gray-200 shadow-none'
  )

export const getSwitchClass = (isDarkMode?: boolean, checked?: boolean) => {
  return cn(
    isDarkMode
      ? '' // dark mode style
      : 'group-data-[selected=true]:bg-black' // light mode style
  )
}
