import { CheckIcon, XIcon } from 'lucide-react'

import { Button } from '../../../../components/ui/button'
import {
  WheelPicker,
  WheelPickerOption,
  WheelPickerWrapper
} from '../../../../components/ui/wheel-picker'
import {
  Widget,
  WidgetContent,
  WidgetFooter
} from '../../../../components/ui/widget'

const createArray = (length: number, add = 0): WheelPickerOption[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add
    return {
      label: value.toString().padStart(2, '0'),
      value: value.toString()
    }
  })

const hourOptions = createArray(12, 1)
const minuteOptions = createArray(60)
const meridiemOptions: WheelPickerOption[] = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' }
]

export default function Clock13() {
  return (
    <Widget className="gap-3" design="mumbai">
      <WidgetContent>
        <WheelPickerWrapper className="border-default-200 rounded-lg border border-2">
          <WheelPicker
            visibleCount={12}
            options={hourOptions}
            defaultValue="9"
            infinite
          />
          <WheelPicker
            visibleCount={12}
            options={minuteOptions}
            defaultValue="41"
            infinite
          />
          <WheelPicker
            visibleCount={12}
            options={meridiemOptions}
            defaultValue="AM"
          />
        </WheelPickerWrapper>
      </WidgetContent>
      <WidgetFooter>
        <Button
          size="icon-sm"
          variant="default"
          className="rounded-full text-red-500"
          aria-label="Reset stopwatch">
          <XIcon className="stroke-destructive size-4 stroke-3" />
        </Button>
        <Button
          size="icon-sm"
          variant="default"
          className="rounded-full text-green-500"
          aria-label={'Start stopwatch'}>
          <CheckIcon className="stroke-productive size-4 stroke-3" />
        </Button>
      </WidgetFooter>
    </Widget>
  )
}
