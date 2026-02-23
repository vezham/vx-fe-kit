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

export default function MediaMD03() {
  return (
    <AudioPlayerProvider>
      <Widget size="md" className="p-0">
        <WidgetContent>
          <div className="relative size-full">
            <img
              src="https://i.scdn.co/image/ab67616d0000b273dfd5b5d99cf81f1864deef01"
              alt="Code Monkey"
              className="size-full rounded-lg object-cover"
            />
            <div className="from-background absolute inset-0 z-10 rounded-md bg-linear-to-l via-black/40 to-transparent" />
          </div>
          <div className="size-full">
            <div className="flex h-full w-full flex-col items-start justify-between p-6">
              <div className="flex flex-col space-y-0">
                <Label className="text-base">{exampleTrack.data.title}</Label>
                <Label className="text-default-400 text-sm">
                  {exampleTrack.data.artist}
                </Label>
              </div>
              <div className="flex w-full flex-col gap-1.5">
                <AudioPlayerProgress className="h-full max-h-2 w-full flex-1" />
                <div className="flex w-full items-center justify-between">
                  <AudioPlayerTime className="text-muted-foreground text-xs" />
                  <AudioPlayerDuration className="text-muted-foreground text-xs" />
                </div>
              </div>
              <div className="mx-auto flex w-max items-center justify-between gap-x-6">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  className="hover:bg-content2 dark:hover:bg-content2">
                  <SkipBackIcon
                    width={16}
                    className="stroke-muted-foreground"
                  />
                </Button>
                <AudioPlayerButton
                  className="bg-default hover:bg-content2 rounded-md border-none text-black"
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
          </div>
        </WidgetContent>
      </Widget>
    </AudioPlayerProvider>
  )
}
