import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

import { Button, useDisclosure } from '@vezham/react/v2'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@vezham/react/v2'

import { AddDrawer } from './add_drawer'
import {
  closeModalState,
  loadClocks,
  loadModalState,
  openModalState,
  saveClocks
} from './storage'
import { WorldClockItem } from './types'

const Worldclock = () => {
  const [clocks, setClocks] = useState<WorldClockItem[]>([])
  const [editing, setEditing] = useState<WorldClockItem | null>(null)
  const [active, setActive] = useState<WorldClockItem | null>(null)

  const drawer = useDisclosure()
  const modal = useDisclosure()

  useEffect(() => {
    const storedClocks = loadClocks()
    setClocks(storedClocks)

    const { open, selectedId } = loadModalState()
    if (open && selectedId) {
      const id = Number(selectedId)
      const found = storedClocks.find(c => c.id === id)
      if (found) {
        setActive(found)
        modal.onOpen()
      }
    }
  }, [])

  const persist = (next: WorldClockItem[]) => {
    setClocks(next)
    saveClocks(next)
  }

  const addClock = () => {
    setEditing(null)
    drawer.onOpen()
  }

  const editClock = (clock: WorldClockItem) => {
    setEditing(clock)
    drawer.onOpen()
  }

  const saveClock = (data: { city: string; timezone: string }) => {
    let next = clocks

    if (editing) {
      next = clocks.map(c => (c.id === editing.id ? { ...c, ...data } : c))
    } else {
      next = [
        ...clocks,
        {
          id: Date.now(),
          ...data
        }
      ]
    }

    persist(next)
    setEditing(null)
    drawer.onOpenChange()
  }

  const deleteClock = (id: number) => {
    const next = clocks.filter(c => c.id !== id)
    persist(next)

    if (active?.id === id) {
      closeModal()
    }
  }

  const openModal = (clock: WorldClockItem) => {
    setActive(clock)
    openModalState(clock.id)
    modal.onOpen()
  }

  const closeModal = () => {
    setActive(null)
    closeModalState()
    modal.onClose()
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="font-medium">Worldclock</div>
        <Button
          isIconOnly
          onClick={addClock}
          startContent={<Icon icon="mdi:plus" />}
        />
      </div>

      {clocks.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <Icon icon="mdi:clock-outline" className="text-4xl" />
          <p>No clocks added</p>
          <Button onClick={addClock}>Create New</Button>
        </div>
      ) : (
        <div className="space-y-2">
          {clocks.map(clock => (
            <div
              key={clock.id}
              onClick={() => openModal(clock)}
              className="border-default-200 flex cursor-pointer items-center justify-between rounded border p-3">
              <div>
                <div className="font-medium">{clock.city}</div>
                <div className="text-muted text-sm">{clock.timezone}</div>
              </div>

              <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                <Button
                  isIconOnly
                  size="sm"
                  startContent={<Icon icon="mdi:pencil" />}
                  onClick={() => {
                    editClock(clock)
                  }}
                />
                <Button
                  isIconOnly
                  size="sm"
                  startContent={<Icon icon="mdi:delete" />}
                  onClick={() => deleteClock(clock.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <AddDrawer
        isOpen={drawer.isOpen}
        onOpenChange={drawer.onOpenChange}
        initialData={editing}
        onSave={saveClock}
      />

      <Modal
        isOpen={modal.isOpen}
        onOpenChange={open => {
          if (!open) closeModal()
        }}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>World Clock</ModalHeader>

              <ModalBody>
                {active && (
                  <div className="space-y-3">
                    <div>
                      <div className="text-muted text-sm">City</div>
                      <div className="font-medium">{active.city}</div>
                    </div>

                    <div>
                      <div className="text-muted text-sm">Timezone</div>
                      <div className="font-medium">{active.timezone}</div>
                    </div>
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Worldclock
