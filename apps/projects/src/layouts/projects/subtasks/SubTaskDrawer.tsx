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

import { useCreateSubTask } from '../../../store/useSubTasks'
import { statuses, tags } from '../../../store/useSubTasks/data'
// ✅ FIX
import { billingType, priority } from '../../../store/useSubTasks/data'
import { useTasks } from '../../../store/useTasks'
import { Attachment, Status, SubTask, Tags } from './types'

const getAttachmentType = (file: File): Attachment['type'] => {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.includes('pdf')) return 'pdf'
  if (file.type.includes('word') || file.name.endsWith('.doc')) return 'doc'
  if (file.type.includes('sheet') || file.name.endsWith('.xlsx')) return 'sheet'
  return 'other'
}

const getInitialForm = (): Omit<SubTask, 'id'> => ({
  projectsId: undefined,
  taskId: undefined, // ✅ this is what Select controls
  subtaskId: Math.floor(Math.random() * 1000),
  subtaskname: '',
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
  onOpenChange: (open: boolean) => void
}

export const SubTaskDrawer = ({ isOpen, onOpenChange }: Props) => {
  const { data: tasks = [], isLoading: tasksLoading } = useTasks() // ✅ FIX

  const { mutateAsync } = useCreateSubTask()
  const [form, setForm] = useState<Omit<SubTask, 'id'>>(getInitialForm())

  const selectedTask = useMemo(
    () => tasks.find(t => t.taskId === form.taskId),
    [tasks, form.taskId]
  )

  const isFormValid = useMemo(
    () =>
      form.taskId &&
      form.subtaskname.trim().length > 0 &&
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
                onPress={() => onOpenChange(false)}>
                ←
              </Button>
            </Tooltip>
            Add SubTask
          </div>

          {selectedTask && (
            <Chip size="sm" variant="flat" color="primary">
              {selectedTask.taskname}
            </Chip>
          )}
        </DrawerHeader>

        <DrawerBody className="space-y-3">
          {/* Project Select */}
          {tasksLoading ? (
            <div className="text-default-500 flex items-center gap-2 text-sm">
              <Spinner size="sm" /> Loading subtasks...
            </div>
          ) : (
            <Select
              label="Task"
              selectedKeys={form.taskId ? [String(form.taskId)] : []}
              onSelectionChange={keys => {
                const selectedKey = [...keys][0]
                setForm(f => ({
                  ...f,
                  taskId: Number(selectedKey) // ✅ FIX: update taskId
                }))
              }}
              isRequired>
              {tasks.map(t => (
                <SelectItem key={String(t.taskId)}>{t.taskname}</SelectItem>
              ))}
            </Select>
          )}

          {/* Show fields ONLY after project selected */}
          {form.taskId && (
            <>
              <Input
                label="SubTask Name"
                value={form.subtaskname}
                onValueChange={v => setForm(f => ({ ...f, subtaskname: v }))}
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
            Add SubTask
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
