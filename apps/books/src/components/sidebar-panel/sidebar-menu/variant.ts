// sidebar-menu/variant.ts
import { cn } from '@heroui/react'

export const getSectionClasses = ({
  isCompact,
  isVertical,
  sectionClassesProp
}: {
  isCompact?: boolean
  isVertical?: boolean
  sectionClassesProp?: any
}) => ({
  ...sectionClassesProp,
  base: cn(sectionClassesProp?.base, 'w-full', {
    'max-w-[44px] p-0': isCompact,
    'flex flex-row flex-wrap': !isVertical && !isCompact
  }),
  group: cn(sectionClassesProp?.group, {
    'flex flex-col gap-1': isCompact,
    'flex flex-row flex-wrap gap-2': !isVertical && !isCompact
  }),
  heading: cn(sectionClassesProp?.heading, {
    hidden: isCompact,
    'mb-2 w-full': !isVertical && !isCompact
  })
})

export const getItemClasses = ({
  isCompact,
  itemClassesProp
}: {
  isCompact?: boolean
  itemClassesProp?: any
}) => ({
  ...itemClassesProp,
  base: cn(itemClassesProp?.base, {
    'h-11 w-11 gap-0 p-0': isCompact
  })
})

export const getListboxItemBaseClass = ({
  isCompact,
  isVertical,
  itemClasses
}: {
  isCompact?: boolean
  isVertical?: boolean
  itemClasses?: any
}) =>
  cn('rounded-large h-[44px] min-h-11 px-3', itemClasses?.base, {
    'w-auto flex-shrink-0': !isVertical && !isCompact
  })

export const getListboxItemTitleClass = ({
  iconClassName,
  itemClasses
}: {
  iconClassName?: string
  itemClasses?: any
}) =>
  cn(
    'text-small font-medium',
    iconClassName || 'text-current',
    itemClasses?.title
  )

export const getInputClassName = ({ isDarkMode }: { isDarkMode?: boolean }) =>
  `mb-4 rounded-md ${
    isDarkMode
      ? 'bg-neutral-800 text-white placeholder-gray-400'
      : 'bg-white text-black placeholder-gray-500 border border-gray-300'
  }`

export const getSearchIconClassName = ({
  buttonTextColor
}: {
  buttonTextColor?: string
}) => `text-default-500 ${buttonTextColor}`

export const getScrollShadowClassName = ({
  scrollShadowBg
}: {
  scrollShadowBg?: string
}) =>
  `h-full flex flex-col items-center gap-6 max-h-[calc(100%-140px)] ${scrollShadowBg} rounded-md`

export const getSidebarMenuItemBaseClass = ({
  isSelected,
  isDarkMode
}: {
  isSelected?: boolean
  isDarkMode?: boolean
}) => {
  if (!isSelected) return 'px-3 min-h-12 rounded-lg h-12'
  return isDarkMode
    ? 'px-3 min-h-12 rounded-lg h-12'
    : 'px-3 min-h-12 rounded-lg h-12 '
}

export const getSidebarMenuTitleClass = ({
  textColorClass
}: {
  textColorClass?: string
}) =>
  cn(
    'text-medium font-normal',

    textColorClass
  )

// variant.ts

export const sidebarStyles = {
  // Styles for the main container
  container: 'flex flex-col gap-1',

  // Styles for a single listbox item
  listboxItem: {
    base: 'data-[hover=true]:bg-default/20 data-[hover=true]:text-default-400 ',
    selected: 'bg-default/20 text-default-400'
  },

  // Styles for a compact single item
  compactItem: {
    base: 'hover:bg-default/20 flex cursor-pointer justify-center rounded-md p-2',
    selected: 'bg-default/20 text-white'
  },

  // Styles for nested items
  nestedItem: {
    container: 'flex flex-col',
    header: {
      base: 'flex cursor-pointer text-default-400  items-center justify-between rounded-md px-3 py-2',
      selected: 'bg-default/20 text-default-200',
      unselected: 'hover:bg-default/20 hover:text-default-400 text-default-400'
    },
    title: 'text-small font-medium',
    subheader: 'border-default-200 mt-1 ml-4 border-l pl-4'
  },

  // Styles for icon elements
  icon: {
    base: 'text-default-500',
    selected: 'text-black',
    nestedSelected: 'text-default-400'
  },

  // Other utility styles used in the component
  gapHalf: 'gap-0.5',
  button: 'h-8 w-8 min-w-8',
  flexCenterGap2: 'flex items-center gap-2'
}
