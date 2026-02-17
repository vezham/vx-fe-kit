import { useEffect, useState } from 'react'

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea
} from '@vezham/react/v2'

import { useNotes } from './store'
import { Note } from './types'

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editNote?: Note | null
}

const NoteModal: React.FC<Props> = ({ isOpen, onOpenChange, editNote }) => {
  const { addNote, updateNote } = useNotes()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title)
      setContent(editNote.content)
    } else {
      setTitle('')
      setContent('')
    }
  }, [editNote, isOpen])

  const isDisabled = !title.trim() || !content.trim()

  const handleSave = (onClose: () => void) => {
    if (isDisabled) return

    if (editNote) {
      updateNote(editNote.id, title, content)
    } else {
      addNote(title, content)
    }

    setTitle('')
    setContent('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="text-xl">
              {editNote ? 'Edit Note' : 'Create Note'}
            </ModalHeader>

            <ModalBody className="flex flex-col gap-4">
              <Input
                label="Title"
                variant="bordered"
                value={title}
                onChange={e => setTitle(e.target.value)}
                autoFocus
                isRequired
              />

              <Textarea
                label="Notes"
                variant="bordered"
                value={content}
                onChange={e => setContent(e.target.value)}
                minRows={4}
                isRequired
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>

              <Button
                color="primary"
                isDisabled={isDisabled}
                onPress={() => handleSave(onClose)}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default NoteModal
