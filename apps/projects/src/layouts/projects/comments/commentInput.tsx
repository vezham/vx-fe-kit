'use client'

import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'

import { Button, Input, Textarea } from '@vezham/react/v2'

import type { Comment } from './types'
import { commentStyles } from './variant'

type Props = {
  currentUser: string
  onAdd: (comment: Comment) => void
}

export function CommentInput({ currentUser, onAdd }: Props) {
  const styles = commentStyles()
  const fileRef = useRef<HTMLInputElement>(null)

  const [text, setText] = useState('')
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className={styles.box()}>
      <div className={styles.header()}>
        <div className={styles.avatar()}>{currentUser[0]}</div>
        <span className="font-medium">{currentUser}</span>
      </div>

      <div className="px-4 py-3">
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          className={styles.editor()}
        />
      </div>

      {/* Attachments preview */}
      {files.length > 0 && (
        <div className="px-4 pb-2">
          {files.map(file => (
            <div key={file.name} className={styles.attachment()}>
              <Icon icon="mdi:file" />
              {file.name}
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer()}>
        <Button as="label" size="sm" isIconOnly className={styles.toolBtn()}>
          <Icon icon="mdi:paperclip" fontSize={18} />

          <input
            type="file"
            hidden
            multiple
            onChange={e => setFiles(Array.from(e.target.files || []))}
          />
        </Button>

        <Button
          size="sm"
          color="primary"
          isDisabled={!text.trim()}
          onPress={() => {
            onAdd({
              id: Math.floor(Math.random() * 1000),
              author: currentUser,
              content: text,
              createdAt: new Date(),
              attachments: files.map(f => ({
                id: Math.floor(Math.random() * 1000),
                name: f.name,
                size: f.size,
                type: f.type,
                url: URL.createObjectURL(f)
              }))
            })
            setText('')
            setFiles([])
          }}>
          Add Comment
        </Button>
      </div>
    </div>
  )
}
