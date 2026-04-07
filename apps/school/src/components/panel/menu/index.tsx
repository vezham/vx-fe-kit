// import { Icon } from '@iconify/react'
// import { useNavigate } from '@tanstack/react-router'
// import React from 'react'
// import { ScrollShadow } from '@vezham/react/v3'
// import { MenuProps } from './types'
// import { sidebarStyles } from './variant'
// const Menu: React.FC<MenuProps> = ({
//   items,
//   selectedKey,
//   onSelect,
//   iconClassName = sidebarStyles.icon.base
// }) => {
//   const navigate = useNavigate()
//   const handleSelect = (key: string, href?: string) => {
//     onSelect?.(key)
//     if (href) navigate({ to: href })
//   }
//   return (
//     <ScrollShadow
//       hideScrollBar
//       orientation="vertical"
//       className="flex h-full flex-1 flex-col overflow-y-auto">
//       <div className="flex flex-col gap-6 pb-4">
//         {items.map(item => (
//           <div
//             key={item.key}
//             onClick={() => handleSelect(item.key, item.href)}
//             className="cursor-pointer">
//             <div className="flex flex-col items-center">
//               <Icon
//                 icon={item.icon || ''}
//                 width={24}
//                 className={`${iconClassName} ${
//                   selectedKey === item.key ? sidebarStyles.icon.selected : ''
//                 }`}
//               />
//               <span className="text-medium w-full truncate text-center">
//                 {item.title}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </ScrollShadow>
//   )
// }
// export { Menu }
// ==========================================================
// import { Icon } from '@iconify/react'
// import { useNavigate } from '@tanstack/react-router'
// import React from 'react'
// import { ScrollShadow, Tooltip } from '@vezham/react/v3'
// import { MenuProps } from './types'
// import { sidebarStyles } from './variant'
// const Menu: React.FC<MenuProps> = ({
//   items,
//   selectedKey,
//   onSelect,
//   iconClassName = sidebarStyles.icon.base
// }) => {
//   const navigate = useNavigate()
//   const handleSelect = (key: string, href?: string) => {
//     onSelect?.(key)
//     if (href) navigate({ to: href })
//   }
//   return (
//     <ScrollShadow
//       hideScrollBar
//       orientation="vertical"
//       className="flex h-full flex-1 flex-col overflow-y-auto"
//     >
//       <div className="flex flex-col gap-6 pb-4">
//         {items.map(item => {
//           const icon = (
//             <Icon
//               icon={item.icon || ''}
//               width={24}
//               className={`${iconClassName} ${selectedKey === item.key ? sidebarStyles.icon.selected : ''
//                 }`}
//             />
//           )
//           return (
//             <div
//               key={item.key}
//               onClick={() => handleSelect(item.key, item.href)}
//               className="cursor-pointer"
//             >
//               <div className="flex flex-col items-center">
//                 {item.title ? (
//                   icon
//                 ) : (
//                   <Tooltip delay={0}>
//                     {icon}
//                     <Tooltip.Content>{item.key}</Tooltip.Content>
//                   </Tooltip>
//                 )}
//                 {item.title && (
//                   <span className="text-medium w-full truncate text-center">
//                     {item.title}
//                   </span>
//                 )}
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </ScrollShadow>
//   )
// }
// export { Menu }
// ====================================================================
import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'

import { ScrollShadow, Tooltip } from '@vezham/react/v3'

import { Props } from './types'
import { sidebarStyles } from './variant'

const Menu: React.FC<Props> = ({
  items,
  selectedKey,
  onSelect,
  collapsed = false,
  iconClassName = sidebarStyles.icon.base
}) => {
  const navigate = useNavigate()

  const handleSelect = (key: string, href?: string) => {
    onSelect?.(key)
    if (href) navigate({ to: href })
  }

  return (
    <ScrollShadow
      hideScrollBar
      orientation="vertical"
      className="flex h-full flex-1 flex-col overflow-y-auto">
      <div className="flex flex-col gap-6 pb-4">
        {items.map(item => {
          const isActive = selectedKey === item.key

          const iconName = isActive ? item.iconActive || item.icon : item.icon

          return (
            <div
              key={item.key}
              onClick={() => handleSelect(item.key, item.href)}
              className="cursor-pointer">
              <div className="flex flex-col items-center gap-1">
                <Tooltip delay={0}>
                  <Tooltip.Trigger>
                    <div className="flex h-[28px] w-[28px] items-center justify-center">
                      <Icon
                        icon={iconName}
                        width={24}
                        className={`${iconClassName} ${
                          isActive ? sidebarStyles.icon.selected : 'text-muted'
                        }`}
                      />
                    </div>
                  </Tooltip.Trigger>

                  {collapsed && (
                    <Tooltip.Content placement="right">
                      {item.title}
                    </Tooltip.Content>
                  )}
                </Tooltip>

                {!collapsed && (
                  <div
                    className={`w-full truncate text-center text-sm transition-colors ${
                      isActive ? 'text-foreground font-medium' : 'text-muted'
                    }`}>
                    {item.title}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </ScrollShadow>
  )
}

export { Menu }
