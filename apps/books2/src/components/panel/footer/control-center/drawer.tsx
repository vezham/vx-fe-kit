import { Icon } from '@iconify/react'

import { Drawer, DrawerBody, DrawerContent } from '@vezham/react/v2'

interface ControlCenterDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function ControlCenterDrawer({
  isOpen,
  onClose
}: ControlCenterDrawerProps) {
  return (
    <Drawer
      backdrop="transparent"
      placement="left"
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: 'bg-transparent border-none rounded-none shadow-none max-w-[320px] translate-x-[106px]'
      }}>
      <DrawerContent className="border border-white/20 bg-black/5 shadow-xl backdrop-blur-sm">
        <DrawerBody className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <Icon
            icon="solar:archive-linear"
            width={64}
            className="text-muted-foreground"
          />

          <h2 className="text-xl font-semibold">Controls is empty</h2>

          <p className="text-muted-foreground max-w-[220px]">
            No items will appear here.
          </p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
