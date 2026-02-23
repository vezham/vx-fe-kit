import * as React from 'react'

import { Image } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetHeader
} from '../../../../components/ui/widget'

const upcomingMatches = [
  { teamName: 'FCB (H)', date: '25 Oct', time: '18:00' },
  { teamName: 'BVB (A)', date: '29 Oct', time: '21:00' }
]

export default function Sports03() {
  return (
    <Widget design="mumbai">
      <WidgetHeader className="items-center">
        <Image
          className="size-12"
          src="https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Fmci.png&w=96&q=75"
          alt="FC Barcelona"
        />
        <div className="text-default-500 flex flex-col gap-2">
          <Label>UCL - 1st</Label>
          <Label>EPL - 4th</Label>
        </div>
      </WidgetHeader>
      <WidgetContent className="mt-3 flex-col items-center gap-3">
        {upcomingMatches.map((match, i) => (
          <div
            key={i}
            className="bg-content2 flex w-full items-center justify-between rounded-lg px-2 py-1">
            <Label className="text-base tracking-wider">{match.teamName}</Label>
            <div className="text-default-500 flex flex-col gap-0.5">
              <Label className="text-xs">{match.date}</Label>
              <Label className="text-xs">{match.time}</Label>
            </div>
          </div>
        ))}
      </WidgetContent>
    </Widget>
  )
}
