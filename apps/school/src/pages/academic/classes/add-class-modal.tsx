import { Icon } from '@iconify/react'
import { useState } from 'react'

import {
  Button,
  Input,
  ListBox,
  Modal,
  Select,
  Switch,
  useOverlayState
} from '@vezham/react/v3'

type AddClassModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const sectionOptions = ['A', 'B', 'C', 'D']

export default function AddClassModal({
  open,
  onOpenChange
}: AddClassModalProps) {
  const state = useOverlayState({
    isOpen: open,
    onOpenChange
  })
  const [section, setSection] = useState<string | null>(null)
  const [isActive, setIsActive] = useState(false)

  return (
    <Modal state={state}>
      <Modal.Trigger className="hidden" />
      <Modal.Backdrop
        variant="blur"
        className="fixed inset-0 z-[100] bg-black/45">
        <Modal.Container placement="center">
          <Modal.Dialog className="overflow-hidden rounded-lg border border-[#d8deea] bg-white p-0 shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
            <Modal.CloseTrigger>
              <Icon icon="lucide:x" className="text-[26px]" />
            </Modal.CloseTrigger>

            <Modal.Header className="border-b border-[#e2e8f2] px-8 py-6">
              <Modal.Heading className="text-xl leading-none font-bold text-[#223059]">
                Add Class
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="space-y-4 px-8 py-4">
              <div className="space-y-2">
                <label className="block font-bold text-[#223059]">
                  Class Name
                </label>
                <Input className="w-full rounded-xl border border-[#dfe6f1] bg-white" />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-[#223059]">
                  Section
                </label>
                <Select
                  selectedKey={section ?? undefined}
                  onSelectionChange={key =>
                    setSection(key ? String(key) : null)
                  }>
                  <Select.Trigger className="flex w-full items-center justify-between rounded-xl border border-[#dfe6f1] bg-white px-5 text-[27px] text-[#223059]">
                    <Select.Value>{section ?? 'Select'}</Select.Value>
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {sectionOptions.map(option => (
                        <ListBox.Item key={option} id={option}>
                          {option}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-[#223059]">
                  No of Students
                </label>
                <Input
                  type="number"
                  className="w-full rounded-xl border border-[#dfe6f1] bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-[#223059]">
                  No of Subjects
                </label>
                <Input
                  type="number"
                  className="w-full rounded-xl border border-[#dfe6f1] bg-white"
                />
              </div>

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
              <Button
                variant="outline"
                className="rounded-lg border-none bg-[#e9edf5] px-8 font-bold text-[#4f5b78]"
                onPress={state.close}>
                Cancel
              </Button>
              <Button
                variant="primary"
                className="rounded-lg bg-[#526ee9] px-8 font-bold text-white"
                onPress={state.close}>
                Add Class
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  )
}
