'use client'

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

import { getStatusProps } from '../../../store/useTasks/data'
import { SubTaskDrawer } from '../subtasks/SubTaskDrawer'
import { Attachment, Tags, Task } from './types'

type Props = {
  task?: Task | null
  onOpenChange: () => void
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

export const TaskDetailModal = ({ task, children }: Props) => {
  const navigate = useNavigate()
  const { projectId, taskId } = useParams({ strict: false })
  const location = useLocation()
  const [isSubtaskOpen, setIsSubtaskOpen] = useState(false)

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
      size="full"
      scrollBehavior="inside">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>Task Details</ModalHeader>
            <ModalBody className="space-y-4">
              <div className="flex flex-col gap-2">
                <p className="text-lg font-semibold">{task.taskname}</p>
                <p className="text-default-500 text-sm">{task.description}</p>
              </div>

              <div className="flex items-center gap-2">
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
                {task.tags?.map((tag: Tags, i: number) => (
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
              <div>
                <b>Atttachments:</b>
                <p className="mt-2 items-center space-y-3 md:flex md:space-y-0 md:space-x-3">
                  {task.attachments.map(file => (
                    <AttachmentItem key={file.id} file={file} />
                  ))}
                </p>
              </div>
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
                        to: '/projects/$projectId/tasks/$taskId/$tab',
                        params: {
                          projectId,
                          taskId,
                          tab: String(key)
                        }
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
