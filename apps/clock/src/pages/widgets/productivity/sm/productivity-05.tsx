'use client'

import { BookOpenIcon, CheckIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@vezham/react/v2'
import { Label, cn } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetFooter
} from '../../../../components/ui/widget'

const streak = 8

export default function ProductivitySM05() {
  const [status, setStatus] = React.useState<boolean>(false)

  return (
    <Widget className="gap-3">
      <WidgetContent className="flex-col items-end justify-start gap-4">
        <div className="flex w-full flex-col">
          <Label className="text-xl">Read 10 Mins</Label>
          <Label className="text-muted-foreground text-sm font-normal">
            Streak: {status ? streak + 1 : streak} days
          </Label>
        </div>
      </WidgetContent>
      <WidgetFooter className="flex w-full items-center justify-between">
        <BookOpenIcon
          className={cn(
            'size-14',
            status ? 'stroke-green-500' : 'stroke-red-500'
          )}
          strokeWidth={1.5}
        />
        <Button
          isIconOnly
          disabled={status}
          onClick={() => setStatus(true)}
          className="hover:bg-content2 hover:cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed"
          variant="bordered"
          size="sm">
          <CheckIcon width={12} />
        </Button>
      </WidgetFooter>
    </Widget>
  )
}
