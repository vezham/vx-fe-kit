import * as React from 'react'

import { Badge } from '../../../../components/ui/badge'
import { Label } from '../../../../components/ui/label'
import { Widget, WidgetContent } from '../../../../components/ui/widget'

export default function CalendarSM02() {
  const now = new Date()

  const day = now.toLocaleDateString('en-US', { weekday: 'long' })
  const month = now.toLocaleDateString('en-US', { month: 'long' })
  const date = now.getDate()

  return (
    <Widget>
      <WidgetContent className="flex flex-col gap-2">
        <Label className="text-gray-500">{day}</Label>
        <Label className="text-5xl font-bold">{date}</Label>
        <Label className="text-gray-500">{month}</Label>
        <Badge variant="outline">{now.getFullYear()}</Badge>
      </WidgetContent>
    </Widget>
  )
}
