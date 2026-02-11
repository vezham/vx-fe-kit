import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const settingsIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/notes/shared/shared-by-me', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/(home)/notes/shared/')({
  component: settingsIndex
})
