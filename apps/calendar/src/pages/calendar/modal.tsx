import { useState } from 'react'

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem
} from '@vezham/react/v2'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const calendars = [
  { id: 'work', label: 'Work', color: 'bg-pink-500' },
  { id: 'personal', label: 'Personal', color: 'bg-blue-500' }
]

export default function NewEventModal({ isOpen, onClose }: Props) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [calendar, setCalendar] = useState('work')
  const [image, setImage] = useState<File | null>(null)

  const isValid = title.trim().length > 0

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>New Event</ModalHeader>

        <ModalBody className="flex flex-col gap-4">
          <Input
            autoFocus
            placeholder="New Event"
            value={title}
            onChange={e => setTitle(e.target.value)}
            isRequired
          />

          <div className="flex gap-3">
            <Input
              type="date"
              label="Date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />

            <Input
              type="time"
              label="Start"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />

            <Input
              type="time"
              label="End"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </div>

          <Select
            label="Calendar"
            selectedKeys={new Set([calendar])}
            onSelectionChange={keys => {
              const selected = Array.from(keys)[0] as string
              setCalendar(selected)
            }}>
            {calendars.map(cal => (
              <SelectItem key={cal.id} textValue={cal.label}>
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${cal.color}`} />
                  {cal.label}
                </div>
              </SelectItem>
            ))}
          </Select>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Upload Image</label>

            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm"
            />

            {image && (
              <p className="text-xs text-gray-500">Selected: {image.name}</p>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>

          <Button color="primary" isDisabled={!isValid}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
