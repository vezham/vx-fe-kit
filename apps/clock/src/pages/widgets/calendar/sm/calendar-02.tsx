import * as React from 'react'

import { Chip } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import { Widget, WidgetContent } from '../../../../components/ui/widget'

export default function CalendarSM02() {
  const now = new Date()

  const day = now.toLocaleDateString('en-US', { weekday: 'long' })
  const month = now.toLocaleDateString('en-US', { month: 'long' })
  const date = now.getDate()

  return (
    <Widget>
      <WidgetContent className="jsutfy-center flex flex-col items-center gap-2">
        <Label className="text-muted">{day}</Label>
        <Label className="text-5xl font-bold">{date}</Label>
        <Label className="text-muted">{month}</Label>
        <Chip variant="bordered" radius="md">
          {now.getFullYear()}
        </Chip>
      </WidgetContent>
    </Widget>
  )
}
