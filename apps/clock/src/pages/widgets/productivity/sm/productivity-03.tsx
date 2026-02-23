'use client'

import { PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-react'
import React from 'react'

import { Button } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetFooter,
  WidgetHeader
} from '../../../../components/ui/widget'

export default function ProductivitySM03() {
  const [isCountingDown, setIsCountingDown] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState(1800)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  const minutes = Math.floor(timeLeft / 60)
  const seconds = (timeLeft % 60).toString().padStart(2, '0')

  const resetTimer = React.useCallback(() => {
    setIsCountingDown(false)
    setTimeLeft(1800)
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
    <Widget design="mumbai">
      <WidgetHeader className="justify-center">
        <Label className="text-muted text-3xl">🚀</Label>
      </WidgetHeader>
      <WidgetContent>
        <div className="flex h-full w-full flex-col items-center justify-center gap-0.5">
          <Label className="text-4xl">
            {minutes}:{seconds}
          </Label>
          <Label className="text-muted text-xs">POMODORO</Label>
        </div>
      </WidgetContent>
      <WidgetFooter>
        <Button
          isIconOnly
          aria-label="Reset timer"
          onClick={resetTimer}
          variant="bordered"
          size="sm"
          className="hover:bg-content2 rounded-full">
          <RotateCcwIcon width={12} />
        </Button>
        <Button
          isIconOnly
          aria-label={isCountingDown ? 'Pause timer' : 'Start timer'}
          onClick={handleToggle}
          variant="bordered"
          size="sm"
          className="hover:bg-content2 rounded-full">
          {isCountingDown ? (
            <PauseIcon width={12} className="size-4 fill-current stroke-none" />
          ) : (
            <PlayIcon width={12} className="size-4 fill-current stroke-none" />
          )}
        </Button>
      </WidgetFooter>
    </Widget>
  )
}
