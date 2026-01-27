import { Icon } from '@iconify/react'
import { useState } from 'react'

import { Button, Textarea } from '@vezham/react/v2'

import type { Comment } from './types'
import { commentStyles } from './variant'

type Props = {
  comments: Comment[]
  onEdit: (id: number, content: string) => void
  onDelete: (id: number) => void
}

export function CommentList({ comments, onEdit, onDelete }: Props) {
  const styles = commentStyles()
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  return (
    <div className="space-y-3">
      {comments.map(comment => (
        <div key={comment.id} className={styles.commentItem()}>
          <div className={styles.commentHeader()}>
            <span className="font-medium">{comment.author}</span>
            <span>{comment.createdAt.toLocaleString()}</span>
          </div>

          {editingId === comment.id ? (
            <>
              <div className="mt-3">
                <Textarea
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
              </div>

              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  color="primary"
                  onPress={() => {
                    onEdit(comment.id, editText)
                    setEditingId(null)
                  }}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => setEditingId(null)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <p className="text-default-800 mt-2 text-sm">{comment.content}</p>
          )}

          {comment.attachments.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-3">
              {comment.attachments.map(att => {
                const isImage = att.type.startsWith('image')

                return (
                  <div key={att.id} className={styles.attachment()}>
                    {isImage ? (
                      <img
                        src={att.url}
                        alt={att.name}
                        className="h-20 w-20 rounded border object-cover"
                      />
                    ) : (
                      <a
                        href={att.url}
                        target="_blank"
                        className="text-primary flex items-center gap-2 text-sm hover:underline">
                        <Icon icon="mdi:file" />
                        {att.name}
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <div className="mt-3 ml-1 flex gap-3 text-xs">
            <button
              className="text-primary"
              onClick={() => {
                setEditingId(comment.id)
                setEditText(comment.content)
              }}>
              Edit
            </button>
            <button
              className="text-danger"
              onClick={() => onDelete(comment.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
