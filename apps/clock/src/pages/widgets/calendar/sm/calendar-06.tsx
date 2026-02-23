import { PlusIcon, VideoIcon } from 'lucide-react'

import { Button } from '@vezham/react/v2'
import { Label, cn } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

export default function CalendarSM06() {
  const now = new Date()

  const day = now.toLocaleDateString('en-US', { weekday: 'long' })
  const month = now.toLocaleDateString('en-US', { month: 'long' })
  const date = now.getDate().toString().padStart(2, '0')

  const events = [
    {
      time: '7:00 - 8:30 AM',
      title: 'GYM',
      action: null,
      borderColor: 'bg-yellow-500'
    },
    {
      time: '11:00 - 1:00 PM',
      title: 'Doc Review',
      action: null,
      borderColor: 'bg-blue-500'
    },
    {
      time: '6:00 PM',
      title: 'Wigggle Launch',
      action: VideoIcon,
      borderColor: 'bg-green-500'
    }
  ]

  return (
    <Widget design="mumbai" className="gap-2">
      <WidgetHeader className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <WidgetTitle className="text-3xl">{date}</WidgetTitle>
          <div className="flex flex-col">
            <Label className="text-muted text-xs">{month}</Label>
            <Label className="text-muted text-xs">{day}</Label>
          </div>
        </div>
        <Button
          isIconOnly
          size="sm"
          variant="bordered"
          className="hover:bg-content2">
          <PlusIcon width={16} />
        </Button>
      </WidgetHeader>

      <WidgetContent className="flex flex-col items-start gap-2">
        {events.map(({ title, time, borderColor, action: Action }) => (
          <div key={title} className="flex w-full items-center justify-between">
            <div className="flex h-full">
              <div className={cn('h-full w-1 rounded-md', borderColor)} />
              <div className="flex flex-col px-2">
                <Label className="text-muted text-xs">{time}</Label>
                <Label className="text-xs font-normal">{title}</Label>
              </div>
            </div>

            {Action && (
              <Button
                isIconOnly
                size="sm"
                variant="bordered"
                className="hover:bg-content2">
                <Action width={16} />
              </Button>
            )}
          </div>
        ))}
      </WidgetContent>
    </Widget>
  )
}
