// import { type VariantProps, tv } from '@vezham/react/v2'

// export const mainTva = tv({
//   slots: {
//     wrapper: 'flex items-start justify-between p-0',
//     card: 'mt-4',
//     cardBody: '',
//     tableWrapper: 'h-full w-full sm:p-2',
//     loadingContainer: 'flex h-75 items-center justify-center',
//     outletContainer: 'mt-4'
//   },

// })

// export const headerContentTva = tv({
//   slots: {
//     topBarContainer: 'mb-[18px] flex items-center justify-between gap-4',
//     topBarLeft: 'flex flex-row justify-between gap-4 sm:items-center sm:gap-2',
//     topBarLeftInner: 'flex items-center gap-2',
//     membersText: 'text-default-700 text-base font-medium',
//     chip: 'text-default-500 flex items-center',
//     selectedActionsContainer: 'flex items-center gap-2',
//     divider: 'hidden h-5 sm:flex',
//     selectedCountText: 'text-default-800 text-sm whitespace-nowrap',
//     selectedActions: 'min-h-[25px] min-w-[25px]',
//     selectedActionsButton: 'hidden sm:flex',
//     selectedActionsMoreButton: 'sm:hidden',
//     dropdownIcon: 'text-default-400',
//     topBarRight: 'flex items-center',
//     searchContainer: 'flex items-center',
//     searchButton: [
//       'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
//       'bg-default-100 hover:bg-default-200'
//     ],
//     searchInput: 'mr-2',
//     searchCloseIcon: 'text-default-400',
//     filterSortButtons: 'hidden sm:block',
//     filterSortButton: '',
//     filterSortIcon: 'text-default-400',
//     popoverContent: '',
//     filterPopoverContent: 'h-55 w-50 overflow-y-auto p-4 py-5',
//     mobileActions: 'sm:hidden',
//     mobileActionsButton: 'text-default-400',
//     mobileFilterButton: 'text-default-700 -ml-2 justify-start',
//     searchFocusButton: 'focus:outline-none'
//   },
// })

// export const bottomContentTva = tv({
//   slots: {
//     paginationContainer: 'flex w-full items-center justify-between gap-2 py-4',
//     paginationButtonContainer: 'flex items-center gap-2',
//     paginationButton: 'flex min-w-[5px] items-center gap-1',
//     paginationIcon: 'hidden sm:flex',
//     paginationMobileIcon: 'inline sm:hidden',
//     paginationText: 'flex hidden items-center gap-1 sm:inline'
//   }
// })

// export const detailModalTva = tv({
//   slots: {
//     modalContent: '',
//     modalHeader: '',
//     modalBody: 'space-y-4',
//     modalFooter: '',
//     title: 'text-lg font-semibold',
//     description: 'text-default-500 text-sm',
//     ownerContainer: 'flex items-center justify-between',
//     attachmentsSection: '',
//     attachmentsGrid: 'mt-2 grid gap-2',
//     attachmentImageWrapper: 'w-fit overflow-hidden rounded-md border',
//     attachmentImage: 'object-cover',
//     attachmentName: 'text-default-500 px-2 py-1 text-xs',
//     pdfLink: 'text-danger flex items-center gap-2 text-sm hover:underline',
//     docLink: 'text-primary flex items-center gap-2 text-sm hover:underline',
//     sheetLink: 'text-success flex items-center gap-2 text-sm hover:underline',
//     defaultLink:
//       'text-default-500 flex items-center gap-2 text-sm hover:underline',
//     icon: ''
//   }
// })

// export const drawerTva = tv({
//   slots: {
//     drawerHeader:
//       'border-default-200/50 bg-content1/50 flex items-center justify-between border-b px-2 py-2 backdrop-blur-lg',
//     closeButton: '',
//     headerTitle: 'flex items-center justify-between gap-2',
//     taskChip: '',
//     drawerBody: 'space-y-3',
//     loadingText: 'text-default-500 flex items-center gap-2 text-sm',
//     gridContainer: 'grid grid-cols-1 gap-3 md:grid-cols-2',
//     tagsContainer: 'flex flex-wrap gap-1',
//     attachmentsContainer: 'flex flex-wrap gap-2',
//     drawerFooter: '',
//     cancelButton: '',
//     submitButton: '',
//     input: '',
//     select: '',
//     chip: ''
//   }
// })

// export const copyTextTva = tv({
//   slots: {
//     base: 'flex items-center gap-2',
//     text: '',
//     button: 'text-foreground h-7 w-7 min-w-7',
//     icon: 'h-[14px] w-[14px]',
//     successIcon: 'text-success'
//   }
// })

// export const tableCellTva = tv({
//   slots: {
//     lastLoginContainer: 'flex items-center gap-1',
//     lastLoginIcon: 'text-default-300 h-[16px] w-[16px]',
//     lastLoginText: 'text-small text-default-foreground text-nowrap capitalize',
//     actionsContainer: 'flex items-center justify-end',
//     actionIcon: 'text-default-400 cursor-pointer',
//     actionButton: 'min-h-[5px] min-w-[5px]',
//     tagsContainer: 'flex gap-1',
//     tagChip: 'bg-default-100 text-default-800 rounded-xl px-[6px] capitalize',
//     moreTagChip: 'text-default-500',
//     truncateText: 'max-w-[200px] truncate'
//   },
// })

// export type MainTva = typeof mainTva
// export type HeaderContentTva = typeof headerContentTva
// export type BottomContentTva = typeof bottomContentTva
// export type DetailModalTva = typeof detailModalTva
// export type DrawerTva = typeof drawerTva
// export type CopyTextTva = typeof copyTextTva
// export type TableCellTva = typeof tableCellTva

// export type MainTvaSlots = keyof ReturnType<typeof mainTva>
// export type HeaderContentTvaSlots = keyof ReturnType<typeof headerContentTva>
// export type BottomContentTvaSlots = keyof ReturnType<typeof bottomContentTva>
// export type DetailModalTvaSlots = keyof ReturnType<typeof detailModalTva>
// export type DrawerTvaSlots = keyof ReturnType<typeof drawerTva>
// export type CopyTextTvaSlots = keyof ReturnType<typeof copyTextTva>
// export type TableCellTvaSlots = keyof ReturnType<typeof tableCellTva>

// export type MainTvaProps = VariantProps<typeof mainTva>
// export type HeaderContentTvaProps = VariantProps<typeof headerContentTva>
// export type BottomContentTvaProps = VariantProps<typeof bottomContentTva>
// export type DetailModalTvaProps = VariantProps<typeof detailModalTva>
// export type DrawerTvaProps = VariantProps<typeof drawerTva>
// export type CopyTextTvaProps = VariantProps<typeof copyTextTva>
// export type TableCellTvaProps = VariantProps<typeof tableCellTva>
