import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const ClassIndex = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/academic1/examinations/exam', replace: true })
  }, [navigate])

  return null
}

export const Route = createLazyFileRoute('/academic1/examinations/')({
  component: ClassIndex
})
