import { Icon } from '@iconify/react'
import { useEffect } from 'react'

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader
} from '@vezham/react-v2'
import { Button, Typography } from '@vezham/react-v3'

import { MenuDrawerProps } from './types'
import {
  getDrawerBodyClasses,
  getDrawerButtonClasses,
  getDrawerCloseButtonClasses,
  getDrawerContentClasses,
  getDrawerGridClasses,
  getDrawerGridItemInnerClasses,
  getDrawerHeaderClasses
} from './variant'

const MenuDrawer = ({
  items,
  selectedKey,
  onItemSelect,
  isOpen,
  onClose,
  isDarkMode = false,
  buttonTextColor
}: MenuDrawerProps) => {
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) onClose()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen, onClose])

  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      backdrop="blur"
      onOpenChange={open => !open && onClose()}
      classNames={{
        backdrop: 'backdrop-blur-xs'
      }}>
      <DrawerContent className={getDrawerContentClasses({ isDarkMode })}>
        <DrawerHeader className={getDrawerHeaderClasses({ isDarkMode })}>
          <Button
            variant="ghost"
            onClick={onClose}
            className={getDrawerCloseButtonClasses({ isDarkMode })}>
            <Icon icon="lucide:x" className="h-4 w-4" />
          </Button>
        </DrawerHeader>
        <DrawerBody className={getDrawerBodyClasses()}>
          <div className={getDrawerGridClasses()}>
            {items.map(item => (
              <Button
                variant="ghost"
                key={item.key}
                onClick={() => {
                  onItemSelect(item)
                  onClose()
                }}
                className={getDrawerButtonClasses({
                  isSelected: selectedKey === item.key,
                  isDarkMode
                })}>
                <div
                  className={getDrawerGridItemInnerClasses(
                    buttonTextColor ?? ''
                  )}>
                  {item.icon && <Icon icon={item.icon} className="h-6 w-6" />}
                  <Typography.Paragraph className="text-center">
                    {item.title}
                  </Typography.Paragraph>
                </div>
              </Button>
            ))}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MenuDrawer
