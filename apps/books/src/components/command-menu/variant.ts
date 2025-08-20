import { cn } from '@heroui/react'

export const commandMenuStyles = {
  modal: (isDarkMode?: boolean) => ({
    base: cn(
      'mx-auto max-w-md',
      isDarkMode ? 'bg-neutral-800 text-white' : 'bg-white text-black'
    )
  }),
  modalContent: 'p-2',

  input: {
    base: (isDarkMode?: boolean) =>
      cn(
        'mb-2',
        isDarkMode
          ? 'border-neutral-700 placeholder:text-neutral-400'
          : 'border-default-200 placeholder:text-foreground-500'
      ),

    size: 'lg',
    variant: 'bordered',

    startContent: (isDarkMode?: boolean) =>
      cn(isDarkMode ? 'text-neutral-400' : 'text-default-400'),

    endContentKbd: (isDarkMode?: boolean) =>
      cn(
        'rounded-small shadow-small text-small hidden px-1.5 py-0.5 font-sans sm:inline-block',
        isDarkMode
          ? 'bg-neutral-700 text-neutral-300'
          : 'bg-default-100 text-foreground-600'
      ),

    endContentClearButton: (isDarkMode?: boolean) =>
      cn(
        isDarkMode
          ? 'text-neutral-300 hover:bg-neutral-700'
          : 'text-default-500 hover:bg-default-200 mr-1'
      )
  },

  commandItem: {
    base: (isDarkMode?: boolean) =>
      cn(
        'flex cursor-pointer items-center rounded-md px-3 py-2',
        isDarkMode ? 'hover:bg-neutral-700' : 'hover:bg-default-100'
      ),
    iconWrapper: (isDarkMode?: boolean) =>
      cn(
        'mr-3 flex h-6 w-6 items-center justify-center rounded-md',
        isDarkMode ? 'bg-neutral-700' : 'bg-default-100'
      ),
    icon: (isDarkMode?: boolean) =>
      cn(isDarkMode ? 'text-neutral-300' : 'text-default-500'),
    title: 'flex-1 text-sm',
    chevronIcon: (isDarkMode?: boolean) =>
      cn(isDarkMode ? 'text-neutral-400' : 'text-default-400')
  },

  sectionTitle: (isDarkMode?: boolean) =>
    cn(
      'px-3 py-1 text-xs font-medium uppercase',
      isDarkMode ? 'text-neutral-400' : 'text-default-500'
    ),

  sectionItems: 'mt-1',

  noResults: (isDarkMode?: boolean) =>
    cn(
      'py-12 text-center',
      isDarkMode ? 'text-neutral-400' : 'text-default-500'
    ),
  noResultsTitle: 'mb-2',
  noResultsSubtitle: 'text-sm'
}
