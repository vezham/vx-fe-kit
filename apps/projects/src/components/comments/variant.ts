import { VariantProps, tv } from '@vezham/react/v2'

const tva = tv({
  slots: {
    // Comment Section Container
    section: 'space-y-4',

    // Comment Input Component
    inputBox: 'border-default-200 bg-background rounded-lg border',
    inputHeader: 'flex items-center gap-3 border-b px-4 py-3',
    avatar:
      'bg-primary flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white',
    editor:
      'min-h-[100px] w-full resize-none bg-transparent text-sm outline-none',
    toolbar: 'flex items-center gap-1 border-t px-2 py-2',
    toolBtn: 'text-default-500 hover:bg-default-100 rounded-md p-2',
    footer: 'flex items-center justify-between border-t px-4 py-3',
    attachmentPreview: 'px-4 pb-2',
    attachment:
      'bg-default-100 mt-2 inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs',

    // Comment List Component
    commentItem: 'border-default-200 bg-default-50 rounded-lg border px-2 py-3',
    commentHeader:
      'text-default-600 flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between',
    commentContent: 'text-default-800 mt-2 text-sm',
    editContainer: 'mt-3',
    editActions: 'mt-3 flex gap-2',
    attachmentsContainer: 'mt-2 flex flex-wrap gap-3',
    attachmentImage: 'h-20 w-20 rounded border object-cover',
    attachmentLink:
      'text-primary flex items-center gap-2 text-sm hover:underline',
    actionButtons: 'mt-3 ml-1 flex gap-3 text-xs',
    editButton: 'text-primary',
    deleteButton: 'text-danger'
  },
  variants: {
    size: {
      sm: {
        section: 'space-y-3',
        inputBox: 'rounded-md',
        inputHeader: 'px-3 py-2',
        avatar: 'h-7 w-7 text-xs',
        editor: 'min-h-[80px] px-4 text-xs',
        footer: 'px-3 py-2',
        commentItem: 'px-2 py-2',
        attachment: 'text-2xs px-2 py-1',
        attachmentImage: 'h-16 w-16',
        actionButtons: 'text-2xs'
      },
      md: {
        section: 'space-y-4',
        inputBox: 'rounded-lg',
        inputHeader: 'px-4 py-3',
        avatar: 'h-9 w-9 text-sm',
        editor: 'min-h-[100px] px-4 text-sm',
        footer: 'px-4 py-3',
        commentItem: 'px-2 py-3',
        attachment: 'px-3 py-1 text-xs',
        attachmentImage: 'h-20 w-20',
        actionButtons: 'text-xs'
      },
      lg: {
        section: 'space-y-6',
        inputBox: 'rounded-xl',
        inputHeader: 'px-6 py-4',
        avatar: 'h-11 w-11 text-base',
        editor: 'min-h-[120px] px-4 text-base',
        footer: 'px-6 py-4',
        commentItem: 'px-4 py-4',
        attachment: 'px-4 py-2 text-sm',
        attachmentImage: 'h-24 w-24',
        actionButtons: 'text-sm'
      }
    },
    variant: {
      default: {
        inputBox: 'border-default-200',
        commentItem: 'border-default-200 bg-default-50'
      },
      minimal: {
        inputBox: 'border-transparent shadow-sm',
        commentItem: 'border-transparent bg-transparent'
      },
      elevated: {
        inputBox: 'border-transparent shadow-md',
        commentItem: 'border-transparent bg-white shadow-sm dark:bg-gray-800'
      }
    }
  },
  defaultVariants: {
    size: 'lg',
    variant: 'default'
  }
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
