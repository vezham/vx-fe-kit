'use client'

import { XIcon } from 'lucide-react'

import { Button, Image } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetFooter
} from '../../../../components/ui/widget'

export default function MediaSM08() {
  return (
    <Widget design="mumbai" className="relative justify-between gap-0">
      <Button
        isIconOnly
        variant="bordered"
        size="sm"
        className="hover:bg-content2 absolute top-2 right-2 rounded-full">
        <XIcon width={12} />
      </Button>
      <WidgetContent className="flex-col gap-2">
        <Image
          src="https://wigggle-ui.vercel.app/_next/image?url=%2Fassets%2Fproducts%2Fairpods-max.png&w=384&q=75"
          alt="Airpods Max"
          className="size-20"
        />
        <Label>Henil's AirPods Max</Label>
      </WidgetContent>
      <WidgetFooter>
        <Button
          variant="bordered"
          className="hover:bg-content2 w-full rounded-full">
          Connect
        </Button>
      </WidgetFooter>
    </Widget>
  )
}
