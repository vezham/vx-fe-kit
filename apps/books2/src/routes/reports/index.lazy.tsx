import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const ReportsIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/reports/overview', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/reports/')({
  component: ReportsIndex
})
