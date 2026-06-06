import { Icon } from '@iconify/react'

import type { SortableHeaderProps } from '../../types'
import { classNames } from '../../variants'

export function SortableHeader({
  children,
  sortDirection
}: SortableHeaderProps) {
  return (
    <span className={classNames.sortableHeader}>
      {children}
      {sortDirection === 'ascending' && (
        <Icon icon="lucide:arrow-up" width={14} />
      )}
      {sortDirection === 'descending' && (
        <Icon icon="lucide:arrow-down" width={14} />
      )}
    </span>
  )
}
