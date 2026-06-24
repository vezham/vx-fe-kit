'use client'

import { AppLayout } from '@heroui-pro/react'
import { ScrollShadow, SearchField } from '@heroui/react'

import { EmailFolder } from '../data/types'
import { useMail } from '../store/useMail'
import { getMailsForFolder } from '../utils/email'
import { EmailListItem } from './email-list-item'

export interface EmailListProps {
  folder: EmailFolder
  basePath: string
  disableNavigation?: boolean
  currentThreadId?: string
}

export function EmailList({
  basePath,
  currentThreadId,
  disableNavigation = false,
  folder
}: EmailListProps) {
  const { data: mails = [] } = useMail.list({})
  const threads = getMailsForFolder(mails, folder.id)

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-clip px-2 pt-4 pb-2">
      <div className="flex items-center gap-2">
        <AppLayout.MenuToggle className="ml-0" />
        <SearchField
          aria-label={`Search ${folder.label.toLowerCase()}`}
          className="flex-1"
          name="folder-search">
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>

      <ScrollShadow
        hideScrollBar
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        {threads.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 py-10 text-center">
            <p className="text-foreground text-sm font-medium">
              No conversations here
            </p>
            <p className="text-muted max-w-[220px] text-xs">
              When messages land in {folder.label.toLowerCase()}, they&apos;ll
              show up here.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {threads.map(thread => (
              <EmailListItem
                key={thread.id}
                disableNavigation={disableNavigation}
                href={`${basePath}/${folder.id}/${thread.id}`}
                isActive={thread.id === currentThreadId}
                thread={thread}
              />
            ))}
          </ul>
        )}
      </ScrollShadow>
    </div>
  )
}
