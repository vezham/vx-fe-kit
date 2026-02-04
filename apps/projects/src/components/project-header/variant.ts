import { tv } from '@vezham/react/v2'

export const projectsMainTva = tv({
  slots: {
    wrapper: 'flex h-screen',
    sidebar:
      'border-default-200 w-full overflow-y-auto px-2 lg:w-72 lg:border-r',
    sidebarHidden: 'hidden lg:block',
    sidebarVisible: 'block',
    contentArea: 'flex flex-1 flex-col overflow-hidden',
    detailsArea: 'h-full overflow-y-auto sm:p-2',
    detailsVisible: 'block lg:block',
    detailsHidden: 'hidden lg:block',
    headerTemplate: 'flex justify-between',
    mobileBackButton: 'block lg:hidden',
    header: 'w-full px-3',
    headerTitle: 'flex items-center justify-between',
    backButton: 'flex items-center gap-3',
    title: 'text-base font-bold sm:text-2xl',
    subtitle: 'text-default-500 mt-2 text-justify text-sm sm:text-base',
    tabsContainer:
      'mt-4 flex w-full flex-col items-start justify-between sm:flex-row sm:items-center',
    tabsWrapper: 'w-full sm:w-auto md:px-2',
    tabs: 'flex w-full sm:w-auto',
    tabList: 'w-full sm:w-auto',
    actionsContainer: 'flex w-full flex-col gap-2 sm:w-auto sm:flex-row',
    actionButton: 'w-full flex-shrink-0 sm:w-auto',
    outletContainer: 'overflow-hidden',
    loadingContainer: 'flex h-screen items-center justify-center',
    emptyState:
      'flex h-screen flex-col items-center justify-center text-center',
    emptyText: 'text-default-500 mb-4',
    errorContainer: 'mt-6 flex flex-col items-center'
  }
})

export type ProjectsMainTva = typeof projectsMainTva
export type ProjectsMainTvaSlots = keyof ReturnType<typeof projectsMainTva>
