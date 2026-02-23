import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React from 'react'

import { Divider, ScrollShadow, Switch } from '@vezham/react/v2'

import { AppView } from '../../../components/app-view'
import { settingsGroups } from './data'
import type { SettingsAppProps } from './types'

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05
    }
  })
}

export function SettingsApp({ isOpen, onClose }: SettingsAppProps) {
  const [settings, setSettings] = React.useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {}

      settingsGroups.forEach(group => {
        group.items.forEach(item => {
          if (item.type === 'toggle') {
            initial[item.label] = item.value ?? false
          }
        })
      })

      return initial
    }
  )

  const handleToggle = (label: string) => {
    setSettings(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  let itemIndex = 0

  return (
    <AppView isOpen={isOpen} onClose={onClose} title="Settings">
      <ScrollShadow className="h-full">
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: groupIndex * 0.1 }}>
            <div className="px-4 py-2">
              <h4 className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                {group.title}
              </h4>
            </div>

            <div className="mx-2 overflow-hidden rounded-xl bg-white/5">
              {group.items.map((item, i) => {
                itemIndex++

                return (
                  <motion.div
                    key={item.label}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={itemIndex}>
                    <div className="flex items-center gap-3 p-3 hover:bg-white/5">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          item.type === 'toggle'
                            ? settings[item.label]
                              ? 'bg-blue-500/80'
                              : 'bg-gray-600/50'
                            : 'bg-gray-600/50'
                        }`}>
                        <Icon icon={item.icon} className="h-4 w-4 text-white" />
                      </div>

                      <span className="flex-1 text-sm text-white">
                        {item.label}
                      </span>

                      {item.type === 'toggle' ? (
                        <Switch
                          size="sm"
                          isSelected={settings[item.label]}
                          onValueChange={() => handleToggle(item.label)}
                          className="mr-1"
                        />
                      ) : (
                        <Icon
                          icon="lucide:chevron-right"
                          className="h-4 w-4 text-gray-400"
                        />
                      )}
                    </div>

                    {i < group.items.length - 1 && (
                      <Divider className="bg-white/10" />
                    )}
                  </motion.div>
                )
              })}
            </div>

            {groupIndex < settingsGroups.length - 1 && <div className="h-3" />}
          </motion.div>
        ))}
      </ScrollShadow>
    </AppView>
  )
}
