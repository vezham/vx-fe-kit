import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const settingsIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/teams/overview', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/teams/')({
  component: settingsIndex
})
