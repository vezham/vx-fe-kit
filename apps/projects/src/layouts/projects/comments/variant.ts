import { tv } from 'tailwind-variants'

export const commentStyles = tv({
  slots: {
    box: 'border-default-200 bg-background rounded-lg border',
    header: 'flex items-center gap-3 border-b px-4 py-3',
    avatar:
      'bg-primary flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white',
    editor:
      'min-h-[100px] w-full resize-none bg-transparent text-sm outline-none',
    toolbar: 'flex items-center gap-1 border-t px-2 py-2',
    toolBtn: 'text-default-500 hover:bg-default-100 rounded-md p-2',
    footer: 'flex items-center justify-between border-t px-4 py-3',
    commentItem: 'border-default-200 bg-default-50 rounded-lg border px-4 py-3',
    commentHeader:
      'text-default-600 flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between',
    attachment:
      'bg-default-100 mt-2 inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs'
  }
})
