'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@heroui/react'
import { SearchIcon } from '@heroui/shared-icons'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useEffect, useState } from 'react'
import { usePurchaseRefetch } from '../../../store/books/usePurchase'
import { useSalesRefetch } from '../../../store/books/useSales'

const HeadContent = () => {
  const { all: refetchSales } = useSalesRefetch()

  const { all: refetchPurchase } = usePurchaseRefetch()

  const refresh = () => {
    refetchSales()
    refetchPurchase()
  }

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
      key: 'refresh',
      icon: (
        <Icon
          icon="solar:refresh-line-duotone"
          className="text-default-600"
          width={20}
        />
      ),
      label: 'Refresh',
      alwaysIconOnly: true,
      onClick: refresh
    },
    {
      key: 'invite',
      icon: <Icon icon="solar:user-plus-line-duotone" width={20} />,
      label: 'Share / Invite'
    },
    {
      key: 'download',
      icon: <Icon icon="solar:download-line-duotone" width={20} />,
      label: 'Sales Report'
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
          onPress={action.onClick}
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
              <DropdownItem
                key={action.key}
                startContent={action.icon}
                onPress={action.onClick}>
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
