'use client'

import React, { useState } from 'react'

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

import { useProjects } from '../../store/useProjects'
import { statuses, tags } from '../../store/useProjects/data'
import { Project, Status, Tags } from '../../store/useProjects/types'

type Props = {
  isOpen: boolean
  onOpenChange: () => void
}

export const AddProjectModal = ({ isOpen, onOpenChange }: Props) => {
  const { mutateAsync } = useProjects.create()

  const [form, setForm] = useState<Omit<Project, 'id'>>({
    projectId: Math.floor(Math.random() * 1000),
    project: '',
    owner: {
      name: '',
      email: '',
      avatar: ''
    },
    startdate: new Date(),
    dueDate: new Date(),
    status: 'draft',
    tags: []
  })

  const onSubmit = async () => {
    await mutateAsync({
      id: Date.now(),
      ...form
    })

    onOpenChange()

    setForm({
      projectName: '',
      owner: {
        name: '',
        email: '',
        avatar: ''
      },
      ownerAvatar: '',
      startDate: '',
      dueDate: '',
      status: 'pending',
      tags: []
    })
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
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
