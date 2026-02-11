import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const ReminderIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/calendar/today', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/(home)/')({
  component: ReminderIndex
})
