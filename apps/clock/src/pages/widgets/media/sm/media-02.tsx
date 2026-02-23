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
  WidgetHeader
} from '../../../../components/ui/widget'

export default function MediaSM02() {
  return (
    <AudioPlayerProvider>
      <Widget className="justify-between">
        <WidgetHeader className="items-center justify-start gap-x-3">
          <Avatar className="size-14 rounded-md">
            <Avatar.Image
              src="https://i.scdn.co/image/ab67616d0000b273dfd5b5d99cf81f1864deef01"
              alt="Code Monkey"
            />
            <Avatar.Fallback>CM</Avatar.Fallback>
          </Avatar>
          <div className="justify-center space-y-0">
            <Label className="text-center text-base text-wrap">
              {exampleTrack.data.title}
            </Label>
          </div>
        </WidgetHeader>
        <WidgetContent className="flex-none flex-col items-center justify-center gap-3">
          <div className="flex w-full items-center justify-between">
            <Button
              variant="light"
              size="sm"
              className="hover:bg-content2"
              isIconOnly>
              <SkipBackIcon width={12} className="stroke-muted-foreground" />
            </Button>
            <AudioPlayerButton
              size="icon-sm"
              variant="ghost"
              item={exampleTrack}
              className="hover:bg-content2 hover:text-foreground"
            />
            <Button
              variant="light"
              size="sm"
              className="hover:bg-content2"
              isIconOnly>
              <SkipForwardIcon width={12} className="stroke-muted-foreground" />
            </Button>
          </div>
          <div className="w-full space-y-1">
            <AudioPlayerProgress className="h-full max-h-2 w-full flex-1" />
            <div className="flex w-full items-center justify-between">
              <AudioPlayerTime className="text-muted-foreground text-xs" />
              <AudioPlayerDuration className="text-muted-foreground text-xs" />
            </div>
          </div>
        </WidgetContent>
      </Widget>
    </AudioPlayerProvider>
  )
}
