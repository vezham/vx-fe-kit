// import { useState } from 'react'
// import { Icon } from '@iconify/react'
// import { Badge } from '@vezham/react/v2'
// import {
//   Avatar,
//   Button,
//   Dropdown,
//   Separator,
//   Surface,
//   Tooltip
// } from '@vezham/react/v3'
// import { FooterActionsProps } from './types'
// export default function Footer({
//   user,
//   showAI = false,
//   showControlCenter = false,
//   showNotifications = false,
//   showUserInfo = true,
//   notificationCount = 0,
//   onAI,
//   onControlCenterClick,
//   onNotificationsClick,
//   onUserClick,
//   className
// }: FooterActionsProps) {
//   const [isOnline, setIsOnline] = useState(user?.isOnline ?? true)
//   const toggleStatus = () => {
//     setIsOnline(prev => !prev)
//   }
//   return (
//     <>
//       <Separator className="hidden md:block" />
//       <Surface
//         variant="transparent"
//         data-vx="footer"
//         className={`${className ?? ''}`}>
//         {/* DESKTOP */}
//         <div className="hidden flex-row items-center justify-center gap-3 md:gap-6 min-[500px]:flex md:flex-col">
//           {showAI && (
//             <Tooltip delay={0}>
//               <Tooltip.Trigger>
//                 <Icon
//                   className="text-muted"
//                   icon="solar:question-circle-linear"
//                   width={24}
//                   onClick={onAI}
//                 />
//               </Tooltip.Trigger>
//               <Tooltip.Content placement="right">AI</Tooltip.Content>
//             </Tooltip>
//           )}
//           {showControlCenter && (
//             <Tooltip delay={0}>
//               <Tooltip.Trigger>
//                 <Icon
//                   className="text-muted"
//                   icon="solar:settings-linear"
//                   width={24}
//                   onClick={onControlCenterClick}
//                 />
//               </Tooltip.Trigger>
//               <Tooltip.Content placement="right">
//                 Control Center
//               </Tooltip.Content>
//             </Tooltip>
//           )}
//           {showNotifications && (
//             <Tooltip delay={0}>
//               <Tooltip.Trigger>
//                 <Icon
//                   className="text-muted"
//                   icon="solar:bell-linear"
//                   width={24}
//                   onClick={onNotificationsClick}
//                 />
//               </Tooltip.Trigger>
//               <Tooltip.Content placement="right">
//                 Notifications
//               </Tooltip.Content>
//             </Tooltip>
//           )}
//           {showUserInfo && (
//             <Dropdown placement="right-end">
//               <Dropdown.Trigger>
//                 <Button
//                   isIconOnly
//                   variant="ghost"
//                   className="h-12 w-12 transition hover:scale-110">
//                   <Badge
//                     content=""
//                     placement="bottom-right"
//                     classNames={{
//                       badge: `${isOnline ? 'bg-success' : 'bg-gray-400'
//                         } w-3 h-3 min-w-0 p-0 border-2 border-background`
//                     }}>
//                     <Avatar size="sm">
//                       <Avatar.Image src={user?.avatar} alt={user?.name} />
//                       <Avatar.Fallback>
//                         {user?.name?.[0]?.toUpperCase()}
//                       </Avatar.Fallback>
//                     </Avatar>
//                   </Badge>
//                 </Button>
//               </Dropdown.Trigger>
//               <Dropdown.Popover>
//                 <Dropdown.Menu aria-label="User Menu">
//                   {/* USER HEADER */}
//                   <Dropdown.Item key="user" className="gap-3 pointer-events-none">
//                     <Avatar size="sm">
//                       <Avatar.Image src={user?.avatar} />
//                       <Avatar.Fallback>
//                         {user?.name?.[0]?.toUpperCase()}
//                       </Avatar.Fallback>
//                     </Avatar>
//                     <div className="flex flex-col">
//                       <span className="font-medium">{user?.name}</span>
//                       <span className="flex items-center gap-1 text-xs text-muted">
//                         <span
//                           className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-gray-400'
//                             }`}
//                         />
//                         {isOnline ? 'Active' : 'Away'}
//                       </span>
//                     </div>
//                   </Dropdown.Item>
//                   <Separator />
//                   {/* STATUS TOGGLE */}
//                   <Dropdown.Item key="status" onPress={toggleStatus}>
//                     <Icon
//                       icon={
//                         isOnline
//                           ? 'solar:sleep-linear'
//                           : 'solar:check-circle-linear'
//                       }
//                       width={20}
//                     />
//                     {isOnline
//                       ? 'Set yourself as away'
//                       : 'Set yourself as active'}
//                   </Dropdown.Item>
//                   <Separator />
//                   <Dropdown.Item key="profile">
//                     <Icon icon="solar:user-linear" width={20} />
//                     Profile
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     key="settings"
//                     onPress={() => onUserClick?.(user)}>
//                     <Icon icon="solar:settings-linear" width={20} />
//                     Preferences
//                   </Dropdown.Item>
//                   <Separator />
//                   <Dropdown.Item key="logout">
//                     <Icon icon="solar:logout-2-linear" width={20} />
//                     Sign Out
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown.Popover>
//             </Dropdown>
//           )}
//         </div>
//         {/* MOBILE */}
//         <div className="flex gap-3 items-center min-[500px]:hidden">
//           <Dropdown placement="right-end">
//             <Dropdown.Trigger>
//               <Icon
//                 className="text-muted"
//                 icon="solar:menu-dots-linear"
//                 width={24}
//               />
//             </Dropdown.Trigger>
//             <Dropdown.Popover>
//               <Dropdown.Menu aria-label="More actions">
//                 {showControlCenter && (
//                   <Dropdown.Item key="control" onPress={onControlCenterClick}>
//                     <Icon icon="solar:settings-linear" width={24} />
//                     Control Center
//                   </Dropdown.Item>
//                 )}
//                 {showNotifications && (
//                   <Dropdown.Item
//                     key="notifications"
//                     onPress={onNotificationsClick}
//                     endContent={
//                       notificationCount > 0 && (
//                         <Badge
//                           content={notificationCount}
//                           color="danger"
//                           size="sm"
//                         />
//                       )
//                     }>
//                     <Icon icon="solar:bell-linear" width={24} />
//                     Notifications
//                   </Dropdown.Item>
//                 )}
//                 {showAI && (
//                   <Dropdown.Item key="help" onPress={onAI}>
//                     <Icon icon="solar:question-circle-linear" width={24} />
//                     Help
//                   </Dropdown.Item>
//                 )}
//               </Dropdown.Menu>
//             </Dropdown.Popover>
//           </Dropdown>
//           {showUserInfo && (
//             <Dropdown placement="right-end">
//               <Dropdown.Trigger>
//                 <Button
//                   isIconOnly
//                   variant="ghost"
//                   className="h-12 w-12 transition hover:scale-110">
//                   <Badge
//                     content=""
//                     placement="bottom-right"
//                     classNames={{
//                       badge: `${isOnline ? 'bg-success' : 'bg-gray-400'
//                         } w-3 h-3 min-w-0 p-0 border-2 border-background`
//                     }}>
//                     <Avatar size="sm">
//                       <Avatar.Image src={user?.avatar} alt={user?.name} />
//                       <Avatar.Fallback>
//                         {user?.name?.[0]?.toUpperCase()}
//                       </Avatar.Fallback>
//                     </Avatar>
//                   </Badge>
//                 </Button>
//               </Dropdown.Trigger>
//               <Dropdown.Popover>
//                 <Dropdown.Menu aria-label="User Menu">
//                   <Dropdown.Item key="user" className="gap-3 pointer-events-none">
//                     <Avatar size="sm">
//                       <Avatar.Image src={user?.avatar} />
//                       <Avatar.Fallback>
//                         {user?.name?.[0]?.toUpperCase()}
//                       </Avatar.Fallback>
//                     </Avatar>
//                     <div className="flex flex-col">
//                       <span className="font-medium">{user?.name}</span>
//                       <span className="flex items-center gap-1 text-xs text-muted">
//                         <span
//                           className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-gray-400'
//                             }`}
//                         />
//                         {isOnline ? 'Active' : 'Away'}
//                       </span>
//                     </div>
//                   </Dropdown.Item>
//                   <Separator />
//                   <Dropdown.Item key="status" onPress={toggleStatus}>
//                     <Icon
//                       icon={
//                         isOnline
//                           ? 'solar:sleep-linear'
//                           : 'solar:check-circle-linear'
//                       }
//                       width={20}
//                     />
//                     {isOnline
//                       ? 'Set yourself as away'
//                       : 'Set yourself as active'}
//                   </Dropdown.Item>
//                   <Separator />
//                   <Dropdown.Item key="profile">
//                     <Icon icon="solar:user-linear" width={20} />
//                     Profile
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     key="settings"
//                     onPress={() => onUserClick?.(user)}>
//                     <Icon icon="solar:settings-linear" width={20} />
//                     Preferences
//                   </Dropdown.Item>
//                   <Separator />
//                   <Dropdown.Item key="logout">
//                     <Icon icon="solar:logout-2-linear" width={20} />
//                     Sign Out
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown.Popover>
//             </Dropdown>
//           )}
//         </div>
//       </Surface>
//     </>
//   )
// }
// import { useState } from 'react'
// import { Icon } from '@iconify/react'
// import { Badge } from '@vezham/react/v2'
// import {
//   Avatar,
//   Button,
//   Dropdown,
//   Separator,
//   Surface,
//   Tooltip, Label, ListBox, Select
// } from '@vezham/react/v3'
// import { FooterActionsProps } from './types'
// export default function Footer({
//   user,
//   showAI = false,
//   showControlCenter = false,
//   showNotifications = false,
//   showUserInfo = true,
//   notificationCount = 0,
//   onAI,
//   onControlCenterClick,
//   onNotificationsClick,
//   onUserClick,
//   className
// }: FooterActionsProps) {
//   const [isOnline, setIsOnline] = useState(user?.isOnline ?? true)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedStatus, setSelectedStatus] = useState<any>(null)
//   const [statusText, setStatusText] = useState('')
//   const [statusTime, setStatusTime] = useState('1 hour')
//   const [isStatusSelectOpen, setIsStatusSelectOpen] = useState(false)
//   const suggestedStatuses = [
//     { id: 'meeting', label: 'In a meeting', emoji: '🗓️', time: '1 hour' },
//     { id: 'commuting', label: 'Commuting', emoji: '🚌', time: '30 minutes' },
//     { id: 'sick', label: 'Out sick', emoji: '🤒', time: 'Today' },
//     { id: 'vacation', label: 'Vacationing', emoji: '🌴', time: "Don't clear" },
//     { id: 'remote', label: 'Working remotely', emoji: '🏡', time: 'Today' },
//     { id: 'dnd', label: 'Do not disturb', emoji: '🔴', time: 'Forever' },
//     { id: 'idle', label: 'Idle', emoji: '💤', time: '' }
//   ]
//   const handleStatusSelect = (status: any) => {
//     setSelectedStatus(status)
//     setStatusText(status.label)
//     setStatusTime(status.time)
//     setIsStatusSelectOpen(false) // Close after selection
//   }
//   const handleClearStatus = () => {
//     setSelectedStatus(null)
//     setStatusText('')
//     setStatusTime('1 hour')
//     setIsStatusSelectOpen(false) // Close after clearing
//   }
//   return (
//     <>
//       <Separator className="hidden md:block" />
//       <Surface
//         variant="transparent"
//         data-vx="footer"
//         className={`${className ?? ''}`}>
//         <div className="hidden flex-row items-center justify-center gap-3 md:gap-6 min-[500px]:flex md:flex-col">
//           {showAI && (
//             <Tooltip delay={0}>
//               <Tooltip.Trigger>
//                 <Icon className="text-muted cursor-pointer" icon="solar:question-circle-linear" width={24} onClick={onAI} />
//               </Tooltip.Trigger>
//               <Tooltip.Content placement="right">AI</Tooltip.Content>
//             </Tooltip>
//           )}
//           {showControlCenter && (
//             <Tooltip delay={0}>
//               <Tooltip.Trigger>
//                 <Icon className="text-muted cursor-pointer" icon="solar:settings-linear" width={24} onClick={onControlCenterClick} />
//               </Tooltip.Trigger>
//               <Tooltip.Content placement="right">Control Center</Tooltip.Content>
//             </Tooltip>
//           )}
//           {showNotifications && (
//             <Tooltip delay={0}>
//               <Tooltip.Trigger>
//                 <Icon className="text-muted cursor-pointer" icon="solar:bell-linear" width={24} onClick={onNotificationsClick} />
//               </Tooltip.Trigger>
//               <Tooltip.Content placement="right">Notifications</Tooltip.Content>
//             </Tooltip>
//           )}
//           {showUserInfo && (
//             <Dropdown
//               open={isDropdownOpen}
//               onOpenChange={setIsDropdownOpen}
//             >
//               <Dropdown.Trigger>
//                 <Button isIconOnly variant="ghost" className="h-12 w-12 hover:scale-110">
//                   <Badge
//                     content=""
//                     placement="bottom-right"
//                     classNames={{
//                       badge: `${isOnline ? 'bg-success' : 'bg-gray-400'} w-3 h-3 border-2 border-background`
//                     }}>
//                     <Avatar size="sm">
//                       <Avatar.Image src={user?.avatar} />
//                       <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
//                     </Avatar>
//                   </Badge>
//                 </Button>
//               </Dropdown.Trigger>
//               <Dropdown.Popover placement='right'>
//                 <Dropdown.Menu>
//                   <Dropdown.Item className="flex flex-col items-start gap-2 pointer-events-none">
//                     <div className="flex gap-3 items-center">
//                       <Avatar size="sm">
//                         <Avatar.Image src={user?.avatar} />
//                         <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
//                       </Avatar>
//                       <div>
//                         <div className="font-medium">{user?.name}</div>
//                         <div className="text-xs flex items-center gap-1 text-muted">
//                           <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-gray-400'}`} />
//                           {isOnline ? 'Active' : 'Away'}
//                         </div>
//                       </div>
//                     </div>
//                     {selectedStatus && (
//                       <Tooltip
//                         delay={0}
//                         content={`${selectedStatus.emoji} ${selectedStatus.label} — ${selectedStatus.time}`}
//                         placement="right"
//                       >
//                         <div className="text-xs text-muted pl-9 cursor-help">
//                           {selectedStatus.emoji} {selectedStatus.label}
//                         </div>
//                       </Tooltip>
//                     )}
//                   </Dropdown.Item>
//                   <Separator />
//                   <Dropdown.Item
//                     className="p-0"
//                     onMouseEnter={() => setIsStatusSelectOpen(true)}
//                     onMouseLeave={() => setIsStatusSelectOpen(false)}
//                   >
//                     <Select
//                       className="w-full"
//                       placeholder="Update your status"
//                       selectedKeys={selectedStatus ? [selectedStatus.id] : []}
//                       open={isStatusSelectOpen}
//                       onOpenChange={setIsStatusSelectOpen}
//                       onSelectionChange={(keys) => {
//                         const selectedId = Array.from(keys)[0]
//                         const status = suggestedStatuses.find(s => s.id === selectedId)
//                         if (status) {
//                           handleStatusSelect(status)
//                         }
//                       }}
//                     >
//                       <Label className="sr-only">Status</Label>
//                       <Select.Trigger className="px-3 py-2 hover:bg-muted">
//                         <Select.Value />
//                         <Select.Indicator />
//                       </Select.Trigger>
//                       <Select.Popover placement='right'>
//                         <ListBox>
//                           {suggestedStatuses.map((status) => (
//                             <ListBox.Item
//                               key={status.id}
//                               id={status.id}
//                               textValue={status.label}
//                               className="flex items-center gap-2"
//                               onAction={() => handleStatusSelect(status)}
//                             >
//                               <div className="flex flex-col">
//                                 <div className="flex items-center gap-2">
//                                   <span>{status.emoji}</span>
//                                   <span>{status.label}</span>
//                                 </div>
//                                 <span className="text-xs text-muted ml-6">{status.time}</span>
//                               </div>
//                               <ListBox.ItemIndicator />
//                             </ListBox.Item>
//                           ))}
//                           {selectedStatus && (
//                             <ListBox.Item
//                               key="clear"
//                               id="clear"
//                               textValue="Clear status"
//                               className="text-danger"
//                               onAction={handleClearStatus}
//                             >
//                               <div className="flex items-center gap-2">
//                                 <Icon icon="solar:close-circle-linear" width={20} />
//                                 <span>Clear status</span>
//                               </div>
//                               <ListBox.ItemIndicator />
//                             </ListBox.Item>
//                           )}
//                         </ListBox>
//                       </Select.Popover>
//                     </Select>
//                   </Dropdown.Item>
//                   <Dropdown.Item onPress={() => setIsOnline(p => !p)}>
//                     <Icon icon={isOnline ? 'solar:sleep-linear' : 'solar:check-circle-linear'} width={20} />
//                     {isOnline ? 'Set yourself as away' : 'Set yourself as active'}
//                   </Dropdown.Item>
//                   <Separator />
//                   <Dropdown.Item>
//                     <Icon icon="solar:user-linear" width={20} />
//                     Profile
//                   </Dropdown.Item>
//                   <Dropdown.Item onPress={() => onUserClick?.(user)}>
//                     <Icon icon="solar:settings-linear" width={20} />
//                     Preferences
//                   </Dropdown.Item>
//                   <Separator />
//                   <Dropdown.Item>
//                     <Icon icon="solar:logout-2-linear" width={20} />
//                     Logout
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown.Popover>
//             </Dropdown>
//           )}
//         </div>
//         {/* ================= MOBILE ================= */}
//         <div className="flex gap-3 items-center min-[500px]:hidden">
//           <Dropdown>
//             <Dropdown.Trigger>
//               <Icon className="text-muted cursor-pointer" icon="solar:menu-dots-linear" width={24} />
//             </Dropdown.Trigger>
//             <Dropdown.Popover>
//               <Dropdown.Menu>
//                 {showControlCenter && (
//                   <Dropdown.Item onPress={onControlCenterClick}>
//                     <Icon icon="solar:settings-linear" width={24} />
//                     Control Center
//                   </Dropdown.Item>
//                 )}
//                 {showNotifications && (
//                   <Dropdown.Item
//                     onPress={onNotificationsClick}
//                     endContent={notificationCount > 0 && <Badge content={notificationCount} color="danger" size="sm" />}>
//                     <Icon icon="solar:bell-linear" width={24} />
//                     Notifications
//                   </Dropdown.Item>
//                 )}
//                 {showAI && (
//                   <Dropdown.Item onPress={onAI}>
//                     <Icon icon="solar:question-circle-linear" width={24} />
//                     Help
//                   </Dropdown.Item>
//                 )}
//               </Dropdown.Menu>
//             </Dropdown.Popover>
//           </Dropdown>
//           {showUserInfo && (
//             <Dropdown
//               open={isDropdownOpen}
//               onOpenChange={setIsDropdownOpen}
//             >
//               <Dropdown.Trigger>
//                 <Button isIconOnly variant="ghost" className="h-12 w-12">
//                   <Badge
//                     content=""
//                     placement="bottom-right"
//                     classNames={{
//                       badge: `${isOnline ? 'bg-success' : 'bg-gray-400'} w-3 h-3 border-2 border-background`
//                     }}>
//                     <Avatar size="sm">
//                       <Avatar.Image src={user?.avatar} />
//                       <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
//                     </Avatar>
//                   </Badge>
//                 </Button>
//               </Dropdown.Trigger>
//               <Dropdown.Popover placement='b'>
//                 <Dropdown.Menu>
//                   <Dropdown.Item className="flex flex-col items-start gap-2 pointer-events-none">
//                     <div className="flex gap-3 items-center">
//                       <Avatar size="sm">
//                         <Avatar.Image src={user?.avatar} />
//                       </Avatar>
//                       <div>
//                         <div className="font-medium">{user?.name}</div>
//                         <div className="text-xs flex gap-1">
//                           <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-gray-400'}`} />
//                           {isOnline ? 'Active' : 'Away'}
//                         </div>
//                       </div>
//                     </div>
//                     {selectedStatus && (
//                       <Tooltip
//                         delay={0}
//                         content={`${selectedStatus.emoji} ${selectedStatus.label} — ${selectedStatus.time}`}
//                         placement="right"
//                       >
//                         <div className="text-xs pl-9 cursor-help">
//                           {selectedStatus.emoji} {selectedStatus.label}
//                         </div>
//                       </Tooltip>
//                     )}
//                   </Dropdown.Item>
//                   <Separator />
//                   <Dropdown.Item
//                     className="p-0"
//                     onMouseEnter={() => setIsStatusSelectOpen(true)}
//                     onMouseLeave={() => setIsStatusSelectOpen(false)}
//                   >
//                     <Select
//                       className="w-full"
//                       placeholder="Update your status"
//                       selectedKeys={selectedStatus ? [selectedStatus.id] : []}
//                       open={isStatusSelectOpen}
//                       onOpenChange={setIsStatusSelectOpen}
//                       onSelectionChange={(keys) => {
//                         const selectedId = Array.from(keys)[0]
//                         const status = suggestedStatuses.find(s => s.id === selectedId)
//                         if (status) {
//                           handleStatusSelect(status)
//                         }
//                       }}
//                     >
//                       <Label className="sr-only">Status</Label>
//                       <Select.Trigger className="px-3 py-2 hover:bg-muted">
//                         <Select.Value />
//                         <Select.Indicator />
//                       </Select.Trigger>
//                       <Select.Popover placement='bo'>
//                         <ListBox>
//                           {suggestedStatuses.map((status) => (
//                             <ListBox.Item
//                               key={status.id}
//                               id={status.id}
//                               textValue={status.label}
//                               className="flex items-center gap-2"
//                               onAction={() => handleStatusSelect(status)}
//                             >
//                               <div className="flex flex-col">
//                                 <div className="flex items-center gap-2">
//                                   <span>{status.emoji}</span>
//                                   <span>{status.label}</span>
//                                 </div>
//                                 <span className="text-xs text-muted ml-6">{status.time}</span>
//                               </div>
//                               <ListBox.ItemIndicator />
//                             </ListBox.Item>
//                           ))}
//                           {selectedStatus && (
//                             <ListBox.Item
//                               key="clear"
//                               id="clear"
//                               textValue="Clear status"
//                               className="text-danger"
//                               onAction={handleClearStatus}
//                             >
//                               <div className="flex items-center gap-2">
//                                 <Icon icon="solar:close-circle-linear" width={20} />
//                                 <span>Clear status</span>
//                               </div>
//                               <ListBox.ItemIndicator />
//                             </ListBox.Item>
//                           )}
//                         </ListBox>
//                       </Select.Popover>
//                     </Select>
//                   </Dropdown.Item>
//                   <Dropdown.Item onPress={() => setIsOnline(p => !p)}>
//                     <Icon icon={isOnline ? 'solar:sleep-linear' : 'solar:check-circle-linear'} width={20} />
//                     {isOnline ? 'Set yourself as away' : 'Set yourself as active'}
//                   </Dropdown.Item>
//                   <Dropdown.Item>
//                     <Icon icon="solar:user-linear" width={20} />
//                     Profile
//                   </Dropdown.Item>
//                   <Dropdown.Item onPress={() => onUserClick?.(user)}>
//                     <Icon icon="solar:settings-linear" width={20} />
//                     Preferences
//                   </Dropdown.Item>
//                   <Separator />
//                   <Dropdown.Item>
//                     <Icon icon="solar:logout-2-linear" width={20} />
//                     Logout
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown.Popover>
//             </Dropdown>
//           )}
//         </div>
//       </Surface>
//     </>
//   )
// }
import { Icon } from '@iconify/react'
import { useState } from 'react'

import { Badge } from '@vezham/react/v2'
import {
  Avatar,
  Button,
  Dropdown,
  Label,
  ListBox,
  Select,
  Separator,
  Surface,
  Tooltip
} from '@vezham/react/v3'

import { FooterActionsProps } from './types'

export default function Footer({
  user,
  showAI = false,
  showControlCenter = false,
  showNotifications = false,
  showUserInfo = true,
  notificationCount = 0,
  onAI,
  onControlCenterClick,
  onNotificationsClick,
  onUserClick,
  className
}: FooterActionsProps) {
  const [isOnline, setIsOnline] = useState(user?.isOnline ?? true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<any>(null)
  const [selectedTiming, setSelectedTiming] = useState<any>(null)
  const [showTimings, setShowTimings] = useState(false)
  const [hoveredStatus, setHoveredStatus] = useState<any>(null)

  const suggestedStatuses = [
    { id: 'meeting', label: 'In a meeting', emoji: '🗓️' },
    { id: 'commuting', label: 'Commuting', emoji: '🚌' },
    { id: 'sick', label: 'Out sick', emoji: '🤒' },
    { id: 'vacation', label: 'Vacationing', emoji: '🌴' },
    { id: 'remote', label: 'Working remotely', emoji: '🏡' },
    { id: 'dnd', label: 'Do not disturb', emoji: '🔴' },
    { id: 'idle', label: 'Idle', emoji: '💤' }
  ]

  const timingOptions = [
    { id: '15min', label: 'For 15 Minutes' },
    { id: '1hour', label: 'For 1 Hour' },
    { id: '8hours', label: 'For 8 Hours' },
    { id: '24hours', label: 'For 24 Hours' },
    { id: '3days', label: 'For 3 Days' },
    { id: 'forever', label: 'Forever' }
  ]

  const handleStatusSelect = (status: any) => {
    setSelectedStatus(status)
    setShowTimings(true)
    setHoveredStatus(status)
  }

  const handleTimingSelect = (timing: any) => {
    setSelectedTiming(timing)
    setShowTimings(false)
    setHoveredStatus(null)
    setIsDropdownOpen(false)
  }

  const handleClearStatus = () => {
    setSelectedStatus(null)
    setSelectedTiming(null)
    setShowTimings(false)
    setHoveredStatus(null)
  }

  const getStatusDisplayText = () => {
    if (!selectedStatus) return ''
    if (!selectedTiming)
      return `${selectedStatus.emoji} ${selectedStatus.label}`
    return `${selectedStatus.emoji} ${selectedStatus.label} — ${selectedTiming.label}`
  }

  const StatusIndicator = () => {
    if (!selectedStatus) return null
    return (
      <div className="absolute -top-4 left-3 z-[-1]">
        <Tooltip delay={0}>
          <Tooltip.Trigger asChild>
            <div className="bg-background border-default-200 flex h-6 w-6 cursor-pointer items-center justify-center rounded-t-lg border text-sm shadow-md">
              {selectedStatus.emoji}
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content placement="right">
            {getStatusDisplayText()}{' '}
          </Tooltip.Content>
        </Tooltip>
      </div>
    )
  }

  return (
    <>
      <Separator className="hidden md:block" />
      <Surface
        variant="transparent"
        data-vx="footer"
        className={`${className ?? ''}`}>
        <div className="hidden flex-row items-center justify-center gap-3 min-[500px]:flex md:flex-col md:gap-6">
          {showAI && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <Icon
                  className="text-muted cursor-pointer"
                  icon="solar:question-circle-linear"
                  width={24}
                  onClick={onAI}
                />
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">AI</Tooltip.Content>
            </Tooltip>
          )}
          {showControlCenter && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <Icon
                  className="text-muted cursor-pointer"
                  icon="solar:settings-linear"
                  width={24}
                  onClick={onControlCenterClick}
                />
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">
                Control Center
              </Tooltip.Content>
            </Tooltip>
          )}
          {showNotifications && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <Icon
                  className="text-muted cursor-pointer"
                  icon="solar:bell-linear"
                  width={24}
                  onClick={onNotificationsClick}
                />
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">Notifications</Tooltip.Content>
            </Tooltip>
          )}
          {showUserInfo && (
            <Dropdown open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <Dropdown.Trigger>
                <div className="relative">
                  <StatusIndicator />

                  <Button
                    isIconOnly
                    variant="ghost"
                    className="h-12 w-12 rounded-xl">
                    <Badge
                      content=""
                      placement="bottom-right"
                      classNames={{
                        badge: `${isOnline ? 'bg-success' : 'bg-gray-400'} w-3 h-3 border-2 border-background`
                      }}>
                      <Avatar size="sm" className="rounded-xl">
                        <Avatar.Image src={user?.avatar} />
                        <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                      </Avatar>
                    </Badge>
                  </Button>
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover placement="right">
                <Dropdown.Menu>
                  <Dropdown.Item className="pointer-events-none flex flex-col items-start gap-2">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <Avatar.Image src={user?.avatar} />
                        <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-muted flex items-center gap-1 text-xs">
                          <span
                            className={`h-2 w-2 rounded-full ${isOnline ? 'bg-success' : 'bg-gray-400'}`}
                          />
                          {isOnline ? 'Active' : 'Away'}
                        </div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Separator />
                  {/* {!showTimings ? (
                    <Dropdown.Item className="p-0">
                      <Select
                        className="w-full"
                        placeholder="Update your status"
                        value={selectedStatus?.id ?? null}
                        onChange={(value) => {
                          const status = suggestedStatuses.find(s => s.id === value)
                          if (status) handleStatusSelect(status)
                        }}
                      >
                        <Label className="sr-only">Status</Label>

                        <Select.Trigger className="px-3 py-2">
                          <Select.Value>
                            {selectedStatus
                              ? `${selectedStatus.emoji} ${selectedStatus.label}`
                              : "Update your status"}
                          </Select.Value>
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover placement="right">
                          <ListBox
                            selectionMode="single"
                            selectedKeys={selectedStatus ? [selectedStatus.id] : []}
                            onSelectionChange={(keys) => {
                              const id = Array.from(keys)[0]
                              const status = suggestedStatuses.find(s => s.id === id)
                              if (status) handleStatusSelect(status)
                            }}
                          >
                            {suggestedStatuses.map((s) => (
                              <ListBox.Item key={s.id} id={s.id}>
                                <div className="flex items-center gap-2">
                                  <span>{s.emoji}</span>
                                  <span>{s.label}</span>
                                </div>
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item className="p-0">
                        <Select
                          className="w-full"
                          placeholder="Select duration"
                          value={selectedTiming?.id ?? null}
                          onChange={(value) => {
                            const timing = timingOptions.find(t => t.id === value)
                            if (timing) handleTimingSelect(timing)
                          }}
                        >
                          <Label className="sr-only">Timing</Label>

                          <Select.Trigger className="px-3 py-2">
                            <Select.Value>
                              {selectedTiming
                                ? selectedTiming.label
                                : `${hoveredStatus?.emoji ?? ''} ${hoveredStatus?.label ?? ''}`}
                            </Select.Value>
                            <Select.Indicator />
                          </Select.Trigger>

                          <Select.Popover placement="right">
                            <ListBox
                              selectionMode="single"
                              selectedKeys={selectedTiming ? [selectedTiming.id] : []}
                              onSelectionChange={(keys) => {
                                const id = Array.from(keys)[0]
                                const timing = timingOptions.find(t => t.id === id)
                                if (timing) handleTimingSelect(timing) 
                              }}
                            >
                              {timingOptions.map((t) => (
                                <ListBox.Item key={t.id} id={t.id}>
                                  {t.label}
                                </ListBox.Item>
                              ))}

                              <ListBox.Item onAction={handleClearStatus}>
                                Clear status
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                    </Dropdown.Item>
                  )} */}

                  <Dropdown.Item className="p-0">
                    <Select
                      className="w-full"
                      value={
                        selectedTiming
                          ? `${selectedStatus?.id}__${selectedTiming.id}`
                          : (selectedStatus?.id ?? null)
                      }
                      onChange={value => {
                        // STEP 1 → select status
                        if (!showTimings) {
                          const status = suggestedStatuses.find(
                            s => s.id === value
                          )
                          if (status) {
                            setSelectedStatus(status)
                            setShowTimings(true)
                            setHoveredStatus(status)
                          }
                          return
                        }

                        // STEP 2 → select timing
                        const timing = timingOptions.find(t => t.id === value)
                        if (timing) {
                          setSelectedTiming(timing)
                          setShowTimings(false)
                          setIsDropdownOpen(false) // ✅ CLOSE DROPDOWN
                        }
                      }}>
                      <Label className="sr-only">Status</Label>

                      {/* ✅ TRIGGER DISPLAY */}
                      <Select.Trigger className="px-3 py-2">
                        <Select.Value>
                          {selectedStatus
                            ? selectedTiming
                              ? `${selectedStatus.emoji} ${selectedStatus.label} • ${selectedTiming.label}`
                              : `${selectedStatus.emoji} ${selectedStatus.label}`
                            : 'Update your status'}
                        </Select.Value>
                        <Select.Indicator />
                      </Select.Trigger>

                      {/* ✅ OPTIONS SWITCH */}
                      <Select.Popover placement="right">
                        <ListBox>
                          {!showTimings ? (
                            // 🔹 STATUS OPTIONS
                            suggestedStatuses.map(s => (
                              <ListBox.Item key={s.id} id={s.id}>
                                <div className="flex items-center gap-2">
                                  <span>{s.emoji}</span>
                                  <span>{s.label}</span>
                                </div>
                              </ListBox.Item>
                            ))
                          ) : (
                            // 🔹 TIMING OPTIONS
                            <>
                              {timingOptions.map(t => (
                                <ListBox.Item key={t.id} id={t.id}>
                                  {t.label}
                                </ListBox.Item>
                              ))}

                              <ListBox.Item
                                onAction={() => {
                                  setSelectedStatus(null)
                                  setSelectedTiming(null)
                                  setShowTimings(false)
                                }}>
                                Clear status
                              </ListBox.Item>
                            </>
                          )}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Dropdown.Item>

                  <Dropdown.Item onPress={() => setIsOnline(p => !p)}>
                    <Icon
                      icon={
                        isOnline
                          ? 'solar:sleep-linear'
                          : 'solar:check-circle-linear'
                      }
                      width={20}
                    />
                    {isOnline
                      ? 'Set yourself as away'
                      : 'Set yourself as active'}
                  </Dropdown.Item>

                  <Separator />

                  <Dropdown.Item>
                    <Icon icon="solar:user-linear" width={20} />
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Item onPress={() => onUserClick?.(user)}>
                    <Icon icon="solar:settings-linear" width={20} />
                    Preferences
                  </Dropdown.Item>

                  <Separator />

                  <Dropdown.Item>
                    <Icon icon="solar:logout-2-linear" width={20} />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>

        <div className="flex items-center gap-3 min-[500px]:hidden">
          <Dropdown>
            <Dropdown.Trigger>
              <Icon
                className="text-muted cursor-pointer"
                icon="solar:menu-dots-linear"
                width={24}
              />
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu>
                {showControlCenter && (
                  <Dropdown.Item onPress={onControlCenterClick}>
                    <Icon icon="solar:settings-linear" width={24} />
                    Control Center
                  </Dropdown.Item>
                )}
                {showNotifications && (
                  <Dropdown.Item
                    onPress={onNotificationsClick}
                    endContent={
                      notificationCount > 0 && (
                        <Badge
                          content={notificationCount}
                          color="danger"
                          size="sm"
                        />
                      )
                    }>
                    <Icon icon="solar:bell-linear" width={24} />
                    Notifications
                  </Dropdown.Item>
                )}
                {showAI && (
                  <Dropdown.Item onPress={onAI}>
                    <Icon icon="solar:question-circle-linear" width={24} />
                    Help
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {showUserInfo && (
            <Dropdown open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <Dropdown.Trigger>
                <div className="relative">
                  <StatusIndicator />

                  <Button
                    isIconOnly
                    variant="ghost"
                    className="h-12 w-12 rounded-xl">
                    <Badge
                      content=""
                      placement="bottom-right"
                      classNames={{
                        badge: `${isOnline ? 'bg-success' : 'bg-gray-400'} w-3 h-3 border-2 border-background`
                      }}>
                      <Avatar size="sm" className="rounded-xl">
                        <Avatar.Image src={user?.avatar} />
                        <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                      </Avatar>
                    </Badge>
                  </Button>
                </div>
              </Dropdown.Trigger>

              <Dropdown.Popover placement="bottom">
                <Dropdown.Menu>
                  <Dropdown.Item className="pointer-events-none flex flex-col items-start gap-2">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <Avatar.Image src={user?.avatar} />
                        <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-muted flex items-center gap-1 text-xs">
                          <span
                            className={`h-2 w-2 rounded-full ${isOnline ? 'bg-success' : 'bg-gray-400'}`}
                          />
                          {isOnline ? 'Active' : 'Away'}
                        </div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Separator />
                  {!showTimings ? (
                    <Dropdown.Item className="p-0">
                      <Select
                        className="w-full"
                        placeholder="Update your status"
                        value={selectedStatus?.id ?? null}
                        onChange={value => {
                          const status = suggestedStatuses.find(
                            s => s.id === value
                          )
                          if (status) handleStatusSelect(status)
                        }}>
                        <Label className="sr-only">Status</Label>

                        <Select.Trigger className="px-3 py-2">
                          <Select.Value>
                            {selectedStatus
                              ? `${selectedStatus.emoji} ${selectedStatus.label}`
                              : 'Update your status'}
                          </Select.Value>
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover placement="right">
                          <ListBox>
                            {suggestedStatuses.map(s => (
                              <ListBox.Item
                                key={s.id}
                                id={s.id}
                                textValue={s.label}>
                                {s.emoji} {s.label}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item className="p-0">
                      <Select
                        className="w-full"
                        placeholder="Select duration"
                        value={selectedTiming?.id ?? null}
                        onChange={value => {
                          const timing = timingOptions.find(t => t.id === value)
                          if (timing) handleTimingSelect(timing)
                        }}>
                        <Label className="sr-only">Timing</Label>

                        <Select.Trigger className="px-3 py-2">
                          <Select.Value>
                            {selectedTiming
                              ? selectedTiming.label
                              : `${hoveredStatus?.emoji ?? ''} ${hoveredStatus?.label ?? ''}`}
                          </Select.Value>
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover placement="right">
                          <ListBox>
                            {timingOptions.map(t => (
                              <ListBox.Item
                                key={t.id}
                                id={t.id}
                                textValue={t.label}>
                                {t.label}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}

                            <ListBox.Item onAction={handleClearStatus}>
                              Clear status
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </Dropdown.Item>
                  )}

                  <Dropdown.Item onPress={() => setIsOnline(p => !p)}>
                    <Icon
                      icon={
                        isOnline
                          ? 'solar:sleep-linear'
                          : 'solar:check-circle-linear'
                      }
                      width={20}
                    />
                    {isOnline
                      ? 'Set yourself as away'
                      : 'Set yourself as active'}
                  </Dropdown.Item>

                  <Separator />

                  <Dropdown.Item>
                    <Icon icon="solar:user-linear" width={20} />
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Item onPress={() => onUserClick?.(user)}>
                    <Icon icon="solar:settings-linear" width={20} />
                    Preferences
                  </Dropdown.Item>

                  <Separator />

                  <Dropdown.Item>
                    <Icon icon="solar:logout-2-linear" width={20} />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
      </Surface>
    </>
  )
}
