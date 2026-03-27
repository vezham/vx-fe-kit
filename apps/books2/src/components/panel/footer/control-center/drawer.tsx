import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter
} from '@vezham/react/v2'
import { Chip } from '@vezham/react/v3'

type View = 'main' | 'airdrop' | 'wifi'

interface AIDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function AIDrawer({ isOpen, onClose }: AIDrawerProps) {
  const [view, setView] = useState<View>('main')

  const goBack = () => setView('main')

  return (
    <Drawer
      backdrop="transparent"
      placement="left"
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: 'bg-transparent border-none shadow-none max-w-[320px] md:translate-x-[106px] z-[10]',
        wrapper: 'z-[10]'
      }}>
      <DrawerContent className="flex justify-end bg-black/5 pb-4 shadow-xl backdrop-blur-sm">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="w-full overflow-hidden">
          {/* ✅ Dynamic height */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              {/* ================= MAIN ================= */}
              {view === 'main' && (
                <motion.div
                  key="main"
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3 p-4">
                  <DrawerBody className="space-y-3 p-0">
                    <Control
                      icon="solar:wifi-router-linear"
                      label="Wi-Fi"
                      sub="iPhone"
                      onClick={() => setView('wifi')}
                    />

                    <Control
                      icon="solar:bluetooth-linear"
                      label="Bluetooth"
                      sub="On"
                    />

                    <Control
                      icon="solar:airbuds-linear"
                      label="AirDrop"
                      sub="Contacts Only"
                      onClick={() => setView('airdrop')}
                    />

                    <Control
                      icon="solar:moon-linear"
                      label="Do Not Disturb"
                      sub="On"
                    />
                  </DrawerBody>
                </motion.div>
              )}

              {/* ================= AIRDROP ================= */}
              {view === 'airdrop' && (
                <motion.div
                  key="airdrop"
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 80, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4">
                  <Header title="AirDrop" onBack={goBack} />

                  <div className="mt-4 space-y-2">
                    <Option label="Contacts Only" />
                    <Option label="Everyone" />
                  </div>
                </motion.div>
              )}

              {/* ================= WIFI ================= */}
              {view === 'wifi' && (
                <motion.div
                  key="wifi"
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 80, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4">
                  <Header title="Wi-Fi" onBack={goBack} />

                  <div className="mt-4 space-y-2">
                    <Option label="iPhone" />
                    <Option label="Office WiFi" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <DrawerFooter className="flex items-center justify-center">
          <Chip className="cursor-pointer">Edit Controls</Chip>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function Control({
  icon,
  label,
  sub,
  onClick
}: {
  icon: string
  label: string
  sub?: string
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-xl bg-black/5 p-3 transition hover:bg-black/10">
      <Icon icon={icon} width={22} />

      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        {sub && <div className="text-muted text-xs">{sub}</div>}
      </div>

      {onClick && <Icon icon="solar:alt-arrow-right-linear" />}
    </div>
  )
}

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onBack}>
        <Icon icon="solar:alt-arrow-left-linear" width={20} />
      </button>
      <h3 className="font-semibold">{title}</h3>
    </div>
  )
}

function Option({ label }: { label: string }) {
  return (
    <div className="t cursor-pointer rounded-lg bg-black/5 p-3 text-sm hover:bg-black/10">
      {label}
    </div>
  )
}
