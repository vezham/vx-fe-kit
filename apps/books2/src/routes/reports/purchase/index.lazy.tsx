import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const SalesIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/reports/purchase/purchase-reports', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/reports/purchase/')({
  component: SalesIndex
})
