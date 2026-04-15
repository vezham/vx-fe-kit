'use client'

import { Icon } from '@iconify/react'
import { useState } from 'react'
import React from 'react'

import { forwardRef } from '@vezham/react-utils'
import {
  Accordion,
  Avatar,
  Drawer,
  Input,
  ScrollShadow
} from '@vezham/react/v3'

import { sampleBookmarks, sampleFavorites } from './data'
import { BookmarkItem, FavoriteItem, Props, useProps } from './types'

const BookmarksDrawer = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
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
  } = useProps({
    ...props,
    ref
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [internalFavorites, setInternalFavorites] =
    useState<FavoriteItem[]>(sampleFavorites)
  const [internalBookmarks, setInternalBookmarks] =
    useState<BookmarkItem[]>(sampleBookmarks)

  const favorites = externalFavorites || internalFavorites
  const bookmarks = externalBookmarks || internalBookmarks

  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredBookmarks = bookmarks.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const folderBookmarks = filteredBookmarks.filter(b => b.folder)
  const singleBookmarks = filteredBookmarks.filter(b => !b.folder)

  const bookmarksByFolder = folderBookmarks.reduce(
    (acc, bookmark) => {
      const folder = bookmark.folder!
      if (!acc[folder]) {
        acc[folder] = []
      }
      acc[folder].push(bookmark)
      return acc
    },
    {} as Record<string, BookmarkItem[]>
  )

  const hasFavorites = filteredFavorites.length > 0
  const hasFolderBookmarks = Object.keys(bookmarksByFolder).length > 0
  const hasSingleBookmarks = singleBookmarks.length > 0
  const hasBookmarks = hasFolderBookmarks || hasSingleBookmarks

  const handleItemClick = (url: string, item?: FavoriteItem | BookmarkItem) => {
    if (url && url !== '#') {
      window.open(url.startsWith('http') ? url : `https://${url}`, '_blank')
    }
  }

  const handleFavoriteClick = (url: string, item: FavoriteItem) => {
    if (onFavoriteClick) {
      onFavoriteClick(url, item)
    } else {
      handleItemClick(url, item)
    }
  }

  const handleBookmarkClick = (url: string, item: BookmarkItem) => {
    if (onBookmarkClick) {
      onBookmarkClick(url, item)
    } else {
      handleItemClick(url, item)
    }
  }

  const renderFavoriteItems = () => {
    if (renderFavoriteItem) {
      return filteredFavorites.map(item => (
        <React.Fragment key={item.id}>
          {renderFavoriteItem({
            item,
            onItemClick: url => handleFavoriteClick(url, item)
          })}
        </React.Fragment>
      ))
    }

    return filteredFavorites.map(item => (
      <button
        key={item.id}
        {...getFavoriteItemProps()}
        onClick={() => handleFavoriteClick(item.url, item)}>
        {item.backgroundImage ? (
          <img
            {...getFavoriteBackgroundImageProps(
              item.backgroundImage,
              item.name
            )}
          />
        ) : (
          <div {...getFavoriteBackgroundGradientProps()} />
        )}
        <div {...getFavoriteOverlayProps()} />

        <div {...getFavoriteAvatarContainerProps()}>
          <Avatar {...getFavoriteAvatarProps()}>
            {item.avatar && <Avatar.Image src={item.avatar} alt={item.name} />}
            <Avatar.Fallback {...getFavoriteAvatarFallbackProps(item.name)}>
              <Icon {...getFavoriteAvatarIconProps()} />
            </Avatar.Fallback>
          </Avatar>
        </div>

        <div {...getFavoriteContentProps()}>
          <p {...getFavoriteNameProps(item.name)} />
        </div>
      </button>
    ))
  }

  const renderBookmarkItems = (items: BookmarkItem[]) => {
    if (renderBookmarkItem) {
      return items.map(item => (
        <React.Fragment key={item.id}>
          {renderBookmarkItem({
            item,
            onItemClick: url => handleBookmarkClick(url, item)
          })}
        </React.Fragment>
      ))
    }

    return items.map(bookmark => (
      <button
        key={bookmark.id}
        {...getBookmarkItemProps()}
        onClick={() => handleBookmarkClick(bookmark.url, bookmark)}>
        <Avatar {...getBookmarkAvatarProps()}>
          {bookmark.avatar && (
            <Avatar.Image src={bookmark.avatar} alt={bookmark.name} />
          )}
          <Avatar.Fallback {...getBookmarkAvatarFallbackProps(bookmark.name)} />
        </Avatar>
        <div {...getBookmarkContentProps()}>
          <p {...getBookmarkNameProps(bookmark.name)} />
        </div>
        <Icon {...getBookmarkArrowProps()} />
      </button>
    ))
  }

  const renderFolderBookmarks = () => {
    if (renderFolderItem) {
      return Object.entries(bookmarksByFolder).map(([folder, items]) => (
        <React.Fragment key={folder}>
          {renderFolderItem(folder, items, url =>
            handleBookmarkClick(url, items[0])
          )}
        </React.Fragment>
      ))
    }

    return (
      <Accordion hideSeparator {...getFolderAccordionProps()}>
        {Object.entries(bookmarksByFolder).map(([folder, items]) => (
          <Accordion.Item key={folder} {...getFolderItemProps()}>
            <Accordion.Heading {...getFolderHeadingProps()}>
              <Accordion.Trigger {...getFolderTriggerProps()}>
                <div {...getFolderTriggerContentProps()}>
                  <Icon {...getFolderIconProps()} />
                  <span {...getFolderNameProps(folder)} />
                  <span {...getFolderCountProps(items.length)} />
                </div>
                <Accordion.Indicator {...getFolderIndicatorProps()}>
                  <Icon icon="solar:alt-arrow-down-linear" width={18} />
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel {...getFolderPanelProps()}>
              <Accordion.Body {...getFolderBodyProps()}>
                {renderBookmarkItems(items)}
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    )
  }

  return (
    <Component>
      <Drawer isOpen={isOpen} onOpenChange={onClose}>
        <Drawer.Content placement={placement}>
          <Drawer.Dialog {...getDrawerDialogProps()}>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <div {...getSearchContainerProps()}>
                <Input
                  {...getSearchInputProps()}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </Drawer.Header>

            <Drawer.Body {...getDrawerBodyProps()}>
              <ScrollShadow {...getScrollShadowProps()}>
                {!hasFavorites && !hasBookmarks ? (
                  <div {...getEmptyContainerProps()}>
                    <Icon {...getEmptyIconProps()} />
                    <h2 {...getEmptyTitleProps()} />
                    <p {...getEmptyDescriptionProps()} />
                  </div>
                ) : (
                  <div {...getContentContainerProps()}>
                    {hasFavorites && (
                      <section {...getSectionProps()}>
                        <div {...getSectionHeaderProps()}>
                          <Icon
                            {...getSectionIconProps(
                              'solar:star-bold',
                              'text-warning'
                            )}
                          />
                          <h3 {...getSectionTitleProps('Favorites')} />
                        </div>
                        <div {...getFavoritesGridProps()}>
                          {renderFavoriteItems()}
                        </div>
                      </section>
                    )}

                    {hasSingleBookmarks && (
                      <section {...getSectionProps()}>
                        <div {...getSectionHeaderProps()}>
                          <Icon
                            {...getSectionIconProps(
                              'solar:bookmark-bold',
                              'text-primary'
                            )}
                          />
                          <h3 {...getSectionTitleProps('Bookmarks')} />
                        </div>
                        <div {...getBookmarksListProps()}>
                          {renderBookmarkItems(singleBookmarks)}
                        </div>
                      </section>
                    )}

                    {hasFolderBookmarks && (
                      <section {...getSectionProps()}>
                        {renderFolderBookmarks()}
                      </section>
                    )}
                  </div>
                )}
              </ScrollShadow>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </Component>
  )
})

BookmarksDrawer.displayName = 'BookmarksDrawer'

export { BookmarksDrawer }
