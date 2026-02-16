import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'

import { useReminders } from '../reminders/store'

type Props = {
  filter?:
    | 'all'
    | 'today'
    | 'scheduled'
    | 'completed'
    | 'flagged'
    | 'archive'
    | 'trash'
  listName?: string
}

export default function ReminderList({ filter, listName }: Props) {
  const navigate = useNavigate()

  const {
    reminders,
    toggleFlag,
    toggleComplete,
    toggleArchive,
    deleteReminder,
    restoreFromTrash,
    permanentlyDelete
  } = useReminders()

  const todayStr = new Date().toISOString().split('T')[0]

  const filtered = reminders
    .filter(r => {
      if (filter === 'trash') return r.deleted
      if (r.deleted) return false

      if (listName) {
        return r.list === listName && !r.archived
      }

      if (filter === 'all') return !r.archived
      if (filter === 'today') return r.date === todayStr && !r.archived
      if (filter === 'scheduled') return !!r.date && !r.archived
      if (filter === 'completed') return r.completed && !r.archived
      if (filter === 'flagged') return r.flagged && !r.archived
      if (filter === 'archive') return r.archived

      return true
    })
    .sort((a, b) => {
      if (filter === 'archive') {
        return (
          new Date(b.archivedAt || 0).getTime() -
          new Date(a.archivedAt || 0).getTime()
        )
      }
      return 0
    })

  if (filtered.length === 0) {
    return <div className="py-10 text-center text-gray-400">No reminders</div>
  }

  return (
    <div className="space-y-3">
      {filtered.map(r => (
        <div
          key={r.id}
          className="flex cursor-pointer items-center justify-between rounded-xl border p-4"
          onClick={() =>
            navigate({
              to: '/reminder/$reminderId',
              params: { reminderId: String(r.id) }
            })
          }>
          <div>
            <p className={r.completed ? 'text-gray-400 line-through' : ''}>
              {r.title}
            </p>

            {r.date && <small className="text-gray-400">{r.date}</small>}
          </div>

          <div className="flex gap-3" onClick={e => e.stopPropagation()}>
            {filter !== 'trash' && (
              <>
                <Icon
                  icon={r.flagged ? 'mdi:flag' : 'mdi:flag-outline'}
                  onClick={() => toggleFlag(r.id)}
                />

                <Icon
                  icon={
                    filter === 'archive'
                      ? 'mdi:archive-arrow-up-outline'
                      : 'mdi:archive-outline'
                  }
                  onClick={() => toggleArchive(r.id)}
                />

                <Icon
                  icon="mdi:pencil-outline"
                  onClick={() =>
                    navigate({
                      search: {
                        drawer: 'reminder',
                        id: String(r.id)
                      }
                    })
                  }
                />

                <Icon
                  icon="mdi:trash-outline"
                  className="text-red-500"
                  onClick={() => deleteReminder(r.id)}
                />
              </>
            )}

            {filter === 'trash' && (
              <>
                <Icon
                  icon="mdi:restore"
                  onClick={() => restoreFromTrash(r.id)}
                />

                <Icon
                  icon="mdi:delete-forever"
                  className="text-red-500"
                  onClick={() => permanentlyDelete(r.id)}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
