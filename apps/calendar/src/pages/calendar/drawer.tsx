import { useState } from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Switch,
  Textarea
} from '@vezham/react/v2'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function NewCalendarReminderDrawer({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [flagged, setFlagged] = useState(false)

  const isValid = title.trim().length > 0

  const handleSave = () => {
    // no store
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerContent>
        <DrawerHeader>New Reminder</DrawerHeader>

        <DrawerBody className="flex flex-col gap-4">
          <Input
            autoFocus
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            isRequired
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

          <Switch isSelected={flagged} onValueChange={setFlagged}>
            Flag
          </Switch>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>

          <Button color="primary" isDisabled={!isValid} onPress={handleSave}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
