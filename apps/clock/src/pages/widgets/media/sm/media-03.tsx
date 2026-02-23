import { SkipBackIcon, SkipForwardIcon } from 'lucide-react'

import { Button } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import {
  AudioPlayerButton,
  AudioPlayerProvider,
  exampleTrack
} from '../../../../components/ui/audio-player'
import {
  Widget,
  WidgetContent,
  WidgetFooter
} from '../../../../components/ui/widget'

export default function MediaSM03() {
  return (
    <AudioPlayerProvider>
      <Widget design="mumbai" className="justify-between gap-3">
        <WidgetContent>
          <div className="relative size-full">
            <img
              src="https://i.scdn.co/image/ab67616d0000b273dfd5b5d99cf81f1864deef01"
              alt="Code Monkey"
              className="max-h-28 w-full rounded-lg object-cover"
            />
            <div className="absolute inset-0 z-10 rounded-md bg-linear-to-t from-black via-black/50 to-transparent" />
            <Label className="text-muted-foreground absolute bottom-7 left-2 z-10 text-xs font-normal">
              Now Playing
            </Label>
            <Label className="absolute bottom-2 left-2 z-10 w-36 overflow-hidden text-sm">
              <span className="inline-block whitespace-nowrap">
                {exampleTrack.data.title}
              </span>
            </Label>
          </div>
        </WidgetContent>
        <WidgetFooter className="gap-2">
          <AudioPlayerButton
            variant="outline"
            className="hover:bg-content2 flex-1 rounded-full hover:text-black"
            item={exampleTrack}
          />
          <Button
            variant="bordered"
            size="sm"
            className="hover:bg-content2"
            isIconOnly>
            <SkipBackIcon width={12} className="stroke-muted-foreground" />
          </Button>
          <Button
            variant="bordered"
            size="sm"
            className="hover:bg-content2"
            isIconOnly>
            <SkipForwardIcon width={12} className="stroke-muted-foreground" />
          </Button>
        </WidgetFooter>
      </Widget>
    </AudioPlayerProvider>
  )
}
