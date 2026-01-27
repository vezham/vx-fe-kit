'use client'

import { useState } from 'react'

import { CommentInput } from './commentInput'
import { CommentList } from './commentList'
import type { Comment } from './types'

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([])

  const currentUser = 'Krishna Prasad'

  const addComment = (comment: Comment) => {
    setComments(prev => [comment, ...prev])
  }

  const updateComment = (id: number, content: string) => {
    setComments(prev => prev.map(c => (c.id === id ? { ...c, content } : c)))
  }

  const deleteComment = (id: number) => {
    setComments(prev => prev.filter(c => c.id !== id))
  }
  return (
    <div className="space-y-4">
      <CommentInput currentUser={currentUser} onAdd={addComment} />

      <CommentList
        comments={comments}
        onEdit={updateComment}
        onDelete={deleteComment}
      />
    </div>
  )
}
