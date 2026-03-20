import { Icon } from '@iconify/react'

import { Drawer, DrawerBody, DrawerContent } from '@vezham/react/v2'

interface FavoritesDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function FavoritesDrawer({
  isOpen,
  onClose
}: FavoritesDrawerProps) {
  return (
    <Drawer
      backdrop="transparent"
      placement="left"
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: 'bg-transparent border-none rounded-none shadow-none max-w-[320px] md:translate-x-[106px]'
      }}>
      <DrawerContent className="border border-white/20 bg-black/5 shadow-xl backdrop-blur-sm">
        <DrawerBody className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <Icon
            icon="solar:star-linear"
            width={64}
            className="text-muted-foreground"
          />

          <h2 className="text-xl font-semibold">No favorites yet</h2>

          <p className="text-muted-foreground max-w-[220px]">
            Add items to favorites to quickly access them later.
          </p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
