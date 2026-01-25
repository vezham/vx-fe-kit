// 'use client'
// import { Icon } from '@iconify/react'
// import React from 'react'
// import {
//   Button,
//   Chip,
//   Drawer,
//   DrawerBody,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   Image,
//   Spinner,
//   Tooltip,
//   User
// } from '@vezham/react/v2'
// import { Attachment, Task, Tags } from './types'
// interface ProjectDrawerProps {
//   isOpen: boolean
//   selectedUserId: number | null
//   selectedIndex: number | null
//   sortedItems: Task[]
//   selectedUser: Task | undefined
//   selectedLoading: boolean
//   selectedError: boolean
//   onOpenChange: () => void
//   setSelectedKeys: (keys: Set<number>) => void
//   setSelectedUserId: (id: number | null) => void
//   setSelectedIndex: (index: number | null) => void
//   selectedRefetch: () => void
// }
// const AttachmentItem = ({ file }: { file: Attachment }) => {
//   switch (file.type) {
//     case 'image':
//       return (
//         <div className="w-fit overflow-hidden rounded-md border">
//           <Image
//             src={file.url}
//             alt={file.name}
//             width={200}
//             height={140}
//             className="object-cover"
//           />
//           <p className="text-default-500 px-2 py-1 text-xs">{file.name}</p>
//         </div>
//       )
//     case 'pdf':
//       return (
//         <a
//           href={file.url}
//           target="_blank"
//           className="text-danger flex items-center gap-2 text-sm hover:underline">
//           <Icon icon="solar:file-pdf-linear" width={18} />
//           {file.name}
//         </a>
//       )
//     case 'doc':
//       return (
//         <a
//           href={file.url}
//           target="_blank"
//           className="text-primary flex items-center gap-2 text-sm hover:underline">
//           <Icon icon="solar:file-text-linear" width={18} />
//           {file.name}
//         </a>
//       )
//     case 'sheet':
//       return (
//         <a
//           href={file.url}
//           target="_blank"
//           className="text-success flex items-center gap-2 text-sm hover:underline">
//           <Icon icon="solar:file-spreadsheet-linear" width={18} />
//           {file.name}
//         </a>
//       )
//     default:
//       return (
//         <a
//           href={file.url}
//           target="_blank"
//           className="text-default-500 flex items-center gap-2 text-sm hover:underline">
//           <Icon icon="solar:file-linear" width={18} />
//           {file.name}
//         </a>
//       )
//   }
// }
// export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({
//   isOpen,
//   selectedUserId,
//   selectedIndex,
//   sortedItems,
//   selectedUser,
//   selectedLoading,
//   selectedError,
//   onOpenChange,
//   setSelectedKeys,
//   setSelectedUserId,
//   setSelectedIndex,
//   selectedRefetch
// }) => {
//   const onClose = () => {
//     setSelectedKeys(new Set([]))
//     setSelectedUserId(null)
//     onOpenChange()
//   }
//   return (
//     <Drawer
//       hideCloseButton
//       backdrop="blur"
//       classNames={{
//         base: 'sm:data-[placement=right]:m-2 sm:data-[placement=left]:m-2 rounded-medium'
//       }}
//       isOpen={isOpen}
//       onOpenChange={open => {
//         if (!open) {
//           setSelectedKeys(new Set([]))
//           setSelectedUserId(null)
//         }
//         onOpenChange()
//       }}>
//       <DrawerContent>
//         <DrawerHeader className="border-default-200/50 bg-content1/50 absolute inset-x-0 top-0 z-50 flex flex-row justify-between gap-2 border-b px-2 py-2 backdrop-blur-lg backdrop-saturate-150">
//           <Tooltip content="Close">
//             <Button
//               isIconOnly
//               className="text-default-400"
//               size="sm"
//               variant="light"
//               onPress={onClose}>
//               <svg
//                 fill="none"
//                 height="20"
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 width="20"
//                 xmlns="http://www.w3.org/2000/svg">
//                 <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
//               </svg>
//             </Button>
//           </Tooltip>
//           <div className="flex items-center gap-1">
//             <Tooltip content="Previous">
//               <Button
//                 isIconOnly
//                 className="text-default-500"
//                 size="sm"
//                 variant="flat"
//                 isDisabled={selectedIndex === 0}
//                 onPress={() => {
//                   if (selectedIndex !== null && selectedIndex > 0) {
//                     const newIndex = selectedIndex - 1
//                     setSelectedIndex(newIndex)
//                     const newUser = sortedItems[newIndex]
//                     setSelectedUserId(newUser.id)
//                     setSelectedKeys(new Set([newUser.id]))
//                   }
//                 }}>
//                 <svg
//                   fill="none"
//                   height="16"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                   width="16"
//                   xmlns="http://www.w3.org/2000/svg">
//                   <path d="m18 15-6-6-6 6" />
//                 </svg>
//               </Button>
//             </Tooltip>
//             <Tooltip content="Next">
//               <Button
//                 isIconOnly
//                 className="text-default-500"
//                 size="sm"
//                 variant="flat"
//                 isDisabled={
//                   selectedIndex === null ||
//                   selectedIndex >= sortedItems.length - 1
//                 }
//                 onPress={() => {
//                   if (
//                     selectedIndex !== null &&
//                     selectedIndex < sortedItems.length - 1
//                   ) {
//                     const newIndex = selectedIndex + 1
//                     setSelectedIndex(newIndex)
//                     const newUser = sortedItems[newIndex]
//                     setSelectedUserId(newUser.id)
//                     setSelectedKeys(new Set([newUser.id]))
//                   }
//                 }}>
//                 <svg
//                   fill="none"
//                   height="16"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                   width="16"
//                   xmlns="http://www.w3.org/2000/svg">
//                   <path d="m6 9 6 6 6-6" />
//                 </svg>
//               </Button>
//             </Tooltip>
//           </div>
//         </DrawerHeader>
//         <DrawerBody className="pt-16">
//           {selectedLoading ? (
//             <div className="flex flex-col items-center justify-center py-10">
//               <Spinner size="lg" />
//               <p className="text-default-500 mt-2 text-sm">Loading user...</p>
//             </div>
//           ) : selectedError ? (
//             <div className="flex flex-col items-center justify-center space-y-2">
//               <p className="text-sm">Failed to load user details.</p>
//               <Button
//                 size="sm"
//                 variant="flat"
//                 color="danger"
//                 onPress={() => selectedRefetch()}>
//                 Retry
//               </Button>
//             </div>
//           ) : !selectedUser ? (
//             <p className="text-default-400 text-sm">No user selected</p>
//           ) : (
//             <div className="space-y-4">
//               <User
//                 avatarProps={{
//                   src:
//                     selectedUser.owner.avatar ||
//                     'https://i.pravatar.cc/150?u=a04258',
//                   name: selectedUser.owner.name
//                 }}
//                 name={selectedUser.owner.name}
//                 description={selectedUser.owner.email}
//               />
//               <div>
//                 <b>Task Name:</b> {selectedUser.taskname}
//               </div>
//               <div>
//                 <b>Date:</b>{' '}
//                 {selectedUser?.startDate
//                   ? new Intl.DateTimeFormat('en-US', {
//                       month: 'long',
//                       day: 'numeric',
//                       year: 'numeric'
//                     }).format(new Date(selectedUser.startDate))
//                   : '—'}
//               </div>
//               <div>
//                 <b>Due Date:</b>{' '}
//                 {selectedUser?.dueDate
//                   ? new Intl.DateTimeFormat('en-US', {
//                       month: 'long',
//                       day: 'numeric',
//                       year: 'numeric'
//                     }).format(new Date(selectedUser.dueDate))
//                   : '—'}
//               </div>
//               <div className="flex items-center gap-2">
//                 <b>Status:</b>
//                 <Chip
//                   radius="sm"
//                   color={
//                     selectedUser.status === 'Open'
//                       ? 'success'
//                       : selectedUser.status === 'InProgress'
//                         ? 'warning'
//                         : selectedUser.status === 'Delayed'
//                           ? 'danger'
//                           : selectedUser.status === 'OnHold'
//                             ? 'warning'
//                             : selectedUser.status === 'TobeTested'
//                               ? 'primary'
//                               : selectedUser.status === 'InReview'
//                                 ? 'default'
//                                 : selectedUser.status === 'Closed'
//                                   ? 'success'
//                                       : selectedUser.status === 'Cancelled'
//                                         ? 'danger'
//                                         : 'default'
//                   }
//                   variant="dot">
//                   {selectedUser.status}
//                 </Chip>
//               </div>
//                     <div>
//                       <b>Priority: </b>{selectedUser.priority}
//                     </div>
//                     <div>
//                       <b>Billing:</b> {selectedUser.billingtype}
//                     </div>
//               <div className="flex gap-2">
//                 <b>Tags:</b>
//                 {selectedUser.tags
//                   .slice(0, 4)
//                   .map((tag: Tags, index: number) =>
//                     index < 3 ? (
//                       <Chip
//                         key={tag}
//                         className="bg-default-100 text-default-800 rounded-md px-[6px] capitalize"
//                         size="sm"
//                         variant="flat">
//                         {tag}
//                       </Chip>
//                     ) : (
//                       <Chip
//                         key="more"
//                         className="text-default-500"
//                         size="sm"
//                         variant="flat">
//                         +{selectedUser.tags.length - 3}
//                       </Chip>
//                     )
//                   )}
//               </div>
//               <div className="text-justify">
//                 <b>Description: </b>
//                 <br />
//                 {selectedUser.description}
//               </div>
//               <div>
//                 <b>Attachments:</b>
//                 <div className="mt-2 space-y-3">
//                   {selectedUser.attachments.map(file => (
//                     <AttachmentItem key={file.id} file={file} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </DrawerBody>
//         <DrawerFooter className="flex flex-col gap-1">
//           <Button color="primary" onPress={onClose}>
//             Close
//           </Button>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   )
// }
import { useMemo, useState } from 'react'

import {
  Button,
  Chip,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Select,
  SelectItem,
  Spinner,
  Tooltip
} from '@vezham/react/v2'

import { useProjects } from '../../../store/useProjects'
import { useCreateTask } from '../../../store/useTasks'
import { statuses, tags } from '../../../store/useTasks/data'
// ✅ FIX
import { billingType, priority } from '../../../store/useTasks/data'
import { Attachment, Status, Tags, Task } from './types'

const getAttachmentType = (file: File): Attachment['type'] => {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.includes('pdf')) return 'pdf'
  if (file.type.includes('word') || file.name.endsWith('.doc')) return 'doc'
  if (file.type.includes('sheet') || file.name.endsWith('.xlsx')) return 'sheet'
  return 'other'
}

const getInitialForm = (): Omit<Task, 'id'> => ({
  taskId: Math.floor(Math.random() * 1000),
  taskname: '',
  description: '',
  owner: {
    name: '',
    email: '',
    avatar: ''
  },
  startDate: new Date(),
  dueDate: new Date(),
  priority: 'None',
  billingtype: 'None',
  status: 'Open',
  tags: [],
  attachments: []
})

type Props = {
  isOpen: boolean
  onOpenChange: () => void
}

export const TaskDrawer = ({ isOpen, onOpenChange }: Props) => {
  const { data: projects = [], isLoading: projectsLoading } = useProjects() // ✅ FIX

  const { mutateAsync } = useCreateTask()
  const [form, setForm] = useState<Omit<Task, 'id'>>(getInitialForm())

  const selectedProject = useMemo(
    () => projects.find(p => p.id === form.projectId),
    [projects, form.projectId]
  )

  const isFormValid = useMemo(
    () =>
      !!form.projectId &&
      form.taskname.trim().length > 0 &&
      form.description.trim().length > 0 &&
      form.owner.name.trim().length > 0 &&
      form.owner.email.trim().length > 0 &&
      form.tags.length > 0,
    [form]
  )

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const uploaded: Attachment[] = Array.from(files).map(file => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: getAttachmentType(file)
    }))

    setForm(f => ({
      ...f,
      attachments: [...f.attachments, ...uploaded]
    }))
  }

  const removeAttachment = (id: string) => {
    setForm(f => ({
      ...f,
      attachments: f.attachments.filter(a => a.id !== id)
    }))
  }

  const onSubmit = async () => {
    if (!isFormValid) return

    await mutateAsync({
      id: Date.now(),
      ...form
    })

    setForm(getInitialForm())
    onOpenChange()
  }

  return (
    <Drawer
      hideCloseButton
      backdrop="blur"
      size="lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="right">
      <DrawerContent>
        <DrawerHeader className="border-default-200/50 bg-content1/50 flex items-center justify-between border-b px-2 py-2 backdrop-blur-lg">
          <div className="flex items-center gap-2">
            <Tooltip content="Close">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={onOpenChange}>
                ←
              </Button>
            </Tooltip>
            Add Task
          </div>

          {selectedProject && (
            <Chip size="sm" variant="flat" color="primary">
              {selectedProject.project}
            </Chip>
          )}
        </DrawerHeader>

        <DrawerBody className="space-y-3">
          {/* Project Select */}
          {projectsLoading ? (
            <div className="text-default-500 flex items-center gap-2 text-sm">
              <Spinner size="sm" /> Loading projects...
            </div>
          ) : (
            <Select
              label="Project"
              selectedKeys={form.projectId ? [Number(form.projectId)] : []}
              onSelectionChange={keys =>
                setForm(f => ({
                  ...f,
                  projectId: Number([...keys][0])
                }))
              }
              isRequired>
              {projects.map(p => (
                <SelectItem key={String(p.id)}>{p.project}</SelectItem>
              ))}
            </Select>
          )}

          {/* Show fields ONLY after project selected */}
          {form.projectId && (
            <>
              <Input
                label="Task Name"
                value={form.taskname}
                onValueChange={v => setForm(f => ({ ...f, taskname: v }))}
                isRequired
              />

              <Input
                label="Description"
                value={form.description}
                onValueChange={v => setForm(f => ({ ...f, description: v }))}
                isRequired
              />

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input
                  type="date"
                  label="Start Date"
                  onValueChange={v =>
                    setForm(f => ({
                      ...f,
                      startDate: new Date(v)
                    }))
                  }
                />
                <Input
                  type="date"
                  label="Due Date"
                  onValueChange={v =>
                    setForm(f => ({
                      ...f,
                      dueDate: new Date(v)
                    }))
                  }
                />
              </div>

              <Select label="Priority" selectedKeys={[form.priority]}>
                {priority.map(p => (
                  <SelectItem
                    key={p}
                    onPress={() => setForm(f => ({ ...f, priority: p }))}>
                    {p}
                  </SelectItem>
                ))}
              </Select>

              <Select label="Billing Type" selectedKeys={[form.billingtype]}>
                {billingType.map(b => (
                  <SelectItem
                    key={b}
                    onPress={() =>
                      setForm(f => ({
                        ...f,
                        billingtype: b
                      }))
                    }>
                    {b}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Status"
                selectedKeys={[form.status]}
                onSelectionChange={keys =>
                  setForm(f => ({
                    ...f,
                    status: [...keys][0] as Status
                  }))
                }>
                {statuses.map(s => (
                  <SelectItem key={s}>{s}</SelectItem>
                ))}
              </Select>

              <Select
                label="Tags"
                selectionMode="multiple"
                selectedKeys={form.tags}
                onSelectionChange={keys =>
                  setForm(f => ({
                    ...f,
                    tags: [...keys] as Tags[]
                  }))
                }>
                {tags.map(tag => (
                  <SelectItem key={tag}>{tag}</SelectItem>
                ))}
              </Select>

              <div className="flex flex-wrap gap-1">
                {form.tags.map(tag => (
                  <Chip key={tag} size="sm">
                    {tag}
                  </Chip>
                ))}
              </div>

              <Input
                label="Owner Name"
                value={form.owner.name}
                onValueChange={v =>
                  setForm(f => ({
                    ...f,
                    owner: { ...f.owner, name: v }
                  }))
                }
                isRequired
              />

              <Input
                label="Owner Email"
                value={form.owner.email}
                onValueChange={v =>
                  setForm(f => ({
                    ...f,
                    owner: { ...f.owner, email: v }
                  }))
                }
                isRequired
              />

              <Input
                label="Owner Avatar URL"
                value={form.owner.avatar}
                onValueChange={v =>
                  setForm(f => ({
                    ...f,
                    owner: { ...f.owner, avatar: v }
                  }))
                }
              />

              <Input
                type="file"
                label="Attachments"
                multiple
                onChange={e => handleFileUpload(e.currentTarget.files)}
              />

              <div className="flex flex-wrap gap-2">
                {form.attachments.map(att => (
                  <Chip
                    key={att.id}
                    size="sm"
                    onClose={() => removeAttachment(att.id)}>
                    {att.name}
                  </Chip>
                ))}
              </div>
            </>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="light" onPress={onOpenChange}>
            Cancel
          </Button>
          <Button color="primary" isDisabled={!isFormValid} onPress={onSubmit}>
            Add Task
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
