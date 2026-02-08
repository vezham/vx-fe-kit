import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { Button, useDisclosure } from '@vezham/react/v2'

import { AddDrawer } from './add_drawer'
import { getAllClocks, saveAllClocks } from './storage'
import { WorldClockItem } from './types'

const generateId = () => Date.now()

const WorldClockURL = () => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [clocks, setClocks] = useState<WorldClockItem[]>(() => getAllClocks())
  const [editingClock, setEditingClock] = useState<WorldClockItem | null>(null)

  useEffect(() => {
    setClocks(getAllClocks())
  }, [])

  useEffect(() => {
    saveAllClocks(clocks)
  }, [clocks])

  const handleSave = (data: { city: string; timezone: string }) => {
    setClocks(prev => {
      if (editingClock) {
        return prev.map(c => (c.id === editingClock.id ? { ...c, ...data } : c))
      }

      return [
        ...prev,
        {
          id: generateId(),
          ...data
        }
      ]
    })

    setEditingClock(null)
    onOpenChange()
  }

  const handleDelete = (id: number) => {
    setClocks(prev => prev.filter(c => c.id !== id))
  }

  const handleClockClick = (clock: WorldClockItem) => {
    navigate({
      to: '/worldclock/$clockId',
      params: { clockId: String(clock.id) }
    })
  }

  return (
    <div className="h-screen">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium">Worldclock</h2>
        <Button
          isIconOnly
          startContent={<Icon icon="mdi:plus" />}
          onClick={() => {
            setEditingClock(null)
            onOpen()
          }}
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
                  startContent={<Icon icon="mdi:pencil" />}
                  onClick={() => {
                    setEditingClock(clock)
                    onOpen()
                  }}
                />
                <Button
                  isIconOnly
                  size="sm"
                  startContent={<Icon icon="mdi:delete" />}
                  onClick={() => handleDelete(clock.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <AddDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        initialData={editingClock}
        onSave={handleSave}
      />
    </div>
  )
}

export default WorldClockURL
