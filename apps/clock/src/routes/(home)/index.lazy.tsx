import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const ClockIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/worldclock', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/(home)/')({
  component: ClockIndex
})
