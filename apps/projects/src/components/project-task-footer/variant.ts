import { tv } from '@vezham/react/v2'

export const bottomContentTva = tv({
  slots: {
    paginationContainer: 'flex w-full items-center justify-between gap-2 py-4',
    paginationButtonContainer: 'flex items-center gap-2',
    paginationButton: 'flex min-w-[5px] items-center gap-1',
    paginationIcon: 'hidden sm:flex',
    paginationMobileIcon: 'inline sm:hidden',
    paginationText: 'flex hidden items-center gap-1 sm:inline'
  }
})

export type BottomContentTva = typeof bottomContentTva
export type BottomContentTvaSlots = keyof ReturnType<typeof bottomContentTva>
