import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const ReminderIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/contacts/shared/shared-by-me', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/(home)/contacts/shared/')({
  component: ReminderIndex
})
