// import { Button, Tab, Tabs } from '@heroui/react'
// import { PlusFilledIcon } from '@heroui/shared-icons'

// import AccountSetting from './account/index'
// import CompanySetting from './company/index'
// import IntegrationSetting from './integrations/index'
// import NotificationSetting from './notifications/index'
// import TeamSetting from './team/index'

// export default function Component({
//   endContent
// }: {
//   endContent?: React.ReactNode
// }) {
//   const tabItems = [
//     {
//       key: 'company',
//       title: 'Company',
//       icon: <PlusFilledIcon />,
//       component: <CompanySetting />
//     },
//     {
//       key: 'account',
//       title: 'Account',
//       icon: <PlusFilledIcon />,
//       component: <AccountSetting />
//     },
//     {
//       key: 'team',
//       title: 'Team',
//       icon: <PlusFilledIcon />,
//       component: (
//         <TeamSetting
//           endContent={(open: () => void) => (
//             <Button size="sm" variant="solid" onPress={open}>
//               <PlusFilledIcon /> Invite User
//             </Button>
//           )}
//         />
//       )
//     },
//     {
//       key: 'notifications',
//       title: 'Notifications',
//       icon: <PlusFilledIcon />,
//       component: <NotificationSetting className="max-w-2xl" />
//     },
//     {
//       key: 'integration',
//       title: 'Integration',
//       icon: <PlusFilledIcon />,
//       component: <IntegrationSetting />
//     }
//   ]

//   return (
//     <div className="h-screen w-full">
//       {/* Settings Content */}
//       <div className="scrollbar-hide w-full flex-1 overflow-y-auto p-4">
//         {/* Responsive wrapper */}
//         <div className="w-full max-w-2xl xl:mx-12 xl:max-w-5xl">
//           <div className="flex flex-col justify-between gap-4 sm:flex-row">
//             {/* Left Content */}
//             <div className="flex flex-col">
//               <h1 className="text-default-foreground text-3xl leading-9 font-bold">
//                 Settings
//               </h1>
//               <h2 className="text-small text-default-500 mt-2">
//                 Customize settings, email preferences, and web appearance.
//               </h2>
//             </div>

//             {/* Right Buttons */}
//             <div className="flex w-full gap-2 sm:w-auto">{endContent}</div>
//           </div>

//           {/* Tabs */}
//           <Tabs
//             fullWidth
//             classNames={{
//               base: 'mt-6 w-full max-w-2xl',
//               cursor: 'bg-content1 dark:bg-content1',
//               panel: 'w-full p-0 pt-4'
//             }}>
//             {tabItems.map(({ key, title, icon, component }) => (
//               <Tab
//                 key={key}
//                 title={
//                   <div className="flex items-center gap-2">
//                     {icon}
//                     <span>{title}</span>
//                   </div>
//                 }>
//                 {component}
//               </Tab>
//             ))}
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { Button, Tab, Tabs } from '@heroui/react'
import { PlusFilledIcon } from '@heroui/shared-icons'

import AccountSetting from './account/index'
import CompanySetting from './company/index'
import IntegrationSetting from './integrations/index'
import NotificationSetting from './notifications/index'
import TeamSetting from './team/index'

import { ROLE_TAB_VISIBILITY } from './rebac'
import { User, hasPermission } from './utils'

export default function SettingsLayout({
  user,
  endContent
}: {
  user: User
  endContent?: React.ReactNode
}) {
  const tabItems = [
    { key: 'company', title: 'Company', component: <CompanySetting /> },
    { key: 'account', title: 'Account', component: <AccountSetting /> },
    {
      key: 'team',
      title: 'Team',
      component: (
        <TeamSetting
          endContent={(open: () => void) =>
            hasPermission(user, 'team', 'create') && (
              <Button size="sm" variant="solid" onPress={open}>
                <PlusFilledIcon /> Invite User
              </Button>
            )
          }
        />
      )
    },
    {
      key: 'notifications',
      title: 'Notifications',
      component: <NotificationSetting className="max-w-2xl" />
    },
    {
      key: 'integrations',
      title: 'Integrations',
      component: <IntegrationSetting />
    }
  ]

  // only tabs visible for this user's role(s)
  const visibleTabs = tabItems.filter(item =>
    user.roles.some(role => ROLE_TAB_VISIBILITY[role].includes(item.key as any))
  )

  return (
    <div className="h-screen w-full">
      <div className="scrollbar-hide w-full flex-1 overflow-y-auto p-4">
        <div className="w-full max-w-2xl xl:mx-12 xl:max-w-5xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Settings</h1>
              <h2 className="text-small text-default-500 mt-2">
                Customize settings, email preferences, and web appearance.
              </h2>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">{endContent}</div>
          </div>

          <Tabs
            fullWidth
            classNames={{
              base: 'mt-6 w-full max-w-2xl',
              panel: 'w-full p-0 pt-4'
            }}>
            {visibleTabs.map(({ key, title, component }) => (
              <Tab key={key} title={title}>
                {component}
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
