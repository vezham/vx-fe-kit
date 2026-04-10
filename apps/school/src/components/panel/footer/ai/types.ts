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

interface Props extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  isOpen: boolean
  onClose: () => void
  icon?: string
  title?: ReactNode
  description?: ReactNode
  backdrop?: 'transparent' | 'blur' | 'opaque'
  placement?: 'left' | 'right' | 'top' | 'bottom'
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
    icon = 'solar:archive-linear',
    title = 'Chats empty',
    description = 'No chats will appear here.',
    backdrop = 'transparent',
    placement = 'left',
    ...otherProps
  } = props

  const Component = as || 'div'
  const domRef = useDOMRef(ref)
  const slots = tva(variantProps)

  const getBaseProps: PropGetter = () => ({
    id,
    ref: domRef,
    className: slots.base({ class: cn(classNames?.base, className) }),
    ...otherProps
  })

  const getWrapperProps: PropGetter = () => ({
    className: slots.wrapper({ class: classNames?.wrapper })
  })

  const getContentProps: PropGetter = () => ({
    className: slots.content({ class: classNames?.content })
  })

  const getBodyProps: PropGetter = () => ({
    className: slots.body({ class: classNames?.body })
  })

  const getIconProps: PropGetter = () => ({
    icon,
    width: 64,
    className: slots.icon({ class: classNames?.icon })
  })

  const getTitleProps: PropGetter = () => ({
    className: slots.title({ class: classNames?.title }),
    children: title
  })

  const getDescriptionProps: PropGetter = () => ({
    className: slots.description({ class: classNames?.description }),
    children: description
  })

  return {
    Component,
    domRef,
    slots,
    classNames,
    children,
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
  }
}

export { useProps }
export type { Props }
