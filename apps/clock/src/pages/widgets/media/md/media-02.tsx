import { SkipBackIcon, SkipForwardIcon } from 'lucide-react'

import { Button } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import {
  AudioPlayerButton,
  AudioPlayerDuration,
  AudioPlayerProgress,
  AudioPlayerProvider,
  AudioPlayerTime,
  exampleTrack
} from '../../../../components/ui/audio-player'
import { Widget, WidgetContent } from '../../../../components/ui/widget'

export default function MediaMD02() {
  return (
    <AudioPlayerProvider>
      <Widget size="md">
        <WidgetContent className="gap-4">
          <img
            src="https://i.scdn.co/image/ab67616d0000b273dfd5b5d99cf81f1864deef01"
            alt="Code Monkey"
            className="size-full max-w-36 rounded-lg object-cover"
          />
          <div className="flex h-full flex-1 flex-col items-start justify-between pb-3">
            <div className="flex flex-col space-y-0">
              <Label className="text-base">{exampleTrack.data.title}</Label>
              <Label className="text-muted text-sm">
                {exampleTrack.data.artist}
              </Label>
            </div>
            <div className="flex w-full flex-col gap-1.5">
              <AudioPlayerProgress className="h-full max-h-2 w-full flex-1" />
              <div className="flex w-full items-center justify-between">
                <AudioPlayerTime className="text-muted text-xs" />
                <AudioPlayerDuration className="text-muted text-xs" />
              </div>
            </div>
            <div className="mx-auto flex w-max items-center justify-between gap-x-6">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="hover:bg-content2 dark:hover:bg-content2">
                <SkipBackIcon width={16} className="stroke-muted-foreground" />
              </Button>
              <AudioPlayerButton
                className="bg-content2 hover:bg-content2 text-foreground rounded-md border-none"
                size="icon-sm"
                item={exampleTrack}
              />
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className="hover:bg-content2 dark:hover:bg-content2">
                <SkipForwardIcon
                  width={16}
                  className="stroke-muted-foreground"
                />
              </Button>
            </div>
          </div>
        </WidgetContent>
      </Widget>
    </AudioPlayerProvider>
  )
}
