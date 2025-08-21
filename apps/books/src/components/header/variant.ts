// Tabs
// export const getTabsClassNames = (isDarkmode: boolean) => ({
//   tabList: isDarkmode ? 'bg-neutral-800 text-white' : 'bg-default-100',
//   cursor: isDarkmode
//     ? 'bg-default/40 text-default-100 shadow'
//     : 'bg-white  text-black shadow-small',
//   panel: 'pt-4'
// })

export const getTabsClassNames = (isDarkmode: boolean) => ({
  tabList: isDarkmode
    ? 'bg-neutral-800 text-white'
    : 'bg-default-100 text-black',
  tab: 'z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity rounded-small',
  tabContent: isDarkmode
    ? 'text-white group-data-[selected=true]:text-white'
    : 'text-black group-data-[selected=true]:text-black',
  cursor: isDarkmode
    ? 'bg-neutral-900 text-default-100 shadow'
    : 'bg-white text-black shadow-small',
  panel: 'pt-4'
})

// Title & description
export const getTitleClassName = () => ' leading-9  text-3xl font-bold '

export const getDescriptionClassName = () => 'text-small text-default-500 mt-2'

// Layout
export const getLayoutClasses = () => ({
  container: '',
  headContainer: 'flex sm:flex-row justify-between items-center',
  leftSection: 'flex items-center gap-3 md:gap-5',
  tabsWrapper: 'flex justify-between mt-6 gap-3  items-center',
  tabsScroll: 'overflow-x-auto w-full max-w-2xl',
  actionWrapper: ''
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
