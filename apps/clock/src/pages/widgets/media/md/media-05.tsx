import { SkipBackIcon, SkipForwardIcon } from 'lucide-react'

import { Avatar, Button } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import {
  AudioPlayerButton,
  AudioPlayerDuration,
  AudioPlayerProgress,
  AudioPlayerProvider,
  AudioPlayerTime,
  exampleTrack
} from '../../../../components/ui/audio-player'
import { ScrollArea } from '../../../../components/ui/scroll-area'
import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader
} from '../../../../components/ui/widget'

type MusicCardProps = {
  image: string
  alt: string
  fallback: string
  title: string
  artist: string
}

const albums = [
  'https://i.scdn.co/image/ab6761610000e5ebd55c95ad400aed87da52daec',
  'https://c.saavncdn.com/artists/Nucleya_002_20241118064538_500x500.jpg',
  'https://i.scdn.co/image/ab67616d0000b273aacbfc6de7128a834757fea4',
  'https://i.scdn.co/image/ab67616d0000b273e105c410a7b390c61a58cbf8',
  'https://i.scdn.co/image/ab67616d0000b273627b5b17cb48f6e6956b842e'
]

const musicCards: MusicCardProps[] = [
  {
    image: 'https://i.scdn.co/image/ab6761610000e5ebd55c95ad400aed87da52daec',
    alt: 'Ed Sheeran',
    fallback: 'ED',
    title: 'Sapphire',
    artist: 'Ed Sheeran'
  },
  {
    image:
      'https://c.saavncdn.com/artists/Nucleya_002_20241118064538_500x500.jpg',
    alt: 'Nucleya',
    fallback: 'NU',
    title: 'Jamrock',
    artist: 'Nucleya'
  },
  {
    image: 'https://i.scdn.co/image/ab67616d0000b273aacbfc6de7128a834757fea4',
    alt: 'Major Lazer',
    fallback: 'ML',
    title: 'Bumaye',
    artist: 'Major Lazer'
  },
  {
    image: 'https://i.scdn.co/image/ab67616d0000b273e105c410a7b390c61a58cbf8',
    alt: 'DJ Snake',
    fallback: 'DS',
    title: 'Taki Taki',
    artist: 'DJ Snake'
  },
  {
    image: 'https://i.scdn.co/image/ab67616d0000b273627b5b17cb48f6e6956b842e',
    alt: 'Arijit Singh',
    fallback: 'AS',
    title: 'Raabta',
    artist: 'Arijit Singh'
  }
]

export default function MediaMD05() {
  return (
    <AudioPlayerProvider>
      <Widget size="md" className="p-0">
        <WidgetContent>
          <div className="size-full">
            <div className="flex size-full flex-col items-center justify-between p-6">
              <WidgetHeader className="items-center justify-start gap-x-3">
                <Avatar
                  src="https://i.scdn.co/image/ab67616d0000b273dfd5b5d99cf81f1864deef01"
                  alt="Code Monkey"
                  fallback="CM"
                  className="size-full max-h-9 max-w-9 rounded-md"></Avatar>
                <div className="flex flex-col space-y-0">
                  <Label className="text-sm">{exampleTrack.data.title}</Label>
                  <Label className="text-default-400 text-xs">
                    {exampleTrack.data.artist}
                  </Label>
                </div>
              </WidgetHeader>
              <WidgetContent className="w-full flex-col items-center justify-center gap-1">
                <AudioPlayerProgress className="h-full max-h-2 w-full flex-1" />
                <div className="flex w-full items-center justify-between">
                  <AudioPlayerTime className="text-muted-foreground text-xs" />
                  <AudioPlayerDuration className="text-muted-foreground text-xs" />
                </div>
              </WidgetContent>
              <WidgetFooter className="mx-auto w-max items-center justify-between gap-x-6">
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
              </WidgetFooter>
            </div>
          </div>
          <div className="flex size-full flex-col items-start justify-between">
            <ScrollArea className="size-full max-h-48 py-4 pe-6">
              {musicCards.map((el, i) => (
                <MusicCard key={i} {...el} />
              ))}
            </ScrollArea>
          </div>
        </WidgetContent>
      </Widget>
    </AudioPlayerProvider>
  )
}

const MusicCard = ({
  image,
  alt,
  fallback,
  title,
  artist
}: {
  image: string
  alt: string
  fallback: string
  title: string
  artist: string
}) => {
  return (
    <div className="group bg-default hover:bg-content2 mt-3 flex w-full items-center justify-start gap-2 rounded-md p-3 hover:cursor-pointer">
      <Avatar
        src={image}
        alt={alt}
        fallback={fallback}
        className="size-full max-h-9 max-w-9 rounded-md"></Avatar>
      <div className="flex flex-col space-y-0">
        <Label className="w-full truncate text-sm group-hover:cursor-pointer">
          {title}
        </Label>
        <Label className="text-default-400 text-xs group-hover:cursor-pointer">
          {artist}
        </Label>
      </div>
    </div>
  )
}
