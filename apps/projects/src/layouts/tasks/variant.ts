import { tv } from '@vezham/react/v2'

export const mainTva = tv({
  slots: {
    wrapper: 'flex items-start justify-between pt-4',
    card: 'sm:border-default-200 mt-4 bg-transparent sm:border',
    cardBody: '',
    tableWrapper: 'h-full w-full sm:p-2',
    loadingContainer: 'flex h-75 items-center justify-center',
    outletContainer: 'mt-4',
    errorContainer: 'mt-6 flex flex-col items-center',
    errorButton: 'mx-auto mt-2',
    emptyState:
      'flex h-screen flex-col items-center justify-center gap-2 overflow-hidden text-center'
  }
})

export const tableCellTva = tv({
  slots: {
    lastLoginContainer: 'flex items-center gap-1',
    lastLoginIcon: 'text-default-300 h-[16px] w-[16px]',
    lastLoginText: 'text-small text-default-foreground text-nowrap capitalize',
    actionsContainer: 'flex items-center justify-end',
    actionIcon: 'text-default-400 cursor-pointer',
    actionButton: 'min-h-[5px] min-w-[5px]',
    tagsContainer: 'flex gap-1',
    tagChip: 'bg-default-100 text-default-800 rounded-xl px-[6px] capitalize',
    moreTagChip: 'text-default-500',
    truncateText: 'max-w-[200px] truncate',
    projectContainer: 'flex flex-col',
    projectId: 'font-medium'
  }
})

export type TableCellTva = typeof tableCellTva
export type TableCellTvaSlots = keyof ReturnType<typeof tableCellTva>

export type MainTva = typeof mainTva
export type MainTvaSlots = keyof ReturnType<typeof mainTva>
