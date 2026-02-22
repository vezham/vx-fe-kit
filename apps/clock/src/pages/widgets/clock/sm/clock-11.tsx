'use client'

import {
  MinusIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
  RotateCcw
} from 'lucide-react'
import * as React from 'react'

import { Button } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader
} from '../../../../components/ui/widget'

type TimeAction = 'add' | 'subtract'

export default function Clock11() {
  const [isCountingDown, setIsCountingDown] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState(60)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = (timeLeft % 60).toString().padStart(2, '0')

  const updateTime = React.useCallback((action: TimeAction) => {
    setTimeLeft(prev => {
      if (action === 'add') return prev + 60
      if (action === 'subtract' && prev >= 60) return prev - 60
      return prev
    })
  }, [])

  const resetTimer = React.useCallback(() => {
    setIsCountingDown(false)
    setTimeLeft(60)
  }, [])

  const handleToggle = React.useCallback(() => {
    setIsCountingDown(prev => !prev)
  }, [])

  React.useEffect(() => {
    if (isCountingDown && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
      }, 1000)
    }

    if (!isCountingDown) {
      clearInterval(intervalRef.current!)
      intervalRef.current = null
    }

    return () => {
      clearInterval(intervalRef.current!)
      intervalRef.current = null
    }
  }, [isCountingDown])

  return (
    <Widget className="gap-3" design="mumbai">
      <WidgetHeader className="items-center">
        <Button
          size="sm"
          isIconOnly
          aria-label="Subtract one minute"
          disabled={isCountingDown || timeLeft <= 60}
          onClick={() => updateTime('subtract')}
          variant="light"
          className="disabled:cursor-not-allowed">
          <MinusIcon width={12} />
        </Button>

        <Label className="text-base text-gray-500">
          {minutes} Min{minutes !== 1 ? 's' : ''}
        </Label>
        <Button
          size="sm"
          isIconOnly
          aria-label="Add one minute"
          disabled={isCountingDown || timeLeft >= 600}
          onClick={() => updateTime('add')}
          variant="light"
          className="disabled:cursor-not-allowed">
          <PlusIcon width={12} />
        </Button>
      </WidgetHeader>
      <WidgetContent>
        <div className="flex h-full w-full items-center justify-center">
          <Label className="text-5xl">
            {minutes}:{seconds}
          </Label>
        </div>
      </WidgetContent>
      <WidgetFooter>
        <Button
          size="sm"
          isIconOnly
          variant="bordered"
          aria-label="Reset timer"
          onClick={resetTimer}
          className="hover:bg-content2 rounded-full">
          <RotateCcw width={16} />
        </Button>
        <Button
          size="sm"
          variant="bordered"
          isIconOnly
          aria-label={isCountingDown ? 'Pause timer' : 'Start timer'}
          onClick={handleToggle}
          className="hover:bg-content2 rounded-full">
          {isCountingDown ? (
            <PauseIcon className="size-4 fill-current stroke-none" />
          ) : (
            <PlayIcon className="size-4 fill-current stroke-none" />
          )}
        </Button>
      </WidgetFooter>
    </Widget>
  )
}
