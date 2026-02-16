import { useState } from 'react'

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@vezham/react/v2'

import { useReminders } from './store'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function CreateListModal({ isOpen, onClose }: Props) {
  const { lists, addList } = useReminders()
  const [label, setLabel] = useState('')

  const reset = () => {
    setLabel('')
  }

  const handleSave = () => {
    const trimmed = label.trim()
    if (!trimmed) return

    if (lists.includes(trimmed)) {
      reset()
      onClose()
      return
    }

    addList(trimmed)
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Create List</ModalHeader>

        <ModalBody>
          <Input
            autoFocus
            placeholder="New list name"
            value={label}
            onChange={e => setLabel(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            variant="light"
            onPress={() => {
              reset()
              onClose()
            }}>
            Cancel
          </Button>

          <Button color="primary" onPress={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
