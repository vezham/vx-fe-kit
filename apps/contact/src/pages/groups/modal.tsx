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

import { useContacts } from '../contact/data'

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CreateGroupModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const { addGroup } = useContacts()
  const [name, setName] = useState('')

  const handleSave = (onClose: () => void) => {
    if (!name.trim()) return
    addGroup(name)
    setName('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="text-2xl">Create Group</ModalHeader>

            <ModalBody>
              <Input
                label="New label"
                variant="bordered"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={() => handleSave(onClose)}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CreateGroupModal
