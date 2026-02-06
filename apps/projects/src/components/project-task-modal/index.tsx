import { Icon } from '@iconify/react'
import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'

import {
  Button,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  User
} from '@vezham/react/v2'

import { getStatusProps } from '../../store/useTasks/data'
import { SubTaskDrawer } from '../project-subtask-drawer'
import { TaskDetailModalProps, useTaskDetailModalProps } from './types'

const AttachmentItem = ({ file }: { file: any }) => {
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

export const TaskDetailModal = ({ task, children }: TaskDetailModalProps) => {
  const navigate = useNavigate()
  const { projectId, taskId } = useParams({ strict: false })
  const location = useLocation()
  const [isSubtaskOpen, setIsSubtaskOpen] = useState(false)

  const {
    getModalContentProps,
    getModalHeaderProps,
    getModalBodyProps,
    getModalFooterProps,
    getTitleProps,
    getDescriptionProps,
    getOwnerContainerProps,
    hasAttachments,
    getAttachmentsSectionProps,
    getAttachmentsGridProps
  } = useTaskDetailModalProps({ task })

  const closeModal = () => {
    navigate({
      to: '/projects/$projectId/tasks',
      params: { projectId }
    })
  }

  const activeTab = location.pathname.includes('/comments')
    ? 'comments'
    : location.pathname.includes('/subtasks')
      ? 'subtasks'
      : 'issues'

  if (!task) return null

  const status = getStatusProps[task.status as keyof typeof getStatusProps] || {
    label: task.status,
    color: ''
  }

  return (
    <Modal
      isOpen={Boolean(taskId)}
      onOpenChange={closeModal}
      size="5xl"
      scrollBehavior="inside">
      <ModalContent {...getModalContentProps()}>
        {onClose => (
          <>
            <ModalHeader {...getModalHeaderProps()}>Task Details</ModalHeader>
            <ModalBody {...getModalBodyProps()}>
              <div className="flex flex-col gap-2">
                <p {...getTitleProps()}>{task.taskname}</p>
                <p {...getDescriptionProps()}>{task.description}</p>
              </div>

              <div {...getOwnerContainerProps()}>
                <User
                  avatarProps={{ src: task.owner.avatar, radius: 'lg' }}
                  name={task.owner.name}
                  description={task.owner.email}
                />
                <Chip
                  variant="solid"
                  radius="sm"
                  className={`${status.color}`}
                  startContent={
                    <Icon icon="solar:circle-linear" width={16} height={16} />
                  }>
                  {status.label}
                </Chip>
              </div>

              <div className="flex flex-wrap gap-2">
                <b>Tags:</b>
                {task.tags?.map((tag: string, i: number) => (
                  <Chip
                    key={tag}
                    size="sm"
                    variant="flat"
                    className="bg-default-100 text-default-800 capitalize">
                    {tag}
                  </Chip>
                ))}
              </div>

              <div className="flex gap-4">
                <p className="text-sm">
                  <strong>Start:</strong>{' '}
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }).format(task.startDate)}
                </p>
                <p className="text-sm">
                  <strong>Due:</strong>{' '}
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }).format(task.dueDate)}
                </p>
              </div>
              <div className="flex gap-4">
                <b>Priority:</b>
                <p>{task.priority}</p>
                <b>BillingType:</b>
                <p>{task.billingtype}</p>
              </div>

              {hasAttachments && (
                <div {...getAttachmentsSectionProps()}>
                  <b>Atttachments:</b>
                  <div {...getAttachmentsGridProps()}>
                    {task.attachments.map((file: any) => (
                      <AttachmentItem key={file.id} file={file} />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
                <div className="w-full py-4 sm:w-auto md:py-0">
                  <Tabs
                    classNames={{
                      base: 'flex w-full sm:w-auto',
                      tabList: 'w-full sm:w-auto'
                    }}
                    color="primary"
                    size="sm"
                    selectedKey={activeTab}
                    onSelectionChange={key => {
                      navigate({
                        to:
                          key === 'comments'
                            ? '/projects/$projectId/tasks/$taskId/comments'
                            : key === 'subtasks'
                              ? '/projects/$projectId/tasks/$taskId/subtasks'
                              : '/projects/$projectId/tasks/$taskId/issues',
                        params: { projectId, taskId }
                      })
                    }}>
                    <Tab key="comments" title="Comments" />
                    <Tab key="subtasks" title="Subtasks" />
                    <Tab key="issues" title="Issues" />
                  </Tabs>
                </div>

                <div className="flex w-full flex-col sm:w-auto sm:flex-row">
                  {activeTab === 'subtasks' && (
                    <Button
                      size="sm"
                      color="primary"
                      className="w-full flex-shrink-0 sm:w-auto"
                      onPress={() => setIsSubtaskOpen(true)}>
                      Add Subtask
                    </Button>
                  )}

                  {activeTab === 'issues' && (
                    <Button
                      size="sm"
                      color="primary"
                      className="w-full flex-shrink-0 sm:w-auto">
                      Add Issues
                    </Button>
                  )}
                </div>
                <SubTaskDrawer
                  isOpen={isSubtaskOpen}
                  onOpenChange={open => setIsSubtaskOpen(open)}
                  taskId={task.id}
                />
              </div>
              {children}
            </ModalBody>

            <ModalFooter {...getModalFooterProps()}>
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

TaskDetailModal.displayName = 'TaskDetailModal'
