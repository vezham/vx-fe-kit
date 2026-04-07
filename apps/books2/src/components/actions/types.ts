// export type ContainerActionItem = {
//   key: string
//   icon?: string
//   label?: string
//   visible?: boolean
//   onPress?: () => void
//   type?: 'button' | 'dropdown'
//   items?: {
//     key: string
//     label: string
//     onPress?: () => void
//   }[]
// }
// export interface ContainerActionsProps {
//   actions: ContainerActionItem[]
// }
// export type HeaderAction = {
//   key: string
//   icon: string
//   onClick?: () => void
//   visible?: boolean
// }
// export type HeaderProps = {
//   showBack?: boolean
//   onBack?: () => void
//   showClose?: boolean
//   onClose?: () => void
//   actions?: HeaderAction[]
//   currentIndex?: number
//   total?: number
//   onPrev?: () => void
//   onNext?: () => void
// }
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

// Types
export type ContainerActionItem = {
  key: string
  icon?: string
  label?: string
  visible?: boolean
  onPress?: () => void
  type?: 'button' | 'dropdown'
  items?: {
    key: string
    label: string
    onPress?: () => void
  }[]
}

export interface ContainerActionsProps extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  actions: ContainerActionItem[]
}

export type HeaderAction = {
  key: string
  icon: string
  onClick?: () => void
  visible?: boolean
}

export interface HeaderProps extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  showBack?: boolean
  onBack?: () => void
  showClose?: boolean
  onClose?: () => void
  actions?: HeaderAction[]
  currentIndex?: number
  total?: number
  onPrev?: () => void
  onNext?: () => void
}

type Props = ContainerActionsProps | HeaderProps

// useProps hook
const useProps = (originalProps: Props) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)

  const {
    as,
    id,
    ref,
    children,
    className,
    classNames,
    actions,
    showBack,
    onBack,
    showClose,
    onClose,
    currentIndex,
    total,
    onPrev,
    onNext,
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

  return {
    Component,
    domRef,
    slots,
    classNames,
    children,
    getBaseProps,
    actions,
    showBack,
    onBack,
    showClose,
    onClose,
    currentIndex,
    total,
    onPrev,
    onNext
  }
}

export { useProps }
export type { Props }
