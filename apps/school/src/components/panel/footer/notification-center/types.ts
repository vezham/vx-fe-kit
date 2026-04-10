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

interface WidgetsGridProps {
  onWidgetClick?: (widgetId: string) => void
}

interface Props extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  isOpen: boolean
  onClose: () => void
  backdrop?: 'transparent' | 'blur' | 'opaque'
  placement?: 'left' | 'right' | 'top' | 'bottom'
  title?: ReactNode
  onEdit?: () => void
  widgetsGridProps?: WidgetsGridProps
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
    title = 'Notification Center',
    onEdit,
    widgetsGridProps,
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

  const getDrawerHeaderProps: PropGetter = () => ({
    className: slots.drawer_header({ class: classNames?.drawer_header })
  })

  const getHeaderTitleProps: PropGetter = () => ({
    className: slots.header_title({ class: classNames?.header_title }),
    children: title
  })

  const getDrawerBodyProps: PropGetter = () => ({
    className: slots.drawer_body({ class: classNames?.drawer_body })
  })

  const getScrollShadowProps: PropGetter = () => ({
    className: slots.scroll_shadow({ class: classNames?.scroll_shadow }),
    hideScrollBar: true
  })

  const getDrawerFooterProps: PropGetter = () => ({
    className: slots.drawer_footer({ class: classNames?.drawer_footer })
  })

  const getChipProps: PropGetter = () => ({
    className: slots.chip({ class: classNames?.chip }),
    onClick: onEdit
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
    getDrawerHeaderProps,
    getHeaderTitleProps,
    getDrawerBodyProps,
    getScrollShadowProps,
    getDrawerFooterProps,
    getChipProps,
    isOpen,
    onClose,
    backdrop,
    placement,
    title,
    onEdit,
    widgetsGridProps
  }
}

export { useProps }
export type { Props, WidgetsGridProps }
