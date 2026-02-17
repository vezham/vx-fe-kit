import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@vezham/react/v2'

import { Note } from '../notes/types'

type Props = {
  isOpen: boolean
  onClose: () => void
  note: Note | null
  onPin?: () => void
  onArchive?: () => void
  onUnarchive?: () => void
  onDelete?: () => void
  onRestore?: () => void
  onPermanentDelete?: () => void
}

const NoteDetailModal: React.FC<Props> = ({
  isOpen,
  onClose,
  note,

  onDelete,
  onRestore,
  onPermanentDelete
}) => {
  if (!note) return null

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="md">
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <span className="text-lg font-semibold">{note.title}</span>
        </ModalHeader>

        <ModalBody>
          <p className="whitespace-pre-wrap text-gray-700">{note.content}</p>

          <p className="mt-4 text-xs text-gray-400">
            Created: {new Date(note.createdAt).toLocaleString()}
          </p>
        </ModalBody>

        <ModalFooter className="flex justify-end gap-2">
          {onDelete && (
            <Button color="danger" variant="light" onClick={onDelete}>
              Move to Trash
            </Button>
          )}

          {onRestore && (
            <Button color="success" variant="light" onClick={onRestore}>
              Restore
            </Button>
          )}

          {onPermanentDelete && (
            <Button color="danger" onClick={onPermanentDelete}>
              Delete Forever
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NoteDetailModal
