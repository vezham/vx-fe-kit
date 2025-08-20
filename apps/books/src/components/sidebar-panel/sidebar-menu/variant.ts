// // sidebar-menu/variant.ts
// import { cn } from '@heroui/react'

// export const getSectionClasses = ({
//   isCompact,
//   isVertical,
//   sectionClassesProp
// }: {
//   isCompact?: boolean
//   isVertical?: boolean
//   sectionClassesProp?: any
// }) => ({
//   ...sectionClassesProp,
//   base: cn(sectionClassesProp?.base, 'w-full', {
//     ' p-0': isCompact,
//     'flex flex-row flex-wrap': !isVertical && !isCompact
//   }),
//   group: cn(sectionClassesProp?.group, {
//     'flex flex-col gap-1': isCompact,
//     'flex flex-row flex-wrap ': !isVertical && !isCompact
//   }),
//   heading: cn(sectionClassesProp?.heading, {
//     hidden: isCompact,
//     ' w-full': !isVertical && !isCompact
//   })
// })

// export const getItemClasses = ({
//   isCompact,
//   itemClassesProp
// }: {
//   isCompact?: boolean
//   itemClassesProp?: any
// }) => ({
//   ...itemClassesProp,
//   base: cn(itemClassesProp?.base, {
//     'h-11 w-11 gap-0 p-0': isCompact
//   })
// })

// export const getListboxItemBaseClass = ({
//   isCompact,
//   isVertical,
//   itemClasses
// }: {
//   isCompact?: boolean
//   isVertical?: boolean
//   itemClasses?: any
// }) =>
//   cn('rounded-large px-3', itemClasses?.base, {
//     'w-auto flex-shrink-0': !isVertical && !isCompact
//   })

// export const getListboxItemTitleClass = ({
//   iconClassName,
//   itemClasses
// }: {
//   iconClassName?: string
//   itemClasses?: any
// }) =>
//   cn(
//     'text-small font-medium',
//     iconClassName || 'text-current',
//     itemClasses?.title
//   )

// export const getInputClassName = ({ isDarkMode }: { isDarkMode?: boolean }) =>
//   `mb-4 rounded-md ${
//     isDarkMode
//       ? 'bg-neutral-800 text-white placeholder-gray-400'
//       : 'bg-white text-black placeholder-gray-500 border border-gray-300'
//   }`

// export const getSearchIconClassName = ({
//   buttonTextColor
// }: {
//   buttonTextColor?: string
// }) => `text-default-500 ${buttonTextColor}`

// export const getScrollShadowClassName = ({
//   scrollShadowBg
// }: {
//   scrollShadowBg?: string
// }) =>
//   ` flex flex-col items-center   ${scrollShadowBg} rounded-md`

// export const getSidebarMenuItemBaseClass = ({
//   isSelected,
//   isDarkMode
// }: {
//   isSelected?: boolean
//   isDarkMode?: boolean
// }) => {
//   if (!isSelected) return 'px-3  rounded-lg '
//   return isDarkMode
//     ? 'px-3 rounded-lg '
//     : 'px-3 rounded-lg  '
// }

// export const getSidebarMenuTitleClass = ({
//   textColorClass
// }: {
//   textColorClass?: string
// }) =>
//   cn(
//     'text-medium font-normal',

//     textColorClass
//   )

// // variant.ts

// export const sidebarStyles = {
//   // Styles for the main container
//   container: 'flex flex-col px-2 align-center justify-center',

//   // Styles for a single listbox item
//   listboxItem: {
//     base: 'data-[hover=true]:bg-default/20 data-[hover=true]:text-default-400 gap-4',
//     selected: 'bg-default/20 text-default-400'
//   },

//   // Styles for a compact single item
//   compactItem: {
//     base: 'hover:bg-default/20 flex cursor-pointer justify-center rounded-md',
//     selected: 'bg-default/20 text-white'
//   },

//   // Styles for nested items
//   nestedItem: {
//     container: 'flex flex-col',
//     header: {
//       base: 'flex cursor-pointer text-default-400  items-center justify-between rounded-md px-3',
//       selected: 'bg-default/20 text-default-200',
//       unselected: 'hover:bg-default/20 hover:text-default-400 text-default-400'
//     },
//     title: 'text-small font-medium',
//     subheader: 'border-default-200 mt-1 ml-4 border-l pl-4'
//   },

//   // Styles for icon elements
//   icon: {
//     base: 'text-default-500',
//     selected: 'text-black',
//     nestedSelected: 'text-default-400'
//   },

//   // Other utility styles used in the component
//   gapHalf: 'gap-0.5',
//   button: 'h-8 w-8 min-w-8',
//   flexCenterGap2: 'flex items-center gap-2'
// }

import { cn } from '@heroui/react'

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
  container: 'flex flex-col ',
  listboxItem: {
    base: 'data-[hover=true]:bg-default/20 data-[hover=true]:text-default-400 gap-4',
    selected: 'bg-default/20 text-default-400'
  },
  compactItem: {
    base: 'hover:bg-default/20 flex cursor-pointer justify-center rounded-md w-full px-1 mb-1',
    selected: 'bg-default/20 text-primary'
  },
  icon: {
    base: 'text-default-500',
    selected: 'text-black'
  }
}
