import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const settingsIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/settings1/workspace', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/settings1/')({
  component: settingsIndex
})
