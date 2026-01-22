import { cn } from '@vezham/react/v2'

export const getInputWrapperClass = ({
  isDarkMode,
  isCompact
}: {
  isDarkMode?: boolean
  isCompact?: boolean
}) =>
  cn(
    'relative flex cursor-pointer items-center rounded-md',
    isCompact ? 'mx-auto justify-center' : 'w-full',
    // Normal background/text
    isDarkMode
      ? 'bg-neutral-700 text-white placeholder-gray-400'
      : 'bg-white text-black placeholder-gray-500',
    // Force background/text on focus/focus-visible
    isDarkMode
      ? 'focus-within:bg-neutral-700 focus-within:text-white focus-within:placeholder-gray-400'
      : 'focus-within:bg-white focus-within:text-black focus-within:placeholder-gray-500'
  )

export const getSearchIconClass = ({ isDarkMode }: { isDarkMode?: boolean }) =>
  cn(
    'mx-auto flex items-center justify-center',
    isDarkMode ? 'text-white' : 'text-black'
  )

export const sidebarStyles = {
  container: 'flex h-full flex-col items-center justify-center',
  listboxItem: {
    base: 'data-[hover=true]:bg-default/20 data-[hover=true]:text-default-400 gap-4 p-2 ',
    selected: 'bg-default/20 text-primary'
  },
  compactItem: {
    base: 'hover:bg-default/20 flex  cursor-pointer justify-center rounded-md w-full px-2 mb-1',
    selected: 'bg-default/20 text-primary'
  },
  icon: {
    base: 'text-default-500',
    selected: 'text-primary'
  }
}
