import {
  Label,
  ListBox,
  SearchField,
  Select,
  type SortDescriptor,
  Surface
} from '@vezham/react-v3'

import { rowCountOptions } from '../../data'
import type {
  CustomDateRangeValue,
  DatePresetKey,
  FilterDraft
} from '../../types'
import { classNames } from '../../variants'
import { DateRangeDropdown } from './date-range-dropdown'
import { FilterDropdown } from './filter-dropdown'
import { SortDropdown } from './sort-dropdown'

type ClassesToolbarProps = {
  activeDateLabel: string
  activeSortLabel: string
  datePreset: DatePresetKey
  draftFilters: FilterDraft
  isCustomDateRangeOpen: boolean
  isDateDropdownOpen: boolean
  rowsPerPage: string
  searchQuery: string
  setDraftFilters: (filters: FilterDraft) => void
  onApplyFilters: () => void
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: DatePresetKey) => void
  onResetFilters: () => void
  onRowsPerPageChange: (value: string | number | null) => void
  onSearchChange: (value: string) => void
  onSortChange: (descriptor: SortDescriptor) => void
}

export function ClassesToolbar({
  activeDateLabel,
  activeSortLabel,
  datePreset,
  draftFilters,
  isCustomDateRangeOpen,
  isDateDropdownOpen,
  rowsPerPage,
  searchQuery,
  setDraftFilters,
  onApplyFilters,
  onCustomDateRangeChange,
  onCustomDateRangeOpenChange,
  onDateDropdownOpenChange,
  onDatePresetChange,
  onResetFilters,
  onRowsPerPageChange,
  onSearchChange,
  onSortChange
}: ClassesToolbarProps) {
  return (
    <Surface className={classNames.toolbar}>
      <div className={classNames.headerRow}>
        <div>
          <p className={classNames.mutedText}>Classes</p>
          <h1 className={classNames.title}>Classes List</h1>
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

          <SortDropdown
            activeSortLabel={activeSortLabel}
            onSortChange={onSortChange}
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
          aria-label="Search classes"
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
