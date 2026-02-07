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

import { WorldClockDrawer } from './WorldClockDrawer'

export type WorldClockItem = {
  id: string
  city: string
  timezone: string
}

const STORAGE_KEYS = {
  CLOCKS: 'worldclocks',
  SELECTED_ID: 'worldclock:selectedId',
  MODAL_OPEN: 'worldclock:isModalOpen'
}

const Worldclock = () => {
  const [clocks, setClocks] = useState<WorldClockItem[]>([])
  const [editingClock, setEditingClock] = useState<WorldClockItem | null>(null)
  const [selectedClock, setSelectedClock] = useState<WorldClockItem | null>(
    null
  )
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onOpenChange: onDrawerChange
  } = useDisclosure()

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModalDisclosure,
    onOpenChange: onModalChange
  } = useDisclosure()

  useEffect(() => {
    const storedClocks = localStorage.getItem(STORAGE_KEYS.CLOCKS)
    const storedSelectedId = localStorage.getItem(STORAGE_KEYS.SELECTED_ID)
    const storedModalOpen = localStorage.getItem(STORAGE_KEYS.MODAL_OPEN)

    if (storedClocks) {
      const parsedClocks: WorldClockItem[] = JSON.parse(storedClocks)
      setClocks(parsedClocks)

      if (storedModalOpen === 'true' && storedSelectedId) {
        const clock = parsedClocks.find(c => c.id === storedSelectedId)
        if (clock) {
          setSelectedClock(clock)
          setTimeout(() => {
            openModal()
          }, 0)
        }
      }
    }

    setIsInitialLoad(false)
  }, [])

  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem(STORAGE_KEYS.CLOCKS, JSON.stringify(clocks))
    }
  }, [clocks, isInitialLoad])

  const openAddDrawer = () => {
    setEditingClock(null)
    openDrawer()
  }

  const openEditDrawer = (clock: WorldClockItem) => {
    setEditingClock(clock)
    openDrawer()
  }

  const handleSave = (data: { city: string; timezone: string }) => {
    if (editingClock) {
      setClocks(prev =>
        prev.map(c => (c.id === editingClock.id ? { ...c, ...data } : c))
      )
    } else {
      setClocks(prev => [
        ...prev,
        {
          id: Math.random().toString(10).slice(2),
          ...data
        }
      ])
    }

    setEditingClock(null)
    onDrawerChange()
  }

  const handleDelete = (id: string) => {
    setClocks(prev => prev.filter(c => c.id !== id))

    if (selectedClock?.id === id) {
      closeModal()
    }
  }

  const openClockModal = (clock: WorldClockItem) => {
    setSelectedClock(clock)
    localStorage.setItem(STORAGE_KEYS.SELECTED_ID, clock.id)
    localStorage.setItem(STORAGE_KEYS.MODAL_OPEN, 'true')
    openModal()
  }

  const closeModal = () => {
    setSelectedClock(null)
    localStorage.removeItem(STORAGE_KEYS.SELECTED_ID)
    localStorage.setItem(STORAGE_KEYS.MODAL_OPEN, 'false')
    closeModalDisclosure()
  }

  const handleModalOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      closeModal()
    } else {
      onModalChange()
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="font-medium">Worldclock</div>
        <Button
          isIconOnly
          onClick={openAddDrawer}
          startContent={<Icon icon="mdi:plus" />}
        />
      </div>

      <div className="space-y-2">
        {clocks.map(clock => (
          <div
            key={clock.id}
            onClick={() => openClockModal(clock)}
            className="border-default-500 hover:bg-default-100 flex cursor-pointer items-center justify-between rounded border p-3">
            <div>
              <div className="font-medium">{clock.city}</div>
              <div className="text-muted text-sm">{clock.timezone}</div>
            </div>

            <div className="flex gap-2">
              <Button
                isIconOnly
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  openEditDrawer(clock)
                }}
                startContent={<Icon icon="mdi:pencil" />}
              />

              <Button
                isIconOnly
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  handleDelete(clock.id)
                }}
                startContent={<Icon icon="mdi:delete" />}
              />
            </div>
          </div>
        ))}
      </div>

      <WorldClockDrawer
        isOpen={isDrawerOpen}
        onOpenChange={onDrawerChange}
        initialData={editingClock}
        onSave={handleSave}
      />

      <Modal isOpen={isModalOpen} onOpenChange={handleModalOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>World Clock</ModalHeader>

              <ModalBody>
                {selectedClock && (
                  <div className="space-y-3">
                    <div>
                      <div className="text-muted text-sm">City</div>
                      <div className="font-medium">{selectedClock.city}</div>
                    </div>

                    <div>
                      <div className="text-muted text-sm">Timezone</div>
                      <div className="font-medium">
                        {selectedClock.timezone}
                      </div>
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
