// routes/notes/route.tsx
import { createLazyFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const NotesIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/notes/all', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/(home)/notes/')({
  component: NotesIndex
})
