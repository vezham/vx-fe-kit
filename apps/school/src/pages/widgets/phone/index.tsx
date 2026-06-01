import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

import { Avatar, ScrollShadow } from '@vezham/react-v2'

import { AppView } from '../../../components/app-view'
import { recentCalls } from './data'
import type { PhoneAppProps } from './types'

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1
    }
  })
}

export function PhoneApp({ isOpen, onClose }: PhoneAppProps) {
  return (
    <AppView isOpen={isOpen} onClose={onClose} title="Phone">
      <ScrollShadow className="h-full py-2">
        {recentCalls.map((call, index) => (
          <motion.div
            key={`${call.name}-${index}`}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            className="mx-2 flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-white/10">
            <Avatar src={call.avatar} size="sm" />

            <div className="flex-1">
              <p className="text-sm font-medium">{call.name}</p>

              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Icon
                  icon={
                    call.type === 'incoming'
                      ? 'lucide:phone-incoming'
                      : call.type === 'outgoing'
                        ? 'lucide:phone-outgoing'
                        : 'lucide:phone-missed'
                  }
                  className={
                    call.type === 'missed' ? 'text-red-500' : 'text-gray-400'
                  }
                />
                <span>{call.time}</span>
              </div>
            </div>

            <Icon icon="lucide:phone" className="text-green-500" />
          </motion.div>
        ))}
      </ScrollShadow>
    </AppView>
  )
}
