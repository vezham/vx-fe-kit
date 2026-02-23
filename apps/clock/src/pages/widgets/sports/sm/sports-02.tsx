import * as React from 'react'

import { Chip, Image } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

export default function Sports02() {
  return (
    <Widget design="mumbai">
      <WidgetHeader>
        <WidgetTitle className="text-default-400 flex items-center gap-1 text-sm font-normal">
          <div className="bg-success size-2 rounded-full" />
          Live
        </WidgetTitle>
      </WidgetHeader>
      <WidgetContent className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="me-auto flex flex-col items-center gap-2">
          <Image
            className="size-9"
            src="https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Fbvb.png&w=96&q=75"
            alt="FC Barcelona"
          />
          <Label className="text-3xl">4</Label>
        </div>
        <Chip className="animate-pulse rounded-md text-sm">34'</Chip>
        <div className="ms-auto flex flex-col items-center gap-2">
          <Image
            className="size-9"
            src="https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Fmci.png&w=96&q=75"
            alt="FC Barcelona"
            width={40}
            height={40}
          />
          <Label className="text-3xl">4</Label>
        </div>
      </WidgetContent>
      <WidgetFooter className="justify-center">
        <Label className="text-default-500">UCL Final</Label>
      </WidgetFooter>
    </Widget>
  )
}
