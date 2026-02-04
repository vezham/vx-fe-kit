import { tv } from '@vezham/react/v2'

export const copyTextTva = tv({
  slots: {
    base: 'flex items-center gap-2',
    text: '',
    button: 'text-foreground h-7 w-7 min-w-7',
    icon: 'h-[14px] w-[14px]',
    successIcon: 'text-success'
  }
})

export type CopyTextTva = typeof copyTextTva
export type CopyTextTvaSlots = keyof ReturnType<typeof copyTextTva>
