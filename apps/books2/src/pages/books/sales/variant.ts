import { cn } from '@vezham/react/v2'

export const copyTextVariants = {
  default: (className?: string) =>
    cn('text-default-500 flex items-center gap-2', className),
  compact: (className?: string) =>
    cn('text-default-500 flex items-center gap-1', className)
}

export const tableStyles = {
  wrapper: 'h-full w-full sm:p-2',
  topBarContainer: 'mb-[18px] flex items-center justify-between gap-4',
  topBarLeft: 'flex sm:items-center flex-row justify-between  gap-4 sm:gap-2',
  topBarLeftInner: 'flex items-center gap-2',
  membersText: 'text-default-700 text-base font-medium',
  chip: 'text-default-500 flex items-center',
  selectedActionsContainer: 'flex items-center gap-2',
  divider: 'hidden h-5 sm:flex',
  selectedCountText: 'text-default-800 text-sm whitespace-nowrap',
  actionButton: 'min-w-[5px] min-h-[5px]',
  selectedActions: 'min-w-[25px] min-h-[25px]',
  selectedActionsButton: 'bg-default-100 text-default-800 hidden sm:flex',
  selectedActionsMoreButton: 'text-default-400 sm:hidden ',
  dropdownIcon: 'text-default-400',
  topBarRight: 'flex items-center',
  searchContainer: 'flex items-center',
  searchButton:
    'bg-default-100 hover:bg-default-200 flex h-8 w-8 items-center justify-center rounded-full transition-colors',
  searchInput: 'mr-2',
  searchCloseIcon: 'text-default-400',
  filterSortButtons: 'hidden sm:block',
  filterSortButton: 'bg-default-100 text-default-800',
  filterSortIcon: 'text-default-400',
  popoverContent: '',
  mobpopoverContent: '',
  mobfilterPopoverContent: '',
  filterPopoverContent: 'overflow-y-auto h-55 w-50 p-4 py-5',
  mobileActions: 'sm:hidden',
  mobileActionsButton: 'text-default-400',
  mobileFilterButton: 'text-default-700 -ml-2 justify-start',
  table: {
    td: 'before:bg-transparent',
    sortIcon: 'ml-1 text-default-400',
    // sortIconHover: 'opacity-0 group-hover:opacity-100 transition-opacity',
    headerContent: 'w-full flex justify-between items-center'
  },
  // Changed to justify-between
  tableHeader: 'flex items-center ',
  tableHeaderUser: 'flex w-full  items-center justify-center ',
  tableHeaderInfo: 'flex  items-center justify-between',
  sortIcon: 'text-default-400',
  cell: {
    userInfoName: 'text-default-foreground',
    userInfoDescription: 'text-default-500',
    lastLoginContainer: 'flex items-center gap-1',
    lastLoginIcon: 'text-default-300 h-[16px] w-[16px]',
    lastLoginText: 'text-small text-default-foreground text-nowrap capitalize',
    statusContainer:
      'bg-default-100 flex w-fit items-center gap-[2px] rounded-lg px-2 py-1',
    statusText: 'text-default-800 px-1',
    actionsContainer: 'flex items-center gap-2 justify-end',
    actionIcon: 'text-default-400 cursor-pointer',
    actionDropdownButton: 'text-default-400',
    actionButton: 'max-w-[20px] max-h-[20px]',
    copyButton: 'cursor-pointer hover:text-primary-500 h-7 w-7 min-w-7'
  },
  paginationContainer: 'flex w-full items-center  justify-between gap-2  py-4',
  paginationButtonContainer: 'gap-2 items-center flex',
  tableSectionContainer: 'flex items-start justify-between',
  tableWrapper: 'w-full',
  tableCard: 'sm:border-default-200 mt-4 sm:border bg-transparent'
}

export const teamSettingStyles = {
  wrapper: ' p-2 w-full',
  titleContainer: 'flex justify-between w-full',
  titleTab: 'w-full ',
  endContent: '',
  titleText: 'text-default-700 text-base font-medium',
  descriptionText: 'text-default-400 mt-1 text-sm font-normal',
  modalHeader: 'flex flex-col gap-1',
  modalBodyTopContainer: 'flex items-center justify-between',
  modalBodyTitleText: 'text-default-700 mt-1.5 text-sm font-medium',
  inviteButton: 'bg-default-foreground text-background',
  inviteButtonIcon: 'h-3 w-3',
  emailAndRoleContainer:
    'flex sm:flex-row flex-col w-full  items-center sm:justify-between gap-3',
  inputGroup: 'w-full',
  inputLabelText: 'text-default-500 text-sm font-normal',
  inputField: 'my-1',
  inputWrapper: 'bg-default-200',
  addMoreButton: 'bg-default-200 w-full sm:w-auto text-default-700 mt-3 ',
  addMoreButtonIcon: 'h-[18px] w-[18px]',
  doneButton: 'bg-default-foreground text-background',
  modalFooter: 'flex items-center justify-between py-2',
  learnMoreText: 'text-default-500 relative mb-2 text-xs',
  learnMoreLink: 'text-default-foreground',
  learnMoreIcon:
    'text-default-foreground absolute top-0 right-0 h-2.5 w-2.5 translate-x-[8px] translate-y-[-2px]',
  sendInviteButton: 'bg-default-foreground text-background',
  tableSectionContainer: 'flex items-start justify-between p-0',
  tableWrapper: 'w-full',
  tableCard: 'sm:border-default-200 mt-4 sm:border bg-transparent',
  roleCard: 'border-default-200 w-full border bg-transparent',
  roleCardBody: 'px-4',
  roleCardHeader: 'pb-3',
  roleCardTitle: 'text-default-700 text-base font-medium',
  roleCardDescription: 'text-default-400 mt-1 text-sm font-normal',
  rolePermissionsGrid: 'grid gap-6 md:grid-cols-3',
  rolePermissionsItem: 'space-y-3',
  rolePermissionsTitle: 'font-medium',
  rolePermissionsList: 'space-y-2 text-sm',
  rolePermission: 'flex items-center gap-2'
}
