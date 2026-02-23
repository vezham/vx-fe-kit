import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React from 'react'

export function StatusBar() {
  const [time, setTime] = React.useState(new Date())
  const [batteryLevel] = React.useState(85)
  const [notifications] = React.useState(3)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between rounded-full bg-black/50 px-4 py-1.5 backdrop-blur-sm">
      <div className="flex items-center gap-1">
        <Icon icon="lucide:bell" className="h-3.5 w-3.5 text-white" />
        {notifications > 0 && (
          <span className="text-[10px] font-medium text-white">
            {notifications}
          </span>
        )}
      </div>
      <div className="text-[11px] font-medium text-white">
        {time.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-medium text-white">
          {batteryLevel}%
        </span>
        <div className="relative h-3 w-5">
          <div className="absolute inset-0 rounded-sm border border-white/80" />
          <div
            className="absolute inset-y-0.5 right-0.5 left-0.5 rounded-[1px]"
            style={{
              backgroundColor: batteryLevel > 20 ? '#4ade80' : '#ef4444',
              width: `${Math.max(0, Math.min(100, batteryLevel))}%`
            }}
          />
          <div className="absolute top-1/2 -right-[2px] h-1.5 w-[2px] -translate-y-1/2 rounded-r-sm bg-white/80" />
        </div>
      </div>
    </motion.div>
  )
}
