import { Label, ListBox, SearchField, Select, Surface } from '@vezham/react-v3'

import { ColumnsDropdown } from '../../../../shared/columns-dropdown'
import { rowCountOptions, scheduleColumnOptions, sortOptions } from '../../data'
import type {
  CustomDateRangeValue,
  DatePresetKey,
  FilterDraft,
  ScheduleColumnKey
} from '../../types'
import { classNames } from '../../variants'
import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import { SortDropdown } from './sort-dropdown'

type ScheduleToolbarProps = {
  activeDateLabel: string
  activeSortLabel: string
  datePreset: DatePresetKey
  draftFilters: FilterDraft
  isCustomDateRangeOpen: boolean
  isDateDropdownOpen: boolean
  rowsPerPage: string
  searchQuery: string
  visibleColumns: Set<ScheduleColumnKey>
  setDraftFilters: (filters: FilterDraft) => void
  onApplyFilters: () => void
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: DatePresetKey) => void
  onResetFilters: () => void
  onRowsPerPageChange: (value: string | number | null) => void
  onSearchChange: (value: string) => void
  onVisibleColumnsChange: (columns: Set<ScheduleColumnKey>) => void
  sortField: (typeof sortOptions)[number]['column']
  sortDirection: 'ascending' | 'descending'
  onSortFieldChange: (column: (typeof sortOptions)[number]['column']) => void
  onSortDirectionChange: (direction: 'ascending' | 'descending') => void
}

export function ScheduleToolbar({
  activeDateLabel,
  activeSortLabel,
  datePreset,
  draftFilters,
  isCustomDateRangeOpen,
  isDateDropdownOpen,
  rowsPerPage,
  searchQuery,
  visibleColumns,
  setDraftFilters,
  onApplyFilters,
  onCustomDateRangeChange,
  onCustomDateRangeOpenChange,
  onDateDropdownOpenChange,
  onDatePresetChange,
  onResetFilters,
  onRowsPerPageChange,
  onSearchChange,
  onVisibleColumnsChange,
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange
}: ScheduleToolbarProps) {
  return (
    <Surface className={classNames.toolbar}>
      <div className={classNames.headerRow}>
        <div>
          <p className={classNames.mutedText}>Classes</p>
          <h1 className={classNames.title}>Schedule List</h1>
        </div>

        <div className={classNames.toolbarActions}>
          <DateRangeDropdown
            activeDateLabel={activeDateLabel}
            datePreset={datePreset}
            isCustomDateRangeOpen={isCustomDateRangeOpen}
            isDateDropdownOpen={isDateDropdownOpen}
            onCustomDateRangeChange={onCustomDateRangeChange}
            onCustomDateRangeOpenChange={onCustomDateRangeOpenChange}
            onDateDropdownOpenChange={onDateDropdownOpenChange}
            onDatePresetChange={onDatePresetChange}
          />

          <FilterDropdown
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
            onApply={onApplyFilters}
            onReset={onResetFilters}
          />

          <ColumnsDropdown
            columns={scheduleColumnOptions}
            visibleColumns={visibleColumns as Set<string>}
            onVisibleColumnsChange={columns =>
              onVisibleColumnsChange(
                new Set(Array.from(columns) as ScheduleColumnKey[])
              )
            }
          />

          <SortDropdown
            activeSortLabel={activeSortLabel}
            sortField={sortField}
            sortDirection={sortDirection}
            onSortFieldChange={onSortFieldChange}
            onSortDirectionChange={onSortDirectionChange}
          />
        </div>
      </div>

      <div className={classNames.headerRow}>
        <div className={classNames.rowsControls}>
          <Label>Rows per page</Label>
          <Select
            aria-label="Rows per page"
            value={rowsPerPage}
            onChange={onRowsPerPageChange}>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {rowCountOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <Label>Entries</Label>
        </div>

        <SearchField
          aria-label="Search schedules"
          value={searchQuery}
          onChange={onSearchChange}>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>
    </Surface>
  )
}
