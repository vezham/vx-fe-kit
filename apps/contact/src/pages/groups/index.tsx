import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'

import { useContacts } from '../contact/data'

const GroupsList = () => {
  const { groups, deleteGroup } = useContacts()
  const navigate = useNavigate()

  if (!groups.length) {
    return (
      <div className="text-muted flex items-center justify-center">
        No groups created yet
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {groups.map(group => (
        <div
          key={group.id}
          className="hover:bg-default-100 flex items-center justify-between rounded-lg border p-4 transition">
          <div
            onClick={() => navigate({ to: `/groups/${group.id}` })}
            className="flex flex-1 cursor-pointer items-center gap-3">
            <Icon icon="mdi:label-outline" width={20} />
            <span className="font-medium">{group.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <Icon icon="mdi:chevron-right" width={20} />

            <Icon
              icon="mdi:delete-outline"
              width={20}
              className="cursor-pointer text-red-500 transition hover:scale-110"
              onClick={() => deleteGroup(group.id)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default GroupsList
