import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const settingsIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/cta/help-support', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/cta/')({
  component: settingsIndex
})
