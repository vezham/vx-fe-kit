import { useNavigate } from '@tanstack/react-router'
import React from 'react'

import { Button } from '@vezham/react/v2'

import { useReminders } from '../reminders/store'

const Trash = () => {
  const { counts } = useReminders()
  const navigate = useNavigate()
  return (
    <div>
      <Button
        fullWidth
        variant="light"
        color="danger"
        onClick={() => navigate({ to: '/trash' })}
        className="text-danger border-danger-500 flex justify-between rounded-md border">
        <span>Trash</span>
        <span className="text-xs">{counts.trash}</span>
      </Button>
    </div>
  )
}

export default Trash
