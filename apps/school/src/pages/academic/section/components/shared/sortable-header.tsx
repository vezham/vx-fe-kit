import { Icon } from '@iconify/react'

import type { SortableHeaderProps } from '../../types'
import { classNames } from '../../variants'

export function SortableHeader({
  children,
  sortDirection
}: SortableHeaderProps) {
  const icon =
    sortDirection === 'ascending'
      ? 'lucide:chevron-up'
      : sortDirection === 'descending'
        ? 'lucide:chevron-down'
        : 'lucide:chevrons-up-down'

  return (
    <span className={classNames.sortableHeader}>
      {children}
      <Icon icon={icon} width={14} />
    </span>
  )
}
