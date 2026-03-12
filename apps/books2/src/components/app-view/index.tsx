import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface AppViewProps {
  isOpen?: boolean
  onClose?: () => void
  children: React.ReactNode
  title: string
}

export function AppView({ isOpen, onClose, children, title }: AppViewProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scale: 0.3, opacity: 0, borderRadius: '100%' }}
          animate={{
            scale: 1,
            opacity: 1,
            borderRadius: '24px'
          }}
          exit={{
            scale: 0.3,
            opacity: 0,
            borderRadius: '100%'
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="pointer-events-auto absolute inset-0 overflow-hidden rounded-[45px] bg-white/30">
          <div className="flex h-full flex-col">
            <div className="flex items-center border-b border-white/10 p-4 pt-8">
              <motion.button
                onClick={onClose}
                whileTap={{ scale: 0.9 }}
                className="">
                <Icon icon="lucide:chevron-left" className="h-5 w-5" />
              </motion.button>
              <h3 className="mr-5 flex-1 text-center text-lg">{title}</h3>
            </div>
            <div className="flex-1 overflow-hidden">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
