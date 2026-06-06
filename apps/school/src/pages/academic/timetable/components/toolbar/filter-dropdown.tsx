import { Icon } from '@iconify/react'

import { Button, Dropdown, Surface } from '@vezham/react-v3'

import {
  classOptions,
  dayOptions,
  sectionOptions,
  subjectOptions,
  teachers
} from '../../data'
import type { FilterDropdownProps } from '../../types'
import { classNames } from '../../variants'
import { FilterSelect } from './filter-select'

export function FilterDropdown({
  draftFilters,
  setDraftFilters,
  onApply,
  onReset
}: FilterDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">
          <Icon icon="lucide:filter" width={16} />
          Filter
          <Icon icon="lucide:chevron-down" width={16} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Surface className={classNames.filterPanel}>
          <h2 className={classNames.filterTitle}>Filter</h2>
          <FilterSelect
            label="Class"
            options={classOptions}
            placeholder="Select class"
            value={draftFilters.className}
            onChange={value =>
              setDraftFilters({ ...draftFilters, className: value })
            }
          />
          <FilterSelect
            label="Section"
            options={sectionOptions}
            placeholder="Select section"
            value={draftFilters.section}
            onChange={value =>
              setDraftFilters({ ...draftFilters, section: value })
            }
          />
          <FilterSelect
            label="Teacher"
            options={teachers.map(teacher => teacher.name)}
            placeholder="Select teacher"
            value={draftFilters.teacher}
            onChange={value =>
              setDraftFilters({ ...draftFilters, teacher: value })
            }
          />
          <FilterSelect
            label="Subject"
            options={subjectOptions}
            placeholder="Select subject"
            value={draftFilters.subject}
            onChange={value =>
              setDraftFilters({ ...draftFilters, subject: value })
            }
          />
          <FilterSelect
            label="Day"
            options={dayOptions}
            placeholder="Select day"
            value={draftFilters.day}
            onChange={value => setDraftFilters({ ...draftFilters, day: value })}
          />

          <div className={classNames.filterActions}>
            <Button variant="secondary" onPress={onReset}>
              Reset
            </Button>
            <Button onPress={onApply}>Apply</Button>
          </div>
        </Surface>
      </Dropdown.Popover>
    </Dropdown>
  )
}
