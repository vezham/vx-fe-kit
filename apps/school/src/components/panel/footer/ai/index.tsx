import { Icon } from '@iconify/react'

import { forwardRef } from '@vezham/react-utils'
import { Drawer, DrawerBody, DrawerContent } from '@vezham/react-v2'

import { InfoPanelDefinition } from '../../info-panel'
import { Props, useProps } from './types'

const AIContent = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    getBaseProps,
    getBodyProps,
    getIconProps,
    getTitleProps,
    getDescriptionProps
  } = useProps({
    ...props,
    ref
  })

  return (
    <Component {...getBaseProps()}>
      <div {...getBodyProps()}>
        <Icon {...getIconProps()} />
        <div {...getTitleProps()} />
        <div {...getDescriptionProps()} />
      </div>
    </Component>
  )
})

AIContent.displayName = 'AIContent'

const AIDrawer = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    getBaseProps,
    getWrapperProps,
    getContentProps,
    isOpen,
    onClose,
    backdrop,
    placement
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
          <DrawerBody>
            <AIContent {...props} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Component>
  )
})

AIDrawer.displayName = 'AIDrawer'

export const aiPanel: InfoPanelDefinition = {
  title: 'AI',
  content: <AIContent isOpen={false} onClose={() => undefined} />
}

export { AIContent, AIDrawer }
