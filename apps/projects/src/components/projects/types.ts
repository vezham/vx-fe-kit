// export type AttachmentType =
//   | 'image'
//   | 'pdf'
//   | 'doc'
//   | 'sheet'
//   | 'zip'
//   | 'video'
//   | 'audio'
//   | 'other'
// export type Attachment = {
//   id: string
//   name: string
//   url: string
//   type: AttachmentType
// }
// export type Owner = {
//   avatar: string
//   email: string
//   name: string
// }
// export type Project = {
//   startDate: Date
//   dueDate: Date
//   project: string
//   description: string
//   tags: Tags[]
//   owner: Owner
//   projectsId: number
//   status: Status
//   attachments: Attachment[]
// }
// export interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
//   className?: string
//   textClassName?: string
//   copyText?: string
//   timeout?: number
//   children: string
//   variant?: 'default' | 'compact'
// }
// export type Status =
//   | 'Active'
//   | 'InProgress'
//   | 'InTesting'
//   | 'Delayed'
//   | 'OnHold'
//   | 'Approved'
//   | 'Cancelled'
//   | 'Planning'
//   | 'Completed'
//   | 'Invoiced'
// export type Tags =
//   | 'Design'
//   | 'Product'
//   | 'Marketing'
//   | 'Management'
//   | 'Engineering'
//   | 'Sales'
//   | 'Support'
//   | 'Other'
//   | (string & {})
import { ReactRef } from '@vezham/react-utils'
import {
  HTMLHeroUIProps,
  PropGetter,
  mapPropsVariants
} from '@vezham/react-utils'
import { cn } from '@vezham/react-utils'
import type { SlotsToClasses } from '@vezham/react-utils'

import {
  FilterPopoverTvaSlots,
  ProjectDetailsTvaSlots,
  ProjectDrawerTvaSlots,
  ProjectsMainTvaSlots,
  ProjectsSidebarTvaSlots,
  drawerTva,
  filterPopoverTva,
  projectDetailsTva,
  projectsMainTva,
  projectsSidebarTva
} from './variant'

export type AttachmentType =
  | 'image'
  | 'pdf'
  | 'doc'
  | 'sheet'
  | 'zip'
  | 'video'
  | 'audio'
  | 'other'

export type Attachment = {
  id: string
  name: string
  url: string
  type: AttachmentType
}

export type Owner = {
  avatar: string
  name: string
}

export type Project = {
  startDate: Date
  dueDate: Date
  project: string
  description: string
  tags: Tags[]
  owner: Owner
  projectsId: number
  status: Status
  attachments: Attachment[]
}

export interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  textClassName?: string
  copyText?: string
  timeout?: number
  children: string
  variant?: 'default' | 'compact'
}

export type Status =
  | 'Active'
  | 'InProgress'
  | 'InTesting'
  | 'Delayed'
  | 'OnHold'
  | 'Approved'
  | 'Cancelled'
  | 'Planning'
  | 'Completed'
  | 'Invoiced'

export type Tags =
  | 'Design'
  | 'Product'
  | 'Marketing'
  | 'Management'
  | 'Engineering'
  | 'Sales'
  | 'Support'
  | 'Other'
  | (string & {})

export interface ProjectsProps extends HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<ProjectsMainTvaSlots>
  showDetails?: boolean
  isLoading?: boolean
}

export interface ProjectsSidebarProps {
  projects: Project[]
  activeId: number | null
  searchValue: string
  statusFilter: string
  startDateFilter: string
  dueDateFilter: string
  onSelect: (projectId: number) => void
  onSearchChange: (value: string) => void
  setStatusFilter: (value: string) => void
  setStartDateFilter: (value: string) => void
  setDueDateFilter: (value: string) => void
  onAddProject: () => void
  onDeleteProject: (projectId: number) => void
  showDetails?: boolean
  classNames?: SlotsToClasses<ProjectsSidebarTvaSlots>
}

export interface ProjectDetailsProps {
  project: Project
  onBack?: () => void
  onDelete?: () => void
  classNames?: SlotsToClasses<ProjectDetailsTvaSlots>
}

export interface FilterPopoverProps {
  statusFilter: string
  startDateFilter: string
  dueDateFilter: string
  setStatusFilter: (value: string) => void
  setStartDateFilter: (value: string) => void
  setDueDateFilter: (value: string) => void
  classNames?: SlotsToClasses<FilterPopoverTvaSlots>
}

export interface ProjectDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  classNames?: SlotsToClasses<ProjectDrawerTvaSlots>
}

export const useProjectsProps = (
  originalProps: ProjectsProps
): {
  Component: React.ElementType
  slots: ReturnType<typeof projectsMainTva>
  classNames?: SlotsToClasses<ProjectsMainTvaSlots>
  children?: React.ReactNode
  getBaseProps: PropGetter
  getSidebarProps: PropGetter
  getContentAreaProps: PropGetter
  getDetailsAreaProps: PropGetter
  getHeaderProps: PropGetter
  getTitleProps: PropGetter
  getSubtitleProps: PropGetter
  getTabsContainerProps: PropGetter
  getActionsContainerProps: PropGetter
  getOutletContainerProps: PropGetter
  getLoadingContainerProps: PropGetter
  getEmptyStateProps: PropGetter
  getErrorContainerProps: PropGetter
  getMobileButtonProps: PropGetter
} => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    projectsMainTva.variantKeys as unknown as (keyof ProjectsProps)[]
  )

  const { as, id, children, className, classNames, ...otherProps } =
    props as ProjectsProps

  const Component = as ?? 'div'
  const slots = projectsMainTva(variantProps)

  const getBaseProps: PropGetter = () => ({
    id,
    className: slots.wrapper({
      class: cn(classNames?.wrapper, className)
    }),
    ...otherProps
  })

  const getSidebarProps: PropGetter = () => ({
    className: slots.sidebar({
      class: classNames?.sidebar
    })
  })

  const getContentAreaProps: PropGetter = () => ({
    className: slots.contentArea({
      class: classNames?.contentArea
    })
  })

  const getDetailsAreaProps: PropGetter = () => ({
    className: slots.detailsArea({
      class: classNames?.detailsArea
    })
  })

  const getHeaderProps: PropGetter = () => ({
    className: slots.header({
      class: classNames?.header
    })
  })

  const getTitleProps: PropGetter = () => ({
    className: slots.title({
      class: classNames?.title
    })
  })

  const getSubtitleProps: PropGetter = () => ({
    className: slots.subtitle({
      class: classNames?.subtitle
    })
  })

  const getMobileButtonProps: PropGetter = () => ({
    className: slots.mobileBackButton({
      class: classNames?.mobileBackButton
    })
  })

  const getTabsContainerProps: PropGetter = () => ({
    className: slots.tabsContainer({
      class: classNames?.tabsContainer
    })
  })

  const getActionsContainerProps: PropGetter = () => ({
    className: slots.actionsContainer({
      class: classNames?.actionsContainer
    })
  })

  const getOutletContainerProps: PropGetter = () => ({
    className: slots.outletContainer({
      class: classNames?.outletContainer
    })
  })

  const getLoadingContainerProps: PropGetter = () => ({
    className: slots.loadingContainer({
      class: classNames?.loadingContainer
    })
  })

  const getEmptyStateProps: PropGetter = () => ({
    className: slots.emptyState({
      class: classNames?.emptyState
    })
  })

  const getErrorContainerProps: PropGetter = () => ({
    className: slots.errorContainer({
      class: classNames?.errorContainer
    })
  })

  return {
    Component,
    slots,
    classNames,
    children,
    getBaseProps,
    getSidebarProps,
    getContentAreaProps,
    getDetailsAreaProps,
    getHeaderProps,
    getTitleProps,
    getSubtitleProps,
    getTabsContainerProps,
    getActionsContainerProps,
    getOutletContainerProps,
    getLoadingContainerProps,
    getEmptyStateProps,
    getErrorContainerProps,
    getMobileButtonProps
  }
}

export const useProjectsSidebarProps = (
  originalProps: ProjectsSidebarProps
) => {
  const slots = projectsSidebarTva()

  const getContainerProps: PropGetter = () => ({
    className: slots.container({ class: originalProps.classNames?.container })
  })

  const getHeaderProps: PropGetter = () => ({
    className: slots.header({ class: originalProps.classNames?.header })
  })

  const getHeaderTitleProps: PropGetter = () => ({
    className: slots.headerTitle({
      class: originalProps.classNames?.headerTitle
    })
  })
  const getCounterBadgeProps: PropGetter = () => ({
    className: slots.countBadge({ class: originalProps.classNames?.countBadge })
  })

  const getAddButtonProps: PropGetter = () => ({
    className: slots.addButton({ class: originalProps.classNames?.addButton })
  })

  const getSearchContainerProps: PropGetter = () => ({
    className: slots.searchContainer({
      class: originalProps.classNames?.searchContainer
    })
  })

  const getFilterButtonProps: PropGetter = () => ({
    className: slots.filterButton({
      class: originalProps.classNames?.filterButton
    })
  })

  const getFilterPopoverContentProps: PropGetter = () => ({
    className: slots.filterPopoverContent({
      class: originalProps.classNames?.filterPopoverContent
    })
  })

  const getScrollAreaProps: PropGetter = () => ({
    className: slots.scrollArea({ class: originalProps.classNames?.scrollArea })
  })

  const getProjectItemProps = (
    projectId: number
  ): React.HTMLAttributes<HTMLDivElement> => {
    const isActive = Number(projectId) === Number(originalProps.activeId)

    return {
      className: cn(
        slots.projectItem(),
        isActive ? slots.projectItemActive() : slots.projectItemInactive(),
        originalProps.classNames?.projectItem
      ),
      onClick: () => originalProps.onSelect(projectId)
    }
  }

  const getProjectContentProps: PropGetter = () => ({
    className: slots.projectContent({
      class: originalProps.classNames?.projectContent
    })
  })

  const getProjectInfoProps: PropGetter = () => ({
    className: slots.projectInfo({
      class: originalProps.classNames?.projectInfo
    })
  })

  const getProjectIconProps: PropGetter = () => ({
    className: slots.projectIcon({
      class: originalProps.classNames?.projectIcon
    })
  })
  const getProjectNameProps: PropGetter = () => ({
    className: slots.projectName({
      class: originalProps.classNames?.projectName
    })
  })

  return {
    slots,
    classNames: originalProps.classNames,
    getContainerProps,
    getHeaderProps,
    getAddButtonProps,
    getSearchContainerProps,
    getFilterButtonProps,
    getFilterPopoverContentProps,
    getScrollAreaProps,
    getProjectItemProps,
    getProjectContentProps,
    getProjectInfoProps,
    getProjectIconProps,
    getProjectNameProps,
    getHeaderTitleProps,
    getCounterBadgeProps
  }
}

export const useProjectDetailsProps = (originalProps: ProjectDetailsProps) => {
  const hasAttachments = (originalProps.project?.attachments?.length ?? 0) > 0

  const slots = projectDetailsTva({ hasAttachments })

  const getContainerProps: PropGetter = () => ({
    className: slots.container({ class: originalProps.classNames?.container })
  })

  const getHeaderProps: PropGetter = () => ({
    className: slots.header({ class: originalProps.classNames?.header })
  })

  const getBackButtonProps: PropGetter = () => ({
    className: slots.backButton({ class: originalProps.classNames?.backButton })
  })

  const getMobileBackButtonProps: PropGetter = () => ({
    className: slots.mobileBackButton({
      class: originalProps.classNames?.mobileBackButton
    })
  })

  const getCardProps: PropGetter = () => ({
    className: slots.card({ class: originalProps.classNames?.card })
  })

  const getCardBodyProps: PropGetter = () => ({
    className: slots.cardBody({ class: originalProps.classNames?.cardBody })
  })

  const getGridProps: PropGetter = () => ({
    className: slots.grid({ class: originalProps.classNames?.grid })
  })

  const getDividerProps: PropGetter = () => ({
    className: slots.divider({ class: originalProps.classNames?.divider })
  })

  const getTagsContainerProps: PropGetter = () => ({
    className: slots.tagsContainer({
      class: originalProps.classNames?.tagsContainer
    })
  })

  const getAttachmentsListProps: PropGetter = () => ({
    className: slots.attachmentsList({
      class: originalProps.classNames?.attachmentsList
    })
  })

  return {
    slots,
    classNames: originalProps.classNames,
    hasAttachments,
    getContainerProps,
    getHeaderProps,
    getBackButtonProps,
    getMobileBackButtonProps,
    getCardProps,
    getCardBodyProps,
    getGridProps,
    getDividerProps,
    getTagsContainerProps,
    getAttachmentsListProps
  }
}

export const useProjectDrawerProps = (originalProps: ProjectDrawerProps) => {
  const slots = drawerTva({ isLoading: false })

  const getDrawerHeaderProps: PropGetter = () => ({
    className: slots.drawerHeader({
      class: originalProps.classNames?.drawerHeader
    })
  })

  const getCloseButtonProps: PropGetter = () => ({
    className: slots.closeButton({
      class: originalProps.classNames?.closeButton
    })
  })

  const getHeaderTitleProps: PropGetter = () => ({
    className: slots.headerTitle({
      class: originalProps.classNames?.headerTitle
    })
  })

  const getTaskChipProps: PropGetter = () => ({
    className: slots.taskChip({ class: originalProps.classNames?.taskChip })
  })

  const getDrawerBodyProps: PropGetter = () => ({
    className: slots.drawerBody({ class: originalProps.classNames?.drawerBody })
  })

  const getLoadingTextProps: PropGetter = () => ({
    className: slots.loadingText({
      class: originalProps.classNames?.loadingText
    })
  })

  const getGridContainerProps: PropGetter = () => ({
    className: slots.gridContainer({
      class: originalProps.classNames?.gridContainer
    })
  })

  const getTagsContainerProps: PropGetter = () => ({
    className: slots.tagsContainer({
      class: originalProps.classNames?.tagsContainer
    })
  })

  const getAttachmentsContainerProps: PropGetter = () => ({
    className: slots.attachmentsContainer({
      class: originalProps.classNames?.attachmentsContainer
    })
  })

  const getDrawerFooterProps: PropGetter = () => ({
    className: slots.drawerFooter({
      class: originalProps.classNames?.drawerFooter
    })
  })

  const getCancelButtonProps: PropGetter = () => ({
    className: slots.cancelButton({
      class: originalProps.classNames?.cancelButton
    })
  })

  const getSubmitButtonProps: PropGetter = () => ({
    className: slots.submitButton()
  })

  const getInputProps: PropGetter = () => ({
    className: slots.input({ class: originalProps.classNames?.input })
  })

  const getSelectProps: PropGetter = () => ({
    className: slots.select({ class: originalProps.classNames?.select })
  })

  const getChipProps: PropGetter = () => ({
    className: slots.chip({ class: originalProps.classNames?.chip })
  })

  return {
    slots,
    classNames: originalProps.classNames,
    getDrawerHeaderProps,
    getCloseButtonProps,
    getHeaderTitleProps,
    getTaskChipProps,
    getDrawerBodyProps,
    getLoadingTextProps,
    getGridContainerProps,
    getTagsContainerProps,
    getAttachmentsContainerProps,
    getDrawerFooterProps,
    getCancelButtonProps,
    getSubmitButtonProps,
    getInputProps,
    getSelectProps,
    getChipProps
  }
}

export const useFilterPopoverProps = (originalProps: FilterPopoverProps) => {
  const slots = filterPopoverTva()

  const getPopoverContentProps: PropGetter = () => ({
    className: slots.popoverContent({
      class: originalProps.classNames?.popoverContent
    })
  })

  const getFilterPopoverContentProps: PropGetter = () => ({
    className: slots.filterPopoverContent({
      class: originalProps.classNames?.filterPopoverContent
    })
  })

  return {
    slots,
    classNames: originalProps.classNames,
    getPopoverContentProps,
    getFilterPopoverContentProps
  }
}
