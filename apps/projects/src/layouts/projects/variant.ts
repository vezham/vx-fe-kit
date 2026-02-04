import { VariantProps, tv } from '@vezham/react/v2'

export const projectsMainTva = tv({
  slots: {
    wrapper: 'flex h-screen',
    sidebar:
      'border-default-200 w-full overflow-y-auto px-2 lg:w-72 lg:border-r',
    sidebarHidden: 'hidden lg:block',
    sidebarVisible: 'block',
    contentArea: 'flex flex-1 flex-col overflow-hidden',
    detailsArea: 'h-full overflow-y-auto sm:p-2',
    detailsVisible: 'block',
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

export const projectDetailsTva = tv({
  slots: {
    container: '',
    header:
      'border-default-200 flex items-center justify-between border-t pt-2',
    backButton: 'flex items-center gap-3',
    mobileBackButton: 'block lg:hidden',
    title: 'text-xl font-bold lg:text-2xl',
    actions: 'flex gap-2',
    card: '',
    cardBody: '',
    grid: 'grid grid-cols-1 gap-6 sm:grid-cols-2',
    sectionTitle: 'text-lg font-semibold',
    infoGroup: 'space-y-3',
    infoLabel: 'text-default-500 text-sm',
    infoValue: 'py-1 font-medium',
    dateContainer: 'flex items-center gap-2 py-1',
    dateIcon: 'text-default-400',
    divider: 'my-6',
    ownerSection: 'space-y-4',
    tagsSection: 'my-6 space-y-4',
    tagsContainer: 'flex flex-wrap gap-2',
    description: 'mb-4 text-justify',
    attachmentsSection: '',
    attachmentsList: 'mt-2 space-y-3',
    attachmentItem: 'w-fit overflow-hidden rounded-md border',
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

export type ProjectDetailsTva = typeof projectDetailsTva
export type ProjectDetailsTvaSlots = keyof ReturnType<typeof projectDetailsTva>
export type ProjectDetailsTvaProps = VariantProps<typeof projectDetailsTva>

export type ProjectsMainTva = typeof projectsMainTva
export type ProjectsMainTvaSlots = keyof ReturnType<typeof projectsMainTva>
