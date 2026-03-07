import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const BankIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/bank/accounts', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/bank/')({
  component: BankIndex
})
