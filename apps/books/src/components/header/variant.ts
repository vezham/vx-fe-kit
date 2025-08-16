// Tabs
export const getTabsClassNames = (isDarkmode: boolean) => ({
  base: 'w-full max-w-full',
  tabList: isDarkmode ? 'bg-transparent' : 'bg-transparent',
  tab: 'flex-1',
  cursor: isDarkmode
    ? 'bg-default/30 text-white shadow'
    : 'bg-white text-black shadow-small',
  panel: 'w-full px-4 pt-4'
})
// Title & description
export const getTitleClassName = () =>
  'lg:text-2xl sm:text-xl text-lg font-bold md:mt-2'

export const getDescriptionClassName = () =>
  'text-xs text-justify sm:text-sm text-default-500 md:mt-1'

// Layout
export const getLayoutClasses = (ChildrenCount: number) => ({
  container: 'md:p-3',
  headContainer: 'flex sm:flex-row justify-between gap-5 items-center',
  leftSection: 'flex items-center gap-3 md:gap-5',
  rightSection: '',
  tabsWrapper:
    ChildrenCount === 1
      ? 'flex sm:flex-row  sm:gap-10 flex-col sm:justify-between my-8'
      : 'flex lg:flex-row  lg:gap-3 lg:gap-10 flex-col lg:justify-between my-8',

  tabsScroll: 'overflow-x-auto scrollbar-hide lg:order-1 order-2',

  actionWrapper:
    ChildrenCount === 1
      ? 'flex sm:flex-row sm:gap-5 flex-col  [&>*]:w-full  sm:justify-end order-1 sm:order-2 mt-2 sm:mt-0 mb-2 md:mb-0'
      : 'flex sm:flex-row  sm:gap-5 flex-col  [&>*]:w-full  sm:justify-end order-1 lg:order-2 my-3 lg:my-0'
})

// Avatar section
export const getAvatarSectionClasses = (
  isDarkmode: boolean,
  ChildrenCount: number
) => ({
  wrapper:
    ChildrenCount === 1
      ? 'flex items-center  gap-3  px-3 lg:px-0 '
      : 'flex items-center justify-between sm:justify-start gap-3  px-3 lg:px-0  w-full sm:w-auto',
  avatar: 'border border-gray-200 w-7 h-7 ',
  divider: isDarkmode ? 'h-6 text-default/20' : 'h-6',
  addButtonIcon: 'text-gray-600'
})

// Control section
export const getControlSectionClasses = (ChildrenCount: number) => ({
  wrapper: 'flex flex-col',
  row:
    ChildrenCount === 1
      ? 'flex items-center justify-between sm:justify-end gap-2'
      : 'flex items-center justify-between sm:justify-end gap-2 mt-3 sm:mt-0',
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
    ? 'bg-neutral-800 text-white hover:bg-default/40'
    : 'bg-white text-black shadow-md'

export const getFlexGap2 = () => 'flex gap-2'
export const getOrderClasses = () => ({
  refreshOrder: 'order-2 lg:order-1',
  dateOrder: 'order-1 lg:order-2'
})
