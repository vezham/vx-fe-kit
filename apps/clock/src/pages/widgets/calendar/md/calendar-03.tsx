'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { Divider } from '@vezham/react/v2'
import { Button, Separator } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetTitle
} from '../../../../components/ui/widget'

export default function CalendarMD03() {
  const [date, setDate] = React.useState(() => new Date())
  const today = new Date()

  const formatMonth = (d: Date) =>
    new Intl.DateTimeFormat('en-US', { month: 'short' }).format(d)

  const buildCalendar = React.useCallback((y: number, m: number) => {
    const firstDay = new Date(y, m, 1).getDay()
    const days = new Date(y, m + 1, 0).getDate()
    return [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: days }, (_, i) => i + 1)
    ]
  }, [])

  const [year, month] = [date.getFullYear(), date.getMonth()]
  const next = new Date(year, month + 1, 1)

  const calendarDays = React.useMemo(
    () => buildCalendar(year, month),
    [buildCalendar, year, month]
  )
  const nextCalendarDays = React.useMemo(
    () => buildCalendar(next.getFullYear(), next.getMonth()),
    [buildCalendar, next]
  )

  const isToday = (d: number | null, m: number, y: number) =>
    d &&
    today.getFullYear() === y &&
    today.getMonth() === m &&
    today.getDate() === d

  const changeMonth = (step: number) =>
    setDate(d => new Date(d.getFullYear(), d.getMonth() + step, 1))

  const WeekdayRow = () =>
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
      <div key={i} className="text-xs">
        {d}
      </div>
    ))

  const Calendar = ({
    days,
    m,
    y
  }: {
    days: (number | null)[]
    m: number
    y: number
  }) => (
    <div className="grid size-full grid-cols-7 gap-1 text-center">
      <WeekdayRow />
      {days.map((d, i) => (
        <div key={i} className="text-default-400 text-xs">
          {isToday(d, m, y) ? (
            <div className="flex size-4 items-center justify-center rounded-md bg-black p-2 text-white">
              {d}
            </div>
          ) : (
            (d ?? <>&nbsp;</>)
          )}
        </div>
      ))}
    </div>
  )

  return (
    <Widget design="mumbai" size="md" className="p-3 pt-2.5">
      <WidgetContent className="flex flex-col gap-2">
        <div className="flex w-full items-center justify-between border-b-2 pb-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="size-4 p-0"
              onClick={() => changeMonth(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <WidgetTitle className="ms-10 text-sm font-normal">
              {formatMonth(date)} {year}
            </WidgetTitle>
          </div>
          <div className="flex items-center gap-2">
            <WidgetTitle className="me-10 text-sm font-normal">
              {formatMonth(next)} {next.getFullYear()}
            </WidgetTitle>
            <Button
              variant="ghost"
              className="size-4 p-0"
              onClick={() => changeMonth(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Separator />
        <div className="flex w-full flex-1 items-center justify-between gap-2">
          <Calendar days={calendarDays} m={month} y={year} />
          <Divider orientation="vertical" />
          <Calendar
            days={nextCalendarDays}
            m={next.getMonth()}
            y={next.getFullYear()}
          />
        </div>
      </WidgetContent>
    </Widget>
  )
}
