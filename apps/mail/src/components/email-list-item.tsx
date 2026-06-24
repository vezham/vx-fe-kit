'use client'

import { Star, StarFill } from '@gravity-ui/icons'
import { Avatar, Link } from '@heroui/react'

import { EmailThread } from '../data/types'

export interface EmailListItemProps {
  thread: EmailThread
  href: string
  isActive: boolean
  disableNavigation?: boolean
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
}

export function EmailListItem({
  disableNavigation = false,
  href,
  isActive,
  thread
}: EmailListItemProps) {
  const firstSender = thread.participants[0]
  const senderName = firstSender?.name ?? 'Unknown'
  const senderAvatar = firstSender?.avatar

  const className = `relative flex items-start gap-3 rounded-2xl p-3 transition-colors ${
    isActive ? 'bg-surface shadow-surface' : 'hover:bg-default/60'
  }`

  const content = (
    <div className="flex w-full min-w-0 gap-3">
      <Avatar className="size-9 shrink-0">
        <Avatar.Image alt={senderName} src={senderAvatar} />
        <Avatar.Fallback>{getInitials(senderName)}</Avatar.Fallback>
      </Avatar>

      <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className={`truncate text-sm leading-tight ${
                !thread.isRead
                  ? 'text-foreground font-medium'
                  : 'text-foreground'
              }`}>
              {senderName}
            </span>
          </div>

          <p
            className={`truncate text-xs leading-tight ${
              !thread.isRead ? 'text-foreground font-medium' : 'text-muted'
            }`}>
            {thread.subject}
          </p>

          <p className="text-muted truncate text-xs leading-tight">
            {thread.preview}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-3 pt-0.5">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs leading-tight whitespace-nowrap ${
                !thread.isRead ? 'text-foreground font-medium' : 'text-muted'
              }`}>
              {thread.updatedAt}
            </span>
            {!thread.isRead ? (
              <span
                aria-hidden
                className="bg-accent size-1.5 shrink-0 rounded-full"
              />
            ) : null}
          </div>

          {thread.isStarred ? (
            <StarFill className="text-warning size-4 opacity-90" />
          ) : (
            <Star className="text-muted size-4 opacity-40" />
          )}
        </div>
      </div>
    </div>
  )

  return (
    <li>
      {disableNavigation ? (
        <a
          aria-current={isActive ? 'page' : undefined}
          className={`${className} block w-full`}
          href={href}
          onClick={event => event.preventDefault()}>
          {content}
        </a>
      ) : (
        <Link
          aria-current={isActive ? 'page' : undefined}
          className={`${className} block w-full`}
          href={href}>
          {content}
        </Link>
      )}
    </li>
  )
}
