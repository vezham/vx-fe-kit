import { Icon } from '@iconify/react'
import { forwardRef, useState } from 'react'

import { Button, Textarea } from '@vezham/react/v2'

import { CommentListProps, useCommentListProps } from './types'

const CommentList = forwardRef<HTMLDivElement, CommentListProps>(
  (props, ref) => {
    const {
      comments = [],
      onEdit,
      onDelete,
      getCommentItemProps,
      getCommentHeaderProps,
      getCommentContentProps,
      getEditContainerProps,
      getEditActionsProps,
      getAttachmentsContainerProps,
      getAttachmentImageProps,
      getAttachmentLinkProps,
      getActionButtonsProps,
      getEditButtonProps,
      getDeleteButtonProps
    } = useCommentListProps({ ...props, ref })

    const [editingId, setEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState('')

    return (
      <div className="space-y-4">
        {comments.map((comment: any) => (
          <div key={comment.id} {...getCommentItemProps()}>
            <div {...getCommentHeaderProps()}>
              <span className="font-medium">{comment.author}</span>
              <span className="text-xs">
                {comment.createdAt.toLocaleString()}
              </span>
            </div>

            {editingId === comment.id ? (
              <>
                <div {...getEditContainerProps()}>
                  <Textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                  />
                </div>

                <div {...getEditActionsProps()}>
                  <Button
                    size="sm"
                    color="primary"
                    onPress={() => {
                      onEdit?.(comment.id, editText)
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
              <p {...getCommentContentProps()}>{comment.content}</p>
            )}

            {comment.attachments.length > 0 && (
              <div {...getAttachmentsContainerProps()}>
                {comment.attachments.map((att: any) =>
                  att.type.startsWith('image') ? (
                    <img
                      key={att.id}
                      src={att.url}
                      {...getAttachmentImageProps()}
                    />
                  ) : (
                    <a
                      key={att.id}
                      href={att.url}
                      target="_blank"
                      rel="noreferrer"
                      {...getAttachmentLinkProps()}>
                      <Icon icon="mdi:file" />
                      {att.name}
                    </a>
                  )
                )}
              </div>
            )}

            <div {...getActionButtonsProps()}>
              <button
                {...getEditButtonProps()}
                onClick={() => {
                  setEditingId(comment.id)
                  setEditText(comment.content)
                }}>
                Edit
              </button>
              <button
                {...getDeleteButtonProps()}
                onClick={() => onDelete?.(comment.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
)

CommentList.displayName = 'CommentList'
export { CommentList }
