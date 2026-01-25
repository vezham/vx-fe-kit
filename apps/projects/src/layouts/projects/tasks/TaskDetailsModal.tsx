// 'use client'

// import { useState } from 'react'
// import {
//   Button,
//   Chip,
//   Input,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   Select,
//   SelectItem
// } from '@vezham/react/v2'

// import { useCreateProject } from '../../../store/useProjects'
// import { statuses, tags } from '../../../store/useProjects/data'
// import { Attachment,  Status, Tags,  } from '../types'
// import { useTaskList } from '../../../store/useTasks'
// import { Task } from './types'
// import { getStatusProps } from '../../../store/useTasks/data'

// type Props = {
//   isOpen: boolean
//   onOpenChange: () => void
// }

// const getAttachmentType = (file: File): Attachment['type'] => {
//   if (file.type.startsWith('image/')) return 'image'
//   if (file.type.includes('pdf')) return 'pdf'
//   if (
//     file.type.includes('word') ||
//     file.name.endsWith('.doc') ||
//     file.name.endsWith('.docx')
//   )
//     return 'doc'
//   if (file.type.includes('sheet') || file.name.endsWith('.xlsx')) return 'sheet'
//   return 'other'
// }

// const getInitialForm = (): Omit<Task, 'id'> => ({
//   projectId: Math.floor(Math.random() * 1000),
//   taskId: Math.floor(Math.random() * 1000),
//   taskname: '',
//   description: '',
//   owner: {
//     name: '',
//     email: '',
//     avatar: ''
//   },
//   startDate: new Date(),
//   dueDate: new Date(),
//   status: 'Open',
//   priority: 'None',
//   billingtype:'None',
//   tags: [],
//   attachments: []
// })

// export const AddProjectModal = ({ isOpen, onOpenChange }: Props) => {
//   const { mutateAsync } = useCreateProject()
//   const [form, setForm] = useState<Omit<Task, 'id'>>(getInitialForm())

//   // Fetch tasks
//   const { data: tasks = [], isLoading, isError } = useTaskList({})

//   const handleFileUpload = (files: FileList | null) => {
//     if (!files) return

//     const uploaded: Attachment[] = Array.from(files).map(file => ({
//       id: `${file.name}-${Date.now()}`,
//       name: file.name,
//       url: URL.createObjectURL(file),
//       type: getAttachmentType(file)
//     }))

//     setForm(f => ({
//       ...f,
//       attachments: [...f.attachments, ...uploaded]
//     }))
//   }

//   const removeAttachment = (id: string) => {
//     setForm(f => ({
//       ...f,
//       attachments: f.attachments.filter(a => a.id !== id)
//     }))
//   }

//   const onSubmit = async () => {
//     await mutateAsync({
//       id: Date.now(),
//       ...form
//     })

//     onOpenChange()
//     setForm(getInitialForm())
//   }

//   return (
//     <Modal
//       isOpen={isOpen}
//       onOpenChange={onOpenChange}
//       size="lg"
//       scrollBehavior="inside">
//       <ModalContent>
//         {onClose => (
//           <>
//             <ModalHeader>Add Project</ModalHeader>

//             <ModalBody className="space-y-4">
//               {/* --- Project Form Inputs --- */}
//               <Input
//                 label="Project Name"
//                 value={form.taskname}
//                 onValueChange={v => setForm(f => ({ ...f, project: v }))}
//               />

//               <Input
//                 label="Description"
//                 value={form.description}
//                 onValueChange={v => setForm(f => ({ ...f, description: v }))}
//               />

//               <Input
//                 label="Owner Name"
//                 value={form.owner.name}
//                 onValueChange={v =>
//                   setForm(f => ({ ...f, owner: { ...f.owner, name: v } }))
//                 }
//               />

//               <Input
//                 label="Owner Email"
//                 value={form.owner.email}
//                 onValueChange={v =>
//                   setForm(f => ({ ...f, owner: { ...f.owner, email: v } }))
//                 }
//               />

//               <Input
//                 label="Owner Avatar URL"
//                 value={form.owner.avatar}
//                 onValueChange={v =>
//                   setForm(f => ({ ...f, owner: { ...f.owner, avatar: v } }))
//                 }
//               />

//               <Input
//                 type="date"
//                 label="Start Date"
//                 onValueChange={v =>
//                   setForm(f => ({ ...f, startDate: new Date(v) }))
//                 }
//               />

//               <Input
//                 type="date"
//                 label="Due Date"
//                 onValueChange={v =>
//                   setForm(f => ({ ...f, dueDate: new Date(v) }))
//                 }
//               />

//               <Select
//                 label="Status"
//                 selectedKeys={[form.status]}
//                 onSelectionChange={keys =>
//                   setForm(f => ({ ...f, status: [...keys][0] as Status }))
//                 }>
//                 {statuses.map(s => (
//                   <SelectItem key={s}>{s}</SelectItem>
//                 ))}
//               </Select>

//               <Select
//                 label="Tags"
//                 selectionMode="multiple"
//                 selectedKeys={form.tags}
//                 onSelectionChange={keys =>
//                   setForm(f => ({ ...f, tags: [...keys] as Tags[] }))
//                 }>
//                 {tags.map(tag => (
//                   <SelectItem key={tag}>{tag}</SelectItem>
//                 ))}
//               </Select>

//               <div className="flex flex-wrap gap-1">
//                 {form.tags.map(tag => (
//                   <Chip key={tag} size="sm">
//                     {tag}
//                   </Chip>
//                 ))}
//               </div>

//               <Input
//                 type="file"
//                 label="Attachments"
//                 multiple
//                 accept="image/*,.pdf,.doc,.docx"
//                 onChange={e => handleFileUpload(e.currentTarget.files)}
//               />

//               <div className="flex flex-wrap gap-2">
//                 {form.attachments.map(att => (
//                   <Chip
//                     key={att.id}
//                     size="sm"
//                     variant="flat"
//                     onClose={() => removeAttachment(att.id)}>
//                     {att.name}
//                   </Chip>
//                 ))}
//               </div>

//               {/* --- Tasks List --- */}
//               <div>
//                 <h4 className="text-sm font-semibold mb-2">Tasks</h4>

//                 {isLoading && <p className="text-sm text-default-500">Loading tasks…</p>}
//                 {isError && <p className="text-sm text-danger">Failed to load tasks</p>}
//                 {!isLoading && tasks.length === 0 && (
//                   <p className="text-sm text-default-400">No tasks found</p>
//                 )}

//                 <div className="space-y-2 max-h-60 overflow-y-auto">
//                   {tasks.map(task => {
//                     const status = getStatusProps[task.status]
//                     return (
//                       <div
//                         key={task.id}
//                         className="border rounded-md p-3 flex flex-col gap-2"
//                       >
//                         <div className="flex items-center justify-between">
//                           <p className="font-medium text-sm">{task.taskname}</p>
//                           <span
//                             className={`text-xs px-2 py-0.5 rounded ${status.color}`}
//                           >
//                             {status.label}
//                           </span>
//                         </div>

//                         <p className="text-xs text-default-500 line-clamp-2">
//                           {task.description}
//                         </p>

//                         <div className="flex items-center justify-between">
//                           <p className="text-xs">👤 {task.owner.name}</p>
//                           <div className="flex gap-1">
//                             {task.tags.map(tag => (
//                               <Chip key={tag} size="sm" variant="flat">
//                                 {tag}
//                               </Chip>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//             </ModalBody>

//             <ModalFooter>
//               <Button variant="light" onPress={onClose}>
//                 Cancel
//               </Button>
//               <Button color="primary" onPress={onSubmit}>
//                 Add Project
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   )
// }

'use client'

import { Icon } from '@iconify/react'

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
import { Attachment, Tags, Task } from './types'

// 'use client'

// import { useState } from 'react'
// import {
//   Button,
//   Chip,
//   Input,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   Select,
//   SelectItem
// } from '@vezham/react/v2'

// import { useCreateProject } from '../../../store/useProjects'
// import { statuses, tags } from '../../../store/useProjects/data'
// import { Attachment,  Status, Tags,  } from '../types'
// import { useTaskList } from '../../../store/useTasks'
// import { Task } from './types'
// import { getStatusProps } from '../../../store/useTasks/data'

// type Props = {
//   isOpen: boolean
//   onOpenChange: () => void
// }

// const getAttachmentType = (file: File): Attachment['type'] => {
//   if (file.type.startsWith('image/')) return 'image'
//   if (file.type.includes('pdf')) return 'pdf'
//   if (
//     file.type.includes('word') ||
//     file.name.endsWith('.doc') ||
//     file.name.endsWith('.docx')
//   )
//     return 'doc'
//   if (file.type.includes('sheet') || file.name.endsWith('.xlsx')) return 'sheet'
//   return 'other'
// }

// const getInitialForm = (): Omit<Task, 'id'> => ({
//   projectId: Math.floor(Math.random() * 1000),
//   taskId: Math.floor(Math.random() * 1000),
//   taskname: '',
//   description: '',
//   owner: {
//     name: '',
//     email: '',
//     avatar: ''
//   },
//   startDate: new Date(),
//   dueDate: new Date(),
//   status: 'Open',
//   priority: 'None',
//   billingtype:'None',
//   tags: [],
//   attachments: []
// })

// export const AddProjectModal = ({ isOpen, onOpenChange }: Props) => {
//   const { mutateAsync } = useCreateProject()
//   const [form, setForm] = useState<Omit<Task, 'id'>>(getInitialForm())

//   // Fetch tasks
//   const { data: tasks = [], isLoading, isError } = useTaskList({})

//   const handleFileUpload = (files: FileList | null) => {
//     if (!files) return

//     const uploaded: Attachment[] = Array.from(files).map(file => ({
//       id: `${file.name}-${Date.now()}`,
//       name: file.name,
//       url: URL.createObjectURL(file),
//       type: getAttachmentType(file)
//     }))

//     setForm(f => ({
//       ...f,
//       attachments: [...f.attachments, ...uploaded]
//     }))
//   }

//   const removeAttachment = (id: string) => {
//     setForm(f => ({
//       ...f,
//       attachments: f.attachments.filter(a => a.id !== id)
//     }))
//   }

//   const onSubmit = async () => {
//     await mutateAsync({
//       id: Date.now(),
//       ...form
//     })

//     onOpenChange()
//     setForm(getInitialForm())
//   }

//   return (
//     <Modal
//       isOpen={isOpen}
//       onOpenChange={onOpenChange}
//       size="lg"
//       scrollBehavior="inside">
//       <ModalContent>
//         {onClose => (
//           <>
//             <ModalHeader>Add Project</ModalHeader>

//             <ModalBody className="space-y-4">
//               {/* --- Project Form Inputs --- */}
//               <Input
//                 label="Project Name"
//                 value={form.taskname}
//                 onValueChange={v => setForm(f => ({ ...f, project: v }))}
//               />

//               <Input
//                 label="Description"
//                 value={form.description}
//                 onValueChange={v => setForm(f => ({ ...f, description: v }))}
//               />

//               <Input
//                 label="Owner Name"
//                 value={form.owner.name}
//                 onValueChange={v =>
//                   setForm(f => ({ ...f, owner: { ...f.owner, name: v } }))
//                 }
//               />

//               <Input
//                 label="Owner Email"
//                 value={form.owner.email}
//                 onValueChange={v =>
//                   setForm(f => ({ ...f, owner: { ...f.owner, email: v } }))
//                 }
//               />

//               <Input
//                 label="Owner Avatar URL"
//                 value={form.owner.avatar}
//                 onValueChange={v =>
//                   setForm(f => ({ ...f, owner: { ...f.owner, avatar: v } }))
//                 }
//               />

//               <Input
//                 type="date"
//                 label="Start Date"
//                 onValueChange={v =>
//                   setForm(f => ({ ...f, startDate: new Date(v) }))
//                 }
//               />

//               <Input
//                 type="date"
//                 label="Due Date"
//                 onValueChange={v =>
//                   setForm(f => ({ ...f, dueDate: new Date(v) }))
//                 }
//               />

//               <Select
//                 label="Status"
//                 selectedKeys={[form.status]}
//                 onSelectionChange={keys =>
//                   setForm(f => ({ ...f, status: [...keys][0] as Status }))
//                 }>
//                 {statuses.map(s => (
//                   <SelectItem key={s}>{s}</SelectItem>
//                 ))}
//               </Select>

//               <Select
//                 label="Tags"
//                 selectionMode="multiple"
//                 selectedKeys={form.tags}
//                 onSelectionChange={keys =>
//                   setForm(f => ({ ...f, tags: [...keys] as Tags[] }))
//                 }>
//                 {tags.map(tag => (
//                   <SelectItem key={tag}>{tag}</SelectItem>
//                 ))}
//               </Select>

//               <div className="flex flex-wrap gap-1">
//                 {form.tags.map(tag => (
//                   <Chip key={tag} size="sm">
//                     {tag}
//                   </Chip>
//                 ))}
//               </div>

//               <Input
//                 type="file"
//                 label="Attachments"
//                 multiple
//                 accept="image/*,.pdf,.doc,.docx"
//                 onChange={e => handleFileUpload(e.currentTarget.files)}
//               />

//               <div className="flex flex-wrap gap-2">
//                 {form.attachments.map(att => (
//                   <Chip
//                     key={att.id}
//                     size="sm"
//                     variant="flat"
//                     onClose={() => removeAttachment(att.id)}>
//                     {att.name}
//                   </Chip>
//                 ))}
//               </div>

//               {/* --- Tasks List --- */}
//               <div>
//                 <h4 className="text-sm font-semibold mb-2">Tasks</h4>

//                 {isLoading && <p className="text-sm text-default-500">Loading tasks…</p>}
//                 {isError && <p className="text-sm text-danger">Failed to load tasks</p>}
//                 {!isLoading && tasks.length === 0 && (
//                   <p className="text-sm text-default-400">No tasks found</p>
//                 )}

//                 <div className="space-y-2 max-h-60 overflow-y-auto">
//                   {tasks.map(task => {
//                     const status = getStatusProps[task.status]
//                     return (
//                       <div
//                         key={task.id}
//                         className="border rounded-md p-3 flex flex-col gap-2"
//                       >
//                         <div className="flex items-center justify-between">
//                           <p className="font-medium text-sm">{task.taskname}</p>
//                           <span
//                             className={`text-xs px-2 py-0.5 rounded ${status.color}`}
//                           >
//                             {status.label}
//                           </span>
//                         </div>

//                         <p className="text-xs text-default-500 line-clamp-2">
//                           {task.description}
//                         </p>

//                         <div className="flex items-center justify-between">
//                           <p className="text-xs">👤 {task.owner.name}</p>
//                           <div className="flex gap-1">
//                             {task.tags.map(tag => (
//                               <Chip key={tag} size="sm" variant="flat">
//                                 {tag}
//                               </Chip>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//             </ModalBody>

//             <ModalFooter>
//               <Button variant="light" onPress={onClose}>
//                 Cancel
//               </Button>
//               <Button color="primary" onPress={onSubmit}>
//                 Add Project
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   )
// }

type Props = {
  isOpen: boolean
  onOpenChange: () => void
  task?: Task | null
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

export const TaskDetailModal = ({ isOpen, onOpenChange, task }: Props) => {
  if (!task) return null

  const status = getStatusProps[task.status as keyof typeof getStatusProps] || {
    label: task.status,
    color: ''
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
              <div>
                <Tabs variant="light" color="primary" size="sm">
                  <Tab>Comments</Tab>
                  <Tab>Subtasks</Tab>
                  <Tab>Issues</Tab>
                </Tabs>
              </div>
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
