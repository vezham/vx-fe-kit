'use client'

import { Icon } from '@iconify/react'
import { useContext, useEffect, useState } from 'react'

import { Button, Modal, Surface } from '@vezham/react/v3'

import { HeaderActionContext } from '../../context/header-action'
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

  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  const setHeaderActions = useContext(HeaderActionContext)

  useEffect(() => {
    const storedClocks = loadClocks()
    setClocks(storedClocks)

    const { open, selectedId } = loadModalState()
    if (open && selectedId) {
      const id = Number(selectedId)
      const found = storedClocks.find(c => c.id === id)
      if (found) {
        setActive(found)
        setModalOpen(true)
      }
    }
  }, [])

  useEffect(() => {
    setHeaderActions({
      onAdd: addClock
    })

    return () => {
      setHeaderActions({})
    }
  }, [])

  const persist = (next: WorldClockItem[]) => {
    setClocks(next)
    saveClocks(next)
  }

  const addClock = () => {
    setEditing(null)
    setDrawerOpen(true)
  }

  const editClock = (clock: WorldClockItem) => {
    setEditing(clock)
    setDrawerOpen(true)
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
    setDrawerOpen(false)
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
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    closeModalState()
    setActive(null)
  }

  return (
    <Surface variant="transparent">
      {clocks.length === 0 ? (
        <div className="flex h-screen flex-col items-center justify-center gap-2">
          <Icon icon="mdi:clock-outline" className="text-4xl" />
          <p>No clocks added</p>
          <Button variant="secondary" onPress={addClock}>
            Create New
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {clocks.map(clock => (
            <div
              key={clock.id}
              onClick={() => openModal(clock)}
              className="border-default-200 flex cursor-pointer items-center justify-between rounded border-2 p-3">
              <div>
                <div className="font-medium">{clock.city}</div>
                <div className="text-muted text-sm">{clock.timezone}</div>
              </div>

              <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  isIconOnly
                  size="sm"
                  onPress={() => editClock(clock)}>
                  <Icon icon="mdi:pencil" />
                </Button>

                <Button
                  variant="ghost"
                  isIconOnly
                  size="sm"
                  onPress={() => deleteClock(clock.id)}>
                  <Icon icon="mdi:delete" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setDrawerOpen}
        initialData={editing}
        onSave={saveClock}
      />

      <Modal isOpen={isModalOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>World Clock</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
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
              </Modal.Body>

              <Modal.Footer>
                <Button variant="ghost" onPress={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </Surface>
  )
}

export default Worldclock
