import { Tray } from '@gravity-ui/icons'

import { EmailFolder } from '../data/types'

export interface EmptyStateProps {
  folder: EmailFolder
}

export function EmptyState({ folder }: EmptyStateProps) {
  return (
    <div className="flex min-h-0 min-h-screen flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="bg-surface shadow-surface flex size-12 items-center justify-center rounded-2xl">
        <Tray className="text-muted size-5" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-foreground text-base font-semibold">
          Nothing open
        </h2>
        <p className="text-muted max-w-[320px] text-sm">
          Pick a conversation from {folder.label.toLowerCase()} to read it here.
          This is a mock email client — nothing you do sends or deletes real
          messages.
        </p>
      </div>
    </div>
  )
}
