import { SkipBackIcon, SkipForwardIcon } from 'lucide-react'

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
  WidgetContent,
  WidgetFooter,
  WidgetHeader
} from '../../../../components/ui/widget'

export default function MediaSM01() {
  return (
    <AudioPlayerProvider>
      <Widget design="mumbai" className="justify-between">
        <WidgetHeader className="items-center justify-start gap-x-3">
          <Avatar className="size-full max-h-9 max-w-9 rounded-md">
            <Avatar.Image
              src="https://i.scdn.co/image/ab67616d0000b273dfd5b5d99cf81f1864deef01"
              alt="Code Monkey"
            />
            <Avatar.Fallback>CM</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col space-y-0">
            <Label className="text-base">{exampleTrack.data.title}</Label>
            <Label className="text-default-400 text-xs">
              {exampleTrack.data.artist}
            </Label>
          </div>
        </WidgetHeader>
        <WidgetContent className="flex-col gap-1">
          <AudioPlayerProgress className="h-full max-h-2 w-full flex-1" />
          <div className="flex w-full items-center justify-between">
            <AudioPlayerTime className="text-muted-foreground text-xs" />
            <AudioPlayerDuration className="text-muted-foreground text-xs" />
          </div>
        </WidgetContent>
        <WidgetFooter className="mx-auto w-max items-center justify-between gap-x-6">
          <Button
            variant="bordered"
            size="sm"
            className="hover:bg-content2"
            isIconOnly>
            <SkipBackIcon width={12} className="stroke-muted-foreground" />
          </Button>
          <AudioPlayerButton
            size="icon-sm"
            variant="outline"
            item={exampleTrack}
            className="hover:bg-content2 hover:text-black"
          />
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
