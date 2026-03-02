import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const CalendarIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/today', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/')({
  component: CalendarIndex
})
