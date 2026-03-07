import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const BankIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/books-settings/company', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/books-settings/')({
  component: BankIndex
})
