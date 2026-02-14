import { createLazyFileRoute } from '@tanstack/react-router'
import React from 'react'

import { Button } from '@vezham/react/v2'

import { useContacts } from '../../../pages/contact/data'
import CreateGroupModal from '../../../pages/groups/modal'

export const Route = createLazyFileRoute('/(home)/groups/')({
  component: RouteComponent
})

function RouteComponent() {
  const { contacts } = useContacts()
  const [open, setOpen] = React.useState(false)

  if (!contacts || contacts.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 text-gray-500">
        <p>No Groups</p>
        <Button onClick={() => setOpen(true)}>Create New Group</Button>
        <CreateGroupModal isOpen={open} onOpenChange={setOpen} />
      </div>
    )
  }

  return null
}
