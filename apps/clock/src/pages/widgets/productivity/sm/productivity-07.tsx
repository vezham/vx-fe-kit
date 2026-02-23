import { GlassWaterIcon } from 'lucide-react'

import { Separator } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

const now = new Date()
const year = now.getFullYear()
const date = now.getDate()

const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate()
const firstDay = new Date(year, now.getMonth(), 1).getDay()

const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

const skippedDays: number[] = Array.from(
  { length: 3 },
  () => Math.floor(Math.random() * 30) + 1
)

export default function ProductivitySM07() {
  return (
    <Widget className="gap-2 p-3" design="mumbai">
      <WidgetHeader className="justify-start gap-1 px-1">
        <GlassWaterIcon className="size-4" />
        <WidgetTitle className="font-normal">Water Streak</WidgetTitle>
      </WidgetHeader>
      <Separator className="h-0.5 rounded-full" />
      <WidgetContent>
        <div className="grid size-full grid-cols-7 gap-1 text-center">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`f-${i}`} className="text-xs">
              &nbsp;
            </div>
          ))}
          {days.map(day => (
            <div key={day} className="text-muted-foreground text-xs">
              {!skippedDays.includes(day) && day < date ? (
                <div className="bg-success flex size-4 items-center justify-center rounded-md rounded-xs p-2">
                  {day}
                </div>
              ) : day === date ? (
                <div className="bg-foreground/80 flex size-4 items-center justify-center rounded-md p-2 text-white">
                  {day}
                </div>
              ) : (
                day
              )}
            </div>
          ))}
        </div>
      </WidgetContent>
    </Widget>
  )
}
