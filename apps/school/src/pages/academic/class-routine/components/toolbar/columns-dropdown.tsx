import { Icon } from '@iconify/react'

import { Button, Dropdown } from '@vezham/react-v3'

import { classRoutineColumnOptions } from '../../data'
import type { ClassRoutineColumnKey, ColumnsDropdownProps } from '../../types'
import { classNames } from '../../variants'

export function ColumnsDropdown({
  visibleColumns,
  onVisibleColumnsChange
}: ColumnsDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">
          <Icon icon="lucide:columns-3" width={16} />
          Columns
          <Icon icon="lucide:chevron-down" width={16} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu
          aria-label="Show or hide class routine columns"
          selectedKeys={visibleColumns}
          selectionMode="multiple"
          onSelectionChange={keys => {
            if (keys === 'all') {
              onVisibleColumnsChange(
                new Set(classRoutineColumnOptions.map(option => option.key))
              )
              return
            }

            onVisibleColumnsChange(
              new Set(Array.from(keys) as ClassRoutineColumnKey[])
            )
          }}>
          {classRoutineColumnOptions.map(option => (
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
