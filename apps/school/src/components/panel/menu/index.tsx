import { Icon } from '@iconify/react'

import { forwardRef } from '@vezham/react-utils'
import { ScrollShadow, Tooltip } from '@vezham/react/v3'

import { Props, useProps } from './types'

const Menu = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
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
    collapsed
  } = useProps({
    ...props,
    ref
  })

  return (
    <Component {...getBaseProps()}>
      <ScrollShadow {...getScrollProps()}>
        <div {...getContainerProps()}>
          {items.map(item => {
            const isActive = selectedKey === item.key
            const iconName = isActive ? item.iconActive || item.icon : item.icon

            return (
              <div key={item.key} {...getItemProps({ item, isActive })}>
                <div {...getAlignProps()}>
                  <Tooltip delay={0}>
                    <Tooltip.Trigger {...getTooltipTriggerProps()}>
                      <div {...getIconWrapperProps()}>
                        <Icon
                          icon={iconName}
                          width={24}
                          {...getIconProps({ isActive })}
                        />
                      </div>
                    </Tooltip.Trigger>

                    {collapsed && (
                      <Tooltip.Content {...getTooltipContentProps()}>
                        {item.title}
                      </Tooltip.Content>
                    )}
                  </Tooltip>

                  {!collapsed && (
                    <div {...getLabelProps({ isActive })}>{item.title}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </ScrollShadow>
    </Component>
  )
})

Menu.displayName = 'Menu'

export { Menu }
