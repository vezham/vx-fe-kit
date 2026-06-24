'use client'

import { AppLayout } from '@heroui-pro/react'
import { useRouter } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'

import { ComposeSheet } from '@/src/components/compose-sheet'
import { EmailSidebar } from '@/src/components/email-sidebar'
import { DEFAULT_FOLDER_ID } from '@/src/data/data'
import { useCurrentUser } from '@/src/store/useCurrentUser'

export interface EmailShellProps {
  children: ReactNode
  basePath?: string
  disableNavigation?: boolean
}

export default function EmailShell({
  basePath = '',
  children,
  disableNavigation = false
}: EmailShellProps) {
  const router = useRouter()
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const [isComposeOpen, setIsComposeOpen] = useState(false)

  const { data: currentUser } = useCurrentUser.get()

  const navigate = useCallback(
    (href: string) => {
      if (disableNavigation) return

      router.navigate({
        to: basePath + href
      })
    },
    [router, basePath, disableNavigation]
  )

  // Keyboard shortcut: `C` opens compose. Skipped in preview mode and when
  // focus is inside an input/textarea so normal typing still works.
  useEffect(() => {
    if (disableNavigation) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
        return
      if (event.key !== 'c' && event.key !== 'C') return

      const target = event.target as HTMLElement | null
      const tagName = target?.tagName.toLowerCase()

      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        target?.isContentEditable
      )
        return

      event.preventDefault()
      setIsComposeOpen(true)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [disableNavigation])

  if (!currentUser) return null

  return (
    <AppLayout
      className="bg-background"
      navigate={navigate}
      sidebar={
        <EmailSidebar
          currentUser={currentUser}
          basePath={basePath}
          disableNavigation={disableNavigation}
          pathname={pathname ?? `/${DEFAULT_FOLDER_ID}`}
          onCompose={
            disableNavigation ? undefined : () => setIsComposeOpen(true)
          }
        />
      }
      sidebarCollapsible="offcanvas">
      {children}
      <ComposeSheet isOpen={isComposeOpen} onOpenChange={setIsComposeOpen} />
    </AppLayout>
  )
}
