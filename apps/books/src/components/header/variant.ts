// Tabs
export const getTabsClassNames = (isDarkmode: boolean) => ({
  base: 'w-full max-w-full',
  tabList: isDarkmode ? 'bg-neutral-800' : 'bg-default/80', // Set the background for the tab container
  tab: 'flex-1',
  cursor: isDarkmode
    ? 'bg-default/20 text-white' // Adjust for better visibility in dark mode
    : 'bg-white text-black shadow-small', // Add a subtle shadow for light mode
  panel: 'w-full px-4 pt-4'
})
// Title & description
export const getTitleClassName = () =>
  'lg:text-2xl sm:text-xl text-lg font-bold md:mt-2'

export const getDescriptionClassName = () =>
  'text-xs sm:text-sm text-default-500 md:mt-1'

// Layout
export const getLayoutClasses = () => ({
  container: 'md:p-3',
  headContainer: 'flex sm:flex-row justify-between items-center',
  leftSection: 'flex items-center gap-3 md:gap-5',
  rightSection: '',
  tabsWrapper: 'flex lg:flex-row flex-col lg:justify-between mt-5',
  tabsScroll: 'overflow-x-auto scrollbar-hide'
})

// Avatar section
export const getAvatarSectionClasses = () => ({
  wrapper: 'flex items-center gap-3 mt-3 px-2 lg:px-0 sm:mt-0',
  avatar: 'border border-gray-200 w-7 h-7',
  divider: 'h-6',
  addButtonIcon: 'text-gray-600'
})

// Control section
export const getControlSectionClasses = () => ({
  wrapper: 'flex flex-col',
  row: 'flex items-center justify-between lg:justify-end gap-2 mt-3 lg:mt-0',
  refreshBtnBase:
    'bg-zinc-100 dark:bg-default/10 text-black dark:text-white ' +
    'hover:bg-white dark:hover:bg-default/40',
  dateBtnBase: 'flex-1 max-w-[200px]',
  dateText: 'text-xs font-normal',
  downloadBtn: 'text-sm',
  downloadIcon: 'text-sm',
  calendarWrapper: 'rounded-medium shadow-medium mt-3',
  icon: 'text-lg'
})

// Action buttons (shared)
export const getFirstActionClasses = (isDarkmode: boolean) =>
  isDarkmode
    ? 'bg-white/5 text-white hover:bg-default/40'
    : 'bg-white text-black shadow-md'

// Misc
export const getTruncateMax150 = () => 'max-w-[150px] truncate'

export const getFlexGap2 = () => 'flex gap-2'
export const getOrderClasses = () => ({
  refreshOrder: 'order-2 lg:order-1',
  dateOrder: 'order-1 lg:order-2'
})
