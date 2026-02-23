import {
  CastIcon,
  HeartIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon
} from 'lucide-react'

import { Button } from '@vezham/react/v2'
import { Avatar, Label } from '@vezham/react/v3'

import {
  AudioPlayerButton,
  AudioPlayerDuration,
  AudioPlayerProgress,
  AudioPlayerProvider,
  AudioPlayerTime,
  exampleTrack
} from '../../../../components/ui/audio-player'
import {
  Widget,
  WidgetFooter,
  WidgetHeader
} from '../../../../components/ui/widget'

export default function MediaMD01() {
  return (
    <AudioPlayerProvider>
      <Widget className="justify-between" size="md">
        <WidgetHeader className="items-center justify-between">
          <div className="flex items-center justify-center gap-x-3">
            <Avatar className="size-12 rounded-md">
              <Avatar.Image
                src="https://i.scdn.co/image/ab67616d0000b273dfd5b5d99cf81f1864deef01"
                alt="Code Monkey"
              />
              <Avatar.Fallback>NU</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <Label className="text-base">{exampleTrack.data.title}</Label>
              <Label className="text-default-400 text-sm">
                {exampleTrack.data.artist}
              </Label>
            </div>
          </div>
          <Button variant="light" size="sm" isIconOnly>
            <HeartIcon className="stroke-muted-foreground size-5" />
          </Button>
        </WidgetHeader>
        <WidgetFooter className="flex w-full flex-col gap-3">
          <div className="flex w-full flex-col gap-1.5">
            <AudioPlayerProgress className="bg-default-200 h-full max-h-2 w-full flex-1" />
            <div className="flex w-full items-center justify-between">
              <AudioPlayerTime className="text-muted-foreground text-xs" />
              <AudioPlayerDuration className="text-muted-foreground text-xs" />
            </div>
          </div>
          <div className="mx-auto flex w-max items-center justify-between gap-8">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="hover:bg-content2 dark:hover:bg-content2">
              <ShuffleIcon className="text-default-400 size-5" />
            </Button>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="hover:bg-content2 dark:hover:bg-content2">
              <SkipBackIcon className="text-default-400 hover:bg-content2 size-5" />
            </Button>
            <AudioPlayerButton
              className="rounded-md border-none bg-black text-white"
              size="icon-sm"
              item={exampleTrack}
            />
            <Button
              isIconOnly
              variant="light"
              size="sm"
              className="hover:bg-content2 dark:hover:bg-content2">
              <SkipForwardIcon className="text-default-400 hover:bg-content2 size-5" />
            </Button>
            <Button
              variant="light"
              isIconOnly
              size="sm"
              className="hover:bg-content2 dark:hover:bg-content2">
              <CastIcon className="text-default-400 hover:bg-content2 size-5" />
            </Button>
          </div>
        </WidgetFooter>
      </Widget>
    </AudioPlayerProvider>
  )
}
