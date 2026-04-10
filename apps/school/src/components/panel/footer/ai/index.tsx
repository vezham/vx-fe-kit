import { Icon } from '@iconify/react'

import { forwardRef } from '@vezham/react-utils'
import { Drawer, DrawerBody, DrawerContent } from '@vezham/react/v2'

import { Props, useProps } from './types'

const AIDrawer = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    getBaseProps,
    getWrapperProps,
    getContentProps,
    getBodyProps,
    getIconProps,
    getTitleProps,
    getDescriptionProps,
    isOpen,
    onClose,
    backdrop,
    placement,
    icon,
    title,
    description
  } = useProps({
    ...props,
    ref
  })

  return (
    <Component {...getBaseProps()}>
      <Drawer
        backdrop={backdrop}
        placement={placement}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          base: getBaseProps().className,
          wrapper: getWrapperProps().className
        }}>
        <DrawerContent className={getContentProps().className}>
          <DrawerBody className={getBodyProps().className}>
            <Icon {...getIconProps()} />

            <div {...getTitleProps()} />

            <div {...getDescriptionProps()} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Component>
  )
})

AIDrawer.displayName = 'AIDrawer'

export { AIDrawer }
