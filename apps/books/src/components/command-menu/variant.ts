// src/components/CommandMenu/variants.ts

export const commandMenuStyles = {
  modal: {
    base: 'max-w-md mx-auto',
    backdrop: 'bg-background/5 backdrop-blur-3xl'
  },
  modalContent: 'p-2',
  input: {
    base: 'mb-2',
    size: 'lg',
    variant: 'bordered',
    startContent: 'text-default-400',
    endContentKbd: 'hidden sm:inline-block',
    endContentClearButton: 'mr-1'
  },
  commandItem: {
    base: 'flex cursor-pointer items-center rounded-md px-3 py-2 hover:bg-default-100',
    iconWrapper:
      'bg-default-100 mr-3 flex h-6 w-6 items-center justify-center rounded-md',
    icon: 'text-default-500',
    title: 'flex-1 text-sm',
    chevronIcon: 'text-default-400'
  },
  sectionTitle: 'text-default-500 px-3 py-1 text-xs font-medium uppercase',
  sectionItems: 'mt-1',
  noResults: 'text-default-500 py-12 text-center',
  noResultsTitle: 'mb-2',
  noResultsSubtitle: 'text-sm'
}
