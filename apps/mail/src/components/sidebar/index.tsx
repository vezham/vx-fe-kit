// import { Icon } from '@iconify/react'
// import { useNavigate, useRouterState } from '@tanstack/react-router'
// import React, { useState } from 'react'
// import { Button, cn, Spacer } from '@vezham/react/v2'
// import { SidebarProps } from './types'
// import Header from '../header'
// import { useComposeQuery } from '../../utils/queryOptions'
// const Sidebar: React.FC<SidebarProps> = ({ sidebar, children,header }) => {
//   const navigate = useNavigate()
//   const { location } = useRouterState()
//   const [collapsed, setCollapsed] = useState(false)
//   const { openCompose } = useComposeQuery()
//   return (
//     <aside
//       className={cn(
//         'bg-default-200 h-screen border-r px-2 py-4 transition-all duration-200',
//         collapsed ? 'w-16' : 'w-64'
//       )}>
//       <div
//         className={cn(
//           'mb-4 flex',
//           collapsed ? 'justify-center' : 'justify-end'
//         )}>
//         <Button
//           isIconOnly
//           onClick={() => setCollapsed(!collapsed)}
//           className={cn('hover:bg-default-100')}>
//           {collapsed ? (
//             <Icon icon="mdi:chevron-right" width={16} />
//           ) : (
//             <Icon icon="mdi:chevron-left" />
//           )}
//         </Button>
//       </div>
//       {!collapsed && sidebar && sidebar.length > 0 && (
//         <>
//           <div className="flex flex-col  gap-3 px-2">
//             <div className='flex flex-col  gap-3 px-2"'>
//               <Button
//                 onClick={openCompose}
//                 endContent={<Icon icon='mdi:plus' />}
//                 className="bg-primary text-white"
//               >
//                 Compose
//               </Button>
//               <Spacer y={4} />
//               {sidebar.map(item => {
//                 const isActive = location.pathname === item.href
//                 return (
//                   <Button
//                     startContent={<Icon icon={item.icon} />}
//                     variant="light"
//                     key={item.href}
//                     onClick={() =>
//                       navigate({
//                         to: item.href,
//                         search: (prev) => ({ ...prev }),
//                       })
//                     }
//                     className={cn(
//                       'flex w-full items-center justify-start rounded-md px-3 py-2 text-sm transition-all',
//                       isActive
//                         ? 'bg-primary text-white'
//                         : 'hover:bg-default-100 border-primary-200 border'
//                     )}>
//                     <span>{item.label}</span>
//                     {item.count !== undefined && (
//                       <span className="text-xs opacity-70">{item.count}</span>
//                     )}
//                   </Button>
//                 )
//               })}
//             </div>
//             <div>
//               {/* {header && <Header header={header} />} */}
//             </div>
//           </div>
//           <div>
//             {children && (
//               <div className="px-2 py-2">
//                 <div className="grid gap-4">{children}</div>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </aside>
//   )
// }
// export default Sidebar
import { Icon } from '@iconify/react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'

import { Avatar, Button } from '@vezham/react/v2'

import { sidebarData } from '../../store/data'
import { useComposeQuery } from '../../utils/queryOptions'
import { SidebarItemProps, SidebarSectionProps } from './types'

export function SidebarItem({
  icon,
  label,
  count,
  iconColor,
  href
}: SidebarItemProps) {
  const { location } = useRouterState()

  const isActive = location.pathname === href

  return (
    <Link
      to={href}
      search={prev => ({ ...prev })}
      className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 transition-colors ${isActive ? 'bg-[#eaeae8]' : 'hover:bg-default-100'}`}>
      <div className="flex items-center gap-2">
        <Icon
          icon={icon}
          className={iconColor || 'text-default-500'}
          width={20}
        />
        <span className="text-sm">{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-default-400 text-xs">{count}</span>
      )}
    </Link>
  )
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="mb-4">
      <h3 className="text-default-400 mb-1 px-3 text-xs font-medium">
        {title}
      </h3>
      {children}
    </div>
  )
}

export function Sidebar() {
  const { openCompose } = useComposeQuery()
  const navigate = useNavigate()

  return (
    <div className="bg-default-50 border-default-200 flex h-screen w-64 min-w-[240px] flex-col border-r">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <Avatar
            className="text-tiny h-6 w-6"
            src="https://avatars.githubusercontent.com/u/30373425?v=4"
            alt="Junior"
          />
          <span className="text-sm font-medium">Junior</span>
        </div>

        <Button
          isIconOnly
          variant="light"
          onClick={openCompose}
          endContent={<Icon icon="lucide:edit" width={18} />}
        />
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 rounded-md px-3 py-2">
          <Icon icon="lucide:search" className="text-default-500" width={18} />
          <span className="text-default-500 text-sm">Search</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto px-3 py-2">
        {sidebarData.map((section, index) => (
          <SidebarSection key={index} title={section.title}>
            {section.items.map(item => (
              <SidebarItem key={item.href} {...item} />
            ))}
          </SidebarSection>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-3">
        <div className="flex gap-2">
          <button
            className="text-default-500"
            onClick={() => navigate({ to: '/notifications' })}>
            <Icon icon="mdi:notifications" width={20} />
          </button>
          <button className="text-default-500">
            <Icon icon="mdi:calendar" width={20} />
          </button>
        </div>
        <button
          className="text-default-500"
          onClick={() => navigate({ to: '/cta' })}>
          <Icon icon="lucide:help-circle" width={20} />
        </button>
      </div>
    </div>
  )
}
