import { type SortDescriptor } from '@vezham/react-v3'

import { SortDropdown as SharedSortDropdown } from '../../../../shared/sort-dropdown'
import { sortOptions } from '../../data'

type SortDropdownProps = {
  activeSortLabel: string
  sortDescriptor: SortDescriptor
  onSortChange: (descriptor: SortDescriptor) => void
}

export function SortDropdown({
  activeSortLabel,
  sortDescriptor,
  onSortChange
}: SortDropdownProps) {
  return (
    <SharedSortDropdown
      ariaLabel="Sort exam results"
      activeSortLabel={activeSortLabel}
      sortDescriptor={sortDescriptor}
      sortOptions={sortOptions}
      onSortChange={onSortChange}
    />
  )
}
