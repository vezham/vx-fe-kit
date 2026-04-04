// export interface ContainerTabItem {
//   key: string
//   title: string
//   href: string
//   content?: React.ReactNode
// }
// export interface ContainerTabsProps {
//   tabs: ContainerTabItem[]
//   selectedKey: string
//   onSelectionChange: (key: string) => void
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

export interface ContainerTabItem {
  key: string
  title: string
  href: string
  content?: React.ReactNode
}

export interface ContainerTabsProps extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  tabs: ContainerTabItem[]
  selectedKey: string
  onSelectionChange: (key: string) => void
}

type Props = ContainerTabsProps

const useProps = (originalProps: Props) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)

  const {
    as,
    id,
    ref,
    children,
    className,
    classNames,
    tabs,
    selectedKey,
    onSelectionChange,
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
    tabs,
    selectedKey,
    onSelectionChange
  }
}

export { useProps }
export type { Props }
