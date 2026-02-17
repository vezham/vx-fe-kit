import { Icon } from '@iconify/react'

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
    <div className="border-default-200 flex items-center justify-between rounded-xl border p-4 transition hover:bg-gray-50">
      {/* CLICK AREA */}
      <div className="flex-1 cursor-pointer" onClick={onView}>
        <h3 className="font-semibold">{note.title}</h3>
        <p className="text-sm text-gray-500">
          {new Date(note.createdAt).toISOString().slice(0, 10)}
        </p>
      </div>

      {/* ACTION ICONS */}
      <div
        className="flex items-center gap-4 text-lg"
        onClick={e => e.stopPropagation()}>
        {onPin && (
          <Icon
            icon={note.isPinned ? 'mdi:pin' : 'mdi:pin-outline'}
            className={`cursor-pointer ${
              note.isPinned ? 'text-black' : 'text-gray-500'
            }`}
            onClick={onPin}
          />
        )}

        {(onArchive || onUnarchive) && (
          <Icon
            icon={
              note.isArchived
                ? 'mdi:archive-arrow-up-outline'
                : 'mdi:archive-outline'
            }
            className={`cursor-pointer ${
              note.isArchived ? 'text-blue-500' : 'text-gray-500'
            }`}
            onClick={note.isArchived ? onUnarchive : onArchive}
          />
        )}

        {onEdit && (
          <Icon
            icon="mdi:pencil-outline"
            className="cursor-pointer text-gray-600"
            onClick={onEdit}
          />
        )}

        {onDelete && (
          <Icon
            icon="mdi:trash-can-outline"
            className="cursor-pointer text-red-500"
            onClick={onDelete}
          />
        )}

        {onRestore && (
          <Icon
            icon="mdi:restore"
            className="cursor-pointer text-green-600"
            onClick={onRestore}
          />
        )}

        {onPermanentDelete && (
          <Icon
            icon="mdi:delete-forever"
            className="cursor-pointer text-red-600"
            onClick={onPermanentDelete}
          />
        )}
      </div>
    </div>
  )
}

export default NoteListItem
