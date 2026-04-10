import { useNavigate } from '@tanstack/react-router'
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

type MenuItem = {
  key: string
  title: string
  href?: string
  icon?: string
  iconActive?: string
  endContent?: ReactNode
}

interface Props extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  items: MenuItem[]
  selectedKey?: string
  onSelect?: (key: string) => void
  collapsed?: boolean
}

const useProps = (originalProps: Props) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)
  const navigate = useNavigate()

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
    ...otherProps
  } = props

  const Component = as || 'div'
  const domRef = useDOMRef(ref)
  const slots = tva(variantProps)

  const handleSelect = (key: string, href?: string) => {
    onSelect?.(key)
    if (href) navigate({ to: href })
  }

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

  const getItemProps: PropGetter = ({
    item,
    isActive
  }: {
    item: MenuItem
    isActive: boolean
  }) => ({
    onClick: () => handleSelect(item.key, item.href),
    className: slots.item({
      class: cn(classNames?.item, {
        [classNames?.item_selected || '']: isActive
      })
    }),
    'data-active': isActive,
    'data-key': item.key
  })

  const getIconWrapperProps: PropGetter = () => ({
    className: slots.icon_wrapper({ class: classNames?.icon_wrapper })
  })

  const getIconProps: PropGetter = ({ isActive }: { isActive: boolean }) => ({
    className: slots.icon({
      class: cn(classNames?.icon, {
        [classNames?.icon_selected || '']: isActive
      })
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

  const getLabelProps: PropGetter = ({ isActive }: { isActive: boolean }) => ({
    className: slots.label({
      class: cn(classNames?.label, {
        [classNames?.label_selected || '']: isActive
      })
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
    handleSelect
  }
}

export { useProps }
export type { Props, MenuItem }
