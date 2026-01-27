'use client'

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
  Tooltip
} from '@vezham/react/v2'

import { Attachment } from '../../layouts/projects/types'
import { useCreateProject } from '../../store/useProjects'
import { statuses, tags } from '../../store/useProjects/data'
import { Project, Status, Tags } from '../../store/useProjects/types'

type Props = {
  isOpen: boolean
  onOpenChange: () => void
}

const getAttachmentType = (file: File): Attachment['type'] => {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.includes('pdf')) return 'pdf'
  if (
    file.type.includes('word') ||
    file.name.endsWith('.doc') ||
    file.name.endsWith('.docx')
  )
    return 'doc'
  if (file.type.includes('sheet') || file.name.endsWith('.xlsx')) return 'sheet'
  return 'other'
}

const getInitialForm = (): Omit<Project, 'id'> => ({
  projectsId: Math.floor(Math.random() * 1000),
  project: '',
  description: '',
  owner: {
    name: '',
    email: '',
    avatar: ''
  },
  startDate: new Date(),
  dueDate: new Date(),
  status: 'Active',
  tags: [],
  attachments: []
})

export const AddProjectDrawer = ({ isOpen, onOpenChange }: Props) => {
  const { mutateAsync } = useCreateProject()
  const [form, setForm] = useState<Omit<Project, 'id'>>(getInitialForm())

  const isFormValid = useMemo(
    () =>
      form.project.trim() &&
      form.description.trim() &&
      form.owner.name.trim() &&
      form.owner.email.trim() &&
      form.startDate &&
      form.dueDate &&
      form.status &&
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
        <DrawerHeader className="border-default-200/50 bg-content1/50 flex flex-row items-center gap-2 border-b px-2 py-2 backdrop-blur-lg backdrop-saturate-150">
          <Tooltip content="Close">
            <Button
              isIconOnly
              className="text-default-400"
              size="sm"
              variant="light"
              onPress={onOpenChange}>
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
          Add Project
        </DrawerHeader>

        <DrawerBody className="space-y-3">
          {/* Project Name */}
          <Input
            label="Project Name"
            value={form.project}
            onValueChange={v => setForm(f => ({ ...f, project: v }))}
            isRequired
          />

          {/* Description */}
          <Input
            label="Description"
            value={form.description}
            onValueChange={v => setForm(f => ({ ...f, description: v }))}
            isRequired
          />

          {/* Owner Name + Owner Email */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input
              label="Owner Name"
              value={form.owner.name}
              onValueChange={v =>
                setForm(f => ({ ...f, owner: { ...f.owner, name: v } }))
              }
              isRequired
            />

            <Input
              label="Owner Email"
              value={form.owner.email}
              onValueChange={v =>
                setForm(f => ({ ...f, owner: { ...f.owner, email: v } }))
              }
              isRequired
            />
          </div>

          {/* Avatar URL */}
          <Input
            label="Owner Avatar URL"
            value={form.owner.avatar}
            onValueChange={v =>
              setForm(f => ({ ...f, owner: { ...f.owner, avatar: v } }))
            }
          />

          {/* Start Date + Due Date */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input
              type="date"
              label="Start Date"
              onValueChange={v =>
                setForm(f => ({ ...f, startDate: new Date(v) }))
              }
              isRequired
            />

            <Input
              type="date"
              label="Due Date"
              onValueChange={v =>
                setForm(f => ({ ...f, dueDate: new Date(v) }))
              }
              isRequired
            />
          </div>

          {/* Status */}
          <Select
            label="Status"
            selectedKeys={[form.status]}
            onSelectionChange={keys =>
              setForm(f => ({ ...f, status: [...keys][0] as Status }))
            }
            isRequired>
            {statuses.map(s => (
              <SelectItem key={s}>{s}</SelectItem>
            ))}
          </Select>

          {/* Tags */}
          <Select
            label="Tags"
            selectionMode="multiple"
            selectedKeys={form.tags}
            onSelectionChange={keys =>
              setForm(f => ({ ...f, tags: [...keys] as Tags[] }))
            }
            isRequired>
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

          {/* Attachments */}
          <Input
            type="file"
            label="Attachments"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={e => handleFileUpload(e.currentTarget.files)}
          />

          <div className="flex flex-wrap gap-2">
            {form.attachments.map(att => (
              <Chip
                key={att.id}
                size="sm"
                variant="flat"
                onClose={() => removeAttachment(att.id)}>
                {att.name}
              </Chip>
            ))}
          </div>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="light" onPress={onOpenChange}>
            Cancel
          </Button>
          <Button color="primary" isDisabled={!isFormValid} onPress={onSubmit}>
            Add Project
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
