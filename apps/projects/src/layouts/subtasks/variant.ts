import { tv } from '@vezham/react/v2'

export const mainTva = tv({
  slots: {
    wrapper: 'flex items-start justify-between p-0',
    card: 'mt-4',
    cardBody: '',
    tableWrapper: 'h-full w-full sm:p-2',
    loadingContainer: 'flex h-75 items-center justify-center',
    outletContainer: 'mt-4'
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
    truncateText: 'max-w-[200px] truncate'
  }
})

export type TableCellTva = typeof tableCellTva
export type TableCellTvaSlots = keyof ReturnType<typeof tableCellTva>

export type MainTva = typeof mainTva
export type MainTvaSlots = keyof ReturnType<typeof mainTva>
