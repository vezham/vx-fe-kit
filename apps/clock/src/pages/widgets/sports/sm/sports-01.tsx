// import Image from 'next/image'
import * as React from 'react'

import { Image } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

const details = [
  {
    image:
      '	https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Ffcb.png&w=64&q=75',
    name: 'FCB',
    teamName: 'FC Barcelona',
    score: '2'
  },
  {
    image:
      'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Frma.png&w=64&q=75',
    name: 'RMA',
    teamName: 'Real Madrid FC',
    score: '1'
  }
]

export default function Sports01() {
  return (
    <Widget>
      <WidgetHeader>
        <WidgetTitle className="text-default-400 text-sm">La Liga</WidgetTitle>
        <WidgetTitle className="text-default-400 text-sm">21 Oct</WidgetTitle>
      </WidgetHeader>
      <WidgetContent className="flex items-end justify-between">
        {details.map(team => (
          <div key={team.name} className="flex flex-col items-center gap-1">
            <Image
              className="size-8"
              src={team.image}
              alt={team.teamName}
              width={32}
              height={32}
            />
            <Label className="text-lg tracking-wider">{team.name}</Label>
            <Label className="text-3xl">{team.score}</Label>
          </div>
        ))}
      </WidgetContent>
    </Widget>
  )
}
