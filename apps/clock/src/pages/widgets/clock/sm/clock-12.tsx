'use client'

import { Pause, Play, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@vezham/react/v2'
import { Label } from '@vezham/react/v3'

import {
  Widget,
  WidgetContent,
  WidgetFooter
} from '../../../../components/ui/widget'

export default function Clock12() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10)
      }, 10)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)

    const padZero = (num: number) => String(num).padStart(2, '0')

    return {
      seconds: padZero(seconds),
      milliseconds: padZero(milliseconds)
    }
  }

  const { seconds, milliseconds } = formatTime(time)

  const totalSeconds = Math.floor(time / 1000)
  const totalMilliseconds = time % 1000

  const secondHandRotation =
    ((totalSeconds % 60) + totalMilliseconds / 1000) * 6

  const handleReset = () => {
    setTime(0)
    setIsRunning(false)
  }

  const handlePlayPause = () => {
    setIsRunning(!isRunning)
  }

  return (
    <Widget design="mumbai">
      <WidgetContent className="border-foreground/50 relative mx-auto aspect-square size-full max-h-32 max-w-32 items-center justify-center rounded-full border-2">
        {/* Clock center dot */}
        <div className="absolute top-1/2 left-1/2 z-20 size-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-red-500" />

        {[...Array(60)].map((_, i) => {
          return (
            <div
              key={`tick-${i}`}
              className="absolute h-full w-full"
              style={{
                transform: `rotate(${i * 6}deg)`
              }}>
              {/* Small second tick */}
              <div className="bg-content2 absolute top-0 left-1/2 h-1.5 w-0.5 -translate-x-1/2 transform" />
            </div>
          )
        })}

        {/* Hour markers and numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = i * 30 * (Math.PI / 180)

          return (
            <div
              key={i}
              className="absolute h-full w-full"
              style={{
                transform: `rotate(${i * 30}deg)`
              }}>
              {/* Hour tick */}
              <div className="bg-default-400 absolute top-0 left-1/2 h-3 w-0.5 -translate-x-1/2 transform" />
            </div>
          )
        })}

        {/* Numbers 1-12 */}
        {[...Array(12)].map((_, i) => {
          const angle = i * 30 * (Math.PI / 180)
          const x = Math.sin(angle) * 50
          const y = -Math.cos(angle) * 50
          const number = i === 0 ? 12 : i

          return (
            <Label
              key={`num-${i}`}
              className="text-muted absolute flex size-4 items-center justify-center text-xs font-semibold"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}>
              {number}
            </Label>
          )
        })}

        {/* Second hand (red) with dot at the end */}
        <div
          className="absolute top-1/2 left-1/2 z-10 h-16 w-0.5 origin-bottom rounded-full bg-red-500"
          style={{
            transform: `translate(-50%, -100%) rotate(${secondHandRotation}deg)`
          }}
        />

        <Label className="text-foreground absolute bottom-8 z-5 text-center text-lg">
          {seconds}.{milliseconds}
        </Label>
      </WidgetContent>

      <WidgetFooter>
        {/* Reset Button */}
        <Button
          size="sm"
          isIconOnly
          onClick={handleReset}
          variant="bordered"
          className="hover:bg-content2 rounded-full"
          aria-label="Reset stopwatch">
          <RotateCcw className="size-4" />
        </Button>
        <Button
          size="sm"
          onClick={handlePlayPause}
          isIconOnly
          variant="bordered"
          className="hover:bg-content2 rounded-full"
          aria-label={isRunning ? 'Pause stopwatch' : 'Start stopwatch'}>
          {isRunning ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="size-4 fill-current" />
          )}
        </Button>
      </WidgetFooter>
    </Widget>
  )
}
