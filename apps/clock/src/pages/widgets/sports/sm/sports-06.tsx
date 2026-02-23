import { Image } from '@vezham/react/v2'
import { Label, Separator } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader
} from '../../../../components/ui/widget'

const battersInfo = [
  {
    teamImage:
      'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Find.png&w=48&q=75',
    teamName: 'India',
    playerName: 'Pratika R',
    score: '122',
    balls: '134'
  },
  {
    teamImage:
      'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Find.png&w=48&q=75',
    teamName: 'India',
    playerName: 'Smriti M',
    score: '109*',
    balls: '95'
  }
]

const bowlersInfo = [
  {
    teamImage:
      'https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Flogos%2Fnz.png&w=48&q=75',
    teamName: 'New Zealand',
    playerName: 'Eden C',
    score: '2/76',
    overs: '6.0'
  }
]

export default function Sports06() {
  return (
    <Widget design="mumbai">
      <WidgetHeader className="pb-1.5">
        <div className="flex items-center gap-1">
          <div className="bg-success size-2 rounded-full" />
          <Label className="text-muted text-sm">IND vs NZ</Label>
        </div>
        <Label className="text-sm">340/7</Label>
      </WidgetHeader>
      <WidgetContent className="flex-col items-center justify-center gap-2">
        <div className="flex w-full flex-col items-center justify-between gap-3">
          {battersInfo.map((batter, i) => (
            <div key={i} className="flex w-full items-center justify-between">
              <div className="flex gap-1">
                <Image
                  className="size-4"
                  src={batter.teamImage}
                  alt={batter.teamName}
                />
                <Label className="text-xs">{batter.playerName}</Label>
              </div>
              <Label className="text-xs">
                {batter.score}
                <span className="text-muted">({batter.balls})</span>
              </Label>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex w-full items-center justify-between">
          {bowlersInfo.map((bowler, i) => (
            <div key={i} className="flex w-full items-center justify-between">
              <div className="flex gap-1">
                <Image
                  className="size-4"
                  src={bowler.teamImage}
                  alt={bowler.teamName}
                />
                <Label className="text-xs">{bowler.playerName}</Label>
              </div>
              <Label className="text-xs">
                {bowler.score}
                <span className="text-muted">({bowler.overs})</span>
              </Label>
            </div>
          ))}
        </div>
      </WidgetContent>
      <WidgetFooter className="justify-center pt-1">
        <p className="text-muted text-sm">
          IND needs <span className="text-green-500">26</span> from{' '}
          <span className="text-green-500">18</span>
        </p>
      </WidgetFooter>
    </Widget>
  )
}
