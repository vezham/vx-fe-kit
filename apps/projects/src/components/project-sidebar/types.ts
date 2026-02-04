import { type SlotsToClasses, cn } from '@vezham/react-utils'
import { HTMLHeroUIProps, PropGetter } from '@vezham/react-utils'

import { projectsSidebarTva } from './variant'

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

export interface Project {
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

export type ProjectsSidebarTvaSlots = keyof ReturnType<
  typeof projectsSidebarTva
>

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
      className: slots.projectItem({
        class: cn(
          isActive ? slots.projectItemActive() : slots.projectItemInactive(),
          originalProps.classNames?.projectItem
        )
      }),
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
