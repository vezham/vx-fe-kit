// 'use client'

// import React from 'react'
// import { useSortable } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'
// import { Avatar, Button } from '@vezham/react/v3'
// import { Icon } from '@iconify/react'

// interface SortableBookmarkItemProps {
//     id: string
//     item: any
//     getBookmarkItemProps: any
//     getBookmarkAvatarProps: any
//     getBookmarkAvatarFallbackProps: any
//     getBookmarkContentProps: any
//     getBookmarkNameProps: any
//     getBookmarkUrlProps: any
//     getBookmarkDeleteButtonProps?: any
//     onClick: () => void
//     onDelete: (e: React.MouseEvent) => void
//     isHovered: boolean
//     onMouseEnter: () => void
//     onMouseLeave: () => void
// }

// export const SortableBookmarkItem: React.FC<SortableBookmarkItemProps> = ({
//     id,
//     item,
//     getBookmarkItemProps,
//     getBookmarkAvatarProps,
//     getBookmarkAvatarFallbackProps,
//     getBookmarkContentProps,
//     getBookmarkNameProps,
//     getBookmarkUrlProps,
//     getBookmarkDeleteButtonProps,
//     onClick,
//     onDelete,
//     isHovered,
//     onMouseEnter,
//     onMouseLeave,
// }) => {
//     const {
//         attributes,
//         listeners,
//         setNodeRef,
//         transform,
//         transition,
//         isDragging,
//     } = useSortable({ id })

//     const style = {
//         transform: CSS.Transform.toString(transform),
//         transition,
//         opacity: isDragging ? 0.5 : 1,
//         cursor: 'grab',
//     }

//     const itemProps = getBookmarkItemProps()
//     const { className, ...restItemProps } = itemProps

//     return (
//         <div
//             ref={setNodeRef}
//             style={style}
//             className={className}
//             {...restItemProps}
//             {...attributes}
//             {...listeners}
//             onClick={onClick}
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//             role="button"
//             tabIndex={0}
//             onKeyDown={e => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                     e.preventDefault()
//                     onClick()
//                 }
//             }}
//         >
//             <Avatar {...getBookmarkAvatarProps()}>
//                 {item.avatar && (
//                     <Avatar.Image src={item.avatar} alt={item.name} />
//                 )}
//                 <Avatar.Fallback {...getBookmarkAvatarFallbackProps(item.name)} />
//             </Avatar>

//             <div {...getBookmarkContentProps()} className="flex-1">
//                 <p {...getBookmarkNameProps(item.name)} />
//                 {item.url && (
//                     <p
//                         {...getBookmarkUrlProps(item.url)}
//                         className="text-default-500 truncate text-xs"
//                     >
//                         {item.url}
//                     </p>
//                 )}
//             </div>

//             <Button
//                 isIconOnly
//                 size="sm"
//                 variant="light"
//                 className={`opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${isHovered ? 'opacity-100' : ''
//                     }`}
//                 {...getBookmarkDeleteButtonProps?.()}
//                 onClick={onDelete}
//             >
//                 <Icon icon="solar:trash-bin-trash-linear" width={18} />
//             </Button>
//         </div>
//     )
// }

'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@iconify/react'
import React from 'react'

import { Avatar, Button } from '@vezham/react/v3'

// 'use client'

// import React from 'react'
// import { useSortable } from '@dnd-kit/sortable'
// import { CSS } from '@dnd-kit/utilities'
// import { Avatar, Button } from '@vezham/react/v3'
// import { Icon } from '@iconify/react'

// interface SortableBookmarkItemProps {
//     id: string
//     item: any
//     getBookmarkItemProps: any
//     getBookmarkAvatarProps: any
//     getBookmarkAvatarFallbackProps: any
//     getBookmarkContentProps: any
//     getBookmarkNameProps: any
//     getBookmarkUrlProps: any
//     getBookmarkDeleteButtonProps?: any
//     onClick: () => void
//     onDelete: (e: React.MouseEvent) => void
//     isHovered: boolean
//     onMouseEnter: () => void
//     onMouseLeave: () => void
// }

// export const SortableBookmarkItem: React.FC<SortableBookmarkItemProps> = ({
//     id,
//     item,
//     getBookmarkItemProps,
//     getBookmarkAvatarProps,
//     getBookmarkAvatarFallbackProps,
//     getBookmarkContentProps,
//     getBookmarkNameProps,
//     getBookmarkUrlProps,
//     getBookmarkDeleteButtonProps,
//     onClick,
//     onDelete,
//     isHovered,
//     onMouseEnter,
//     onMouseLeave,
// }) => {
//     const {
//         attributes,
//         listeners,
//         setNodeRef,
//         transform,
//         transition,
//         isDragging,
//     } = useSortable({ id })

//     const style = {
//         transform: CSS.Transform.toString(transform),
//         transition,
//         opacity: isDragging ? 0.5 : 1,
//         cursor: 'grab',
//     }

//     const itemProps = getBookmarkItemProps()
//     const { className, ...restItemProps } = itemProps

//     return (
//         <div
//             ref={setNodeRef}
//             style={style}
//             className={className}
//             {...restItemProps}
//             {...attributes}
//             {...listeners}
//             onClick={onClick}
//             onMouseEnter={onMouseEnter}
//             onMouseLeave={onMouseLeave}
//             role="button"
//             tabIndex={0}
//             onKeyDown={e => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                     e.preventDefault()
//                     onClick()
//                 }
//             }}
//         >
//             <Avatar {...getBookmarkAvatarProps()}>
//                 {item.avatar && (
//                     <Avatar.Image src={item.avatar} alt={item.name} />
//                 )}
//                 <Avatar.Fallback {...getBookmarkAvatarFallbackProps(item.name)} />
//             </Avatar>

//             <div {...getBookmarkContentProps()} className="flex-1">
//                 <p {...getBookmarkNameProps(item.name)} />
//                 {item.url && (
//                     <p
//                         {...getBookmarkUrlProps(item.url)}
//                         className="text-default-500 truncate text-xs"
//                     >
//                         {item.url}
//                     </p>
//                 )}
//             </div>

//             <Button
//                 isIconOnly
//                 size="sm"
//                 variant="light"
//                 className={`opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${isHovered ? 'opacity-100' : ''
//                     }`}
//                 {...getBookmarkDeleteButtonProps?.()}
//                 onClick={onDelete}
//             >
//                 <Icon icon="solar:trash-bin-trash-linear" width={18} />
//             </Button>
//         </div>
//     )
// }

interface SortableBookmarkItemProps {
  id: string
  item: any
  getBookmarkItemProps: any
  getBookmarkAvatarProps: any
  getBookmarkAvatarFallbackProps: any
  getBookmarkContentProps: any
  getBookmarkNameProps: any
  getBookmarkUrlProps: any
  getBookmarkDeleteButtonProps?: any
  onClick: () => void
  onDelete: (e: React.MouseEvent) => void
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export const SortableBookmarkItem: React.FC<SortableBookmarkItemProps> = ({
  id,
  item,
  getBookmarkItemProps,
  getBookmarkAvatarProps,
  getBookmarkAvatarFallbackProps,
  getBookmarkContentProps,
  getBookmarkNameProps,
  getBookmarkUrlProps,
  getBookmarkDeleteButtonProps,
  onClick,
  onDelete,
  isHovered,
  onMouseEnter,
  onMouseLeave
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

  const itemProps = getBookmarkItemProps()
  const { className, ...restItemProps } = itemProps

  // Prevent drag when clicking on delete button
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(e)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${className} group relative`}
      {...restItemProps}
      {...attributes}
      {...listeners}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}>
      <Avatar {...getBookmarkAvatarProps()}>
        {item.avatar && <Avatar.Image src={item.avatar} alt={item.name} />}
        <Avatar.Fallback {...getBookmarkAvatarFallbackProps(item.name)} />
      </Avatar>

      <div {...getBookmarkContentProps()} className="flex-1">
        <p {...getBookmarkNameProps(item.name)} />
        {item.url && (
          <p
            {...getBookmarkUrlProps(item.url)}
            className="text-default-500 truncate text-xs">
            {item.url}
          </p>
        )}
      </div>

      <Button
        isIconOnly
        size="sm"
        variant="light"
        className={`delete-button transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } group-hover:opacity-100`}
        {...getBookmarkDeleteButtonProps?.()}
        onClick={handleDeleteClick}>
        <Icon icon="solar:trash-bin-trash-linear" width={18} />
      </Button>
    </div>
  )
}
