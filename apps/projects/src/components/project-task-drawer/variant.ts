import { tv } from '@vezham/react/v2'

export const drawerTva = tv({
  slots: {
    drawerHeader:
      'border-default-200/50 bg-content1/50 flex items-center justify-between border-b px-2 py-2 backdrop-blur-lg',
    closeButton: '',
    headerTitle: 'flex items-center gap-2',
    projectChip: '',
    drawerBody: 'space-y-3',
    loadingText: 'text-default-500 flex items-center gap-2 text-sm',
    gridContainer: 'grid grid-cols-1 gap-3 md:grid-cols-2',
    tagsContainer: 'flex flex-wrap gap-1',
    attachmentsContainer: 'flex flex-wrap gap-2',
    taskChip: '',
    drawerFooter: '',
    cancelButton: '',
    submitButton: '',
    input: '',
    select: '',
    chip: ''
  }
})

export type DrawerTva = typeof drawerTva
export type DrawerTvaSlots = keyof ReturnType<typeof drawerTva>
