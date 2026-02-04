import { tv } from '@vezham/react/v2'

export const detailModalTva = tv({
  slots: {
    modalContent: '',
    modalHeader: '',
    modalBody: 'space-y-4',
    modalFooter: '',
    title: 'text-lg font-semibold',
    description: 'text-default-500 text-sm',
    ownerContainer: 'flex items-center justify-between',
    attachmentsSection: '',
    attachmentsGrid: 'mt-2 grid gap-2',
    attachmentImageWrapper: 'w-fit overflow-hidden rounded-md border',
    attachmentImage: 'object-cover',
    attachmentName: 'text-default-500 px-2 py-1 text-xs',
    pdfLink: 'text-danger flex items-center gap-2 text-sm hover:underline',
    docLink: 'text-primary flex items-center gap-2 text-sm hover:underline',
    sheetLink: 'text-success flex items-center gap-2 text-sm hover:underline',
    defaultLink:
      'text-default-500 flex items-center gap-2 text-sm hover:underline',
    icon: ''
  }
})

export type DetailModalTva = typeof detailModalTva
export type DetailModalTvaSlots = keyof ReturnType<typeof detailModalTva>
