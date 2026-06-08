import { Icon } from '@iconify/react'

import { Button, Dropdown } from '@vezham/react-v3'

type ColumnOption<Key extends string> = {
  key: Key
  label: string
}

type ColumnsDropdownProps<Key extends string> = {
  ariaLabel: string
  buttonLabel?: string
  options?: readonly ColumnOption<Key>[]
  columns?: readonly ColumnOption<Key>[]
  visibleColumns: Set<Key>
  onVisibleColumnsChange: (columns: Set<Key>) => void
}

export function ColumnsDropdown<Key extends string>({
  ariaLabel,
  buttonLabel = 'Columns',
  options,
  columns,
  visibleColumns,
  onVisibleColumnsChange
}: ColumnsDropdownProps<Key>) {
  const resolvedOptions = options ?? columns ?? []

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
              onVisibleColumnsChange(
                new Set(resolvedOptions.map(option => option.key))
              )
              return
            }

            onVisibleColumnsChange(new Set(Array.from(keys) as Key[]))
          }}>
          {resolvedOptions.map(option => (
            <Dropdown.Item
              key={option.key}
              id={option.key}
              textValue={option.label}>
              <span className="flex w-full items-center justify-between">
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
