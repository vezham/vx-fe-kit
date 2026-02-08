import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

import { Button, useDisclosure } from '@vezham/react/v2'

import { AddDrawer } from './add_drawer'
import { useWorldClockQuery } from './query'
import { getAllClocks, saveAllClocks } from './storage'
import { WorldClockItem } from './types'

const generateId = () => Date.now()

const WorldClockQuery = () => {
  const navigate = useNavigate()
  const drawer = useDisclosure()
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
    if (query.drawer) {
      drawer.onOpen()
    } else {
      drawer.onClose()
    }
  }, [query.drawer])

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
    <div className="h-screen">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium">Worldclock</h2>

        <Button
          isIconOnly
          onClick={query.openAdd}
          startContent={<Icon icon="mdi:plus" />}
        />
      </div>

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
                  onClick={() => query.openEdit(clock.id)}
                  startContent={<Icon icon="mdi:pencil" />}
                />

                <Button
                  isIconOnly
                  size="sm"
                  onClick={() => deleteClock(clock.id)}
                  startContent={<Icon icon="mdi:delete" />}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <AddDrawer
        isOpen={drawer.isOpen}
        onOpenChange={query.closeDrawer}
        initialData={editingClock}
        onSave={saveClock}
      />
    </div>
  )
}

export default WorldClockQuery
