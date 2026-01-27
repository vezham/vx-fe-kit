'use client'

import { Icon } from '@iconify/react'
import { useNavigate, useParams } from '@tanstack/react-router'

import {
  Button,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User
} from '@vezham/react/v2'

import { getStatusProps } from '../../../store/useTasks/data'
import { Attachment, SubTask } from './types'

type Props = {
  subtask?: SubTask | undefined
  children?: React.ReactNode
}

const AttachmentItem = ({ file }: { file: Attachment }) => {
  switch (file.type) {
    case 'image':
      return (
        <div className="w-fit overflow-hidden rounded-md border">
          <Image
            src={file.url}
            alt={file.name}
            width={200}
            height={140}
            className="object-cover"
          />
          <p className="text-default-500 px-2 py-1 text-xs">{file.name}</p>
        </div>
      )

    case 'pdf':
      return (
        <a
          href={file.url}
          target="_blank"
          className="text-danger flex items-center gap-2 text-sm hover:underline">
          <Icon icon="solar:file-pdf-linear" width={18} />
          {file.name}
        </a>
      )

    case 'doc':
      return (
        <a
          href={file.url}
          target="_blank"
          className="text-primary flex items-center gap-2 text-sm hover:underline">
          <Icon icon="solar:file-text-linear" width={18} />
          {file.name}
        </a>
      )

    case 'sheet':
      return (
        <a
          href={file.url}
          target="_blank"
          className="text-success flex items-center gap-2 text-sm hover:underline">
          <Icon icon="solar:file-spreadsheet-linear" width={18} />
          {file.name}
        </a>
      )

    default:
      return (
        <a
          href={file.url}
          target="_blank"
          className="text-default-500 flex items-center gap-2 text-sm hover:underline">
          <Icon icon="solar:file-linear" width={18} />
          {file.name}
        </a>
      )
  }
}

export const SubTaskDetailModal = ({ subtask, children }: Props) => {
  const navigate = useNavigate()
  const { taskId, subtaskId } = useParams({ strict: false })

  const closeModal = () => {
    navigate({
      to: '/projects/$projectId/tasks/$taskId/subtasks',
      params: { taskId }
    })
  }

  if (!subtask) return null

  const status = getStatusProps[
    subtask.status as keyof typeof getStatusProps
  ] || {
    label: subtask.status,
    color: ''
  }

  return (
    <Modal
      isOpen={Boolean(subtaskId)}
      onOpenChange={open => {
        if (!open) closeModal()
      }}
      size="md"
      scrollBehavior="inside">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>Subtask Details</ModalHeader>

            <ModalBody className="space-y-4">
              <p className="text-lg font-semibold">{subtask.subtaskname}</p>

              <p className="text-default-500 text-sm">{subtask.description}</p>

              <div className="flex items-center justify-between">
                <User
                  avatarProps={{ src: subtask.owner.avatar, radius: 'lg' }}
                  name={subtask.owner.name}
                  description={subtask.owner.email}
                />

                <Chip className={status.color}>{status.label}</Chip>
              </div>

              {subtask.attachments?.length > 0 && (
                <div>
                  <b>Attachments</b>
                  <div className="mt-2 grid gap-2">
                    {subtask.attachments.map(file => (
                      <AttachmentItem key={file.id} file={file} />
                    ))}
                  </div>
                </div>
              )}

              {children}
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
