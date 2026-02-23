import { DumbbellIcon, SunIcon } from 'lucide-react'

import { Label } from '@vezham/react/v3'

import { Widget, WidgetContent } from '../../../../components/ui/widget'

export default function ProductivitySM06() {
  return (
    <Widget className="gap-3">
      <WidgetContent className="flex-col items-center justify-center gap-4">
        <div className="border-default-200 flex w-full items-center justify-start rounded-lg rounded-md border border-1 p-2">
          <div className="flex items-center justify-center gap-3 px-1">
            <SunIcon className="size-8 stroke-yellow-500" />
            <div className="flex flex-col items-start justify-start gap-1.5">
              <Label className="font-normal">Sleep early</Label>
              <Label className="text-muted font-normal">13 days</Label>
            </div>
          </div>
        </div>
        <div className="border-default-200 flex w-full items-center justify-start rounded-lg rounded-md border border-1 p-2">
          <div className="flex items-center justify-center gap-3 px-1">
            <DumbbellIcon className="size-8 stroke-amber-700" />
            <div className="flex flex-col items-start justify-start gap-1.5">
              <Label className="font-normal">Workout</Label>
              <Label className="text-muted font-normal">6 days</Label>
            </div>
          </div>
        </div>
      </WidgetContent>
    </Widget>
  )
}
