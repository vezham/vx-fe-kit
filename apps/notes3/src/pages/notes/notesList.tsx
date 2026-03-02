import { Icon } from '@iconify/react'
import React from 'react'

import { Button } from '@vezham/react/v2'

import { Props } from '../notes/types'

const NoteListItem: React.FC<Props> = ({
  note,
  onView,
  onEdit,
  onPin,
  onArchive,
  onUnarchive,
  onDelete,
  onRestore,
  onPermanentDelete
}) => {
  return (
    <div
      className="border-default-300 hover:bg-content2 flex cursor-pointer items-center justify-between rounded-xl border p-3 transition"
      onClick={onView}>
      <div className="min-w-0 flex-1 pr-3">
        <h3 className="w-full truncate font-semibold">{note.title}</h3>
        <p className="text-sm text-gray-500">
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div
        className="flex shrink-0 items-center gap-2"
        onClick={e => e.stopPropagation()}>
        {onPin && (
          <Button isIconOnly variant="light" size="sm" onClick={onPin}>
            <Icon
              icon={note.isPinned ? 'mdi:pin' : 'mdi:pin-outline'}
              className={note.isPinned ? 'text-black' : 'text-gray-400'}
              width={18}
            />
          </Button>
        )}

        {(onArchive || onUnarchive) && (
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={() => (note.isArchived ? onUnarchive?.() : onArchive?.())}>
            <Icon
              icon={
                note.isArchived
                  ? 'mdi:archive-arrow-up-outline'
                  : 'mdi:archive-outline'
              }
              className={note.isArchived ? 'text-blue-500' : 'text-gray-400'}
              width={18}
            />
          </Button>
        )}

        {onEdit && (
          <Button isIconOnly variant="light" size="sm" onClick={onEdit}>
            <Icon
              icon="mdi:pencil-outline"
              className="text-gray-400"
              width={18}
            />
          </Button>
        )}

        {onDelete && (
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={e => {
              console.log('Delete button clicked', note.id)
              console.log('Event target:', e.target)
              console.log('Current target:', e.currentTarget)
              onDelete()
            }}>
            <Icon
              icon="mdi:trash-can-outline"
              className="text-red-400"
              width={18}
            />
          </Button>
        )}

        {onRestore && (
          <Button isIconOnly variant="light" size="sm" onClick={onRestore}>
            <Icon icon="mdi:restore" className="text-green-600" width={18} />
          </Button>
        )}

        {onPermanentDelete && (
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={onPermanentDelete}>
            <Icon
              icon="mdi:delete-forever"
              className="text-red-600"
              width={18}
            />
          </Button>
        )}
      </div>
    </div>
  )
}

export default NoteListItem
