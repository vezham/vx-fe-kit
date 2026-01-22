import {
  Outlet,
  useLocation,
  useNavigate,
  useRouteContext
} from '@tanstack/react-router'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { ScrollShadow, Spacer, cn } from '@vezham/react/v2'

import { sectionItems } from './items'
import Sidebar from './sidebar'

export default function ReportsLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [showSidebar, setShowSidebar] = React.useState(true)
  const routeContext = useRouteContext({ from: '/reports' })

  const getActiveKey = React.useCallback((path: string) => {
    if (path === '/reports' || path === '/reports/') return 'overview' // choose default
    for (const section of sectionItems) {
      if (!section.items) continue
      for (const item of section.items) {
        if (item.href === path || `/${item.key}` === path) return item.key
        if (item.items) {
          for (const subItem of item.items) {
            if (subItem.href === path || `/${subItem.key}` === path)
              return subItem.key
          }
        }
      }
    }
    return ''
  }, [])

  const activeKey = getActiveKey(location.pathname)

  const findHrefByKey = React.useCallback((key: string): string | undefined => {
    for (const section of sectionItems) {
      for (const item of section.items ?? []) {
        if (item.key === key && item.href) return item.href
        for (const subItem of item.items ?? []) {
          if (subItem.key === key && subItem.href) return subItem.href
        }
      }
    }
    return undefined
  }, [])

  const handleSelect = (key: string) => {
    const href = findHrefByKey(key)
    if (!href) {
      console.warn('[ReportsLayout] no href found for key', key)
      return
    }
    if (isMobile) setShowSidebar(false)
    navigate({ to: href })
  }

  const handleBack = () => setShowSidebar(true)
  routeContext.handleBack = handleBack

  React.useEffect(() => {
    if (isMobile) {
      setShowSidebar(location.pathname === '/reports')
    } else {
      setShowSidebar(true)
    }
  }, [isMobile, location.pathname])

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div
        className={cn(
          'border-r-small border-divider flex h-full flex-col transition-all',
          {
            hidden: isMobile && !showSidebar,
            'w-full': isMobile && showSidebar,
            'w-60': !isMobile
          }
        )}>
        <ScrollShadow className="pr-2">
          <Sidebar
            items={sectionItems}
            defaultSelectedKey={activeKey || ''}
            selectedKey={activeKey || ''}
            onSelect={handleSelect}
          />
        </ScrollShadow>
        <Spacer y={8} />
      </div>

      <div
        className={cn('flex-1 overflow-y-auto p-4', {
          hidden: isMobile && showSidebar
        })}>
        <Outlet />
      </div>
    </div>
  )
}
