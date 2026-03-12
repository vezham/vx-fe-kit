import { useNavigate } from '@tanstack/react-router'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader
} from '@vezham/react/v2'

import WidgetsGrid from '../../../pages/widgets'

interface ControlCenterDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function ControlCenterDrawer({
  isOpen,
  onClose
}: ControlCenterDrawerProps) {
  const navigate = useNavigate()

  return (
    <Drawer
      backdrop="transparent"
      placement="left"
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: 'bg-transparent border-none shadow-none rounded-none max-w-[320px] translate-x-[106px]'
      }}>
      <DrawerContent className="border border-white/20 bg-black/5 shadow-xl backdrop-blur-sm">
        <DrawerHeader className="flex items-center justify-between text-white/90">
          <span className="text-lg font-semibold">Control Center</span>
        </DrawerHeader>
        <DrawerBody className="overflow-y-auto">
          <WidgetsGrid />
        </DrawerBody>
        <DrawerFooter>
          <Button
            fullWidth
            variant="flat"
            onPress={() => navigate({ to: '/widgets' })}>
            Edit Widgets
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
