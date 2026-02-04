import { tv } from '@vezham/react/v2'

const projectsSidebarTva = tv({
  slots: {
    container: 'p-2',
    header: 'flex items-center justify-between',
    headerTitle: 'text-2xl font-semibold',
    countBadge: 'bg-default-100 rounded-lg px-3 py-1',
    addButton: '',
    searchContainer: 'flex gap-3',
    filterButton: '',
    filterPopoverContent: 'h-55 w-50 overflow-y-auto p-4 py-5',
    scrollArea: '',
    projectItem: 'my-1 cursor-pointer rounded-lg px-2 py-2',
    projectItemActive: 'bg-primary-50 border-primary-200 border',
    projectItemInactive: 'hover:bg-default-100',
    projectContent: 'flex items-center justify-between gap-2',
    projectInfo: 'flex min-w-0 items-center gap-2',
    projectIcon: 'shrink-0',
    projectName: 'truncate text-sm',
    dropdownButton: '',
    dropdownMenu: ''
  }
})

type ProjectsSidebarTva = typeof projectsSidebarTva
type ProjectsSidebarTvaSlots = keyof ReturnType<typeof projectsSidebarTva>

export {
  projectsSidebarTva,
  type ProjectsSidebarTva,
  type ProjectsSidebarTvaSlots
}
