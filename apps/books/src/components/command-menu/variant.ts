import { cn } from '@heroui/react'

export const commandMenuStyles = {
  modal: (isDarkMode?: boolean) => ({
    base: cn(
      'mx-auto max-w-md',
      isDarkMode
        ? 'bg-foreground text-default-400'
        : 'bg-background text-default-400'
    )
  }),

  input: {
    base: (isDarkMode?: boolean) =>
      cn(
        isDarkMode
          ? 'placeholder:text-default-400'
          : 'placeholder:text-default-400'
      ),

    size: 'lg',
    variant: '',

    startContent: (isDarkMode?: boolean) =>
      cn(isDarkMode ? 'text-neutral-400' : 'text-default-400'),

    endContentKbd: (isDarkMode?: boolean) =>
      cn(
        'rounded-small text-small hidden px-2 py-1 font-medium md:block',
        isDarkMode
          ? 'bg-default-900 text-neutral-300'
          : 'bg-default-200 text-default-900'
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
