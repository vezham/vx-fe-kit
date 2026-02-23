import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React from 'react'

interface MenuItemProps {
  icon: string
  label: string
  color: string
  delay: number
  onClick?: () => void
}

export function MenuItem({
  icon,
  label,
  color,
  delay,
  onClick
}: MenuItemProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: delay * 0.1
      }}
      whileHover={{ scale: 1.2 }}
      className="flex cursor-pointer flex-col items-center justify-center gap-2"
      onClick={onClick}>
      <div
        className={`flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full ${color} shadow-lg`}>
        <Icon icon={icon} className="h-7 w-7 text-white" />
      </div>
      <span className="text-[0.65rem] font-medium text-white/90">{label}</span>
    </motion.div>
  )
}
