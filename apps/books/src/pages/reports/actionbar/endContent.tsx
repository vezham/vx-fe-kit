'use client'

import { Icon } from '@iconify/react/dist/iconify.js'
import { useEffect, useState } from 'react'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@vezham/react/v2'

import { SearchIcon } from '@vx-oss/heroui-v2-shared-icons'

const HeadContent = () => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isXs = windowWidth < 480
  const isSm = windowWidth < 640

  const actions = [
    {
      key: 'search',
      icon: <SearchIcon className="text-default-600" width={20} />,
      label: 'Search',
      alwaysIconOnly: true
    },
    {
      key: 'notification',
      icon: (
        <Icon
          icon="solar:bell-linear"
          className="text-default-600"
          width={20}
        />
      ),
      label: 'Notification',
      alwaysIconOnly: true
    },
    {
      key: 'invite',
      icon: <Icon icon="solar:user-plus-line-duotone" width={20} />,
      label: 'Share'
    }
  ]

  let visibleCount = actions.length
  if (isXs) {
    if (windowWidth < 400) visibleCount = 1
    else if (windowWidth < 440) visibleCount = 2
    else if (windowWidth < 460) visibleCount = 3
    else visibleCount = 4
  }

  const visibleActions = actions.slice(0, visibleCount)
  const hiddenActions = actions.slice(visibleCount)

  return (
    <div className="flex gap-2">
      {visibleActions.map(action => (
        <Button
          key={action.key}
          size="md"
          variant={action.key === 'download' ? 'bordered' : 'light'}
          className={
            action.key === 'download'
              ? 'rounded-medium min-h-[20px] min-w-[20px] bg-transparent'
              : 'bg-default-100 rounded-medium min-h-[20px] min-w-[20px]'
          }>
          {action.icon}
          {!isSm && !action.alwaysIconOnly && (
            <span className="ml-1">{action.label}</span>
          )}
        </Button>
      ))}

      {hiddenActions.length > 0 && (
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="md"
              variant="light"
              className="bg-default-100 rounded-medium min-h-[20px] min-w-[20px]">
              <Icon icon="solar:menu-dots-bold-duotone" width={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="More actions">
            {hiddenActions.map(action => (
              <DropdownItem key={action.key} startContent={action.icon}>
                {action.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  )
}

export default HeadContent
