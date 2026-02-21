import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleIcon
} from 'lucide-react'

import { Button } from '../../../../components/ui/button'
import { Widget, WidgetContent } from '../../../../components/ui/widget'

export default function MediaSM05() {
  return (
    <Widget className="justify-between">
      <WidgetContent className="inline-grid w-full grid-cols-3 gap-1">
        <Button
          aria-label="Pan camera up"
          className="col-start-2 mx-auto rounded-md"
          size="icon"
          variant="default">
          <ChevronUpIcon aria-hidden="true" size={16} />
        </Button>
        <Button
          aria-label="Pan camera left"
          className="col-start-1 mx-auto rounded-md"
          size="icon"
          variant="default">
          <ChevronLeftIcon aria-hidden="true" size={16} />
        </Button>
        <div aria-hidden="true" className="flex items-center justify-center">
          <CircleIcon className="opacity-60" size={20} />
        </div>
        <Button
          aria-label="Pan camera right"
          size="icon"
          variant="default"
          className="mx-auto rounded-md">
          <ChevronRightIcon aria-hidden="true" size={16} />
        </Button>
        <Button
          aria-label="Pan camera down"
          className="col-start-2 mx-auto rounded-md"
          size="icon"
          variant="default">
          <ChevronDownIcon aria-hidden="true" size={16} />
        </Button>
      </WidgetContent>
    </Widget>
  )
}
