import * as React from 'react'

import { Image } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader,
  WidgetTitle
} from '../../../../components/ui/widget'

const scoreCard = [
  {
    teamName: 'IND',
    image:
      'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Find.png&w=48&q=75',
    score: '387/3',
    overs: 49
  },
  {
    teamName: 'AUS',
    image:
      'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Faus.png&w=48&q=75',
    score: '200/6',
    overs: 30
  }
]

export default function Sports05() {
  return (
    <Widget design="mumbai">
      <WidgetHeader>
        <WidgetTitle className="text-default-500">ODI 2</WidgetTitle>
      </WidgetHeader>
      <WidgetContent className="flex-col items-center justify-center gap-4">
        {scoreCard.map((team, i) => (
          <div key={i} className="flex w-full items-center justify-between">
            <div className="flex items-center justify-start gap-1">
              <Image className="size-5" src={team.image} alt={team.teamName} />
              <Label className="text-base">{team.teamName}</Label>
            </div>
            <div className="flex items-center justify-end gap-1">
              <Label className="text-base">{team.score}</Label>
              <Label className="text-default-500 text-xs">({team.overs})</Label>
            </div>
          </div>
        ))}
      </WidgetContent>
      <WidgetFooter className="justify-center">
        <p className="text-default-500 text-sm">
          AUS needs <span className="text-green-500">187</span> from{' '}
          <span className="text-green-500">120</span>
        </p>
      </WidgetFooter>
    </Widget>
  )
}
