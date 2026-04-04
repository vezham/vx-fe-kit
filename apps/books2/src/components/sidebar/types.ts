// export type SidebarItem = {
//   label?: string
//   href?: string
//   count?: number
//   filter?: 'all' | 'favorites' | 'groups'
// }
// export type SidebarProps = {
//   sidebar?: SidebarItem[]
//   children?: React.ReactNode
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

export type SidebarItem = {
  label?: string
  href?: string
  count?: number
  filter?: 'all' | 'favorites' | 'groups'
}

export interface SidebarProps extends tvProps, HTMLHeroUIProps<'aside'> {
  ref?: ReactRef<HTMLElement | null>
  classNames?: SlotsToClasses<tvSlots>
  sidebar?: SidebarItem[]
  children?: ReactNode
}

type Props = SidebarProps

const useProps = (originalProps: Props) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)

  const {
    as,
    id,
    ref,
    children,
    className,
    classNames,
    sidebar,
    ...otherProps
  } = props

  const Component = as || 'aside'

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
    sidebar
  }
}

export { useProps }
export type { Props }
