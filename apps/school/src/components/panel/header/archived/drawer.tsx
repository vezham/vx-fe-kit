import { Icon } from '@iconify/react'

import { Drawer, DrawerBody, DrawerContent } from '@vezham/react/v2'

interface ArchiveDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function ArchiveDrawer({ isOpen, onClose }: ArchiveDrawerProps) {
  return (
    <Drawer
      backdrop="transparent"
      placement="left"
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: 'bg-transparent border-none rounded-none shadow-none max-w-[320px] md:translate-x-[106px] z-[10]',
        wrapper: 'z-[10]'
      }}>
      <DrawerContent className="border border-white/20 bg-black/5 shadow-xl backdrop-blur-sm">
        <DrawerBody className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <Icon
            icon="solar:archive-linear"
            width={64}
            className="text-muted-foreground"
          />

          <h2 className="text-xl font-semibold">Archive is empty</h2>

          <p className="text-muted-foreground max-w-[220px]">
            Archived items will appear here.
          </p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
