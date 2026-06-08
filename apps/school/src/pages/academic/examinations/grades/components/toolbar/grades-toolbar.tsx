import {
  Label,
  ListBox,
  SearchField,
  Select,
  type SortDescriptor,
  Surface
} from '@vezham/react-v3'

import { ColumnsDropdown } from '../../../../shared/columns-dropdown'
import { gradeColumnOptions, rowCountOptions } from '../../data'
import type {
  CustomDateRangeValue,
  DatePresetKey,
  FilterDraft,
  GradeColumnKey
} from '../../types'
import { classNames } from '../../variants'
import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import { SortDropdown } from './sort-dropdown'

type GradesToolbarProps = {
  activeDateLabel: string
  activeSortLabel: string
  datePreset: DatePresetKey
  draftFilters: FilterDraft
  isCustomDateRangeOpen: boolean
  isDateDropdownOpen: boolean
  rowsPerPage: string
  searchQuery: string
  visibleColumns: Set<GradeColumnKey>
  setDraftFilters: (filters: FilterDraft) => void
  onApplyFilters: () => void
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: DatePresetKey) => void
  onResetFilters: () => void
  onRowsPerPageChange: (value: string | number | null) => void
  onSearchChange: (value: string) => void
  sortDirection: SortDescriptor['direction']
  sortField: SortDescriptor['column']
  onSortDirectionChange: (direction: SortDescriptor['direction']) => void
  onSortFieldChange: (column: SortDescriptor['column']) => void
  onVisibleColumnsChange: (columns: Set<GradeColumnKey>) => void
}

export function GradesToolbar({
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
  sortDirection,
  sortField,
  onSortDirectionChange,
  onSortFieldChange,
  onVisibleColumnsChange
}: GradesToolbarProps) {
  return (
    <Surface className={classNames.toolbar}>
      <div className={classNames.headerRow}>
        <div>
          <p className={classNames.mutedText}>Academic</p>
          <h1 className={classNames.title}>Grades</h1>
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
            ariaLabel="Show or hide grade columns"
            options={gradeColumnOptions}
            visibleColumns={visibleColumns}
            onVisibleColumnsChange={onVisibleColumnsChange}
          />

          <SortDropdown
            activeSortLabel={activeSortLabel}
            sortDirection={sortDirection}
            sortField={sortField}
            onSortDirectionChange={onSortDirectionChange}
            onSortFieldChange={onSortFieldChange}
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
          aria-label="Search grades"
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
