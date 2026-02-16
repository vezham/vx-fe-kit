import { useEffect, useState } from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea
} from '@vezham/react/v2'

import { useReminders } from './store'

type Props = {
  isOpen: boolean
  onClose: () => void
  reminderId?: string
}

export default function NewReminderDrawer({
  isOpen,
  onClose,
  reminderId
}: Props) {
  const { lists, reminders, addReminder, updateReminder } = useReminders()

  const editingReminder = reminders.find(r => r.id === Number(reminderId))

  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [list, setList] = useState('reminders')
  const [flagged, setFlagged] = useState(false)

  const resetForm = () => {
    setTitle('')
    setNotes('')
    setDate('')
    setTime('')
    setList('reminders')
    setFlagged(false)
  }

  useEffect(() => {
    if (!isOpen) return

    if (editingReminder) {
      setTitle(editingReminder.title ?? '')
      setNotes(editingReminder.notes ?? '')
      setDate(editingReminder.date ?? '')
      setTime(editingReminder.time ?? '')
      setList(editingReminder.list ?? 'reminders')
      setFlagged(!!editingReminder.flagged)
    } else {
      resetForm()
    }
  }, [editingReminder, isOpen])

  const isValid = title.trim().length > 0

  const handleSave = () => {
    if (editingReminder) {
      updateReminder(Number(reminderId), {
        title: title.trim(),
        notes: notes.trim(),
        date: date || undefined,
        time: time || undefined,
        list,
        flagged
      })
    } else {
      addReminder({
        title: title.trim(),
        notes: notes.trim(),
        date: date || undefined,
        time: time || undefined,
        list,
        flagged,
        completed: false,
        archived: false,
        deleted: false
      })
    }

    resetForm()
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent>
        <DrawerHeader>
          {editingReminder ? 'Edit Reminder' : 'New Reminder'}
        </DrawerHeader>

        <DrawerBody className="flex flex-col gap-4">
          <Input
            autoFocus
            isRequired
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            isInvalid={!isValid && title.length > 0}
            errorMessage={
              !isValid && title.length > 0 ? 'Title is required' : undefined
            }
          />

          <Textarea
            placeholder="Notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />

          <Input
            type="date"
            label="Date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          <Input
            type="time"
            label="Time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <Select
            label="List"
            selectedKeys={[list]}
            onSelectionChange={keys => {
              const value = Array.from(keys)[0] as string
              setList(value)
            }}>
            {lists.map(l => (
              <SelectItem key={l}>{l}</SelectItem>
            ))}
          </Select>

          <Switch isSelected={flagged} onValueChange={setFlagged}>
            Flag
          </Switch>
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="light"
            onPress={() => {
              resetForm()
              onClose()
            }}>
            Cancel
          </Button>

          <Button color="primary" onPress={handleSave} isDisabled={!isValid}>
            {editingReminder ? 'Update' : 'Save'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
