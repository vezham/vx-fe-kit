'use client'

import {
  createLazyFileRoute,
  useNavigate,
  useParams
} from '@tanstack/react-router'
import { useEffect } from 'react'

function TaskIndexRedirect() {
  const navigate = useNavigate()
  const { projectId, taskId } = useParams({ strict: false })

  useEffect(() => {
    if (!projectId || !taskId) return

    navigate({
      to: '/projects/$projectId/tasks/$taskId/comments',
      params: { projectId, taskId },
      replace: true
    })
  }, [projectId, taskId, navigate])

  return null
}

export const Route = createLazyFileRoute('/projects/$projectId/tasks/$taskId/')(
  {
    component: TaskIndexRedirect
  }
)
