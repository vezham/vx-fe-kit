import { Dispatch, SetStateAction } from 'react'

import type { SlotsToClasses } from '@vezham/react-utils'
import { PropGetter } from '@vezham/react-utils'

import { ProjectsMainTvaSlots } from '../project-header/variant'
import { drawerTva } from './variant'

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

// In header/types.ts, add these interfaces:
export interface TaskDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  projectId?: number
  selectedUserId: number | null
  selectedIndex: number | null
  selectedUser: any
  selectedLoading: boolean
  selectedError: boolean
  setSelectedKeys: Dispatch<SetStateAction<Set<number>>>
  setSelectedUserId: Dispatch<SetStateAction<number | null>>
  setSelectedIndex: Dispatch<SetStateAction<number | null>>
  selectedRefetch: () => void
}

// Update ProjectsHeaderProps to include TaskDrawer props:
export interface ProjectsHeaderProps {
  activeProject: Project | null
  activeTab: string
  headerContent: {
    title: string
    subtitle?: string
  }
  onBack: () => void
  onDeleteActiveProject: () => void
  getDetailsAreaProps: PropGetter
  classNames?: SlotsToClasses<ProjectsMainTvaSlots>
  // Task drawer props (optional if you don't want to pass them all)
  selectedUserId?: number | null
  selectedIndex?: number | null
  selectedUser?: any
  selectedLoading?: boolean
  selectedError?: boolean
  setSelectedKeys?: Dispatch<SetStateAction<Set<number>>>
  setSelectedUserId?: Dispatch<SetStateAction<number | null>>
  setSelectedIndex?: Dispatch<SetStateAction<number | null>>
  selectedRefetch?: () => void
}

export interface ProjectDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  classNames?: SlotsToClasses<ProjectDrawerTvaSlots>
}

export type ProjectDrawerTvaSlots = keyof ReturnType<typeof drawerTva>

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
