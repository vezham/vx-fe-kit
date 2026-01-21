'use client'

import { useState } from 'react'

import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem
} from '@vezham/react/v2'

import { Attachment } from '../../layouts/projects/types'
import { useProjects } from '../../store/useProjects'
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
  projectId: Math.floor(Math.random() * 1000),
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

export const AddProjectModal = ({ isOpen, onOpenChange }: Props) => {
  const { mutateAsync } = useProjects.create()
  const [form, setForm] = useState<Omit<Project, 'id'>>(getInitialForm())

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    const uploaded: Attachment[] = Array.from(files).map(file => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      url: URL.createObjectURL(file), // ✅ IMPORTANT
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
    await mutateAsync({
      id: Date.now(),
      ...form
    })

    onOpenChange()
    setForm(getInitialForm())
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="sm"
      scrollBehavior="inside">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>Add Project</ModalHeader>

            <ModalBody className="space-y-3">
              <Input
                label="Project Name"
                value={form.project}
                onValueChange={v => setForm(f => ({ ...f, project: v }))}
              />

              <Input
                label="Description"
                value={form.description}
                onValueChange={v => setForm(f => ({ ...f, description: v }))}
              />

              <Input
                label="Owner Name"
                value={form.owner.name}
                onValueChange={v =>
                  setForm(f => ({
                    ...f,
                    owner: { ...f.owner, name: v }
                  }))
                }
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
                type="date"
                label="Start Date"
                onValueChange={v =>
                  setForm(f => ({ ...f, startdate: new Date(v) }))
                }
              />

              <Input
                type="date"
                label="Due Date"
                onValueChange={v =>
                  setForm(f => ({ ...f, dueDate: new Date(v) }))
                }
              />

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
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onSubmit}>
                Add Project
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
