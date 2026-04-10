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

export interface FavoriteItem {
  id: string
  name: string
  url: string
  avatar?: string
  backgroundImage?: string
}

export interface BookmarkItem {
  id: string
  name: string
  url: string
  avatar?: string
  folder?: string
}

export interface FavoriteItemRendererProps {
  item: FavoriteItem
  onItemClick?: (url: string) => void
}

export interface BookmarkItemRendererProps {
  item: BookmarkItem
  onItemClick?: (url: string) => void
}

interface Props extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  isOpen: boolean
  onClose: () => void
  placement?: 'left' | 'right'
  favorites?: FavoriteItem[]
  bookmarks?: BookmarkItem[]
  onFavoriteClick?: (url: string, item: FavoriteItem) => void
  onBookmarkClick?: (url: string, item: BookmarkItem) => void
  renderFavoriteItem?: (props: FavoriteItemRendererProps) => ReactNode
  renderBookmarkItem?: (props: BookmarkItemRendererProps) => ReactNode
  renderFolderItem?: (
    folder: string,
    items: BookmarkItem[],
    onItemClick: (url: string) => void
  ) => ReactNode
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
    favorites: externalFavorites,
    bookmarks: externalBookmarks,
    onFavoriteClick,
    onBookmarkClick,
    renderFavoriteItem,
    renderBookmarkItem,
    renderFolderItem,
    ...otherProps
  } = props

  const Component = as || 'div'
  const domRef = useDOMRef(ref)
  const slots = tva(variantProps)

  const getDrawerDialogProps: PropGetter = () => ({
    className: slots.drawer_dialog({
      class: cn(classNames?.drawer_dialog, className)
    })
  })

  const getDrawerBodyProps: PropGetter = () => ({
    className: slots.drawer_body({ class: classNames?.drawer_body })
  })

  const getSearchContainerProps: PropGetter = () => ({
    className: slots.search_container({ class: classNames?.search_container })
  })

  const getSearchInputProps: PropGetter = () => ({
    className: slots.search_input({ class: classNames?.search_input }),
    placeholder: 'Search ...',
    classNames: {
      inputWrapper: slots.search_input_wrapper({
        class: classNames?.search_input_wrapper
      })
    }
  })

  const getScrollShadowProps: PropGetter = () => ({
    className: slots.scroll_shadow({ class: classNames?.scroll_shadow }),
    hideScrollBar: true
  })

  const getEmptyContainerProps: PropGetter = () => ({
    className: slots.empty_container({ class: classNames?.empty_container })
  })

  const getEmptyIconProps: PropGetter = () => ({
    icon: 'solar:star-linear',
    width: 64,
    className: slots.empty_icon({ class: classNames?.empty_icon })
  })

  const getEmptyTitleProps: PropGetter = () => ({
    className: slots.empty_title({ class: classNames?.empty_title }),
    children: 'No items yet'
  })

  const getEmptyDescriptionProps: PropGetter = () => ({
    className: slots.empty_description({
      class: classNames?.empty_description
    }),
    children:
      'Add items to favorites or bookmarks to quickly access them later.'
  })

  const getContentContainerProps: PropGetter = () => ({
    className: slots.content_container({ class: classNames?.content_container })
  })

  const getSectionProps: PropGetter = () => ({
    className: slots.section({ class: classNames?.section })
  })

  const getSectionHeaderProps: PropGetter = () => ({
    className: slots.section_header({ class: classNames?.section_header })
  })

  const getSectionIconProps: PropGetter = (
    icon: string,
    className?: string
  ) => ({
    icon,
    width: 18,
    className: cn(
      slots.section_icon({ class: classNames?.section_icon }),
      className
    )
  })

  const getSectionTitleProps: PropGetter = (title: string) => ({
    className: slots.section_title({ class: classNames?.section_title }),
    children: title
  })

  const getFavoritesGridProps: PropGetter = () => ({
    className: slots.favorites_grid({ class: classNames?.favorites_grid })
  })

  const getFavoriteItemProps: PropGetter = () => ({
    className: slots.favorite_item({ class: classNames?.favorite_item })
  })

  const getFavoriteBackgroundImageProps: PropGetter = (
    src: string,
    alt: string
  ) => ({
    src,
    alt,
    className: slots.favorite_background_image({
      class: classNames?.favorite_background_image
    })
  })

  const getFavoriteBackgroundGradientProps: PropGetter = () => ({
    className: slots.favorite_background_gradient({
      class: classNames?.favorite_background_gradient
    })
  })

  const getFavoriteOverlayProps: PropGetter = () => ({
    className: slots.favorite_overlay({ class: classNames?.favorite_overlay })
  })

  const getFavoriteAvatarContainerProps: PropGetter = () => ({
    className: slots.favorite_avatar_container({
      class: classNames?.favorite_avatar_container
    })
  })

  const getFavoriteAvatarProps: PropGetter = () => ({
    size: 'sm' as const,
    className: slots.favorite_avatar({ class: classNames?.favorite_avatar })
  })

  const getFavoriteAvatarIconProps: PropGetter = () => ({
    icon: 'solar:star-bold',
    width: 14,
    className: slots.favorite_avatar_icon({
      class: classNames?.favorite_avatar_icon
    })
  })

  const getFavoriteAvatarFallbackProps: PropGetter = (name: string) => ({
    className: slots.favorite_avatar_fallback({
      class: classNames?.favorite_avatar_fallback
    }),
    children: name.charAt(0).toUpperCase()
  })

  const getFavoriteContentProps: PropGetter = () => ({
    className: slots.favorite_content({ class: classNames?.favorite_content })
  })

  const getFavoriteNameProps: PropGetter = (name: string) => ({
    className: slots.favorite_name({ class: classNames?.favorite_name }),
    children: name
  })

  const getBookmarksListProps: PropGetter = () => ({
    className: slots.bookmarks_list({ class: classNames?.bookmarks_list })
  })

  const getBookmarkItemProps: PropGetter = () => ({
    className: slots.bookmark_item({ class: classNames?.bookmark_item })
  })

  const getBookmarkAvatarProps: PropGetter = () => ({
    size: 'sm' as const,
    className: slots.bookmark_avatar({ class: classNames?.bookmark_avatar })
  })

  const getBookmarkAvatarFallbackProps: PropGetter = (name: string) => ({
    className: slots.bookmark_avatar_fallback({
      class: classNames?.bookmark_avatar_fallback
    }),
    children: name.charAt(0).toUpperCase()
  })

  const getBookmarkContentProps: PropGetter = () => ({
    className: slots.bookmark_content({ class: classNames?.bookmark_content })
  })

  const getBookmarkNameProps: PropGetter = (name: string) => ({
    className: slots.bookmark_name({ class: classNames?.bookmark_name }),
    children: name
  })

  const getBookmarkUrlProps: PropGetter = (url: string) => ({
    className: slots.bookmark_url({ class: classNames?.bookmark_url }),
    children: url
  })

  const getBookmarkArrowProps: PropGetter = () => ({
    icon: 'solar:arrow-right-up-linear',
    width: 16,
    className: slots.bookmark_arrow({ class: classNames?.bookmark_arrow })
  })

  const getFolderAccordionProps: PropGetter = () => ({
    variant: 'light' as const,
    selectionMode: 'multiple' as const,
    className: slots.folder_accordion({ class: classNames?.folder_accordion })
  })

  const getFolderItemProps: PropGetter = () => ({
    className: slots.folder_item({ class: classNames?.folder_item })
  })

  const getFolderHeadingProps: PropGetter = () => ({
    className: slots.folder_heading({ class: classNames?.folder_heading })
  })

  const getFolderTriggerProps: PropGetter = () => ({
    className: slots.folder_trigger({ class: classNames?.folder_trigger })
  })

  const getFolderTriggerContentProps: PropGetter = () => ({
    className: slots.folder_trigger_content({
      class: classNames?.folder_trigger_content
    })
  })

  const getFolderIconProps: PropGetter = () => ({
    icon: 'solar:folder-bold',
    width: 18,
    className: slots.folder_icon({ class: classNames?.folder_icon })
  })

  const getFolderNameProps: PropGetter = (name: string) => ({
    className: slots.folder_name({ class: classNames?.folder_name }),
    children: name
  })

  const getFolderCountProps: PropGetter = (count: number) => ({
    className: slots.folder_count({ class: classNames?.folder_count }),
    children: `(${count})`
  })

  const getFolderIndicatorProps: PropGetter = () => ({
    className: slots.folder_indicator({ class: classNames?.folder_indicator })
  })

  const getFolderPanelProps: PropGetter = () => ({
    className: slots.folder_panel({ class: classNames?.folder_panel })
  })

  const getFolderBodyProps: PropGetter = () => ({
    className: slots.folder_body({ class: classNames?.folder_body })
  })

  return {
    Component,
    domRef,
    slots,
    classNames,
    children,
    getDrawerDialogProps,
    getDrawerBodyProps,
    getSearchContainerProps,
    getSearchInputProps,
    getScrollShadowProps,
    getEmptyContainerProps,
    getEmptyIconProps,
    getEmptyTitleProps,
    getEmptyDescriptionProps,
    getContentContainerProps,
    getSectionProps,
    getSectionHeaderProps,
    getSectionIconProps,
    getSectionTitleProps,
    getFavoritesGridProps,
    getFavoriteItemProps,
    getFavoriteBackgroundImageProps,
    getFavoriteBackgroundGradientProps,
    getFavoriteOverlayProps,
    getFavoriteAvatarContainerProps,
    getFavoriteAvatarProps,
    getFavoriteAvatarIconProps,
    getFavoriteAvatarFallbackProps,
    getFavoriteContentProps,
    getFavoriteNameProps,
    getBookmarksListProps,
    getBookmarkItemProps,
    getBookmarkAvatarProps,
    getBookmarkAvatarFallbackProps,
    getBookmarkContentProps,
    getBookmarkNameProps,
    getBookmarkUrlProps,
    getBookmarkArrowProps,
    getFolderAccordionProps,
    getFolderItemProps,
    getFolderHeadingProps,
    getFolderTriggerProps,
    getFolderTriggerContentProps,
    getFolderIconProps,
    getFolderNameProps,
    getFolderCountProps,
    getFolderIndicatorProps,
    getFolderPanelProps,
    getFolderBodyProps,
    isOpen,
    onClose,
    placement,
    externalFavorites,
    externalBookmarks,
    onFavoriteClick,
    onBookmarkClick,
    renderFavoriteItem,
    renderBookmarkItem,
    renderFolderItem
  }
}

export { useProps }
export type { Props }
