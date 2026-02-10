import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const ReminderIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/reminders/all', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/reminders/')({
  component: ReminderIndex
})
