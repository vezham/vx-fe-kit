import * as React from 'react'

import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetHeader
} from '../../../../components/ui/widget'

export default function CalendarSM05() {
  const now = new Date()

  const day = now.toLocaleDateString('en-US', { weekday: 'long' })
  const date = now.getDate().toString().padStart(2, '0')

  const events = [
    { title: 'Scrum', time: '9 AM' },
    { title: 'Design Roundup', time: '11 AM' }
  ]

  return (
    <Widget design="mumbai">
      <WidgetHeader className="text-danger text-base">{day}</WidgetHeader>
      <WidgetContent className="flex-col items-start justify-start gap-2">
        <Label className="text-3xl">{date}</Label>
        {events.map((event, i) => (
          <div
            key={i}
            className="bg-content2 flex w-full items-center justify-between gap-2 rounded-md px-2 py-1 text-xs">
            {event.title}
            <span className="text-gray-500">{event.time}</span>
          </div>
        ))}
      </WidgetContent>
    </Widget>
  )
}
