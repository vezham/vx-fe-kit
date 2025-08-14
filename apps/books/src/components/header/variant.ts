export const tabsClassNames = {
  base: 'w-full max-w-full lg:pl-5',
  tab: 'flex-1',
  cursor: 'bg-content1 dark:bg-content1',
  panel: 'w-full px-4 pt-4'
}

export const titleClassName =
  'text-default-foreground lg:text-2xl sm:text-xl text-lg font-bold sm:mt-2'

export const descriptionClassName =
  'text-xs sm:text-sm text-default-500 sm:mt-1'

// Main container & layout
export const layoutClasses = {
  container: 'sm:p-3',
  headContainer: 'flex sm:flex-row justify-between items-center',
  leftSection: 'flex items-center gap-3 sm:gap-5',
  rightSection: '',
  tabsWrapper: 'flex lg:flex-row flex-col lg:justify-between mt-5',
  tabsScroll: 'overflow-x-auto scrollbar-hide'
}

// Avatar section
export const avatarSectionClasses = {
  wrapper: 'flex items-center gap-3 mt-3 px-2 lg:px-0 lg:mt-0',
  avatar: 'border border-gray-200 w-7 h-7',
  divider: 'h-6',
  addButtonIcon: 'text-gray-600'
}

// Control section
export const controlSectionClasses = {
  wrapper: 'flex flex-col',
  row: 'flex items-center justify-between lg:justify-end gap-2 mt-3 lg:mt-0',
  refreshBtn: 'bg-default/70 hover:bg-white/40',
  dateBtn: 'bg-default/70 hover:bg-white/40 flex-1 max-w-[200px]',
  dateText: 'text-xs font-normal',
  downloadBtn: 'text-sm',
  downloadIcon: 'text-sm',
  calendarWrapper: 'rounded-medium shadow-medium mt-3',
  icon: 'text-lg'
}
