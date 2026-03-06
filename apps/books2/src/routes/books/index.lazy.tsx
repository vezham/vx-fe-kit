import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const BooksIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/books/overview', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/books/')({
  component: BooksIndex
})
