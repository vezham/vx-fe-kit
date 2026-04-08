import { Icon } from '@iconify/react'
import { useState } from 'react'

import { Badge } from '@vezham/react/v2'
import {
  Avatar,
  Button,
  Dropdown,
  ListBox,
  Select,
  Separator,
  Surface,
  Tooltip
} from '@vezham/react/v3'

import { useUser } from '../../../store/users/useUserStore'
import UserInfoModal from './preferences/modal'
import { FooterActionsProps } from './types'

type UserStatus = 'active' | 'away' | 'idle' | 'busy' | 'dnd'

const STATUS_OPTIONS = [
  { id: 'active', label: 'Available', icon: '🟢', color: 'bg-success' },
  { id: 'away', label: 'Away', icon: '🌙', color: 'bg-warning' },
  { id: 'idle', label: 'Idle', icon: '💤', color: 'bg-primary' },
  { id: 'busy', label: 'Busy', icon: '🔴', color: 'bg-danger' },
  { id: 'dnd', label: 'Do not disturb', icon: '⛔', color: 'bg-muted' }
]

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
  const { clearUser } = useUser()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [userStatus, setUserStatus] = useState<UserStatus>('active')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentStatus = STATUS_OPTIONS.find(s => s.id === userStatus)

  const [selectedStatus, setSelectedStatus] = useState<any>(null)
  const [selectedTiming, setSelectedTiming] = useState<any>(null)

  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [isTimingOpen, setIsTimingOpen] = useState(false)

  const suggestedStatuses = [
    { id: 'meeting', label: 'In a meeting', emoji: '🗓️' },
    { id: 'commuting', label: 'Commuting', emoji: '🚌' },
    { id: 'sick', label: 'Out sick', emoji: '🤒' },
    { id: 'vacation', label: 'Vacationing', emoji: '🌴' },
    { id: 'remote', label: 'Working remotely', emoji: '🏡' }
  ]

  const timingOptions = [
    { id: '15min', label: 'For 15 Minutes' },
    { id: '1hour', label: 'For 1 Hour' },
    { id: '8hours', label: 'For 8 Hours' },
    { id: '24hours', label: 'For 24 Hours' },
    { id: '3days', label: 'For 3 Days' },
    { id: 'forever', label: 'Forever' }
  ]

  const getStatusDisplayText = () => {
    if (!selectedStatus) return ''
    if (!selectedTiming)
      return `${selectedStatus.emoji} ${selectedStatus.label}`
    return `${selectedStatus.emoji} ${selectedStatus.label} • ${selectedTiming.label}`
  }

  const tooltipText = selectedStatus
    ? getStatusDisplayText()
    : `${user?.name} -  ${currentStatus?.icon} ${currentStatus?.label}`

  const StatusIndicator = () => {
    if (!selectedStatus) return null

    return (
      <div className="absolute -top-3 left-3 z-[-1] md:-top-4">
        <div className="bg-background border-default-200 flex h-6 min-w-[24px] items-center justify-center rounded-t-lg border px-1 text-sm shadow-md">
          {selectedStatus.emoji}
        </div>
      </div>
    )
  }

  const onCurrentUserClick = () => {
    setIsModalOpen(true)
    setIsDropdownOpen(false)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Separator className="hidden md:block" />
      <Surface variant="transparent" className={className}>
        <div className="hidden flex-row items-center justify-center gap-3 min-[500px]:flex md:flex-col md:gap-6">
          {showAI && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <Icon
                  icon="solar:question-circle-linear"
                  className="text-muted cursor-pointer"
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
                  icon="solar:settings-linear"
                  className="text-muted cursor-pointer"
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
                  icon="solar:bell-linear"
                  className="text-muted cursor-pointer"
                  width={24}
                  onClick={onNotificationsClick}
                />
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">Notifications</Tooltip.Content>
            </Tooltip>
          )}

          {showUserInfo && (
            <Dropdown isOpen={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <Tooltip delay={0}>
                <Tooltip.Trigger asChild>
                  <Dropdown.Trigger asChild>
                    <div className="relative cursor-pointer">
                      <StatusIndicator />
                      <Button
                        isIconOnly
                        variant="ghost"
                        className="h-12 w-12 rounded-xl">
                        <Badge
                          content={
                            <span className="text-[10px] leading-none">
                              {currentStatus?.icon}
                            </span>
                          }
                          placement="bottom-right"
                          classNames={{
                            badge:
                              'flex items-center justify-center w-4 h-4 border-2 border-background text-white'
                          }}>
                          <Avatar size="sm" className="rounded-xl">
                            <Avatar.Image src={user?.avatar} />
                            <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                          </Avatar>
                        </Badge>
                      </Button>
                    </div>
                  </Dropdown.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Content placement="right">
                  {tooltipText}
                </Tooltip.Content>
              </Tooltip>
              <Dropdown.Popover placement="right">
                <div
                  className="hover:bg-default-100 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors"
                  onClick={onCurrentUserClick}>
                  <Avatar size="sm">
                    <Avatar.Image src={user?.avatar} />
                    <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-muted flex items-center gap-1 text-xs">
                      <span
                        className={`h-2 w-2 rounded-full ${currentStatus?.color}`}
                      />
                      {currentStatus?.label}
                    </div>
                  </div>
                </div>
                <Dropdown.Menu>
                  <Separator />
                  <Dropdown.Item className="mt-2 p-0">
                    <Select
                      className="w-full"
                      value={userStatus}
                      onChange={v => setUserStatus(v as UserStatus)}>
                      <Select.Trigger className="h-8 border-none bg-transparent shadow-none ring-0 outline-none focus:ring-0 focus:outline-none">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {STATUS_OPTIONS.map(s => (
                            <ListBox.Item key={s.id} id={s.id}>
                              {s.icon} {s.label}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Dropdown.Item>
                  <Dropdown.Item className="my-1 p-0">
                    <Select
                      className="w-full border-none shadow-none"
                      selectedKeys={selectedStatus ? [selectedStatus.id] : []}
                      open={isStatusOpen}
                      onOpenChange={setIsStatusOpen}
                      onSelectionChange={key => {
                        if (key === 'clear') {
                          setSelectedStatus(null)
                          setSelectedTiming(null)
                          setIsStatusOpen(false)
                          return
                        }
                        const status = suggestedStatuses.find(s => s.id === key)
                        if (status) {
                          setSelectedStatus(status)
                          const defaultTiming = timingOptions.find(
                            t => t.id === '15min'
                          )
                          setSelectedTiming(defaultTiming)
                          setIsStatusOpen(false)
                        }
                      }}>
                      <Select.Trigger className="flex w-full items-center justify-between border-none bg-transparent px-3 py-2 shadow-none ring-0 outline-none focus:ring-0 focus:outline-none">
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
                            <ListBox.Item key={s.id} id={s.id}>
                              {s.emoji} {s.label}
                            </ListBox.Item>
                          ))}
                          <ListBox.Item key="clear" id="clear">
                            <div className="text-danger flex items-center gap-2">
                              <Icon
                                icon="mdi:close-circle"
                                className="text-danger text-base"
                              />
                              Clear status
                            </div>
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Dropdown.Item>
                  {selectedStatus && (
                    <Dropdown.Item className="my-1 p-0">
                      <Select
                        className="w-full"
                        selectedKeys={selectedTiming ? [selectedTiming.id] : []}
                        open={isTimingOpen}
                        onOpenChange={setIsTimingOpen}
                        onSelectionChange={key => {
                          const timing = timingOptions.find(t => t.id === key)

                          if (timing) {
                            setSelectedTiming(timing)
                            setIsTimingOpen(false)
                            setIsDropdownOpen(false)
                          }
                        }}>
                        <Select.Trigger className="flex w-full items-center justify-between border-none bg-transparent px-3 py-2 shadow-none ring-0 outline-none focus:ring-0 focus:outline-none">
                          <Select.Value>
                            {selectedTiming
                              ? selectedTiming.label
                              : 'Select duration'}
                          </Select.Value>
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover placement="right">
                          <ListBox>
                            {timingOptions.map(t => (
                              <ListBox.Item key={t.id} id={t.id}>
                                {t.label}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </Dropdown.Item>
                  )}
                  <Separator />
                  <Dropdown.Item onPress={() => onUserClick?.(user)}>
                    <Icon icon="solar:settings-linear" width={20} />
                    Preferences
                  </Dropdown.Item>
                  <Separator />
                  <Dropdown.Item onPress={clearUser} className="text-danger">
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
                icon="solar:menu-dots-linear"
                width={24}
                className="text-muted"
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
              <Tooltip delay={0}>
                <Tooltip.Trigger asChild>
                  <div>
                    <Dropdown.Trigger>
                      <div className="relative">
                        <StatusIndicator />
                        <Button
                          isIconOnly
                          variant="ghost"
                          className="h-12 w-12 rounded-xl">
                          <Badge
                            content={
                              <span className="text-[10px] leading-none">
                                {currentStatus?.icon}
                              </span>
                            }
                            placement="bottom-right"
                            classNames={{
                              badge: `flex items-center justify-center w-4 h-4 border-2 border-background text-white`
                            }}>
                            <Avatar size="sm" className="rounded-xl">
                              <Avatar.Image src={user?.avatar} />
                              <Avatar.Fallback>
                                {user?.name?.[0]}
                              </Avatar.Fallback>
                            </Avatar>
                          </Badge>
                        </Button>
                      </div>
                    </Dropdown.Trigger>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content placement="right">
                  {tooltipText}
                </Tooltip.Content>
              </Tooltip>
              <Dropdown.Popover>
                <div
                  className="hover:bg-default-100 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors"
                  onClick={onCurrentUserClick}>
                  <Avatar size="sm">
                    <Avatar.Image src={user?.avatar} />
                    <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-muted flex items-center gap-1 text-xs">
                      <span
                        className={`h-2 w-2 rounded-full ${currentStatus?.color}`}
                      />
                      {currentStatus?.label}
                    </div>
                  </div>
                </div>
                <Dropdown.Menu>
                  <Separator />
                  <Dropdown.Item className="mt-2 p-0">
                    <Select
                      className="w-full"
                      value={userStatus}
                      onChange={v => setUserStatus(v as UserStatus)}>
                      <Select.Trigger className="h-8 border-none bg-transparent shadow-none ring-0 outline-none focus:ring-0 focus:outline-none">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {STATUS_OPTIONS.map(s => (
                            <ListBox.Item key={s.id} id={s.id}>
                              {s.icon} {s.label}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Dropdown.Item>
                  <Dropdown.Item className="mt-2 p-0">
                    <Select
                      className="w-full"
                      selectedKeys={selectedStatus ? [selectedStatus.id] : []}
                      open={isStatusOpen}
                      onOpenChange={setIsStatusOpen}
                      onSelectionChange={key => {
                        if (key === 'clear') {
                          setSelectedStatus(null)
                          setSelectedTiming(null)
                          setIsStatusOpen(false)
                          return
                        }
                        const status = suggestedStatuses.find(s => s.id === key)
                        if (status) {
                          setSelectedStatus(status)

                          const defaultTiming = timingOptions.find(
                            t => t.id === '15min'
                          )
                          setSelectedTiming(defaultTiming)

                          setIsStatusOpen(false)
                        }
                      }}>
                      <Select.Trigger className="flex w-full items-center justify-between border-none bg-transparent px-3 py-2 shadow-none ring-0 outline-none focus:ring-0 focus:outline-none">
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
                            <ListBox.Item key={s.id} id={s.id}>
                              {s.emoji} {s.label}
                            </ListBox.Item>
                          ))}
                          <ListBox.Item key="clear" id="clear">
                            <div className="text-danger flex items-center gap-2">
                              <Icon
                                icon="mdi:close-circle"
                                className="text-danger text-base"
                              />
                              Clear status
                            </div>
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Dropdown.Item>
                  {selectedStatus && (
                    <Dropdown.Item className="my-2 p-0">
                      <Select
                        className="w-full"
                        selectedKeys={selectedTiming ? [selectedTiming.id] : []}
                        open={isTimingOpen}
                        onOpenChange={setIsTimingOpen}
                        onSelectionChange={key => {
                          const timing = timingOptions.find(t => t.id === key)
                          if (timing) {
                            setSelectedTiming(timing)
                            setIsTimingOpen(false)
                            setIsDropdownOpen(false)
                          }
                        }}>
                        <Select.Trigger className="outline-no flex w-full items-center justify-between border-none bg-transparent px-3 py-2 shadow-none ring-0 focus:ring-0 focus:outline-none">
                          <Select.Value>
                            {selectedTiming
                              ? selectedTiming.label
                              : 'Select duration'}
                          </Select.Value>
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover placement="right">
                          <ListBox>
                            {timingOptions.map(t => (
                              <ListBox.Item key={t.id} id={t.id}>
                                {t.label}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onPress={() => onUserClick?.(user)}>
                    <Icon icon="solar:settings-linear" width={20} />
                    Preferences
                  </Dropdown.Item>
                  <Separator />
                  <Dropdown.Item onPress={clearUser} className="text-danger">
                    <Icon icon="solar:logout-2-linear" width={20} />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
      </Surface>

      <UserInfoModal
        open={isModalOpen}
        onClose={handleModalClose}
        user={user}
        defaultActiveTab="profiles"
      />
    </>
  )
}
