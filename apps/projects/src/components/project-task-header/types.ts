import { RefObject } from 'react'

import { PropGetter } from '@vezham/react-utils'
import type { SlotsToClasses } from '@vezham/react-utils'
import type { Selection, SortDescriptor } from '@vezham/react/v2'

import { HeaderContentTvaSlots, headerContentTva } from './variant'

export interface HeaderContentProps {
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
  searchInputRef: RefObject<HTMLInputElement | null>
  setFilterValue: (value: string) => void
  classNames?: SlotsToClasses<HeaderContentTvaSlots>
}

export const useHeaderContentProps = (originalProps: HeaderContentProps) => {
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
