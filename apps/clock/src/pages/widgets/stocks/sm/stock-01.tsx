import { TriangleIcon } from 'lucide-react'
import * as React from 'react'

import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

export default function Stocks01() {
  return (
    <Widget design="mumbai">
      <WidgetHeader>
        <WidgetTitle className="flex w-full items-center justify-between">
          <Label className="text-4xl">732.17</Label>
          <TriangleIcon className="size-6 fill-green-700 stroke-none" />
        </WidgetTitle>
      </WidgetHeader>
      <WidgetContent className="justify-between">
        <Label className="text-green-700">+2.76</Label>
        <Label className="text-green-700">+0.47%</Label>
      </WidgetContent>
      <WidgetFooter className="flex-col items-start">
        <Label className="text-2xl font-medium">META</Label>
        <Label className="text-muted-foreground text-base">
          Meta Platforms Inc
        </Label>
      </WidgetFooter>
    </Widget>
  )
}
