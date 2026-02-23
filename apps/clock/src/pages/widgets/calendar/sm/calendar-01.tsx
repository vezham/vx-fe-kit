import * as React from 'react'

import { Label } from '@vezham/react/v3'

import { Widget, WidgetContent } from '../../../../components/ui/widget'

export default function CalendarSM01() {
  const now = new Date()

  const day = now.toLocaleDateString('en-US', { weekday: 'short' })
  const month = now.toLocaleDateString('en-US', { month: 'short' })
  const date = now.getDate().toString().padStart(2, '0')

  return (
    <Widget>
      <WidgetContent className="mx-auto flex-col items-start">
        <div className="flex w-full items-center justify-center gap-2">
          <Label className="text-danger-500 text-2xl">{day}</Label>
          <Label className="text-2xl">{month}</Label>
        </div>
        <Label className="text-8xl">{date}</Label>
      </WidgetContent>
    </Widget>
  )
}
