import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleIcon
} from 'lucide-react'

import { Button } from '@vezham/react/v2'

import { Widget, WidgetContent } from '../../../../components/ui/widget'

export default function MediaSM05() {
  return (
    <Widget className="justify-between">
      <WidgetContent className="inline-grid w-full grid-cols-3 gap-1">
        <Button
          isIconOnly
          aria-label="Pan camera up"
          className="hover:bg-content2 col-start-2 mx-auto rounded-md"
          size="sm"
          variant="bordered">
          <ChevronUpIcon aria-hidden="true" size={16} />
        </Button>
        <Button
          isIconOnly
          aria-label="Pan camera left"
          className="hover:bg-content2 col-start-1 mx-auto rounded-md"
          size="sm"
          variant="bordered">
          <ChevronLeftIcon aria-hidden="true" size={16} />
        </Button>
        <div aria-hidden="true" className="flex items-center justify-center">
          <CircleIcon className="opacity-60" size={20} />
        </div>
        <Button
          isIconOnly
          aria-label="Pan camera right"
          size="sm"
          variant="bordered"
          className="hover:bg-content2 mx-auto rounded-md">
          <ChevronRightIcon aria-hidden="true" size={16} />
        </Button>
        <Button
          isIconOnly
          aria-label="Pan camera down"
          className="hover:bg-content2 col-start-2 mx-auto rounded-md"
          size="sm"
          variant="bordered">
          <ChevronDownIcon aria-hidden="true" size={16} />
        </Button>
      </WidgetContent>
    </Widget>
  )
}
