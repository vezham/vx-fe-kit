import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const SalesIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/reports/sales/sales-register', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/reports/sales/')({
  component: SalesIndex
})
