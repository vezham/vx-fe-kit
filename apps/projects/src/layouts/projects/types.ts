import { ReactRef } from '@vezham/react-utils'
import {
  HTMLHeroUIProps,
  PropGetter,
  mapPropsVariants
} from '@vezham/react-utils'
import { cn } from '@vezham/react-utils'
import type { SlotsToClasses } from '@vezham/react-utils'

import {
  ProjectDetailsTvaSlots,
  ProjectsMainTvaSlots,
  projectDetailsTva,
  projectsMainTva
} from './variant'

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

export type AttachmentType =
  | 'image'
  | 'pdf'
  | 'doc'
  | 'sheet'
  | 'zip'
  | 'video'
  | 'audio'
  | 'other'

export interface ProjectsProps extends HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<ProjectsMainTvaSlots>
  children?: React.ReactNode
  showDetails?: boolean
  isLoading?: boolean
}

export interface ProjectDetailsProps {
  project: Project
  onBack?: () => void
  onDelete?: () => void
  classNames?: SlotsToClasses<ProjectDetailsTvaSlots>
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
    className: cn(
      slots.sidebar(),
      originalProps.showDetails ? slots.sidebarVisible() : slots.sidebarHidden()
    )
  })

  const getDetailsAreaProps: PropGetter = () => ({
    className: cn(
      slots.detailsArea(),
      originalProps.showDetails ? slots.detailsHidden() : slots.detailsVisible()
    )
  })

  const getContentAreaProps: PropGetter = () => ({
    className: slots.contentArea({
      class: classNames?.contentArea
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

export const useProjectDetailsProps = (originalProps: ProjectDetailsProps) => {
  const hasAttachments = (originalProps.project?.attachments?.length ?? 0) > 0

  const slots = projectDetailsTva()

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
