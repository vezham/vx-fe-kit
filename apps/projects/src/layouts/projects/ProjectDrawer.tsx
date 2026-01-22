'use client'

import { Icon } from '@iconify/react'
import React from 'react'

import {
  Button,
  Chip,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Image,
  Spinner,
  Tooltip,
  User
} from '@vezham/react/v2'

import { Attachment, Project, Tags } from './types'

interface ProjectDrawerProps {
  isOpen: boolean
  selectedUserId: number | null
  selectedIndex: number | null
  sortedItems: Project[]
  selectedUser: Project | undefined
  selectedLoading: boolean
  selectedError: boolean
  onOpenChange: () => void
  setSelectedKeys: (keys: Set<number>) => void
  setSelectedUserId: (id: number | null) => void
  setSelectedIndex: (index: number | null) => void
  selectedRefetch: () => void
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

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
  isOpen,
  selectedUserId,
  selectedIndex,
  sortedItems,
  selectedUser,
  selectedLoading,
  selectedError,
  onOpenChange,
  setSelectedKeys,
  setSelectedUserId,
  setSelectedIndex,
  selectedRefetch
}) => {
  const onClose = () => {
    setSelectedKeys(new Set([]))
    setSelectedUserId(null)
    onOpenChange()
  }

  return (
    <Drawer
      hideCloseButton
      backdrop="blur"
      classNames={{
        base: 'sm:data-[placement=right]:m-2 sm:data-[placement=left]:m-2 rounded-medium'
      }}
      isOpen={isOpen}
      onOpenChange={open => {
        if (!open) {
          setSelectedKeys(new Set([]))
          setSelectedUserId(null)
        }
        onOpenChange()
      }}>
      <DrawerContent>
        <DrawerHeader className="border-default-200/50 bg-content1/50 absolute inset-x-0 top-0 z-50 flex flex-row justify-between gap-2 border-b px-2 py-2 backdrop-blur-lg backdrop-saturate-150">
          <Tooltip content="Close">
            <Button
              isIconOnly
              className="text-default-400"
              size="sm"
              variant="light"
              onPress={onClose}>
              <svg
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg">
                <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
              </svg>
            </Button>
          </Tooltip>

          <div className="flex w-full justify-start gap-2">
            <Button
              className="text-small text-default-500 font-medium"
              size="sm"
              variant="flat"
              startContent={
                <svg
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.85.75c-.908 0-1.702.328-2.265.933-.558.599-.835 1.41-.835 2.29V7.88c0 .801.23 1.548.697 2.129.472.587 1.15.96 1.951 1.06a.75.75 0 1 0 .185-1.489c-.435-.054-.752-.243-.967-.51-.219-.273-.366-.673-.366-1.19V3.973c0-.568.176-.993.433-1.268.25-.27.632-.455 1.167-.455h4.146c.479 0 .828.146 1.071.359.246.215.43.54.497.979a.75.75 0 0 0 1.483-.23c-.115-.739-.447-1.4-.99-1.877C9.51 1 8.7f6.75 7.996.75zM7.9 4.828c-.908 0-1.702.326-2.265.93-.558.6-.835 1.41-.835 2.29V3.905c0 .879.275 1.69.833 2.289.563.605 1.357.931 2.267.931h4.144c.91 0 1.705-.326 2.268-.931.558-.599.833-1.41.833-2.289V8.048c0-.879-.275-1.69-.833-2.289-.563-.605-1.357-.931-2.267-.931zm-1.6 3.22c0-.568.176-.992.432-1.266.25-.27.632-.454 1.168-.454h4.145c.54 0 .92.185 1.17.453.255.274.43.698.43 1.267v3.905c0 .569-.175.993-.43 1.267-.25.268-.631.453-1.17.453H7.898c-.54 0-.92-.185-1.17-.453-.255-.274-.43-.698-.43-1.267z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              }
              onPress={() => {
                if (selectedUserId) {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/user/${selectedUserId}`
                  )
                }
              }}>
              Copy Link
            </Button>
            <Button
              className="text-small text-default-500 font-medium"
              size="sm"
              variant="flat"
              endContent={
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              }>
              Event Page
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Tooltip content="Previous">
              <Button
                isIconOnly
                className="text-default-500"
                size="sm"
                variant="flat"
                isDisabled={selectedIndex === 0}
                onPress={() => {
                  if (selectedIndex !== null && selectedIndex > 0) {
                    const newIndex = selectedIndex - 1
                    setSelectedIndex(newIndex)
                    const newUser = sortedItems[newIndex]
                    setSelectedUserId(newUser.id)
                    setSelectedKeys(new Set([newUser.id]))
                  }
                }}>
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </Button>
            </Tooltip>

            <Tooltip content="Next">
              <Button
                isIconOnly
                className="text-default-500"
                size="sm"
                variant="flat"
                isDisabled={
                  selectedIndex === null ||
                  selectedIndex >= sortedItems.length - 1
                }
                onPress={() => {
                  if (
                    selectedIndex !== null &&
                    selectedIndex < sortedItems.length - 1
                  ) {
                    const newIndex = selectedIndex + 1
                    setSelectedIndex(newIndex)
                    const newUser = sortedItems[newIndex]
                    setSelectedUserId(newUser.id)
                    setSelectedKeys(new Set([newUser.id]))
                  }
                }}>
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Button>
            </Tooltip>
          </div>
        </DrawerHeader>

        <DrawerBody className="pt-16">
          {selectedLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Spinner size="lg" />
              <p className="text-default-500 mt-2 text-sm">Loading user...</p>
            </div>
          ) : selectedError ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-sm">Failed to load user details.</p>
              <Button
                size="sm"
                variant="flat"
                color="danger"
                onPress={() => selectedRefetch()}>
                Retry
              </Button>
            </div>
          ) : !selectedUser ? (
            <p className="text-default-400 text-sm">No user selected</p>
          ) : (
            <div className="space-y-4">
              <User
                avatarProps={{
                  src:
                    selectedUser.owner.avatar ||
                    'https://i.pravatar.cc/150?u=a04258',
                  name: selectedUser.owner.name
                }}
                name={selectedUser.owner.name}
                description={selectedUser.owner.email}
              />

              <div>
                <b>Project Name:</b> {selectedUser.project}
              </div>
              <div>
                <b>Date:</b>{' '}
                {selectedUser?.startDate
                  ? new Intl.DateTimeFormat('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }).format(new Date(selectedUser.startDate))
                  : '—'}
              </div>
              <div>
                <b>Due Date:</b>{' '}
                {selectedUser?.dueDate
                  ? new Intl.DateTimeFormat('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }).format(new Date(selectedUser.dueDate))
                  : '—'}
              </div>

              <div className="flex items-center gap-2">
                <b>Status:</b>
                <Chip
                  radius="sm"
                  color={
                    selectedUser.status === 'Active'
                      ? 'success'
                      : selectedUser.status === 'InProgress'
                        ? 'warning'
                        : selectedUser.status === 'Delayed'
                          ? 'danger'
                          : selectedUser.status === 'OnHold'
                            ? 'warning'
                            : selectedUser.status === 'Approved'
                              ? 'primary'
                              : selectedUser.status === 'InTesting'
                                ? 'default'
                                : selectedUser.status === 'Cancelled'
                                  ? 'danger'
                                  : selectedUser.status === 'Planning'
                                    ? 'primary'
                                    : selectedUser.status === 'Completed'
                                      ? 'success'
                                      : selectedUser.status === 'Invoiced'
                                        ? 'secondary'
                                        : 'default'
                  }
                  variant="dot">
                  {selectedUser.status}
                </Chip>
              </div>

              <div className="flex gap-2">
                <b>Tags:</b>
                {selectedUser.tags
                  .slice(0, 4)
                  .map((tag: Tags, index: number) =>
                    index < 3 ? (
                      <Chip
                        key={tag}
                        className="bg-default-100 text-default-800 rounded-md px-[6px] capitalize"
                        size="sm"
                        variant="flat">
                        {tag}
                      </Chip>
                    ) : (
                      <Chip
                        key="more"
                        className="text-default-500"
                        size="sm"
                        variant="flat">
                        +{selectedUser.tags.length - 3}
                      </Chip>
                    )
                  )}
              </div>
              <div className="text-justify">
                <b>Description: </b>
                <br />
                {selectedUser.description}
              </div>
              <div>
                <b>Attachments:</b>
                <div className="mt-2 space-y-3">
                  {selectedUser.attachments.map(file => (
                    <AttachmentItem key={file.id} file={file} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </DrawerBody>

        <DrawerFooter className="flex flex-col gap-1">
          <Button color="primary" onPress={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
