import { AlarmClockIcon } from 'lucide-react'
import * as React from 'react'

import { Label, Switch } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

const alarms = ['7:00 AM', '12:30 PM', '5:30 PM', '10:00 PM']

export default function Clock10() {
  return (
    <Widget design="mumbai">
      <WidgetHeader>
        <WidgetTitle>Alarms</WidgetTitle>
        <AlarmClockIcon className="size-5" />
      </WidgetHeader>
      <WidgetContent className="mt-3 flex-col gap-3">
        {alarms.map(alarm => (
          <div
            key={alarm}
            className="flex w-full items-center justify-between space-x-2">
            <Label htmlFor={alarm} className="font-semibold">
              {alarm}
            </Label>
            <Switch>
              <Switch.Control>
                <Switch.Thumb id={alarm}></Switch.Thumb>
              </Switch.Control>
            </Switch>
          </div>
        ))}
      </WidgetContent>
    </Widget>
  )
}
