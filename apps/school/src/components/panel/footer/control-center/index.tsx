import { EmptyState } from '@heroui-pro/react/empty-state'
import { Icon } from '@iconify/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import { forwardRef } from '@vezham/react-utils'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader
} from '@vezham/react-v2'
import { Button, Chip, CloseButton } from '@vezham/react-v3'

import { Props, View, useProps } from './types'

const ControlCenterDrawer = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    getDrawerBaseProps,
    getDrawerWrapperProps,
    getDrawerContentProps,
    getDrawerHeaderProps,
    closeButtonClassName,
    getMotionContainerProps,
    getEmptyStateProps,
    getEmptyStateIconProps,
    getMainViewProps,
    getMainGridProps,
    getMainGridLeftProps,
    getTileProps,
    getTileIconWrapperProps,
    getTileIconProps,
    getTileLabelProps,
    getTileSubProps,
    getMediaTileProps,
    getMediaTileStatusProps,
    getMediaTileControlsProps,
    getMediaTileIconProps,
    getCircleActionProps,
    getCircleActionIconWrapperProps,
    getCircleActionIconProps,
    getCircleActionLabelProps,
    getCircleActionSubProps,
    getSliderProps,
    getSliderHeaderProps,
    getSliderIconProps,
    getSliderLabelProps,
    getSliderTrackProps,
    getSliderProgressProps,
    getSubViewProps,
    getSubViewHeaderProps,
    getSubViewTitleProps,
    getSubViewContentProps,
    getOptionProps,
    getOptionLabelProps,
    getDrawerFooterProps,
    getChipProps,
    isOpen,
    onClose,
    backdrop,
    placement,
    initialView,
    onViewChange,
    isEmpty
  } = useProps({
    ...props,
    ref
  })

  const [view, setView] = useState<View>(initialView)

  const goBack = () => {
    setView('main')
    onViewChange?.('main')
  }

  const handleViewChange = (newView: View) => {
    setView(newView)
    onViewChange?.(newView)
  }

  return (
    <Component {...getDrawerBaseProps()}>
      <Drawer
        backdrop={backdrop}
        hideCloseButton
        placement={placement}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{
          base: getDrawerBaseProps().className,
          wrapper: getDrawerWrapperProps().className
        }}>
        <DrawerContent className={getDrawerContentProps().className}>
          <DrawerHeader {...getDrawerHeaderProps()}>
            <CloseButton className={closeButtonClassName} onPress={onClose} />
          </DrawerHeader>

          <motion.div {...getMotionContainerProps()}>
            {isEmpty ? (
              <div {...getEmptyStateProps()}>
                <EmptyState className="rounded-2xl">
                  <EmptyState.Media>
                    <Icon {...getEmptyStateIconProps()} />
                  </EmptyState.Media>
                  <EmptyState.Title>Control Center is Empty</EmptyState.Title>
                </EmptyState>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {view === 'main' && (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    {...getMainViewProps()}>
                    <div {...getMainGridProps()}>
                      <div {...getMainGridLeftProps()}>
                        <div
                          {...getTileProps({
                            onClick: () => handleViewChange('wifi')
                          })}>
                          <div {...getTileIconWrapperProps()}>
                            <Icon {...getTileIconProps('mdi:wifi')} />
                          </div>
                          <div>
                            <div {...getTileLabelProps('Wi-Fi')} />
                            <div {...getTileSubProps('iPhone')} />
                          </div>
                        </div>

                        <div {...getTileProps({})}>
                          <div {...getTileIconWrapperProps()}>
                            <Icon
                              icon={''}
                              {...getTileIconProps('solar:bluetooth-bold')}
                            />
                          </div>
                          <div>
                            <div {...getTileLabelProps('Bluetooth')} />
                            <div {...getTileSubProps('On')} />
                          </div>
                        </div>

                        <div
                          {...getTileProps({
                            onClick: () => handleViewChange('airdrop')
                          })}>
                          <div {...getTileIconWrapperProps()}>
                            <Icon
                              icon={''}
                              {...getTileIconProps('solar:airbuds-bold')}
                            />
                          </div>
                          <div>
                            <div {...getTileLabelProps('AirDrop')} />
                            <div {...getTileSubProps('Contacts Only')} />
                          </div>
                        </div>
                      </div>

                      <div {...getMediaTileProps()}>
                        <div {...getMediaTileStatusProps()} />
                        <div {...getMediaTileControlsProps()}>
                          <Icon
                            {...getMediaTileIconProps('mdi:skip-previous', 22)}
                          />

                          <Icon
                            icon={''}
                            {...getMediaTileIconProps('solar:play-bold', 28)}
                          />
                          <Icon
                            {...getMediaTileIconProps('mdi:skip-next', 22)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div {...getCircleActionProps({})}>
                        <div {...getCircleActionIconWrapperProps()}>
                          <Icon
                            icon={''}
                            {...getCircleActionIconProps('solar:widget-2-bold')}
                          />
                        </div>
                      </div>

                      <div {...getCircleActionProps({})}>
                        <div {...getCircleActionIconWrapperProps()}>
                          <Icon
                            icon={''}
                            {...getCircleActionIconProps('solar:copy-bold')}
                          />
                        </div>
                      </div>

                      <div {...getCircleActionProps({ large: true })}>
                        <div {...getCircleActionIconWrapperProps()}>
                          <Icon
                            icon={''}
                            {...getCircleActionIconProps('solar:moon-bold')}
                          />
                        </div>
                        <div>
                          <div
                            {...getCircleActionLabelProps('Do Not Disturb')}
                          />
                          <div {...getCircleActionSubProps('On')} />
                        </div>
                      </div>
                    </div>

                    <div {...getSliderProps()}>
                      <div {...getSliderHeaderProps()}>
                        <Icon
                          icon={''}
                          {...getSliderIconProps('solar:sun-bold')}
                        />
                        <span {...getSliderLabelProps('Display')} />
                      </div>
                      <div {...getSliderTrackProps()}>
                        <div {...getSliderProgressProps(50)} />
                      </div>
                    </div>

                    <div {...getSliderProps()}>
                      <div {...getSliderHeaderProps()}>
                        <Icon
                          icon={''}
                          {...getSliderIconProps('solar:volume-loud-bold')}
                        />
                        <span {...getSliderLabelProps('Sound')} />
                      </div>
                      <div {...getSliderTrackProps()}>
                        <div {...getSliderProgressProps(75)} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === 'wifi' && (
                  <motion.div key="wifi" {...getSubViewProps()}>
                    <div {...getSubViewHeaderProps()}>
                      <Button isIconOnly onClick={goBack} variant="ghost">
                        <Icon icon="solar:alt-arrow-left-linear" />
                      </Button>
                      <div {...getSubViewTitleProps('Wi-Fi')} />
                    </div>

                    <div {...getSubViewContentProps()}>
                      <div {...getOptionProps({})}>
                        <span {...getOptionLabelProps('iPhone')} />
                      </div>
                      <div {...getOptionProps({})}>
                        <span {...getOptionLabelProps('Office WiFi')} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === 'airdrop' && (
                  <motion.div key="airdrop" {...getSubViewProps()}>
                    <div {...getSubViewHeaderProps()}>
                      <Button isIconOnly onClick={goBack} variant="ghost">
                        <Icon icon="solar:alt-arrow-left-linear" />
                      </Button>
                      <div {...getSubViewTitleProps('AirDrop')} />
                    </div>

                    <div {...getSubViewContentProps()}>
                      <div {...getOptionProps({})}>
                        <span {...getOptionLabelProps('Contacts Only')} />
                      </div>
                      <div {...getOptionProps({})}>
                        <span {...getOptionLabelProps('Everyone')} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {!isEmpty && (
              <DrawerFooter {...getDrawerFooterProps()}>
                <Chip {...getChipProps()}>Edit Controls</Chip>
              </DrawerFooter>
            )}
          </motion.div>
        </DrawerContent>
      </Drawer>
    </Component>
  )
})

ControlCenterDrawer.displayName = 'ControlCenterDrawer'

export { ControlCenterDrawer }
