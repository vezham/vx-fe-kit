import { Dispatch, SetStateAction } from 'react'

import { type SlotsToClasses } from '@vezham/react-utils'
import { HTMLHeroUIProps, PropGetter } from '@vezham/react-utils'

import { projectsMainTva } from './variant'

export interface ProjectsHeaderProps {
  activeProject: Project | null
  activeTab: string
  headerContent: {
    title: string
    subtitle?: string
  }
  selectedUserId: number | null
  selectedIndex: number | null
  selectedUser: any
  selectedLoading: boolean
  selectedError: boolean
  onBack: () => void
  onDeleteActiveProject: () => void
  setSelectedKeys: Dispatch<SetStateAction<Set<number>>>
  setSelectedUserId: Dispatch<SetStateAction<number | null>>
  setSelectedIndex: Dispatch<SetStateAction<number | null>>
  selectedRefetch: () => void
  getDetailsAreaProps: PropGetter
  classNames?: SlotsToClasses<ProjectsMainTvaSlots>
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

export type ProjectsMainTvaSlots = keyof ReturnType<typeof projectsMainTva>

export const useProjectsHeaderProps = (originalProps: ProjectsHeaderProps) => {
  const slots = projectsMainTva({})

  const getHeaderProps: PropGetter = () => ({
    className: slots.header({ class: originalProps.classNames?.header })
  })

  const getTitleProps: PropGetter = () => ({
    className: slots.title({ class: originalProps.classNames?.title })
  })

  const getSubtitleProps: PropGetter = () => ({
    className: slots.subtitle({ class: originalProps.classNames?.subtitle })
  })

  const getMobileButtonProps: PropGetter = () => ({
    className: slots.mobileBackButton({
      class: originalProps.classNames?.mobileBackButton
    })
  })

  const getTabsContainerProps: PropGetter = () => ({
    className: slots.tabsContainer({
      class: originalProps.classNames?.tabsContainer
    })
  })

  const getActionsContainerProps: PropGetter = () => ({
    className: slots.actionsContainer({
      class: originalProps.classNames?.actionsContainer
    })
  })

  return {
    slots,
    getHeaderProps,
    getTitleProps,
    getSubtitleProps,
    getTabsContainerProps,
    getActionsContainerProps,
    getMobileButtonProps
  }
}
