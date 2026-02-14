import { Icon } from '@iconify/react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { Button } from '@vezham/react/v2'

import { deleteWorldClock, getWorldClockById } from './storage'
import { WorldClockItem } from './types'

const DetailPage = () => {
  const { clockId } = useParams({ strict: false })
  const navigate = useNavigate()

  const [clock, setClock] = useState<WorldClockItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = Number(clockId)
    if (Number.isNaN(id)) {
      setLoading(false)
      return
    }

    const found = getWorldClockById(id)
    setClock(found)
    setLoading(false)
  }, [clockId])

  const goBack = () => {
    navigate({ to: '/' })
  }

  if (loading) {
    return <div className="p-4">Loading…</div>
  }

  if (!clock) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Icon icon="mdi:clock-alert" className="text-4xl" />
        <h2 className="text-xl font-semibold">Clock not found</h2>
        <Button onClick={goBack}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-3">
        <Button isIconOnly variant="light" onClick={goBack}>
          <Icon icon="mdi:arrow-left" />
        </Button>
        <h1 className="text-2xl font-bold">{clock.city}</h1>
      </div>

      <div className="rounded-xl border p-8 text-center">
        <div className="text-5xl font-bold">{clock.timezone}</div>
        <div className="text-muted mt-2">Saved Time</div>
      </div>

      <div className="space-y-3 rounded-xl border p-6">
        <div>
          <div className="text-muted text-sm">ID</div>
          <div className="font-mono">{clock.id}</div>
        </div>

        <div>
          <div className="text-muted text-sm">City</div>
          <div className="font-medium">{clock.city}</div>
        </div>

        <div>
          <div className="text-muted text-sm">Time</div>
          <div className="font-medium">{clock.timezone}</div>
        </div>
      </div>

      <Button
        color="danger"
        variant="light"
        startContent={<Icon icon="mdi:delete" />}
        onClick={() => {
          const ok = confirm(`Delete ${clock.city}?`)
          if (!ok) return

          deleteWorldClock(clock.id)
          goBack()
        }}>
        Delete
      </Button>
    </div>
  )
}

export default DetailPage
