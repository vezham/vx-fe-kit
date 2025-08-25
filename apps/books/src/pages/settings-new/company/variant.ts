import { cn } from '@heroui/react'

export const profileSettingStyles = {
  container: (className?: string) =>
    cn('w-full max-w-2xl p-2 xl:mx-12', className),

  // Text
  sectionTitle: 'text-default-700 text-base font-medium',
  sectionSubtitle: 'text-default-400 mt-1 text-sm font-normal',
  inputLabel: 'text-default-700 text-base font-medium',

  // Layout
  card: 'bg-default-100 mt-4',
  grid: 'grid grid-cols-12 items-center gap-2',
  gridSection: 'col-span-12 md:col-span-6',
  gridSectiontwo: 'col-span-12 md:col-span-4',

  // Avatar + Badge
  avatar: 'h-16 w-16',
  badge: 'w-5 h-5',
  badgeButton: 'bg-background text-default-500 h-5 w-5 min-w-5 p-0',
  badgeIcon: 'h-[9px] w-[9px]',
  companyName: 'text-default-600 text-sm font-medium',

  // Inputs
  input: 'mt-2',
  select: 'mt-2',
  fullWidthSelect: 'col-span-12 mt-2'
}
