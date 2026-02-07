// pages/worldclock/worldClockUrl.tsx
import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { Button, useDisclosure } from '@vezham/react/v2'

import { WorldClockDrawer } from './WorldClockDrawer'

export type WorldClockItem = {
  id: number
  city: string
  timezone: string
}

const STORAGE_KEY = 'worldclocks'
const generateId = () => Date.now()

const WorldclockURL = () => {
  const navigate = useNavigate()

  const [clocks, setClocks] = useState<WorldClockItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  const [editingClock, setEditingClock] = useState<WorldClockItem | null>(null)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clocks))
  }, [clocks])

  const handleSave = (data: { city: string; timezone: string }) => {
    if (editingClock) {
      setClocks(prev =>
        prev.map(c => (c.id === editingClock.id ? { ...c, ...data } : c))
      )
    } else {
      const newClock: WorldClockItem = {
        id: generateId(),
        ...data
      }
      setClocks(prev => [...prev, newClock])
    }

    setEditingClock(null)
    onOpenChange()
  }

  const handleDelete = (id: number) => {
    setClocks(prev => prev.filter(c => c.id !== id))
  }

  const handleClockClick = (clock: WorldClockItem) => {
    navigate({
      to: '/worldclock/$clockId',
      params: { clockId: String(clock.id) } // 🔑 param must be string
    })
  }

  return (
    <div className="h-screen">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium">Worldclock</h2>
        <Button
          isIconOnly
          onClick={() => {
            setEditingClock(null)
            onOpen()
          }}
          startContent={<Icon icon="mdi:plus" />}
        />
      </div>

      {clocks.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <Icon icon="mdi:clock-outline" className="text-4xl" />
          <p>No clocks added</p>
          <Button onClick={onOpen}>Create New</Button>
        </div>
      ) : (
        <div className="space-y-2">
          {clocks.map(clock => (
            <div
              key={clock.id}
              onClick={() => handleClockClick(clock)}
              className="border-default-200 flex cursor-pointer items-center justify-between rounded border p-3">
              <div>
                <div className="font-medium">{clock.city}</div>
                <div className="text-muted text-sm">{clock.timezone}</div>
              </div>

              <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                <Button
                  isIconOnly
                  size="sm"
                  onClick={() => {
                    setEditingClock(clock)
                    onOpen()
                  }}
                  startContent={<Icon icon="mdi:pencil" />}
                />
                <Button
                  isIconOnly
                  size="sm"
                  onClick={() => handleDelete(clock.id)}
                  startContent={<Icon icon="mdi:delete" />}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <WorldClockDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        initialData={editingClock}
        onSave={handleSave}
      />
    </div>
  )
}

export default WorldclockURL
