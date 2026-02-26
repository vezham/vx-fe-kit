import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'
import { useContext, useEffect, useMemo, useState } from 'react'

import { Button } from '@vezham/react/v3'
import { Surface } from '@vezham/react/v3'

import { HeaderActionContext } from '../../context/header-action'
import { AddDrawer } from './add_drawer'
import { useWorldClockQuery } from './query'
import { getAllClocks, saveAllClocks } from './storage'
import { WorldClockItem } from './types'

const generateId = () => Date.now()

const WorldClockQuery = () => {
  const navigate = useNavigate()
  const setHeaderActions = useContext(HeaderActionContext)
  const query = useWorldClockQuery()

  const [clocks, setClocks] = useState<WorldClockItem[]>(() => getAllClocks())

  useEffect(() => {
    saveAllClocks(clocks)
  }, [clocks])

  const editingClock = useMemo(() => {
    if (!query.editingId) return null
    return clocks.find(c => c.id === query.editingId) ?? null
  }, [query.editingId, clocks])

  useEffect(() => {
    setHeaderActions({
      onAdd: query.openAdd
    })

    return () => {
      setHeaderActions({})
    }
  }, [query.openAdd])

  const saveClock = (data: { city: string; timezone: string }) => {
    setClocks(prev => {
      if (!editingClock) {
        return [...prev, { id: generateId(), ...data }]
      }

      return prev.map(c => (c.id === editingClock.id ? { ...c, ...data } : c))
    })

    query.closeDrawer()
  }

  const deleteClock = (id: number) => {
    setClocks(prev => prev.filter(c => c.id !== id))
  }

  const openDetails = (clock: WorldClockItem) => {
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
          <Button onClick={query.openAdd}>Create New</Button>
        </div>
      ) : (
        <div className="space-y-2">
          {clocks.map(clock => (
            <div
              key={clock.id}
              onClick={() => openDetails(clock)}
              className="border-default-200 flex cursor-pointer items-center justify-between rounded border p-3">
              <div>
                <div className="font-medium">{clock.city}</div>
                <div className="text-muted text-sm">{clock.timezone}</div>
              </div>

              <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                <Button
                  isIconOnly
                  size="sm"
                  onClick={() => query.openEdit(clock.id)}>
                  <Icon icon="mdi:pencil" />
                </Button>

                <Button
                  isIconOnly
                  size="sm"
                  onClick={() => deleteClock(clock.id)}>
                  <Icon icon="mdi:delete" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddDrawer
        isOpen={query.drawer === 'add' || query.drawer === 'edit'}
        onOpenChange={open => {
          if (!open) query.closeDrawer()
        }}
        initialData={editingClock}
        onSave={saveClock}
      />
    </Surface>
  )
}

export default WorldClockQuery
