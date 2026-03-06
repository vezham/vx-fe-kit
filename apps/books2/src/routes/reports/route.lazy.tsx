'use client'

import {
  Outlet,
  createLazyFileRoute,
  useNavigate,
  useRouterState
} from '@tanstack/react-router'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { ScrollShadow, cn } from '@vezham/react/v2'
import { Surface } from '@vezham/react/v3'

import Sidebar from '../../components/sidebar'
import AppContainerHeader from '../../layouts/app-container-header'
import { sectionItems } from '../../pages/reports/sidebar/items'
import ReportsSidebar from '../../pages/reports/sidebar/sidebar'

export const Route = createLazyFileRoute('/reports')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const { location } = useRouterState()

  const isMobile = useMediaQuery('(max-width: 767px)')
  const [showSidebar, setShowSidebar] = React.useState(true)

  const getActiveKey = React.useCallback((path: string) => {
    if (path === '/reports' || path === '/reports/') return 'overview'

    for (const section of sectionItems) {
      for (const item of section.items ?? []) {
        if (item.href === path) return item.key

        for (const subItem of item.items ?? []) {
          if (subItem.href === path) return subItem.key
        }
      }
    }

    return ''
  }, [])

  const activeKey = getActiveKey(location.pathname)

  const findHrefByKey = React.useCallback((key: string) => {
    for (const section of sectionItems) {
      for (const item of section.items ?? []) {
        if (item.key === key) return item.href

        for (const subItem of item.items ?? []) {
          if (subItem.key === key) return subItem.href
        }
      }
    }

    return undefined
  }, [])

  const handleSelect = (key: string) => {
    const href = findHrefByKey(key)

    if (!href) return

    if (isMobile) setShowSidebar(false)

    navigate({ to: href })
  }

  React.useEffect(() => {
    if (isMobile) {
      setShowSidebar(location.pathname === '/reports')
    } else {
      setShowSidebar(true)
    }
  }, [isMobile, location.pathname])

  return (
    <Surface
      variant="secondary"
      className="flex h-screen w-full flex-col overflow-hidden p-4">
      {/* HEADER */}
      <div className="flex-shrink-0 p-5">
        <AppContainerHeader onAdd={() => console.log('add')} />
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        <div
          className={cn('flex h-full transition-all', {
            hidden: isMobile && !showSidebar,
            'w-full': isMobile && showSidebar,
            'w-72 flex-shrink-0': !isMobile
          })}>
          <Sidebar>
            <ScrollShadow className="h-full">
              <ReportsSidebar
                items={sectionItems}
                selectedKey={activeKey}
                onSelect={handleSelect}
              />
            </ScrollShadow>
          </Sidebar>
        </div>

        <Surface
          className={cn('min-w-0 flex-1 overflow-auto p-5', {
            hidden: isMobile && showSidebar
          })}>
          <Outlet />
        </Surface>
      </div>
    </Surface>
  )
}
