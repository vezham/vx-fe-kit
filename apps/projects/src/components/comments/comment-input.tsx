import { Icon } from '@iconify/react'
import { forwardRef, useRef, useState } from 'react'

import { Button, Textarea } from '@vezham/react/v2'

import { CommentInputProps, useCommentInputProps } from './types'

const CommentInput = forwardRef<HTMLDivElement, CommentInputProps>(
  (props, ref) => {
    const {
      getInputBoxProps,
      getInputHeaderProps,
      getAvatarProps,
      getEditorProps,
      getFooterProps,
      getAttachmentPreviewProps,
      getAttachmentProps,
      currentUser = 'Anonymous',
      onAdd
    } = useCommentInputProps({ ...props, ref })

    const fileRef = useRef<HTMLInputElement>(null)
    const [text, setText] = useState('')
    const [files, setFiles] = useState<File[]>([])

    const handleAddComment = () => {
      if (!text.trim() || !onAdd) return

      const comment = {
        id: Date.now(),
        author: currentUser,
        content: text,
        createdAt: new Date(),
        attachments: files.map(file => ({
          id: Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file)
        }))
      }

      onAdd(comment)
      setText('')
      setFiles([])
      if (fileRef.current) fileRef.current.value = ''
    }

    return (
      <div {...getInputBoxProps()}>
        <div {...getInputHeaderProps()}>
          <div {...getAvatarProps()}>{currentUser.charAt(0)}</div>
          <span className="font-medium">{currentUser}</span>
        </div>

        <Textarea
          {...getEditorProps()}
          value={text}
          placeholder="Add a comment..."
          onChange={e => setText(e.target.value)}
        />

        {files.length > 0 && (
          <div {...getAttachmentPreviewProps()}>
            {files.map(file => (
              <div key={file.name} {...getAttachmentProps()}>
                <Icon icon="mdi:file" />
                {file.name}
              </div>
            ))}
          </div>
        )}

        <div {...getFooterProps()}>
          <Button as="label" isIconOnly size="sm">
            <Icon icon="mdi:paperclip" />
            <input
              ref={fileRef}
              hidden
              type="file"
              multiple
              onChange={e => setFiles(Array.from(e.target.files ?? []))}
            />
          </Button>

          <Button
            size="sm"
            color="primary"
            isDisabled={!text.trim()}
            onPress={handleAddComment}>
            Add Comment
          </Button>
        </div>
      </div>
    )
  }
)

CommentInput.displayName = 'CommentInput'
export { CommentInput }
