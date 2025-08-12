export const sidebarHeaderVariants = {
  container: (isCompact: boolean) =>
    isCompact
      ? 'flex items-center justify-between pt-2 w-full mb-5'
      : 'flex items-center justify-between px-2 mb-5',

  icon: (buttonTextColor?: string, isCompact?: boolean) =>
    `${buttonTextColor ?? ''} ${isCompact ? 'w-8' : 'w-6'}`,

  button: (buttonTextColor?: string) => `${buttonTextColor ?? ''} rounded-lg`,

  chevronIcon: (
    buttonTextColor?: string,
    isCompact?: boolean,
    isRightSidebar?: boolean
  ) =>
    `${buttonTextColor ?? ''} ${isCompact ? 'w-3' : 'w-[10px]'} ${
      isRightSidebar ? 'rotate-180' : ''
    }`,

  compactSlackButton: () =>
    'flex items-center gap-1 justify-center p-2 rounded-full hover:bg-default-100 transition-colors cursor-pointer min-w-[40px] min-h-[40px]',

  compactChevron: () => 'text-default-600 text-[16px]',

  expandedSlackButton: () =>
    'flex items-center gap-1 px-2 py-1 rounded-full hover:bg-default-100 transition-colors cursor-pointer select-none min-w-[40px] min-h-[40px]',

  expandedChevron: (isOpen: boolean) =>
    `text-default-600 text-[16px] transition-transform duration-200 ${
      isOpen ? 'rotate-180' : 'rotate-0'
    }`
}

export const userPopoverCardVariants = {
  card: () => 'max-w-[260px] border-none bg-transparent shadow-none',
  name: () => 'text-small font-semibold leading-none text-default-600',
  username: () => 'text-small tracking-tight text-default-500',
  bio: () => 'text-small pl-px text-default-500',
  statNumber: () => 'font-semibold text-default-600 text-small',
  statLabel: () => 'text-default-500 text-small'
}
