import { tv } from '@vezham/react/v2'

export const projectsMainTva = tv({
  slots: {
    detailsArea: 'h-full sm:p-2',
    headerTemplate: 'flex justify-between',
    mobileBackButton: 'block lg:hidden',
    header: 'h-full w-full px-3',
    headerTitle: 'flex items-center justify-between',
    backButton: 'flex items-center gap-3',
    title: 'text-base font-bold sm:text-2xl',
    subtitle: 'text-default-500 mt-2 text-justify text-sm sm:text-base',
    tabsContainer:
      'mt-4 flex w-full flex-col items-start justify-between sm:flex-row sm:items-center',
    tabsWrapper: 'w-full sm:w-auto md:px-2',
    tabs: 'flex w-full sm:w-auto',
    tabList: 'w-full sm:w-auto',
    actionsContainer: 'flex w-full flex-col gap-2 sm:w-auto sm:flex-row'
  }
})

export type ProjectsMainTva = typeof projectsMainTva
export type ProjectsMainTvaSlots = keyof ReturnType<typeof projectsMainTva>
