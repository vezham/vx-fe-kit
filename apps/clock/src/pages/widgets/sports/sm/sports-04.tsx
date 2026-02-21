import * as React from 'react'

import { Image } from '@vezham/react/v2'

import { Label } from '../../../../components/ui/label'
import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

const upcomingMatches = [
  {
    home: 'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Ffcb.png&w=128&q=75',
    away: 'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Fbvb.png&w=128&q=75',
    date: '25 Oct',
    time: '8:30 PM'
  },
  {
    home: 'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Fmci.png&w=128&q=75',
    away: 'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Ffcb.png&w=128&q=75',
    date: '29 Oct',
    time: '12:30 PM'
  },
  {
    home: 'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Fbvb.png&w=128&q=75',
    away: 'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Ffcb.png&w=128&q=75',
    date: '31 Oct',
    time: '8:30 PM'
  }
]

export default function Sports04() {
  return (
    <Widget design="mumbai">
      <WidgetHeader>
        <WidgetTitle className="text-muted-foreground text-sm font-normal">
          Fixtures
        </WidgetTitle>
      </WidgetHeader>
      <WidgetContent className="mt-2 flex-col items-center gap-1.5">
        {upcomingMatches.map((match, i) => (
          <div
            key={i}
            className="bg-default flex w-full items-center justify-between rounded-lg px-2 py-1">
            <Image className="size-7" src={match.home} alt={match.home} />
            <div className="flex flex-col items-center justify-center gap-0">
              <Label className="text-default-500 text-xs">{match.date}</Label>
              <Label className="text-default-500 text-xs">{match.time}</Label>
            </div>
            <Image className="size-7" src={match.away} alt={match.away} />
          </div>
        ))}
      </WidgetContent>
    </Widget>
  )
}
