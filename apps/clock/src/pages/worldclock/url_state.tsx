import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'
import { useContext, useEffect, useState } from 'react'

import { Button } from '@vezham/react/v3'
import { Surface } from '@vezham/react/v3'

import { HeaderActionContext } from '../../context/header-action'
import { AddDrawer } from './add_drawer'
import { getAllClocks, saveAllClocks } from './storage'
import { WorldClockItem } from './types'

const generateId = () => Date.now()

const WorldClockURL = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)

  const onOpenChange = (open: boolean) => {
    setIsOpen(open)
  }
  const setHeaderActions = useContext(HeaderActionContext)
  const [clocks, setClocks] = useState<WorldClockItem[]>(() => getAllClocks())
  const [editingClock, setEditingClock] = useState<WorldClockItem | null>(null)

  useEffect(() => {
    setClocks(getAllClocks())
  }, [])

  useEffect(() => {
    saveAllClocks(clocks)
  }, [clocks])

  useEffect(() => {
    setHeaderActions({
      onAdd: () => {
        setEditingClock(null)
        onOpen()
      },
      showSearch: true,
      showAdd: true,
      onSearch: v => console.log('search', v)
    })

    return () => {
      setHeaderActions({})
    }
  }, [])

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
    onOpenChange(false)
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
    <Surface variant="transparent">
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
                  }}>
                  <Icon icon="mdi:pencil" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  onClick={() => handleDelete(clock.id)}>
                  <Icon icon="mdi:delete" />
                </Button>
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
    </Surface>
  )
}

export default WorldClockURL
