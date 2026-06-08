import {
  Label,
  ListBox,
  SearchField,
  Select,
  type SortDescriptor,
  Surface
} from '@vezham/react-v3'

import { rowCountOptions, sortOptions } from '../../data'
import type {
  ClassRoutineColumnKey,
  CustomDateRangeValue,
  DatePresetKey,
  FilterDraft
} from '../../types'
import { classNames } from '../../variants'
import { ColumnsDropdown } from './columns-dropdown'
import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import { SortDropdown } from './sort-dropdown'

type ClassRoutineToolbarProps = {
  activeDateLabel: string
  activeSortLabel: string
  datePreset: DatePresetKey
  draftFilters: FilterDraft
  isCustomDateRangeOpen: boolean
  isDateDropdownOpen: boolean
  rowsPerPage: string
  searchQuery: string
  visibleColumns: Set<ClassRoutineColumnKey>
  setDraftFilters: (filters: FilterDraft) => void
  sortField: (typeof sortOptions)[number]['column']
  sortDirection: SortDescriptor['direction']
  onApplyFilters: () => void
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: DatePresetKey) => void
  onResetFilters: () => void
  onRowsPerPageChange: (value: string | number | null) => void
  onSearchChange: (value: string) => void
  onVisibleColumnsChange: (columns: Set<ClassRoutineColumnKey>) => void
  onSortFieldChange: (column: (typeof sortOptions)[number]['column']) => void
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
}

export function ClassRoutineToolbar({
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
  sortField,
  sortDirection,
  onApplyFilters,
  onCustomDateRangeChange,
  onCustomDateRangeOpenChange,
  onDateDropdownOpenChange,
  onDatePresetChange,
  onResetFilters,
  onRowsPerPageChange,
  onSearchChange,
  onVisibleColumnsChange,
  onSortFieldChange,
  onSortDirectionChange
}: ClassRoutineToolbarProps) {
  return (
    <Surface className={classNames.toolbar}>
      <div className={classNames.headerRow}>
        <div>
          <p className={classNames.mutedText}>Academic</p>
          <h1 className={classNames.title}>Class Routine</h1>
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
            visibleColumns={visibleColumns}
            onVisibleColumnsChange={onVisibleColumnsChange}
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
