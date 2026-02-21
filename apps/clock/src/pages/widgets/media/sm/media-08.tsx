'use client'

import { XIcon } from 'lucide-react'

import { Image } from '@vezham/react/v2'

import { Button } from '../../../../components/ui/button'
import { Label } from '../../../../components/ui/label'
import {
  Widget,
  WidgetContent,
  WidgetFooter
} from '../../../../components/ui/widget'

export default function MediaSM08() {
  return (
    <Widget design="mumbai" className="relative justify-between gap-0">
      <Button
        variant="default"
        size="icon-sm"
        className="absolute top-2 right-2 rounded-full">
        <XIcon />
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
        <Button variant="default" className="w-full rounded-full">
          Connect
        </Button>
      </WidgetFooter>
    </Widget>
  )
}
