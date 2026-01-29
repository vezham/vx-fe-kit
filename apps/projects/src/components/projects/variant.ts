import { type VariantProps, tv } from '@vezham/react/v2'

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
  },
  variants: {
    showDetails: {
      true: {
        sidebar: 'hidden lg:block',
        detailsArea: 'block'
      },
      false: {
        sidebar: 'block',
        detailsArea: 'hidden lg:block'
      }
    },
    isLoading: {
      true: {
        loadingContainer: 'opacity-50'
      },
      false: {
        loadingContainer: 'opacity-100'
      }
    }
  },
  defaultVariants: {
    showDetails: false,
    isLoading: false
  }
})

export const projectsSidebarTva = tv({
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
  },
  variants: {
    hasAttachments: {
      true: {
        attachmentsSection: 'block'
      },
      false: {
        attachmentsSection: 'hidden'
      }
    }
  },
  defaultVariants: {
    hasAttachments: false
  }
})

export const drawerTva = tv({
  slots: {
    drawerHeader:
      'border-default-200/50 bg-content1/50 flex items-center justify-between border-b px-2 py-2 backdrop-blur-lg',
    closeButton: '',
    headerTitle: 'flex items-center gap-2',
    taskChip: '',
    drawerBody: 'mt-2 space-y-2',
    loadingText: 'text-default-500 flex items-center gap-2 text-sm',
    gridContainer: 'grid grid-cols-1 gap-3 md:grid-cols-2',
    tagsContainer: 'flex flex-wrap gap-1',
    attachmentsContainer: 'flex flex-wrap gap-2',
    drawerFooter: '',
    cancelButton: '',
    submitButton: '',
    input: '',
    select: '',
    chip: ''
  },
  variants: {
    isLoading: {
      true: {
        loadingText: 'opacity-50'
      },
      false: {
        loadingText: 'opacity-100'
      }
    }
  },
  defaultVariants: {
    isLoading: false
  }
})

export const filterPopoverTva = tv({
  slots: {
    popoverContent: '',
    filterPopoverContent: 'h-55 w-50 overflow-y-auto p-4 py-5'
  }
})

export type ProjectsMainTva = typeof projectsMainTva
export type ProjectsSidebarTva = typeof projectsSidebarTva
export type ProjectDetailsTva = typeof projectDetailsTva
export type FilterPopoverTva = typeof filterPopoverTva
export type ProjectDrawerTva = typeof drawerTva

export type ProjectsMainTvaSlots = keyof ReturnType<typeof projectsMainTva>
export type ProjectsSidebarTvaSlots = keyof ReturnType<
  typeof projectsSidebarTva
>
export type ProjectDetailsTvaSlots = keyof ReturnType<typeof projectDetailsTva>
export type FilterPopoverTvaSlots = keyof ReturnType<typeof filterPopoverTva>
export type ProjectDrawerTvaSlots = keyof ReturnType<typeof drawerTva>

export type ProjectDrawerTvaProps = VariantProps<typeof drawerTva>
export type ProjectsMainTvaProps = VariantProps<typeof projectsMainTva>
export type ProjectsSidebarTvaProps = VariantProps<typeof projectsSidebarTva>
export type ProjectDetailsTvaProps = VariantProps<typeof projectDetailsTva>
export type FilterPopoverTvaProps = VariantProps<typeof filterPopoverTva>
