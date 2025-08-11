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
  cn(
    'rounded-large data-[selected=true]:bg-default-100 h-[44px] min-h-11 px-3',
    itemClasses?.base,
    {
      'w-auto flex-shrink-0': !isVertical && !isCompact
    }
  )

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
    'group-data-[selected=true]:text-current',
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
