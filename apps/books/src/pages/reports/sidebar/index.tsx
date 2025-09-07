// 'use client'

// import { Button, cn, ScrollShadow, Spacer } from '@heroui/react'
// import { Icon } from '@iconify/react'
// import React from 'react'

// import Sidebar from './sidebar'
// import { sectionItems } from './items'

// export default function Component() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const isMobile = useMediaQuery('(max-width: 768px)')
//   const [showSidebar, setShowSidebar] = React.useState(true)

//   // Find active key from pathname
//   const getActiveKey = (path: string) => {
//     if (path === '/') return 'home'

//     for (const section of sectionItems) {
//       for (const item of section.items) {
//         // Match direct route

//         // Match nested routes
//         if (item.items) {
//           for (const subItem of item.items) {
//             if (subItem.href === path || `/${subItem.key}` === path) {
//               return subItem.key
//             }
//           }
//         }
//       }
//     }
//     return ''
//   }

//   const activeKey = getActiveKey(location.pathname)

//   const handleItemClick = (href: string) => {
//     if (isMobile) {
//       setShowSidebar(false)
//     }
//     navigate(href)
//   }

//   const handleBack = () => {
//     setShowSidebar(true)
//   }

//   React.useEffect(() => {
//     if (isMobile) {
//       // Show main content (hide sidebar) if not on the home page
//       if (location.pathname !== '') {
//         setShowSidebar(false)
//       } else {
//         // Show sidebar on the home page
//         setShowSidebar(true)
//       }
//     } else {
//       // Always show sidebar on desktop
//       setShowSidebar(true)
//     }
//   }, [isMobile, location.pathname])

//   return (
//     <div className="flex h-screen w-full overflow-hidden">
//       {/* Sidebar Section */}
//       <div
//         className={cn(
//           'border-r-small! border-divider transition-width relative flex h-full w-72 flex-col p-6',
//           {
//             hidden: isMobile && !showSidebar,
//             'w-full': isMobile && showSidebar,
//             flex: !isMobile
//           }
//         )}>
//         {/* <div className="flex items-center gap-3 px-3">
//           <div className="bg-foreground flex h-8 w-8 items-center justify-center rounded-full">
//             <AcmeIcon className="text-background" />
//           </div>
//           <span className="text-small font-bold uppercase opacity-100">
//             Acme
//           </span>
//         </div>

//         <Spacer y={8} />

//         <div className="flex items-center gap-3 px-3">
//           <Avatar
//             isBordered
//             className="flex-none"
//             size="sm"
//             src="https://i.pravatar.cc/150?u=a04258114e29026708c"
//           />
//           <div className="flex max-w-full flex-col">
//             <p className="text-small text-default-600 truncate font-medium">
//               John Doe
//             </p>
//             <p className="text-tiny text-default-400 truncate">
//               Product Designer
//             </p>
//           </div>
//         </div> */}

//         <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
//           <Sidebar
//             defaultSelectedKey={activeKey}
//             items={sectionItems}
//             onClick={() => handleItemClick}
//           />
//         </ScrollShadow>

//         <Spacer y={2} />

//         {/* Footer buttons */}
//         {/* <div className="mt-auto flex flex-col">
//           <Tooltip content="Help & Feedback" placement="right">
//             <Button
//               fullWidth
//               className="text-default-500 data-[hover=true]:text-foreground justify-start truncate"
//               startContent={
//                 <Icon
//                   className="text-default-500 flex-none"
//                   icon="solar:info-circle-line-duotone"
//                   width={24}
//                 />
//               }
//               variant="light"
//             >
//               Help & Information
//             </Button>
//           </Tooltip>
//           <Tooltip content="Log Out" placement="right">
//             <Button
//               className="text-default-500 data-[hover=true]:text-foreground justify-start"
//               startContent={
//                 <Icon
//                   className="text-default-500 flex-none rotate-180"
//                   icon="solar:minus-circle-line-duotone"
//                   width={24}
//                 />
//               }
//               variant="light"
//             >
//               Log Out
//             </Button>
//           </Tooltip>
//         </div> */}
//       </div>

//       {/* Main Content Section */}
//       {/* Main Content Section */}
//       <div
//         className={cn('w-full flex-1 overflow-y-auto p-4', {
//           hidden: isMobile && showSidebar, // hide if sidebar is open on mobile
//           flex: !isMobile || (isMobile && !showSidebar),
//           'flex-col': isMobile
//         })}>
//         <main className="h-screen w-full overflow-visible">
//           <div className="rounded-medium border-small h-screen w-full p-4">
//             {isMobile && location.pathname !== '' && (
//               <Button onPress={handleBack} className="mb-4">
//                 <Icon icon="solar:arrow-left-line-duotone" width={24} />
//                 Back
//               </Button>
//             )}
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }
