import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { Drawer, DrawerContent, DrawerFooter } from '@vezham/react/v2'
import { Button, Chip } from '@vezham/react/v3'

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
        base: 'bg-transparent border-none shadow-none max-w-[380px] md:translate-x-[106px]',
        wrapper: 'z-[20]'
      }}>
      <DrawerContent className="flex justify-end rounded-r-3xl bg-black/5 p-4 shadow-xl backdrop-blur-sm">
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="w-full">
          <AnimatePresence mode="wait">
            {view === 'main' && (
              <motion.div
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Tile
                      icon="solar:wifi-router-bold"
                      label="Wi-Fi"
                      sub="iPhone"
                      onClick={() => setView('wifi')}
                    />
                    <Tile
                      icon="solar:bluetooth-bold"
                      label="Bluetooth"
                      sub="On"
                    />
                    <Tile
                      icon="solar:airbuds-bold"
                      label="AirDrop"
                      sub="Contacts Only"
                      onClick={() => setView('airdrop')}
                    />
                  </div>

                  <MediaTile />
                </div>

                <div className="flex gap-4">
                  <CircleAction icon="solar:widget-2-bold" />
                  <CircleAction icon="solar:copy-bold" />
                  <CircleAction
                    icon="solar:moon-bold"
                    label="Do Not Disturb"
                    sub="On"
                    large
                  />
                </div>

                {/* SLIDERS */}
                <Slider label="Display" icon="solar:sun-bold" />
                <Slider label="Sound" icon="solar:volume-loud-bold" />
              </motion.div>
            )}

            {view === 'wifi' && (
              <SubView title="Wi-Fi" onBack={goBack}>
                <Option label="iPhone" />
                <Option label="Office WiFi" />
              </SubView>
            )}

            {view === 'airdrop' && (
              <SubView title="AirDrop" onBack={goBack}>
                <Option label="Contacts Only" />
                <Option label="Everyone" />
              </SubView>
            )}
          </AnimatePresence>

          <DrawerFooter className="mt-4 flex justify-center">
            <Chip className="cursor-pointer rounded-full px-4 py-2 text-sm">
              Edit Controls
            </Chip>
          </DrawerFooter>
        </motion.div>
      </DrawerContent>
    </Drawer>
  )
}

function Tile({
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
      className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/20">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
        <Icon icon={icon} width={20} />
      </div>

      <div className="flex-1">
        <div className="text-sm font-semibold">{label}</div>
        {sub && <div className="text-xs text-white/60">{sub}</div>}
      </div>
    </div>
  )
}

function MediaTile() {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white/10 p-4 backdrop-blur-md">
      <div className="text-sm text-white/60">Not Playing</div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <Icon icon="solar:rewind-bold" width={22} />
        <Icon icon="solar:play-bold" width={28} />
        <Icon icon="solar:forward-bold" width={22} />
      </div>
    </div>
  )
}

function CircleAction({
  icon,
  label,
  sub,
  large
}: {
  icon: string
  label?: string
  sub?: string
  large?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md ${
        large ? 'flex-1' : 'justify-center'
      }`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
        <Icon icon={icon} width={20} />
      </div>

      {large && (
        <div>
          <div className="text-sm font-semibold">{label}</div>
          <div className="text-xs text-white/60">{sub}</div>
        </div>
      )}
    </div>
  )
}

function Slider({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md">
      <div className="mb-2 flex items-center gap-2 text-sm">
        <Icon icon={icon} />
        {label}
      </div>
      <div className="h-1 w-full rounded-full bg-white/20">
        <div className="h-1 w-1/2 rounded-full bg-white" />
      </div>
    </div>
  )
}

function SubView({
  title,
  onBack,
  children
}: {
  title: string
  onBack: () => void
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 80, opacity: 0 }}
      className="space-y-4">
      <div className="flex items-center gap-2">
        <Button isIconOnly onClick={onBack} variant="ghost">
          <Icon icon="solar:alt-arrow-left-linear" />
        </Button>
        <div className="font-semibold">{title}</div>
      </div>

      <div className="space-y-2">{children}</div>
    </motion.div>
  )
}

function Option({ label }: { label: string }) {
  return (
    <div className="cursor-pointer rounded-xl bg-white/10 p-3 transition hover:bg-white/20">
      {label}
    </div>
  )
}
