import { Icon } from '@iconify/react'

import { Button, Dropdown } from '@vezham/react-v3'

import { classNames } from '../class-routine/variants'

type ColumnOption = {
  key: string
  label: string
}

type ColumnsDropdownProps = {
  ariaLabel?: string
  buttonLabel?: string
  columns: readonly ColumnOption[]
  visibleColumns: Set<string>
  onVisibleColumnsChange: (columns: Set<string>) => void
}

export function ColumnsDropdown({
  ariaLabel = 'Show or hide table columns',
  buttonLabel = 'Columns',
  columns,
  visibleColumns,
  onVisibleColumnsChange
}: ColumnsDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">
          <Icon icon="lucide:columns-3" width={16} />
          {buttonLabel}
          <Icon icon="lucide:chevron-down" width={16} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu
          aria-label={ariaLabel}
          selectedKeys={visibleColumns}
          selectionMode="multiple"
          onSelectionChange={keys => {
            if (keys === 'all') {
              onVisibleColumnsChange(new Set(columns.map(option => option.key)))
              return
            }

            onVisibleColumnsChange(new Set(Array.from(keys) as string[]))
          }}>
          {columns.map(option => (
            <Dropdown.Item
              key={option.key}
              id={option.key}
              textValue={option.label}>
              <span className={classNames.dateOptionLabel}>
                {option.label}
                <Dropdown.ItemIndicator />
              </span>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
