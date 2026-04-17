'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@iconify/react'
import React from 'react'

import { Avatar } from '@vezham/react/v3'

interface SortableFavoriteItemProps {
  id: string
  item: any
  getFavoriteItemProps: any
  getFavoriteBackgroundImageProps: any
  getFavoriteBackgroundGradientProps: any
  getFavoriteOverlayProps: any
  getFavoriteAvatarContainerProps: any
  getFavoriteAvatarProps: any
  getFavoriteAvatarIconProps: any
  getFavoriteAvatarFallbackProps: any
  getFavoriteContentProps: any
  getFavoriteNameProps: any
  onClick: () => void
}

export const SortableFavoriteItem: React.FC<SortableFavoriteItemProps> = ({
  id,
  item,
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
  onClick
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  }

  const itemProps = getFavoriteItemProps()

  // Extract className and other props
  const { className, ...restItemProps } = itemProps

  return (
    <button
      ref={setNodeRef}
      style={style}
      className={className}
      {...restItemProps}
      {...attributes}
      {...listeners}
      onClick={onClick}>
      {item.backgroundImage ? (
        <img
          {...getFavoriteBackgroundImageProps(item.backgroundImage, item.name)}
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
  )
}
