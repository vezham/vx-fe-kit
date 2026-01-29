import { ReactRef, useDOMRef } from '@vezham/react-utils'
import type { VariantProps } from '@vezham/react-utils'
import {
  HTMLHeroUIProps,
  PropGetter,
  mapPropsVariants
} from '@vezham/react-utils'
import { cn } from '@vezham/react-utils'
import type { SlotsToClasses } from '@vezham/react-utils'
import type { Selection, SortDescriptor } from '@vezham/react/v2'

import {
  bottomContentTva,
  copyTextTva,
  detailModalTva,
  drawerTva,
  headerContentTva,
  mainTva,
  tableCellTva
} from './variant'

type AttachmentType =
  | 'image'
  | 'pdf'
  | 'doc'
  | 'sheet'
  | 'zip'
  | 'video'
  | 'audio'
  | 'other'

type Attachment = {
  id: string
  name: string
  url: string
  type: AttachmentType
}

type Owner = {
  avatar: string
  name: string
}

type Task = {
  id: number
  projectsId: number | undefined
  taskId: number
  taskname: string
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

type Project = {
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
interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  textClassName?: string
  copyText?: string
  timeout?: number
  children: string
  variant?: 'default' | 'compact'
}

type Status =
  | 'Open'
  | 'InProgress'
  | 'InReview'
  | 'TobeTested'
  | 'Delayed'
  | 'OnHold'
  | 'Closed'
  | 'Cancelled'

type Tags =
  | 'Design'
  | 'Product'
  | 'Marketing'
  | 'Management'
  | 'Engineering'
  | 'Sales'
  | 'Support'
  | 'Other'
  | (string & {})

// ==================== TVA SLOT TYPES ====================
type MainTvaSlots = keyof ReturnType<typeof mainTva>
type HeaderContentTvaSlots = keyof ReturnType<typeof headerContentTva>
type BottomContentTvaSlots = keyof ReturnType<typeof bottomContentTva>
type DetailModalTvaSlots = keyof ReturnType<typeof detailModalTva>
type DrawerTvaSlots = keyof ReturnType<typeof drawerTva>
type CopyTextTvaSlots = keyof ReturnType<typeof copyTextTva>
type TableCellTvaSlots = keyof ReturnType<typeof tableCellTva>

// ==================== TVA PROPS TYPES ====================
type TaskSectionTvaProps = VariantProps<typeof mainTva>
type HeaderContentTvaProps = VariantProps<typeof headerContentTva>
type BottomContentTvaProps = VariantProps<typeof bottomContentTva>
type TaskDetailModalTvaProps = VariantProps<typeof detailModalTva>
type TaskDrawerTvaProps = VariantProps<typeof drawerTva>
type CopyTextTvaProps = VariantProps<typeof copyTextTva>
type TableCellTvaProps = VariantProps<typeof tableCellTva>

// ==================== COMPONENT PROPS TYPES ====================
interface TaskSectionProps
  extends HTMLHeroUIProps<'div'>,
    VariantProps<typeof mainTva> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<MainTvaSlots>
}

interface HeaderContentProps {
  selectedKeys: Selection
  usersLength: number
  isSearchExpanded: boolean
  filterValue: string
  statusFilter: string
  startDateFilter: string
  dueDateFilter: string
  headerColumns: any[]
  visibleColumns: Selection
  sortDescriptor: SortDescriptor
  onSearchChange: (value?: string) => void
  toggleSearch: () => void
  setStatusFilter: (value: string) => void
  setStartDateFilter: (value: string) => void
  setDueDateFilter: (value: string) => void
  setVisibleColumns: (columns: Selection) => void
  setSortDescriptor: (descriptor: SortDescriptor) => void
  searchInputRef: React.RefObject<HTMLInputElement | null>
  setFilterValue: (value: string) => void
  classNames?: SlotsToClasses<HeaderContentTvaSlots>
}

interface BottomContentProps {
  page: number
  pages: number
  onPaginationChange: (newPage: number) => Promise<void>
  onPreviousPage: () => Promise<void>
  onNextPage: () => Promise<void>
  classNames?: SlotsToClasses<BottomContentTvaSlots>
}

interface TaskDetailModalProps {
  task?: Task | null
  onOpenChange: () => void
  children?: React.ReactNode
  classNames?: SlotsToClasses<DetailModalTvaSlots>
}

interface TaskDrawerProps {
  isOpen: boolean
  onOpenChange: () => void
  projectId?: number
  classNames?: SlotsToClasses<DrawerTvaSlots>
}

const useTaskSectionProps = (originalProps: TaskSectionProps) => {
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    mainTva.variantKeys as (keyof VariantProps<typeof mainTva>)[]
  )

  const { as, id, ref, children, className, classNames, ...otherProps } = props

  const Component = as || 'div'
  const domRef = useDOMRef(ref)
  const slots = mainTva(variantProps as any)

  const getBaseProps: PropGetter = () => ({
    id,
    ref: domRef,
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
  const getEmptyStateProps: PropGetter = () => ({
    className: slots.emptyState({ class: classNames?.emptySTate })
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
    domRef,
    slots,
    classNames,
    children,
    getBaseProps,
    getCardProps,
    getCardBodyProps,
    getEmptyStateProps,
    getTableWrapperProps,
    getLoadingContainerProps,
    getOutletContainerProps
  } as const
}

const useHeaderContentProps = (originalProps: HeaderContentProps) => {
  const hasSelection =
    originalProps.selectedKeys === 'all'
      ? false
      : originalProps.selectedKeys.size === 0

  const slots = headerContentTva({
    isSearchExpanded: originalProps.isSearchExpanded,
    hasSelection
  } as any)

  const getTopBarContainerProps: PropGetter = () => ({
    className: slots.topBarContainer({
      class: originalProps.classNames?.topBarContainer
    })
  })

  const getTopBarLeftProps: PropGetter = () => ({
    className: slots.topBarLeft({ class: originalProps.classNames?.topBarLeft })
  })

  const getTopBarLeftInnerProps: PropGetter = () => ({
    className: slots.topBarLeftInner({
      class: originalProps.classNames?.topBarLeftInner
    })
  })

  const getMembersTextProps: PropGetter = () => ({
    className: slots.membersText({
      class: originalProps.classNames?.membersText
    })
  })

  const getChipProps: PropGetter = () => ({
    className: slots.chip({ class: originalProps.classNames?.chip })
  })

  const getSelectedActionsContainerProps: PropGetter = () => ({
    className: slots.selectedActionsContainer({
      class: originalProps.classNames?.selectedActionsContainer
    })
  })

  const getDividerProps: PropGetter = () => ({
    className: slots.divider({ class: originalProps.classNames?.divider })
  })

  const getSelectedCountTextProps: PropGetter = () => ({
    className: slots.selectedCountText({
      class: originalProps.classNames?.selectedCountText
    })
  })

  const getSelectedActionsProps: PropGetter = () => ({
    className: slots.selectedActions({
      class: originalProps.classNames?.selectedActions
    })
  })

  const getSelectedActionsButtonProps: PropGetter = () => ({
    className: slots.selectedActionsButton({
      class: originalProps.classNames?.selectedActionsButton
    })
  })

  const getSelectedActionsMoreButtonProps: PropGetter = () => ({
    className: slots.selectedActionsMoreButton({
      class: originalProps.classNames?.selectedActionsMoreButton
    })
  })

  const getDropdownIconProps: PropGetter = () => ({
    className: slots.dropdownIcon({
      class: originalProps.classNames?.dropdownIcon
    })
  })

  const getTopBarRightProps: PropGetter = () => ({
    className: slots.topBarRight({
      class: originalProps.classNames?.topBarRight
    })
  })

  const getSearchContainerProps: PropGetter = () => ({
    className: slots.searchContainer({
      class: originalProps.classNames?.searchContainer
    })
  })

  const getSearchButtonProps: PropGetter = () => ({
    className: slots.searchButton({
      class: originalProps.classNames?.searchButton
    })
  })

  const getSearchInputProps: PropGetter = () => ({
    className: slots.searchInput({
      class: originalProps.classNames?.searchInput
    })
  })

  const getSearchCloseIconProps: PropGetter = () => ({
    className: slots.searchCloseIcon({
      class: originalProps.classNames?.searchCloseIcon
    })
  })

  const getFilterSortButtonsProps: PropGetter = () => ({
    className: slots.filterSortButtons({
      class: originalProps.classNames?.filterSortButtons
    })
  })

  const getFilterSortButtonProps: PropGetter = () => ({
    className: slots.filterSortButton({
      class: originalProps.classNames?.filterSortButton
    })
  })

  const getFilterSortIconProps: PropGetter = () => ({
    className: slots.filterSortIcon({
      class: originalProps.classNames?.filterSortIcon
    })
  })

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

  const getMobileActionsProps: PropGetter = () => ({
    className: slots.mobileActions({
      class: originalProps.classNames?.mobileActions
    })
  })

  const getMobileActionsButtonProps: PropGetter = () => ({
    className: slots.mobileActionsButton({
      class: originalProps.classNames?.mobileActionsButton
    })
  })

  const getMobileFilterButtonProps: PropGetter = () => ({
    className: slots.mobileFilterButton({
      class: originalProps.classNames?.mobileFilterButton
    })
  })

  const getSearchFocusButtonProps: PropGetter = () => ({
    className: slots.searchFocusButton({
      class: originalProps.classNames?.searchFocusButton
    })
  })

  return {
    slots,
    classNames: originalProps.classNames,
    hasSelection,
    isSearchExpanded: originalProps.isSearchExpanded,
    getTopBarContainerProps,
    getTopBarLeftProps,
    getTopBarLeftInnerProps,
    getMembersTextProps,
    getChipProps,
    getSelectedActionsContainerProps,
    getDividerProps,
    getSelectedCountTextProps,
    getSelectedActionsProps,
    getSelectedActionsButtonProps,
    getSelectedActionsMoreButtonProps,
    getDropdownIconProps,
    getTopBarRightProps,
    getSearchContainerProps,
    getSearchButtonProps,
    getSearchInputProps,
    getSearchCloseIconProps,
    getFilterSortButtonsProps,
    getFilterSortButtonProps,
    getFilterSortIconProps,
    getPopoverContentProps,
    getFilterPopoverContentProps,
    getMobileActionsProps,
    getMobileActionsButtonProps,
    getMobileFilterButtonProps,
    getSearchFocusButtonProps
  } as const
}

const useBottomContentProps = (originalProps: BottomContentProps) => {
  const isFirstPage = originalProps.page === 1
  const isLastPage = originalProps.page === originalProps.pages

  const slots = bottomContentTva({ isFirstPage, isLastPage } as any)

  const getPaginationContainerProps: PropGetter = () => ({
    className: slots.paginationContainer({
      class: originalProps.classNames?.paginationContainer
    })
  })

  const getPaginationButtonContainerProps: PropGetter = () => ({
    className: slots.paginationButtonContainer({
      class: originalProps.classNames?.paginationButtonContainer
    })
  })

  const getPaginationButtonProps: PropGetter = () => ({
    className: slots.paginationButton({
      class: originalProps.classNames?.paginationButton
    })
  })

  const getPaginationIconProps: PropGetter = () => ({
    className: slots.paginationIcon({
      class: originalProps.classNames?.paginationIcon
    })
  })

  const getPaginationMobileIconProps: PropGetter = () => ({
    className: slots.paginationMobileIcon({
      class: originalProps.classNames?.paginationMobileIcon
    })
  })

  const getPaginationTextProps: PropGetter = () => ({
    className: slots.paginationText({
      class: originalProps.classNames?.paginationText
    })
  })

  return {
    slots,
    classNames: originalProps.classNames,
    isFirstPage,
    isLastPage,
    getPaginationContainerProps,
    getPaginationButtonContainerProps,
    getPaginationButtonProps,
    getPaginationIconProps,
    getPaginationMobileIconProps,
    getPaginationTextProps
  } as const
}

const useTaskDetailModalProps = (originalProps: TaskDetailModalProps) => {
  const hasAttachments = (originalProps.task?.attachments?.length ?? 0) > 0

  const slots = detailModalTva({ hasAttachments, size: 'full' } as any)

  const getModalContentProps: PropGetter = () => ({
    className: slots.modalContent({
      class: originalProps.classNames?.modalContent
    })
  })

  const getModalHeaderProps: PropGetter = () => ({
    className: slots.modalHeader({
      class: originalProps.classNames?.modalHeader
    })
  })

  const getModalBodyProps: PropGetter = () => ({
    className: slots.modalBody({ class: originalProps.classNames?.modalBody })
  })

  const getModalFooterProps: PropGetter = () => ({
    className: slots.modalFooter({
      class: originalProps.classNames?.modalFooter
    })
  })

  const getTitleProps: PropGetter = () => ({
    className: slots.title({ class: originalProps.classNames?.title })
  })

  const getDescriptionProps: PropGetter = () => ({
    className: slots.description({
      class: originalProps.classNames?.description
    })
  })

  const getOwnerContainerProps: PropGetter = () => ({
    className: slots.ownerContainer({
      class: originalProps.classNames?.ownerContainer
    })
  })

  const getAttachmentsSectionProps: PropGetter = () => ({
    className: slots.attachmentsSection({
      class: originalProps.classNames?.attachmentsSection
    })
  })

  const getAttachmentsGridProps: PropGetter = () => ({
    className: slots.attachmentsGrid({
      class: originalProps.classNames?.attachmentsGrid
    })
  })

  const getAttachmentImageWrapperProps: PropGetter = () => ({
    className: slots.attachmentImageWrapper({
      class: originalProps.classNames?.attachmentImageWrapper
    })
  })

  const getAttachmentImageProps: PropGetter = () => ({
    className: slots.attachmentImage({
      class: originalProps.classNames?.attachmentImage
    })
  })

  const getAttachmentNameProps: PropGetter = () => ({
    className: slots.attachmentName({
      class: originalProps.classNames?.attachmentName
    })
  })

  const getPdfLinkProps: PropGetter = () => ({
    className: slots.pdfLink({ class: originalProps.classNames?.pdfLink })
  })

  const getDocLinkProps: PropGetter = () => ({
    className: slots.docLink({ class: originalProps.classNames?.docLink })
  })

  const getSheetLinkProps: PropGetter = () => ({
    className: slots.sheetLink({ class: originalProps.classNames?.sheetLink })
  })

  const getDefaultLinkProps: PropGetter = () => ({
    className: slots.defaultLink({
      class: originalProps.classNames?.defaultLink
    })
  })

  const getIconProps: PropGetter = () => ({
    className: slots.icon({ class: originalProps.classNames?.icon })
  })

  return {
    slots,
    classNames: originalProps.classNames,
    hasAttachments,
    getModalContentProps,
    getModalHeaderProps,
    getModalBodyProps,
    getModalFooterProps,
    getTitleProps,
    getDescriptionProps,
    getOwnerContainerProps,
    getAttachmentsSectionProps,
    getAttachmentsGridProps,
    getAttachmentImageWrapperProps,
    getAttachmentImageProps,
    getAttachmentNameProps,
    getPdfLinkProps,
    getDocLinkProps,
    getSheetLinkProps,
    getDefaultLinkProps,
    getIconProps
  } as const
}

const useTaskDrawerProps = (originalProps: TaskDrawerProps) => {
  const slots = drawerTva({ isValid: false, isLoading: false } as any)

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
    className: slots.submitButton({
      class: originalProps.classNames?.submitButton
    })
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
  } as const
}

const useCopyTextProps = (
  originalProps: CopyTextProps & { isCopied: boolean }
) => {
  const slots = copyTextTva({
    variant: originalProps.variant || 'default',
    isCopied: originalProps.isCopied
  } as any)

  const getBaseProps: PropGetter = () => ({
    className: slots.base({ class: originalProps.className })
  })

  const getTextProps: PropGetter = () => ({
    className: slots.text({ class: originalProps.textClassName })
  })

  const getButtonProps: PropGetter = () => ({
    className: slots.button()
  })

  const getIconProps: PropGetter = () => ({
    className: slots.icon()
  })

  const getSuccessIconProps: PropGetter = () => ({
    className: slots.successIcon()
  })

  return {
    slots,
    getBaseProps,
    getTextProps,
    getButtonProps,
    getIconProps,
    getSuccessIconProps
  } as const
}

const useTableCellProps = () => {
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

export {
  useTaskSectionProps,
  useHeaderContentProps,
  useBottomContentProps,
  useTaskDetailModalProps,
  useTaskDrawerProps,
  useCopyTextProps,
  useTableCellProps
}

export type {
  // Component Props
  TaskSectionProps,
  HeaderContentProps,
  BottomContentProps,
  TaskDetailModalProps,
  TaskDrawerProps,
  CopyTextProps,

  // TVA Props
  TaskSectionTvaProps,
  HeaderContentTvaProps,
  BottomContentTvaProps,
  TaskDetailModalTvaProps,
  TaskDrawerTvaProps,
  CopyTextTvaProps,
  TableCellTvaProps,

  // Slot Types
  MainTvaSlots,
  HeaderContentTvaSlots,
  BottomContentTvaSlots,
  DetailModalTvaSlots,
  DrawerTvaSlots,
  CopyTextTvaSlots,
  TableCellTvaSlots,

  // Data Types
  Task,
  Owner,
  Attachment,
  AttachmentType,
  Status,
  Tags,
  Project
}
