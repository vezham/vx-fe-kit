import * as React from 'react'

import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

export default function Stocks02() {
  return (
    <Widget design="mumbai">
      <WidgetHeader>
        <WidgetTitle className="flex w-full flex-col items-start justify-start">
          <Label className="text-2xl font-medium">AAPL</Label>
          <Label className="text-muted text-lg">Apple Inc</Label>
        </WidgetTitle>
      </WidgetHeader>
      <WidgetContent className="justify-between"></WidgetContent>
      <WidgetFooter className="flex-col items-end">
        <Label className="text-4xl text-red-500">262.24</Label>
      </WidgetFooter>
    </Widget>
  )
}
