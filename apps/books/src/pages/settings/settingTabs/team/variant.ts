import { cn } from '@heroui/react'

// Card Styles
export const cardClasses = (isDarkMode?: boolean) =>
  cn(
    'py-2',
    isDarkMode
      ? 'bg-neutral-800 text-white'
      : 'border border-gray-200 shadow-none'
  )

export const tableHeaderClasses = (isDarkMode?: boolean) =>
  cn(
    'text-sm font-medium',
    isDarkMode
      ? 'text-default-100 bg-transparent'
      : 'bg-transparent text-gray-700'
  )

export const cardHeaderClasses = 'flex items-center justify-between'
export const roleCardHeader = 'flex flex-col items-start gap-1.5 px-6 pt-6'
export const iconSizeClasses = 'h-4 w-4'

// Table Row
export const tableRowClasses = (isDarkMode?: boolean) =>
  cn('border-b', isDarkMode ? 'border-default-700' : 'border-gray-300')

// Role Badge

export const roleChipClasses = (isDarkMode?: boolean) =>
  cn(
    'border-outline-200 rounded-md border bg-transparent px-2 py-0.5 text-xs font-medium',
    isDarkMode ? 'text-white' : 'text-gray-800' // ✅ darker text for light mode
  )

// Status Badge Variants
export const statusChipClasses = {
  active:
    'rounded-md px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700',
  pending:
    'rounded-md px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700',
  inactive:
    'rounded-md px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700'
}

// Action Buttons
export const actionButtonClasses = 'flex justify-end gap-2'
