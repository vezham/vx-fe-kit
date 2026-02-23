import { Icon } from '@iconify/react'
import { useRouterState } from '@tanstack/react-router'

import { Button } from '@vezham/react/v2'

import { headerData, sidebarData } from '../../store/data'

export function Header() {
  const { location } = useRouterState()
  const pathname = location.pathname

  const activeItem = sidebarData
    .flatMap(section => section.items)
    .find(item => item.href === pathname)

  const title = activeItem?.label || 'Dashboard'
  const icon = activeItem?.icon || 'lucide:layout-dashboard'

  return (
    <div className="flex items-center justify-between p-3 px-4">
      <div className="flex items-center">
        <h1 className="flex items-center gap-4 text-lg font-medium">
          <Icon icon={icon} className="text-muted" />
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-1">
        {headerData.map((action, index) => (
          <Button
            key={index}
            isIconOnly
            variant="light"
            size="sm"
            className="text-muted"
            aria-label={action.ariaLabel}
            onClick={action.onClick}>
            <Icon icon={action.icon} width={18} />
          </Button>
        ))}
      </div>
    </div>
  )
}
