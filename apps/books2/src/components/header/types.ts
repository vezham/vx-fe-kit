// export interface HeaderProps {
//   isCompact: boolean
//   isRightSidebar: boolean
//   toggleVisibility: () => void
//   buttonTextColor: string
// }
// export interface SidebarHeaderExtendedProps extends HeaderProps {
//   onSlackClick: () => void
//   isPopoverOpen: boolean
//   setPopoverOpen: (open: boolean) => void
// }
import { ReactRef, useDOMRef } from '@vezham/react-utils'
import {
  HTMLHeroUIProps,
  PropGetter,
  mapPropsVariants
} from '@vezham/react-utils'
import { cn } from '@vezham/react-utils'
import { SlotsToClasses } from '@vezham/react-utils'

import { tvProps, tvSlots, tva } from './variant'

export interface HeaderProps extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  isCompact: boolean
  isRightSidebar: boolean
  toggleVisibility: () => void
  buttonTextColor: string
}

export interface SidebarHeaderExtendedProps extends HeaderProps {
  onSlackClick: () => void
  isPopoverOpen: boolean
  setPopoverOpen: (open: boolean) => void
}

type Props = SidebarHeaderExtendedProps

const useProps = (originalProps: Props) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)

  const {
    as,
    id,
    ref,
    children,
    className,
    classNames,
    isCompact,
    isRightSidebar,
    toggleVisibility,
    buttonTextColor,
    onSlackClick,
    isPopoverOpen,
    setPopoverOpen,
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
    isCompact,
    isRightSidebar,
    toggleVisibility,
    buttonTextColor,
    onSlackClick,
    isPopoverOpen,
    setPopoverOpen
  }
}

export { useProps }
export type { Props }
