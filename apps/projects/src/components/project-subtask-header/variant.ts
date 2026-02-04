import { tv } from '@vezham/react/v2'

export const headerContentTva = tv({
  slots: {
    topBarContainer: 'mb-[18px] flex items-center justify-between gap-4',
    topBarLeft: 'flex flex-row justify-between gap-4 sm:items-center sm:gap-2',
    topBarLeftInner: 'flex items-center gap-2',
    membersText: 'text-default-700 text-base font-medium',
    chip: 'text-default-500 flex items-center',
    selectedActionsContainer: 'flex items-center gap-2',
    divider: 'hidden h-5 sm:flex',
    selectedCountText: 'text-default-800 text-sm whitespace-nowrap',
    selectedActions: 'min-h-[25px] min-w-[25px]',
    selectedActionsButton: 'hidden sm:flex',
    selectedActionsMoreButton: 'sm:hidden',
    dropdownIcon: 'text-default-400',
    topBarRight: 'flex items-center',
    searchContainer: 'flex items-center',
    searchButton: [
      'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
      'bg-default-100 hover:bg-default-200'
    ],
    searchInput: 'mr-2',
    searchCloseIcon: 'text-default-400',
    filterSortButtons: 'hidden sm:block',
    filterSortButton: '',
    filterSortIcon: 'text-default-400',
    popoverContent: '',
    filterPopoverContent: 'h-55 w-50 overflow-y-auto p-4 py-5',
    mobileActions: 'sm:hidden',
    mobileActionsButton: 'text-default-400',
    mobileFilterButton: 'text-default-700 -ml-2 justify-start',
    searchFocusButton: 'focus:outline-none'
  }
})

export type HeaderContentTva = typeof headerContentTva
export type HeaderContentTvaSlots = keyof ReturnType<typeof headerContentTva>
