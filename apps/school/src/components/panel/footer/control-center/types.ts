import { ReactNode } from 'react'

import { ReactRef, useDOMRef } from '@vezham/react-utils'
import {
  HTMLHeroUIProps,
  PropGetter,
  mapPropsVariants
} from '@vezham/react-utils'
import { cn } from '@vezham/react-utils'
import { SlotsToClasses } from '@vezham/react-utils'

import { tvProps, tvSlots, tva } from './variant'

type View = 'main' | 'airdrop' | 'wifi'

// Sub-component Props
interface TileProps {
  icon: string
  label: string
  sub?: string
  onClick?: () => void
}

interface MediaTileProps {
  status?: string
}

interface CircleActionProps {
  icon: string
  label?: string
  sub?: string
  large?: boolean
}

interface SliderProps {
  label: string
  icon: string
  value?: number
}

interface SubViewProps {
  title: string
  onBack: () => void
  children: ReactNode
}

interface OptionProps {
  label: string
  onClick?: () => void
}

interface Props extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  isOpen: boolean
  onClose: () => void
  backdrop?: 'transparent' | 'blur' | 'opaque'
  placement?: 'left' | 'right'
  initialView?: View
  onViewChange?: (view: View) => void
}

const useProps = (originalProps: Props) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)

  const {
    as,
    id,
    ref,
    children,
    className,
    classNames,
    isOpen,
    onClose,
    backdrop = 'transparent',
    placement = 'left',
    initialView = 'main',
    onViewChange,
    ...otherProps
  } = props

  const Component = as || 'div'
  const domRef = useDOMRef(ref)
  const slots = tva(variantProps)

  const getDrawerBaseProps: PropGetter = () => ({
    className: slots.drawer_base({
      class: cn(classNames?.drawer_base, className)
    })
  })

  const getDrawerWrapperProps: PropGetter = () => ({
    className: slots.drawer_wrapper({ class: classNames?.drawer_wrapper })
  })

  const getDrawerContentProps: PropGetter = () => ({
    className: slots.drawer_content({ class: classNames?.drawer_content })
  })

  const getMotionContainerProps: PropGetter = () => ({
    className: slots.motion_container({ class: classNames?.motion_container }),
    initial: { y: 80, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 80, opacity: 0 },
    transition: { type: 'spring', stiffness: 320, damping: 28 }
  })

  const getMainViewProps: PropGetter = () => ({
    className: slots.main_view({ class: classNames?.main_view })
  })

  const getMainGridProps: PropGetter = () => ({
    className: slots.main_grid({ class: classNames?.main_grid })
  })

  const getMainGridLeftProps: PropGetter = () => ({
    className: slots.main_grid_left({ class: classNames?.main_grid_left })
  })

  const getTileProps: PropGetter = (props?: TileProps) => ({
    className: slots.tile({ class: classNames?.tile }),
    onClick: props?.onClick
  })

  const getTileIconWrapperProps: PropGetter = () => ({
    className: slots.tile_icon_wrapper({ class: classNames?.tile_icon_wrapper })
  })

  const getTileIconProps: PropGetter = (icon: string) => ({
    icon,
    width: 20,
    className: slots.tile_icon({ class: classNames?.tile_icon })
  })

  const getTileLabelProps: PropGetter = (label: string) => ({
    className: slots.tile_label({ class: classNames?.tile_label }),
    children: label
  })

  const getTileSubProps: PropGetter = (sub?: string) => ({
    className: slots.tile_sub({ class: classNames?.tile_sub }),
    children: sub
  })

  const getMediaTileProps: PropGetter = () => ({
    className: slots.media_tile({ class: classNames?.media_tile })
  })

  const getMediaTileStatusProps: PropGetter = (status?: string) => ({
    className: slots.media_tile_status({
      class: classNames?.media_tile_status
    }),
    children: status || 'Not Playing'
  })

  const getMediaTileControlsProps: PropGetter = () => ({
    className: slots.media_tile_controls({
      class: classNames?.media_tile_controls
    })
  })

  const getMediaTileIconProps: PropGetter = (icon: string, width: number) => ({
    icon,
    width,
    className: slots.media_tile_icon({ class: classNames?.media_tile_icon })
  })

  const getCircleActionProps: PropGetter = (props?: CircleActionProps) => ({
    className: cn(
      slots.circle_action({ class: classNames?.circle_action }),
      props?.large ? slots.circle_action_large() : slots.circle_action_center()
    )
  })

  const getCircleActionIconWrapperProps: PropGetter = () => ({
    className: slots.circle_action_icon_wrapper({
      class: classNames?.circle_action_icon_wrapper
    })
  })

  const getCircleActionIconProps: PropGetter = (icon: string) => ({
    icon,
    width: 20,
    className: slots.circle_action_icon({
      class: classNames?.circle_action_icon
    })
  })

  const getCircleActionLabelProps: PropGetter = (label?: string) => ({
    className: slots.circle_action_label({
      class: classNames?.circle_action_label
    }),
    children: label
  })

  const getCircleActionSubProps: PropGetter = (sub?: string) => ({
    className: slots.circle_action_sub({
      class: classNames?.circle_action_sub
    }),
    children: sub
  })

  const getSliderProps: PropGetter = () => ({
    className: slots.slider({ class: classNames?.slider })
  })

  const getSliderHeaderProps: PropGetter = () => ({
    className: slots.slider_header({ class: classNames?.slider_header })
  })

  const getSliderIconProps: PropGetter = (icon: string) => ({
    icon,
    width: 16,
    className: slots.slider_icon({ class: classNames?.slider_icon })
  })

  const getSliderLabelProps: PropGetter = (label: string) => ({
    className: slots.slider_label({ class: classNames?.slider_label }),
    children: label
  })

  const getSliderTrackProps: PropGetter = () => ({
    className: slots.slider_track({ class: classNames?.slider_track })
  })

  const getSliderProgressProps: PropGetter = (value: number) => ({
    className: slots.slider_progress({ class: classNames?.slider_progress }),
    style: { width: `${value}%` }
  })

  const getSubViewProps: PropGetter = () => ({
    className: slots.subview({ class: classNames?.subview }),
    initial: { x: 80, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 80, opacity: 0 }
  })

  const getSubViewHeaderProps: PropGetter = () => ({
    className: slots.subview_header({ class: classNames?.subview_header })
  })

  const getSubViewTitleProps: PropGetter = (title: string) => ({
    className: slots.subview_title({ class: classNames?.subview_title }),
    children: title
  })

  const getSubViewContentProps: PropGetter = () => ({
    className: slots.subview_content({ class: classNames?.subview_content })
  })

  const getOptionProps: PropGetter = (props?: OptionProps) => ({
    className: slots.option({ class: classNames?.option }),
    onClick: props?.onClick
  })

  const getOptionLabelProps: PropGetter = (label: string) => ({
    children: label
  })

  const getDrawerFooterProps: PropGetter = () => ({
    className: slots.drawer_footer({ class: classNames?.drawer_footer })
  })

  const getChipProps: PropGetter = () => ({
    className: slots.chip({ class: classNames?.chip })
  })

  return {
    Component,
    domRef,
    slots,
    classNames,
    children,
    getDrawerBaseProps,
    getDrawerWrapperProps,
    getDrawerContentProps,
    getMotionContainerProps,
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
    onViewChange
  }
}

export { useProps }
export type {
  Props,
  TileProps,
  MediaTileProps,
  CircleActionProps,
  SliderProps,
  SubViewProps,
  OptionProps,
  View
}
