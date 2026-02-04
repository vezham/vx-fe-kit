import { tv } from '@vezham/react/v2'

export const detailModalTva = tv({
  slots: {
    modalContent: '',
    modalHeader: '',
    modalBody: 'space-y-4',
    modalFooter: '',
    titleContainer: 'flex flex-col gap-2',
    title: 'text-lg font-semibold',
    description: 'text-default-500 text-sm',
    ownerContainer: 'flex items-center gap-2',
    statusChip: '',
    tagsContainer: 'flex flex-wrap gap-2',
    dateContainer: 'flex gap-4',
    dateText: 'text-sm',
    priorityContainer: 'flex gap-4',
    priorityLabel: '',
    priorityValue: '',
    billingLabel: '',
    billingValue: '',
    icon: '',
    attachmentsContainer: '',
    attachmentsSection: '',
    attachmentsGrid:
      'mt-2 items-center space-y-3 md:flex md:space-y-0 md:space-x-3',
    attachmentImageWrapper: 'w-fit overflow-hidden rounded-md border',
    attachmentImage: 'object-cover',
    attachmentName: 'text-default-500 px-2 py-1 text-xs',
    pdfLink: 'text-danger flex items-center gap-2 text-sm hover:underline',
    docLink: 'text-primary flex items-center gap-2 text-sm hover:underline',
    sheetLink: 'text-success flex items-center gap-2 text-sm hover:underline',
    defaultLink:
      'text-default-500 flex items-center gap-2 text-sm hover:underline',
    tabsContainer:
      'flex w-full flex-col items-start justify-between sm:flex-row sm:items-center',
    tabsWrapper: 'w-full py-4 sm:w-auto md:py-0',
    tabsBase: 'flex w-full sm:w-auto',
    tabList: 'w-full sm:w-auto',
    buttonContainer: 'flex w-full flex-col sm:w-auto sm:flex-row',
    subtaskButton: 'w-full flex-shrink-0 sm:w-auto',
    issuesButton: 'w-full flex-shrink-0 sm:w-auto'
  }
})

export type DetailModalTva = typeof detailModalTva
export type DetailModalTvaSlots = keyof ReturnType<typeof detailModalTva>
