'use client'

import {
  Archive,
  ArrowLeft,
  ArrowRight,
  ArrowShapeTurnUpLeft,
  CaretDown,
  ChevronLeft,
  EllipsisVertical,
  SquareExclamation,
  Star,
  TrashBin,
  Xmark
} from '@gravity-ui/icons'
import {
  Avatar,
  Button,
  CloseButton,
  Link,
  ScrollShadow,
  Separator
} from '@heroui/react'
import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

import { EmailMessage } from '../data/types'
import { useMail } from '../store/useMail'

export interface EmailDetailProps {
  folderId: string
  mailId: string
  /**
   * URL to navigate back to the list column. When provided, a mobile back
   * button appears in the toolbar and the close button collapses to desktop
   * only. Storybook previews omit this prop to keep the toolbar inert.
   */
  backHref?: string
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
}

export function EmailDetail({ backHref, folderId, mailId }: EmailDetailProps) {
  const router = useRouter()
  const { data: mails = [] } = useMail.list({})
  const { data: mail } = useMail.getById({ id: mailId })
  const deleteMail = useMail.delete()
  const resolvedMail = mail ?? mails.find(mailItem => mailItem.id === mailId)

  const folderMails = mails.filter(mailItem =>
    folderId === 'starred' ? mailItem.isStarred : mailItem.folderId === folderId
  )
  const currentIndex = folderMails.findIndex(mailItem => mailItem.id === mailId)
  const previousMail =
    currentIndex > 0 ? folderMails[currentIndex - 1] : undefined
  const nextMail =
    currentIndex >= 0 && currentIndex < folderMails.length - 1
      ? folderMails[currentIndex + 1]
      : undefined

  useEffect(() => {
    if (resolvedMail || !backHref) return

    router.navigate({ to: backHref })
  }, [backHref, resolvedMail, router])

  useEffect(() => {
    if (!resolvedMail || !backHref) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
        return

      const target = event.target as HTMLElement | null
      const tagName = target?.tagName.toLowerCase()

      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        target?.isContentEditable
      ) {
        return
      }

      if (event.key === 'ArrowLeft' && previousMail) {
        event.preventDefault()
        router.navigate({ to: `${backHref}/${previousMail.id}` })
      }

      if (event.key === 'ArrowRight' && nextMail) {
        event.preventDefault()
        router.navigate({ to: `${backHref}/${nextMail.id}` })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [backHref, nextMail, previousMail, resolvedMail, router])

  const goToMail = (targetMailId: string) => {
    if (!backHref) return

    router.navigate({ to: `${backHref}/${targetMailId}` })
  }

  const handleDelete = () => {
    if (!resolvedMail) return

    deleteMail.mutate(
      { id: resolvedMail.id },
      {
        onSuccess: () => {
          if (nextMail) {
            goToMail(nextMail.id)
            return
          }

          if (previousMail) {
            goToMail(previousMail.id)
            return
          }

          if (backHref) {
            router.navigate({ to: backHref })
          }
        }
      }
    )
  }

  if (!resolvedMail) return null

  return (
    <div className="flex min-h-0 min-h-screen min-w-0 flex-col overflow-clip lg:py-4 lg:pr-4 lg:pl-0.5">
      <div className="lg:bg-surface lg:shadow-surface flex max-h-full flex-1 flex-col gap-6 overflow-clip p-4 lg:rounded-2xl">
        <Toolbar
          backHref={backHref}
          messageCount={resolvedMail.messages.length}
          onDelete={handleDelete}
          onNext={nextMail ? () => goToMail(nextMail.id) : undefined}
          onPrevious={
            previousMail ? () => goToMail(previousMail.id) : undefined
          }
        />

        <ScrollShadow
          hideScrollBar
          className="min-h-0 flex-1 overflow-y-auto lg:px-6">
          <div className="flex flex-col gap-8 pb-5">
            <h1 className="text-foreground text-base leading-normal font-semibold">
              {resolvedMail.subject}
            </h1>

            {resolvedMail.messages.map((message, index) => (
              <div key={message.id} className="flex flex-col gap-6">
                {index > 0 ? <Separator /> : null}
                <ThreadMessage message={message} />
              </div>
            ))}
          </div>
        </ScrollShadow>
      </div>
    </div>
  )
}

interface ToolbarProps {
  backHref?: string
  messageCount: number
  onDelete: () => void
  onNext?: () => void
  onPrevious?: () => void
}

function Toolbar({
  backHref,
  messageCount,
  onDelete,
  onNext,
  onPrevious
}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {backHref ? (
          <>
            <BackButton href={backHref} />
            <CloseLink href={backHref} />
          </>
        ) : (
          <CloseButton />
        )}
        <div className="flex items-center">
          <Button
            isIconOnly
            aria-label="Delete"
            className="text-muted hover:text-foreground"
            size="sm"
            variant="ghost"
            onPress={onDelete}>
            <TrashBin className="size-4" />
          </Button>
          <Button
            isIconOnly
            aria-label="Mark as spam"
            className="text-muted hover:text-foreground"
            size="sm"
            variant="ghost">
            <SquareExclamation className="size-4" />
          </Button>
          <Button
            isIconOnly
            aria-label="Archive"
            className="text-muted hover:text-foreground"
            size="sm"
            variant="ghost">
            <Archive className="size-4" />
          </Button>
          <Button
            isIconOnly
            aria-label="More actions"
            className="text-muted hover:text-foreground"
            size="sm"
            variant="ghost">
            <EllipsisVertical className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 px-2">
        <span className="text-muted text-xs tabular-nums">
          1 of {messageCount}
        </span>
        <div className="flex items-center">
          <Button
            isIconOnly
            aria-label="Previous"
            className="text-muted hover:text-foreground"
            size="sm"
            variant="ghost"
            onPress={onPrevious}>
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            isIconOnly
            aria-label="Next"
            className="text-muted hover:text-foreground"
            size="sm"
            variant="ghost"
            onPress={onNext}>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ThreadMessage({ message }: { message: EmailMessage }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <Avatar className="size-9 shrink-0">
            <Avatar.Image alt={message.from.name} src={message.from.avatar} />
            <Avatar.Fallback>{getInitials(message.from.name)}</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-foreground text-sm leading-tight font-medium">
              {message.from.name}
            </span>
            <span className="text-muted text-xs leading-tight font-medium">
              {message.from.email}
            </span>
            <div className="text-muted flex items-center gap-0.5 text-xs leading-tight font-medium">
              <p>to me</p>
              <CaretDown className="text-muted size-3" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 px-2">
          <span className="text-muted text-xs whitespace-nowrap">
            {message.receivedAt}
          </span>
          <div className="flex items-center">
            <Button
              isIconOnly
              aria-label="Reply"
              className="text-muted hover:text-foreground"
              variant="ghost">
              <ArrowShapeTurnUpLeft className="size-4" />
            </Button>
            <Button
              isIconOnly
              aria-label="Star"
              className="text-muted hover:text-foreground"
              variant="ghost">
              <Star className="size-4" />
            </Button>
            <Button
              isIconOnly
              aria-label="More"
              className="text-muted hover:text-foreground"
              variant="ghost">
              <EllipsisVertical className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
        {message.body.join('\n\n')}
      </div>
    </div>
  )
}

function BackButton({ href }: { href: string }) {
  return (
    <Link
      aria-label="Back to list"
      className="border-border text-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-full border transition-colors lg:hidden"
      href={href}>
      <ChevronLeft className="size-4" />
    </Link>
  )
}

function CloseLink({ href }: { href: string }) {
  return (
    <Link
      aria-label="Close"
      className="bg-default text-muted hover:bg-default-hover hidden size-6 shrink-0 items-center justify-center rounded-xl transition-colors lg:inline-flex"
      href={href}>
      <Xmark className="size-4" />
    </Link>
  )
}
