import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'

import { Button } from '@vezham/react/v2'

import { useReminders } from '../reminders/store'

const ListPage = () => {
  const { lists, getListCount, deleteList } = useReminders()
  const navigate = useNavigate()

  return (
    <>
      <div className="mt-4 text-lg font-semibold">My Lists</div>

      {lists.map(list => (
        <div
          key={list}
          className="border-default-400 flex items-center justify-between rounded-md border px-2">
          <Button
            fullWidth
            variant="flat"
            color="default"
            className="flex-1 justify-between px-4 py-2"
            onClick={() =>
              navigate({
                to: '/lists/$listName',
                params: { listName: list }
              })
            }>
            <span>{list}</span>
          </Button>

          <div className="flex items-center">
            <span className="text-xs">{getListCount(list)}</span>
            <Button
              isIconOnly
              variant="light"
              color="danger"
              className="ml-2"
              size="sm"
              onClick={() => deleteList(list)}>
              <Icon icon="mdi:delete" />
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}

export default ListPage
