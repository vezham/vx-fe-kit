import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const NotesIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/all', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/(home)/')({
  component: NotesIndex
})
