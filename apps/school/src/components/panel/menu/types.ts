import { ReactNode } from 'react'

import {
  HTMLHeroUIProps,
  PropGetter,
  mapPropsVariants
} from '@vezham/react-utils'
import { ReactRef, useDOMRef } from '@vezham/react-utils'
import { cn } from '@vezham/react-utils'
import { SlotsToClasses } from '@vezham/react-utils'

import { tvProps, tvSlots, tva } from './variant'

type SubMenuItem = {
  key: string
  title: string
  href?: string
  icon?: string
  iconActive?: string
  endContent?: ReactNode
  submenu?: SubMenuItem[]
}

type MenuItem = {
  key: string
  title: string
  href?: string
  icon?: string
  iconActive?: string
  endContent?: ReactNode
  submenu?: MenuItem[]
}

export type SubmenuState = {
  isOpen: boolean
  items: MenuItem[]
  title: string
}

interface Props extends tvProps, Omit<HTMLHeroUIProps<'div'>, 'onSelect'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  items: MenuItem[]
  selectedKey?: string
  onSelect?: (key: string) => void
  collapsed?: boolean
  onSubmenuChange?: (state: SubmenuState) => void
}

const useProps = (originalProps: Props) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)
  const typedProps = props as Props

  const {
    as,
    id,
    ref,
    children,
    className,
    classNames,
    items,
    selectedKey,
    onSelect,
    collapsed = false,
    onSubmenuChange,
    ...otherProps
  } = typedProps

  const Component = as || 'div'
  const domRef = useDOMRef(ref)
  const slots = tva(variantProps)

  const getBaseProps: PropGetter = () => ({
    id,
    ref: domRef,
    className: slots.base({ class: cn(classNames?.base, className) }),
    ...otherProps
  })

  const getScrollProps: PropGetter = () => ({
    hideScrollBar: true,
    orientation: 'vertical',
    className: slots.scroll({ class: classNames?.scroll })
  })

  const getContainerProps: PropGetter = () => ({
    className: slots.container({ class: classNames?.container })
  })

  const getAlignProps: PropGetter = () => ({
    className: slots.align({ class: classNames?.align })
  })

  const getItemProps = ({
    item,
    isActive
  }: {
    item: MenuItem
    isActive: boolean
  }) => ({
    className: slots.item({
      class: classNames?.item
    }),
    'data-active': isActive,
    'data-key': item.key
  })

  const getIconWrapperProps: PropGetter = () => ({
    className: slots.icon_wrapper({ class: classNames?.icon_wrapper })
  })

  const getIconProps = ({ isActive }: { isActive: boolean }) => ({
    className: slots.icon({
      class: classNames?.icon
    }),
    'data-active': isActive
  })

  const getTooltipTriggerProps: PropGetter = () => ({
    className: slots.tooltip_trigger({ class: classNames?.tooltip_trigger })
  })

  const getTooltipContentProps: PropGetter = () => ({
    placement: 'right',
    className: slots.tooltip_content({ class: classNames?.tooltip_content })
  })

  const getLabelProps = ({ isActive }: { isActive: boolean }) => ({
    className: slots.label({
      class: classNames?.label
    }),
    'data-active': isActive
  })

  return {
    Component,
    domRef,
    slots,
    classNames,
    children,
    getBaseProps,
    getScrollProps,
    getContainerProps,
    getItemProps,
    getIconWrapperProps,
    getIconProps,
    getTooltipTriggerProps,
    getTooltipContentProps,
    getLabelProps,
    getAlignProps,
    items,
    selectedKey,
    collapsed,
    onSelect,
    onSubmenuChange
  }
}

export { useProps }
export type { Props, MenuItem, SubMenuItem }
