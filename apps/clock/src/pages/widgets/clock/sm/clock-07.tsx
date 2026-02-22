import { MoonIcon, SunIcon } from 'lucide-react'
import * as React from 'react'

import { Label, Separator } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetTitle
} from '../../../../components/ui/widget'

export default function Clock07() {
  return (
    <Widget>
      <WidgetContent className="flex-col justify-between gap-3">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <Label>Mumbai</Label>
            <SunIcon className="size-5" />
          </div>
          <WidgetTitle className="text-center text-xl">8:15 AM</WidgetTitle>
        </div>
        <Separator />
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <Label>Vancouver</Label>
            <MoonIcon className="size-5" />
          </div>
          <WidgetTitle className="text-center text-xl">6:45 PM</WidgetTitle>
        </div>
      </WidgetContent>
    </Widget>
  )
}
