import { ReactNode } from 'react'

import { ReactRef, useDOMRef } from '@vezham/react-utils'
import {
  HTMLHeroUIProps,
  PropGetter,
  mapPropsVariants
} from '@vezham/react-utils'
import { cn } from '@vezham/react-utils'
import { SlotsToClasses } from '@vezham/react-utils'

import { tvProps, tvSlots, tva } from './variant'

// Types for data models
export interface ArchiveItem {
  id: string
  title: string
  url: string
  archivedDate: string
  favicon?: string
}

export interface TrashItem {
  id: string
  title: string
  url: string
  deletedDate: string
  favicon?: string
}

// Props for custom renderers
export interface ItemRendererProps<T> {
  item: T
  onAction?: (action: string, item: T) => void
}

// Main Component Props
interface Props extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  isOpen: boolean
  onClose: () => void
  placement?: 'left' | 'right'
  archiveItems?: ArchiveItem[]
  trashItems?: TrashItem[]
  onUnarchive?: (id: string) => void
  onDeleteFromArchive?: (id: string) => void
  onRestore?: (id: string) => void
  onDeletePermanently?: (id: string) => void
  onClearAllArchive?: () => void
  onClearAllTrash?: () => void
  onRestoreAllTrash?: () => void
  onItemClick?: (url: string) => void
  renderArchiveItem?: (props: ItemRendererProps<ArchiveItem>) => ReactNode
  renderTrashItem?: (props: ItemRendererProps<TrashItem>) => ReactNode
}

const useProps = (originalProps: Props) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)

  const {
    as,
    id,
    ref,
    children,
    className,
    classNames,
    isOpen,
    onClose,
    placement = 'left',
    archiveItems: externalArchiveItems,
    trashItems: externalTrashItems,
    onUnarchive,
    onDeleteFromArchive,
    onRestore,
    onDeletePermanently,
    onClearAllArchive,
    onClearAllTrash,
    onRestoreAllTrash,
    onItemClick,
    renderArchiveItem,
    renderTrashItem,
    ...otherProps
  } = props

  const Component = as || 'div'
  const domRef = useDOMRef(ref)
  const slots = tva(variantProps)

  // Drawer getters
  const getDrawerDialogProps: PropGetter = () => ({
    className: slots.drawer_dialog({
      class: cn(classNames?.drawer_dialog, className)
    })
  })

  // Tabs getters
  const getTabsProps: PropGetter = () => ({
    className: slots.tabs({ class: classNames?.tabs })
  })

  const getTabsListContainerProps: PropGetter = () => ({
    className: slots.tabs_list_container({
      class: classNames?.tabs_list_container
    })
  })

  const getTabsListProps: PropGetter = () => ({
    className: slots.tabs_list({ class: classNames?.tabs_list }),
    'aria-label': 'Archive and Trash tabs'
  })

  const getTabArchiveProps: PropGetter = () => ({
    id: 'archive',
    className: slots.tab_archive({ class: classNames?.tab_archive })
  })

  const getTabTrashProps: PropGetter = () => ({
    id: 'trash',
    className: slots.tab_trash({ class: classNames?.tab_trash })
  })

  const getTabIndicatorProps: PropGetter = () => ({
    className: slots.tab_indicator({ class: classNames?.tab_indicator })
  })

  // Container getters
  const getContainerProps: PropGetter = () => ({
    className: slots.container({ class: classNames?.container })
  })

  // Search input getters
  const getSearchInputProps: PropGetter = (isArchive: boolean) => ({
    className: slots.search_input({ class: classNames?.search_input }),
    placeholder: isArchive ? 'Search' : 'Search',
    variant: 'bordered' as const,
    classNames: {
      inputWrapper: slots.search_input_wrapper({
        class: classNames?.search_input_wrapper
      })
    }
  })

  // Actions bar getters
  const getActionsBarProps: PropGetter = (hasRestore: boolean) => ({
    className: hasRestore
      ? slots.actions_bar_with_gap({ class: classNames?.actions_bar })
      : slots.actions_bar({ class: classNames?.actions_bar })
  })

  const getClearAllButtonProps: PropGetter = () => ({
    size: 'sm' as const,
    variant: 'light' as const,
    color: 'danger' as const
  })

  const getRestoreAllButtonProps: PropGetter = () => ({
    size: 'sm' as const,
    variant: 'light' as const,
    color: 'success' as const
  })

  // Empty state getters
  const getEmptyContainerProps: PropGetter = () => ({
    className: slots.empty_container({ class: classNames?.empty_container })
  })

  const getEmptyIconProps: PropGetter = (icon: string) => ({
    icon,
    width: 64,
    className: slots.empty_icon({ class: classNames?.empty_icon })
  })

  const getEmptyTitleProps: PropGetter = () => ({
    className: slots.empty_title({ class: classNames?.empty_title })
  })

  const getEmptyDescriptionProps: PropGetter = () => ({
    className: slots.empty_description({ class: classNames?.empty_description })
  })

  // Items container getters
  const getItemsContainerProps: PropGetter = () => ({
    className: slots.items_container({ class: classNames?.items_container })
  })

  const getDateGroupProps: PropGetter = () => ({
    className: slots.date_group({ class: classNames?.date_group })
  })

  const getDateHeaderProps: PropGetter = () => ({
    className: slots.date_header({ class: classNames?.date_header })
  })

  const getDateLabelProps: PropGetter = () => ({
    className: slots.date_label({ class: classNames?.date_label })
  })

  const getDateDividerProps: PropGetter = () => ({
    className: slots.date_divider({ class: classNames?.date_divider })
  })

  const getItemsListProps: PropGetter = () => ({
    className: slots.items_list({ class: classNames?.items_list })
  })

  // Item getters
  const getItemProps: PropGetter = () => ({
    className: slots.item({ class: classNames?.item })
  })

  const getItemFaviconProps: PropGetter = () => ({
    className: slots.item_favicon({ class: classNames?.item_favicon }),
    alt: '',
    onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.style.display = 'none'
    }
  })

  const getItemFallbackIconProps: PropGetter = () => ({
    icon: 'solar:document-linear',
    width: 16,
    className: slots.item_fallback_icon({
      class: classNames?.item_fallback_icon
    })
  })

  const getItemContentProps: PropGetter = () => ({
    className: slots.item_content({ class: classNames?.item_content })
  })

  const getItemTitleProps: PropGetter = (title: string) => ({
    className: slots.item_title({ class: classNames?.item_title }),
    children: title
  })

  const getItemUrlProps: PropGetter = (url: string) => ({
    className: slots.item_url({ class: classNames?.item_url }),
    children: url
  })

  const getItemActionsProps: PropGetter = () => ({
    className: slots.item_actions({ class: classNames?.item_actions })
  })

  // Action button getters
  const getUnarchiveButtonProps: PropGetter = () => ({
    className: slots.unarchive_button({ class: classNames?.unarchive_button }),
    'aria-label': 'Unarchive'
  })

  const getRestoreButtonProps: PropGetter = () => ({
    className: slots.restore_button({ class: classNames?.restore_button }),
    'aria-label': 'Restore'
  })

  const getDeleteButtonProps: PropGetter = () => ({
    className: slots.delete_button({ class: classNames?.delete_button }),
    'aria-label': 'Delete'
  })

  const getDeletePermanentButtonProps: PropGetter = () => ({
    className: slots.delete_permanent_button({
      class: classNames?.delete_permanent_button
    }),
    'aria-label': 'Delete Permanently'
  })

  const getActionIconProps: PropGetter = (
    icon: string,
    color?: 'success' | 'danger' | 'default'
  ) => ({
    icon,
    width: 18,
    className:
      color === 'success'
        ? slots.action_icon_success({ class: classNames?.action_icon })
        : color === 'danger'
          ? slots.action_icon_danger({ class: classNames?.action_icon })
          : slots.action_icon_default({ class: classNames?.action_icon })
  })

  return {
    Component,
    domRef,
    slots,
    classNames,
    children,
    getDrawerDialogProps,
    getTabsProps,
    getTabsListContainerProps,
    getTabsListProps,
    getTabArchiveProps,
    getTabTrashProps,
    getTabIndicatorProps,
    getContainerProps,
    getSearchInputProps,
    getActionsBarProps,
    getClearAllButtonProps,
    getRestoreAllButtonProps,
    getEmptyContainerProps,
    getEmptyIconProps,
    getEmptyTitleProps,
    getEmptyDescriptionProps,
    getItemsContainerProps,
    getDateGroupProps,
    getDateHeaderProps,
    getDateLabelProps,
    getDateDividerProps,
    getItemsListProps,
    getItemProps,
    getItemFaviconProps,
    getItemFallbackIconProps,
    getItemContentProps,
    getItemTitleProps,
    getItemUrlProps,
    getItemActionsProps,
    getUnarchiveButtonProps,
    getRestoreButtonProps,
    getDeleteButtonProps,
    getDeletePermanentButtonProps,
    getActionIconProps,
    isOpen,
    onClose,
    placement,
    externalArchiveItems,
    externalTrashItems,
    onUnarchive,
    onDeleteFromArchive,
    onRestore,
    onDeletePermanently,
    onClearAllArchive,
    onClearAllTrash,
    onRestoreAllTrash,
    onItemClick,
    renderArchiveItem,
    renderTrashItem
  }
}

export { useProps }
export type { Props }
