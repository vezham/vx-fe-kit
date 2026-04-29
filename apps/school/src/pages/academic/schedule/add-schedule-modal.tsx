import { Icon } from '@iconify/react'
import { useState } from 'react'

import {
  Button,
  ListBox,
  Modal,
  Select,
  Switch,
  useOverlayState
} from '@vezham/react/v3'

type AddScheduleModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const typeOptions = ['Class']
const startTimeOptions = ['9.30', '10.30', '11.30', '12.30', '1.30']
const endTimeOptions = ['1.30', '2.30', '3.30', '4.30', '5.30', '6.30', '7.30']

export default function AddScheduleModal({
  open,
  onOpenChange
}: AddScheduleModalProps) {
  const state = useOverlayState({
    isOpen: open,
    onOpenChange
  })
  const [type, setType] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)
  const [isActive, setIsActive] = useState(false)

  const renderSelect = (
    label: string,
    value: string | null,
    onChange: (next: string | null) => void,
    options: string[]
  ) => (
    <div className="space-y-2">
      <label className="block font-bold text-[#223059]">{label}</label>
      <Select
        selectedKey={value ?? undefined}
        onSelectionChange={key => onChange(key ? String(key) : null)}>
        <Select.Trigger className="flex w-full items-center justify-between border border-[#dfe6f1] bg-white px-5 text-[#223059]">
          <Select.Value>{value ?? 'Select'}</Select.Value>
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover className="rounded-xl">
          <ListBox>
            {options.map(option => (
              <ListBox.Item key={option} id={option}>
                {option}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  )

  return (
    <Modal state={state}>
      <Modal.Trigger className="hidden" />
      <Modal.Backdrop
        variant="blur"
        className="fixed inset-0 z-[100] bg-black/45">
        <Modal.Container placement="center">
          <Modal.Dialog className="overflow-hidden rounded-lg border border-[#d8deea] bg-white p-0 shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
            <Modal.CloseTrigger>
              <Icon icon="lucide:x" />
            </Modal.CloseTrigger>

            <Modal.Header className="border-b border-[#e2e8f2] px-8 py-6">
              <Modal.Heading className="text-xl leading-none font-bold text-[#223059]">
                Add Schedule
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="space-y-4 px-8 py-4">
              {renderSelect('Type', type, setType, typeOptions)}
              {renderSelect(
                'Start Time',
                startTime,
                setStartTime,
                startTimeOptions
              )}
              {renderSelect('End Time', endTime, setEndTime, endTimeOptions)}

              <div className="flex items-center justify-between gap-6">
                <div>
                  <div className="font-bold text-[#223059]">Status</div>
                  <div className="text-[#20242d]">
                    Change the Status by toggle
                  </div>
                </div>
                <Switch isSelected={isActive} onChange={setIsActive} />
              </div>
            </Modal.Body>

            <Modal.Footer className="flex justify-end gap-4 border-t border-[#e2e8f2] px-6 py-6">
              <Button variant="outline" onPress={state.close}>
                Cancel
              </Button>
              <Button variant="primary" onPress={state.close}>
                Add Schedule
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
