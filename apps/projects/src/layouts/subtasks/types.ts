import { ReactRef } from '@vezham/react-utils'
import {
  HTMLHeroUIProps,
  PropGetter,
  mapPropsVariants
} from '@vezham/react-utils'
import { cn } from '@vezham/react-utils'
import type { SlotsToClasses } from '@vezham/react-utils'

import { MainTvaSlots, mainTva, tableCellTva } from './variant'

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
  email: string
}

export type Status =
  | 'Open'
  | 'InProgress'
  | 'InReview'
  | 'TobeTested'
  | 'Delayed'
  | 'OnHold'
  | 'Closed'
  | 'Cancelled'

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

export type SubTask = {
  id: number
  subtaskId: number
  taskId?: number
  subtaskname: string
  description: string
  owner: Owner
  startDate: Date
  dueDate: Date
  tags: Tags[]
  status: Status
  priority: string
  billingtype: string
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

export interface SubTaskSectionProps extends HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<MainTvaSlots>
}

export const useSubTaskSectionProps = (originalProps: SubTaskSectionProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    mainTva.variantKeys as any
  )

  const { as, id, ref, children, className, classNames, ...otherProps } = props

  const Component = as || 'div'
  const slots = mainTva(variantProps as any)

  const getBaseProps: PropGetter = () => ({
    id,
    className: slots.wrapper({ class: cn(classNames?.wrapper, className) }),
    ...otherProps
  })

  const getCardProps: PropGetter = () => ({
    className: slots.card({ class: classNames?.card }),
    shadow: 'none'
  })

  const getCardBodyProps: PropGetter = () => ({
    className: slots.cardBody({ class: classNames?.cardBody })
  })

  const getTableWrapperProps: PropGetter = () => ({
    className: slots.tableWrapper({ class: classNames?.tableWrapper })
  })

  const getLoadingContainerProps: PropGetter = () => ({
    className: slots.loadingContainer({ class: classNames?.loadingContainer })
  })

  const getOutletContainerProps: PropGetter = () => ({
    className: slots.outletContainer({ class: classNames?.outletContainer })
  })

  return {
    Component,
    slots,
    classNames,
    children,
    getBaseProps,
    getCardProps,
    getCardBodyProps,
    getTableWrapperProps,
    getLoadingContainerProps,
    getOutletContainerProps
  } as const
}

export const useTableCellProps = () => {
  const slots = tableCellTva()

  const getLastLoginContainerProps: PropGetter = () => ({
    className: slots.lastLoginContainer()
  })

  const getLastLoginIconProps: PropGetter = () => ({
    className: slots.lastLoginIcon()
  })

  const getLastLoginTextProps: PropGetter = () => ({
    className: slots.lastLoginText()
  })

  const getActionsContainerProps: PropGetter = () => ({
    className: slots.actionsContainer()
  })

  const getActionIconProps: PropGetter = () => ({
    className: slots.actionIcon()
  })

  const getActionButtonProps: PropGetter = () => ({
    className: slots.actionButton()
  })

  const getTagsContainerProps: PropGetter = () => ({
    className: slots.tagsContainer()
  })

  const getTagChipProps: PropGetter = () => ({
    className: slots.tagChip()
  })

  const getMoreTagChipProps: PropGetter = () => ({
    className: slots.moreTagChip()
  })

  const getTruncateTextProps: PropGetter = () => ({
    className: slots.truncateText()
  })

  return {
    slots,
    getLastLoginContainerProps,
    getLastLoginIconProps,
    getLastLoginTextProps,
    getActionsContainerProps,
    getActionIconProps,
    getActionButtonProps,
    getTagsContainerProps,
    getTagChipProps,
    getMoreTagChipProps,
    getTruncateTextProps
  } as const
}
