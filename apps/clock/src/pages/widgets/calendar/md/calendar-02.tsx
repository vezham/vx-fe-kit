'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { Button, Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

export default function CalendarMD02() {
  const [date, setDate] = React.useState(() => new Date())
  const today = new Date()

  const year = date.getFullYear()
  const month = date.getMonth()

  const monthName = new Intl.DateTimeFormat('en-US', {
    month: 'short'
  }).format(date)

  const weekdayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const calendarDays = React.useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
    ]
  }, [year, month])

  const isToday = (d: number | null) =>
    d &&
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === d

  const changeMonth = (step: number) =>
    setDate(d => new Date(d.getFullYear(), d.getMonth() + step, 1))

  const events = [
    { title: 'Scrum', time: '9 AM' },
    { title: 'Design Roundup', time: '11 AM' },
    { title: 'Launch', time: '7 PM' }
  ]

  return (
    <Widget design="mumbai" size="md">
      <WidgetContent className="items-center justify-between gap-4">
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <div className="flex w-full items-center justify-between">
            <Button
              variant="ghost"
              className="size-4 p-0"
              onClick={() => changeMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <WidgetTitle>
              {monthName} {year}
            </WidgetTitle>
            <Button
              variant="ghost"
              className="size-4 p-0"
              onClick={() => changeMonth(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid size-full grid-cols-7 gap-1 text-center">
            {weekdayNames.map((d, i) => (
              <div key={i} className="text-xs">
                {d}
              </div>
            ))}
            {calendarDays.map((d, i) => (
              <div key={i} className="text-muted text-xs">
                {isToday(d) ? (
                  <div className="bg-foreground text-background flex size-4 items-center justify-center rounded-md p-2">
                    {d}
                  </div>
                ) : (
                  (d ?? <>&nbsp;</>)
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-start">
          <WidgetHeader className="text-danger-500 text-base">
            {today.toLocaleDateString('en-US', { weekday: 'long' })}
          </WidgetHeader>
          <div className="w-full flex-col items-end justify-end">
            <Label className="flex justify-center text-3xl">
              {today.getDate().toString().padStart(2, '0')}
            </Label>
            <div className="mt-2 space-y-2">
              {events.map((event, i) => (
                <div
                  key={i}
                  className="bg-content2 flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-xs">
                  {event.title}
                  <span className="text-muted">{event.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WidgetContent>
    </Widget>
  )
}
