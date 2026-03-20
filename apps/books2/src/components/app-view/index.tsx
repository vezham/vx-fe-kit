import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface AppViewProps {
  isOpen?: boolean
  onClose?: () => void
  children: React.ReactNode
  title: string
  showBack?: boolean // 👈 NEW
}

export function AppView({
  isOpen,
  onClose,
  children,
  title,
  showBack = false
}: AppViewProps) {
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
            <div className="relative flex items-center border-b border-white/10 p-4 pt-6">
              {showBack && (
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.9 }}
                  className="absolute left-4">
                  <Icon icon="lucide:chevron-left" className="h-5 w-5" />
                </motion.button>
              )}

              <h3 className="flex-1 text-center text-lg">{title}</h3>
            </div>

            <div className="flex-1 overflow-hidden">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
