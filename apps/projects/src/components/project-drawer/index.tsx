import { CalendarDate, today } from '@internationalized/date'
import { useMemo, useState } from 'react'

import {
  Avatar,
  Button,
  Chip,
  DatePicker,
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

import { useCreateProject, useProjects } from '../../store/useProjects'
import { getStatusProps, statuses, tags } from '../../store/useProjects/data'
import { Project, Status, Tags } from '../../store/useProjects/types'
import { Attachment } from './types'
import { ProjectDrawerProps, useProjectDrawerProps } from './types'

const dateToCalendarDate = (date: Date): CalendarDate => {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  )
}

const calendarDateToDate = (calendarDate: CalendarDate): Date => {
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day)
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

export const AddProjectDrawer = ({
  isOpen,
  onOpenChange
}: ProjectDrawerProps) => {
  const { mutateAsync } = useCreateProject()
  const { data: projects = [] } = useProjects()

  const owners = useMemo(
    () =>
      Array.from(new Map(projects.map(p => [p.owner.name, p.owner])).values()),
    [projects]
  )

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()

  const getInitialForm = (): Omit<Project, 'id'> => ({
    projectsId: Math.floor(Math.random() * 1000),
    project: '',
    description: '',
    owner: {
      name: '',
      avatar: ''
    },
    startDate: new Date(),
    dueDate: new Date(),
    status: 'Active',
    tags: [],
    attachments: []
  })

  const [form, setForm] = useState<Omit<Project, 'id'>>(getInitialForm())

  const [startCalendarDate, setStartCalendarDate] = useState<CalendarDate>(
    dateToCalendarDate(new Date())
  )
  const [dueCalendarDate, setDueCalendarDate] = useState<CalendarDate>(
    dateToCalendarDate(new Date())
  )

  const {
    slots,
    getDrawerHeaderProps,
    getCloseButtonProps,
    getDrawerBodyProps,
    getDrawerFooterProps,
    getCancelButtonProps,
    getSubmitButtonProps,
    getInputProps,
    getSelectProps,
    getChipProps,
    getTagsContainerProps,
    getAttachmentsContainerProps
  } = useProjectDrawerProps({ isOpen, onOpenChange })

  const isFormValid = useMemo(
    () =>
      form.project.trim() &&
      form.description.trim() &&
      form.owner.name.trim() &&
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
    const todayDate = today('UTC')
    setStartCalendarDate(todayDate)
    setDueCalendarDate(todayDate)
    onOpenChange(false)
  }

  const handleStartDateChange = (calendarDate: CalendarDate) => {
    setStartCalendarDate(calendarDate)
    const date = calendarDateToDate(calendarDate)
    setForm(f => ({ ...f, startDate: date }))
  }

  const handleDueDateChange = (calendarDate: CalendarDate) => {
    setDueCalendarDate(calendarDate)
    const date = calendarDateToDate(calendarDate)
    setForm(f => ({ ...f, dueDate: date }))
  }

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="right"
      size="lg">
      <DrawerContent>
        <DrawerHeader {...getDrawerHeaderProps()}>
          <Tooltip content="Close">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              {...getCloseButtonProps()}
              onPress={() => onOpenChange(false)}>
              <svg
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org2000/svg">
                <path d="m13 17 5-5-5-5M6 17 l5-5-5-5" />
              </svg>
            </Button>
          </Tooltip>
          Add Project
        </DrawerHeader>

        <DrawerBody {...getDrawerBodyProps()}>
          <Input
            label="Name"
            value={form.project}
            autoFocus={isOpen}
            onValueChange={v => setForm(f => ({ ...f, project: v }))}
            isRequired
            {...getInputProps()}
          />

          <Input
            label="Description"
            value={form.description}
            onValueChange={v => setForm(f => ({ ...f, description: v }))}
            isRequired
            {...getInputProps()}
          />

          <Select
            label="Owner"
            selectedKeys={[form.owner.name]}
            onSelectionChange={keys => {
              const owner = owners.find(o => o.name === [...keys][0])
              if (!owner) return
              setForm(f => ({
                ...f,
                owner: {
                  name: owner.name,
                  avatar: owner.avatar || ''
                }
              }))
            }}
            isRequired
            {...getSelectProps()}>
            {owners.map(o => (
              <SelectItem key={o.name} textValue={o.name}>
                <div className="flex items-center gap-2">
                  <Avatar
                    size="sm"
                    src={o.avatar || undefined}
                    name={o.avatar ? undefined : getInitials(o.name)}
                  />
                  {o.name}
                </div>
              </SelectItem>
            ))}
          </Select>

          <div className={slots.gridContainer()}>
            <DatePicker
              label="Start Date"
              value={startCalendarDate}
              onChange={handleStartDateChange}
              className="w-full"
              isRequired
            />

            <DatePicker
              label="Due Date"
              value={dueCalendarDate}
              onChange={handleDueDateChange}
              className="w-full"
              isRequired
            />
          </div>

          <Select
            label="Status"
            selectedKeys={[form.status]}
            onSelectionChange={keys =>
              setForm(f => ({ ...f, status: [...keys][0] as Status }))
            }
            {...getSelectProps()}
            startContent={
              form.status && (
                <div
                  className={`h-3 w-3 rounded-full ${
                    getStatusProps[form.status]?.color.split(' ')[0] ||
                    'bg-default-300'
                  }`}
                />
              )
            }>
            {statuses.map(s => (
              <SelectItem
                key={s}
                textValue={s}
                startContent={
                  <div
                    className={`h-3 w-3 rounded-full ${
                      getStatusProps[s]?.color.split(' ')[0] || 'bg-default-300'
                    }`}
                  />
                }>
                {s}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Tags"
            selectionMode="multiple"
            selectedKeys={form.tags}
            onSelectionChange={keys =>
              setForm(f => ({ ...f, tags: [...keys] as Tags[] }))
            }
            {...getSelectProps()}>
            {tags.map(tag => (
              <SelectItem key={tag}>{tag}</SelectItem>
            ))}
          </Select>

          <div {...getTagsContainerProps()}>
            {form.tags.map(tag => (
              <Chip key={tag} {...getChipProps()}>
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
            {...getInputProps()}
          />

          <div {...getAttachmentsContainerProps()}>
            {form.attachments.map(att => (
              <Chip
                key={att.id}
                size="sm"
                variant="flat"
                onClose={() => removeAttachment(att.id)}
                {...getChipProps()}>
                {att.name}
              </Chip>
            ))}
          </div>
        </DrawerBody>

        <DrawerFooter {...getDrawerFooterProps()}>
          <Button
            variant="light"
            {...getCancelButtonProps()}
            onPress={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            isDisabled={!isFormValid}
            {...getSubmitButtonProps()}
            onPress={onSubmit}>
            Add Project
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
