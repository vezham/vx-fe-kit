import { Icon } from '@iconify/react'

import { Button, Dropdown, type SortDescriptor } from '@vezham/react-v3'

import { sortOptions } from '../../data'

type SortDropdownProps = {
  activeSortLabel: string
  onSortChange: (descriptor: SortDescriptor) => void
}

export function SortDropdown({
  activeSortLabel,
  onSortChange
}: SortDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">
          <Icon icon="lucide:arrow-up-down" width={16} />
          Sort by {activeSortLabel}
          <Icon icon="lucide:chevron-down" width={16} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu aria-label="Sort classes">
          {sortOptions.map(option => (
            <Dropdown.Item
              key={option.key}
              id={option.key}
              textValue={option.label}
              onPress={() => onSortChange(option.descriptor)}>
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
