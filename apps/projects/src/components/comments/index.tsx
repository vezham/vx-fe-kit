'use client'

import { forwardRef, useState } from 'react'

import { CommentInput } from './comment-input'
import { CommentList } from './comment-list'
import { CommentSectionProps, useCommentSectionProps } from './types'

const CommentSection = forwardRef<HTMLDivElement, CommentSectionProps>(
  (props, ref) => {
    const {
      getSectionProps,
      currentUser = 'Krishna Prasad',
      comments: initialComments = [],
      onAddComment,
      onUpdateComment,
      onDeleteComment
    } = useCommentSectionProps({ ...props, ref })

    const [comments, setComments] = useState(initialComments)

    return (
      <div {...getSectionProps()}>
        <CommentInput
          currentUser={currentUser}
          onAdd={comment => {
            setComments((prev: any) => [comment, ...prev])
            onAddComment?.(comment)
          }}
        />

        <CommentList
          comments={comments}
          onEdit={(id, content) => {
            setComments((prev: any) =>
              prev.map((c: any) => (c.id === id ? { ...c, content } : c))
            )
            onUpdateComment?.(id, content)
          }}
          onDelete={id => {
            setComments((prev: any) => prev.filter((c: any) => c.id !== id))
            onDeleteComment?.(id)
          }}
        />
      </div>
    )
  }
)

CommentSection.displayName = 'CommentSection'
export { CommentSection }
