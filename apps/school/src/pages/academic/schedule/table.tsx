import { Icon } from '@iconify/react'
import { useEffect, useMemo, useRef, useState } from 'react'

import {
  Button,
  Dropdown,
  Input,
  ListBox,
  Select,
  SortDescriptor,
  Table
} from '@vezham/react/v3'

import AddScheduleModal from './add-schedule-modal'

type ClassRow = {
  id: string
  type: string
  starttime: string
  endtime: string
  status: 'Active' | 'Inactive'
}

const rows: ClassRow[] = [
  {
    id: 'C138038',
    type: 'class',
    starttime: '9.30',
    endtime: '10.30',
    status: 'Active'
  },
  {
    id: 'C138037',
    type: 'class',
    starttime: '10.30',
    endtime: '11.30',
    status: 'Active'
  },
  {
    id: 'C138036',
    type: 'class',
    starttime: '11.30',
    endtime: '12.30',
    status: 'Active'
  },
  {
    id: 'C138035',
    type: 'class',
    starttime: '12.30',
    endtime: '1.30',
    status: 'Active'
  },
  {
    id: 'C138034',
    type: 'class',
    starttime: '1.30',
    endtime: '2.30',
    status: 'Inactive'
  },
  {
    id: 'C138033',
    type: 'class',
    starttime: '2.30',
    endtime: '3.30',
    status: 'Active'
  },
  {
    id: 'C138032',
    type: 'class',
    starttime: '3.30',
    endtime: '4.30',
    status: 'Active'
  },
  {
    id: 'C138031',
    type: 'class',
    starttime: '4.30',
    endtime: '5.30',
    status: 'Active'
  },
  {
    id: 'C138030',
    type: 'class',
    starttime: '5.30',
    endtime: '6.30',
    status: 'Inactive'
  },
  {
    id: 'C138029',
    type: 'class',
    starttime: '6.30',
    endtime: '7.30',
    status: 'Active'
  }
]

const dateOptions = [
  { key: 'today', label: 'Today', range: '04/23/2026 - 04/23/2026' },
  { key: 'yesterday', label: 'Yesterday', range: '04/22/2026 - 04/22/2026' },
  { key: 'last7', label: 'Last 7 Days', range: '04/17/2026 - 04/23/2026' },
  { key: 'last30', label: 'Last 30 Days', range: '03/25/2026 - 04/23/2026' },
  { key: 'thisYear', label: 'This Year', range: '01/01/2026 - 12/31/2026' },
  { key: 'nextYear', label: 'Next Year', range: '01/01/2027 - 12/31/2027' },
  { key: 'custom', label: 'Custom Range', range: '04/17/2026 - 04/23/2026' }
] as const

const sortOptions = [
  {
    key: 'az',
    label: 'Ascending',
    descriptor: { column: 'type', direction: 'ascending' as const }
  },
  {
    key: 'za',
    label: 'Descending',
    descriptor: { column: 'type', direction: 'descending' as const }
  },
  {
    key: 'recent',
    label: 'Recently Viewed',
    descriptor: { column: 'id', direction: 'descending' as const }
  },
  {
    key: 'added',
    label: 'Recently Added',
    descriptor: { column: 'id', direction: 'ascending' as const }
  }
] as const

const columns = [
  { key: 'select', label: '' },
  { key: 'id', label: 'ID' },
  { key: 'type', label: 'Type' },
  { key: 'starttime', label: 'Start Time' },
  { key: 'endtime', label: 'End Time' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action' }
] as const

const toTimeValue = (time: string) => {
  const [hourValue, minuteValue = '0'] = time.split('.')
  const hour = Number(hourValue)
  const minute = Number(minuteValue)

  return (hour < 8 ? hour + 12 : hour) * 60 + minute
}

export default function ScheduleListTable() {
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [page, setPage] = useState(1)
  const [dateKey, setDateKey] =
    useState<(typeof dateOptions)[number]['key']>('last7')
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'type',
    direction: 'ascending'
  })
  const [filterClass, setFilterClass] = useState<string | null>(null)
  const [filterSection, setFilterSection] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [draftClass, setDraftClass] = useState<string | null>(null)
  const [draftSection, setDraftSection] = useState<string | null>(null)
  const [draftStatus, setDraftStatus] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false)

  const filterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const openAddSchedule = () => setIsAddScheduleOpen(true)

    window.addEventListener('academic:schedule:open', openAddSchedule)
    return () =>
      window.removeEventListener('academic:schedule:open', openAddSchedule)
  }, [])

  useEffect(() => {
    if (!isFilterOpen) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!filterRef.current) {
        return
      }

      if (!filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isFilterOpen])

  const dateLabel =
    dateOptions.find(option => option.key === dateKey)?.range ??
    '04/17/2026 - 04/23/2026'

  const sortLabel =
    sortOptions.find(
      option =>
        option.descriptor.column === sortDescriptor.column &&
        option.descriptor.direction === sortDescriptor.direction
    )?.label ?? 'Ascending'

  const typeOptions = useMemo(
    () => [...new Set(rows.map(item => item.type))],
    []
  )

  const statusOptions = useMemo(
    () => [...new Set(rows.map(item => item.status))],
    []
  )

  const filteredRows = useMemo(() => {
    let result = [...rows]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        item =>
          item.id.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
      )
    }

    if (filterClass) {
      result = result.filter(item => item.type === filterClass)
    }

    if (filterStatus) {
      result = result.filter(item => item.status === filterStatus)
    }

    return result
  }, [filterClass, filterSection, filterStatus, searchQuery])

  const sortedRows = useMemo(() => {
    const result = [...filteredRows]

    result.sort((a, b) => {
      const first = a[sortDescriptor.column as keyof ClassRow]
      const second = b[sortDescriptor.column as keyof ClassRow]
      const isTimeColumn =
        sortDescriptor.column === 'starttime' ||
        sortDescriptor.column === 'endtime'

      const comparison = isTimeColumn
        ? toTimeValue(String(first)) - toTimeValue(String(second))
        : typeof first === 'number' && typeof second === 'number'
          ? first - second
          : String(first).localeCompare(String(second))

      return sortDescriptor.direction === 'descending'
        ? -comparison
        : comparison
    })

    return result
  }, [filteredRows, sortDescriptor])

  const rowsPerPageValue = parseInt(rowsPerPage, 10)
  const totalPages = Math.max(
    1,
    Math.ceil(sortedRows.length / rowsPerPageValue)
  )
  const currentPage = Math.min(page, totalPages)

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPageValue
    return sortedRows.slice(start, start + rowsPerPageValue)
  }, [currentPage, rowsPerPageValue, sortedRows])

  const openFilter = () => {
    setDraftClass(filterClass)
    setDraftSection(filterSection)
    setDraftStatus(filterStatus)
    setIsFilterOpen(open => !open)
  }

  const applyFilter = () => {
    setFilterClass(draftClass)
    setFilterSection(draftSection)
    setFilterStatus(draftStatus)
    setPage(1)
    setIsFilterOpen(false)
  }

  const resetFilter = () => {
    setFilterClass(null)
    setFilterSection(null)
    setFilterStatus(null)
    setDraftClass(null)
    setDraftSection(null)
    setDraftStatus(null)
    setPage(1)
    setIsFilterOpen(false)
  }

  const toggleColumnSort = (columnKey: string) => {
    setSortDescriptor(current => ({
      column: columnKey,
      direction:
        current.column === columnKey && current.direction === 'ascending'
          ? 'descending'
          : 'ascending'
    }))
    setPage(1)
  }

  const renderFilterSelect = (
    label: string,
    value: string | null,
    onChange: (next: string | null) => void,
    options: string[]
  ) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[#1f2f5c]">
        {label}
      </label>
      <Select
        selectedKey={value ?? undefined}
        onSelectionChange={key => onChange(key ? String(key) : null)}>
        <Select.Trigger className="text-smtext-[#2b3b63] flex h-12 w-full items-center justify-between rounded-xl border border-[#dbe2f1] bg-white px-4">
          <Select.Value>{value ?? 'Select'}</Select.Value>
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {options.map(option => (
              <ListBox.Item key={option} id={option}>
                {option}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  )

  return (
    <div className="w-full overflow-visible rounded-[18px] border border-[#dde4f0] bg-white shadow-[0_8px_24px_rgba(31,47,92,0.08)]">
      <AddScheduleModal
        open={isAddScheduleOpen}
        onOpenChange={setIsAddScheduleOpen}
      />

      <div className="flex flex-col gap-4 border-b border-[#e2e8f2] px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-[22px] font-semibold text-[#23345f]">
          Schedule List
        </h2>

        <div
          className="relative flex flex-wrap items-center gap-3 lg:ml-auto lg:flex-nowrap"
          ref={filterRef}>
          <Dropdown>
            <Dropdown.Trigger>
              <Button
                variant="outline"
                className="max-w-full rounded-xl border border-[#dbe2f1] px-4 text-[15px] font-medium text-[#4a587a] lg:max-w-[290px] lg:min-w-[250px] xl:max-w-none">
                <Icon icon="lucide:calendar-days" className="mr-2 text-sm" />
                <span className="truncate">{dateLabel}</span>
                <Icon icon="lucide:chevron-down" className="ml-3 text-sm" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="Date ranges"
                className="rounded-xl border border-[#dbe2f1] bg-white p-2 shadow-[0_16px_36px_rgba(31,47,92,0.14)]">
                {dateOptions.map(option => (
                  <Dropdown.Item
                    key={option.key}
                    onPress={() => setDateKey(option.key)}
                    className={`rounded-lg px-4 py-3 text-[15px] ${
                      dateKey === option.key
                        ? 'bg-[#4f67df] text-white'
                        : 'text-[#5e6b8f]'
                    }`}>
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          <Button
            variant="outline"
            className="shrink-0 rounded-xl border border-[#dbe2f1] px-5 text-sm font-medium text-[#4a587a]"
            onPress={openFilter}>
            <Icon icon="lucide:filter" className="mr-2 text-[18px]" />
            Filter
            <Icon icon="lucide:chevron-down" className="ml-3 text-[16px]" />
          </Button>

          {isFilterOpen && (
            <div className="absolute top-[56px] right-0 z-30 w-[min(420px,calc(100vw-64px))] rounded-[18px] border border-[#dbe2f1] bg-white shadow-[0_20px_40px_rgba(31,47,92,0.14)]">
              <div className="border-b border-[#e2e8f2] px-6 py-5">
                <h3 className="text-sm font-semibold text-[#23345f]">Filter</h3>
              </div>

              <div className="space-y-5 px-6 py-5">
                {renderFilterSelect(
                  'Class',
                  draftClass,
                  setDraftClass,
                  typeOptions
                )}

                {renderFilterSelect(
                  'Status',
                  draftStatus,
                  setDraftStatus,
                  statusOptions
                )}
              </div>

              <div className="flex justify-end gap-3 border-t border-[#e2e8f2] px-6 py-5">
                <Button
                  variant="outline"
                  className="h-11 rounded-xl border-none bg-[#e8edf7] px-5 text-[15px] font-semibold text-[#5b6787]"
                  onPress={resetFilter}>
                  Reset
                </Button>
                <Button
                  variant="primary"
                  className="h-11 rounded-xl px-5 text-[15px] font-semibold"
                  onPress={applyFilter}>
                  Apply
                </Button>
              </div>
            </div>
          )}

          <Dropdown>
            <Dropdown.Trigger>
              <Button
                variant="outline"
                className="shrink-0 rounded-xl border border-[#dbe2f1] px-5 text-sm font-medium text-[#4a587a]">
                <Icon icon="lucide:arrow-up-down" className="text-sm] mr-2" />
                Sort by A-Z
                <Icon icon="lucide:chevron-down" className="ml-3 text-sm" />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="Sort options"
                className="min-w-[240px] rounded-xl border border-[#dbe2f1] bg-white p-2 shadow-[0_16px_36px_rgba(31,47,92,0.14)]">
                {sortOptions.map(option => (
                  <Dropdown.Item
                    key={option.key}
                    onPress={() => setSortDescriptor(option.descriptor)}
                    className={`rounded-lg px-4 py-3 text-[15px] ${
                      sortLabel === option.label
                        ? 'bg-[#eef2fb] text-[#23345f]'
                        : 'text-[#23345f]'
                    }`}>
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[#4a587a]">
          <span>Row Per Page</span>
          <Select
            selectedKey={rowsPerPage}
            onSelectionChange={key => {
              setRowsPerPage(key ? String(key) : '5')
              setPage(1)
            }}>
            <Select.Trigger className="flex items-center justify-between rounded-xl border border-[#dbe2f1] bg-white px-4 text-[16px] text-[#4a587a]">
              <Select.Value>{rowsPerPage}</Select.Value>
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {['5', '10', '25', '50'].map(option => (
                  <ListBox.Item key={option} id={option}>
                    {option}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          <span>Entries</span>
        </div>

        <div className="flex w-full items-center rounded-xl lg:w-[240px]">
          <Input
            value={searchQuery}
            onChange={event => {
              setSearchQuery(event.target.value)
              setPage(1)
            }}
            placeholder="Search"
            className="w-full bg-transparent text-[15px]"
          />
        </div>
      </div>

      <Table className="rounded-none border-t border-[#edf1f7] bg-transparent">
        <Table.ScrollContainer className="w-full overflow-x-auto">
          <Table.Content
            aria-label="Classes table"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}>
            <Table.Header>
              {columns.map(column => (
                <Table.Column
                  key={column.key}
                  id={column.key}
                  allowsSorting={
                    column.key !== 'select' && column.key !== 'action'
                  }
                  className={`bg-[#f6f8fc] px-4 py-4 text-left text-[15px] font-semibold text-[#23345f]`}>
                  {column.key === 'select' ? (
                    <div className="mx-auto h-8 w-8 rounded-[10px] border border-[#dce4f3] bg-white" />
                  ) : (
                    <button
                      type="button"
                      className={`flex items-center gap-2 bg-transparent p-0 text-left font-semibold text-[#23345f] ${
                        column.key !== 'action'
                          ? 'cursor-pointer'
                          : 'cursor-default'
                      }`}
                      onClick={event => {
                        event.stopPropagation()

                        if (column.key !== 'action') {
                          toggleColumnSort(column.key)
                        }
                      }}>
                      <span>{column.label}</span>
                      <Icon
                        icon={
                          sortDescriptor.column === column.key
                            ? sortDescriptor.direction === 'ascending'
                              ? 'lucide:chevron-up'
                              : 'lucide:chevron-down'
                            : 'lucide:chevrons-up-down'
                        }
                        className={`text-[14px] ${
                          sortDescriptor.column === column.key
                            ? 'text-[#4567df]'
                            : 'text-[#c3cad9]'
                        }`}
                      />
                    </button>
                  )}
                </Table.Column>
              ))}
            </Table.Header>

            <Table.Body>
              {paginatedRows.map(row => (
                <Table.Row key={row.id} className="border-b border-[#e8edf6]">
                  <Table.Cell className="px-4 py-5">
                    <div className="mx-auto h-8 w-8 rounded-[10px] border border-[#dce4f3] bg-white" />
                  </Table.Cell>
                  <Table.Cell className="px-4 py-5 text-sm font-medium text-[#4567df]">
                    {row.id}
                  </Table.Cell>
                  <Table.Cell className="px-4 py-5 text-sm text-[#4a587a]">
                    {row.type}
                  </Table.Cell>

                  <Table.Cell className="px-4 py-5 text-sm text-[#4a587a]">
                    {row.starttime}
                  </Table.Cell>
                  <Table.Cell className="px-4 py-5 text-sm text-[#4a587a]">
                    {row.endtime}
                  </Table.Cell>
                  <Table.Cell className="px-4 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold ${
                        row.status === 'Active'
                          ? 'bg-[#edf8ea] text-[#1db631]'
                          : 'bg-[#ffecef] text-[#ef3657]'
                      }`}>
                      <span className="text-sm">●</span>
                      {row.status}
                    </span>
                  </Table.Cell>
                  <Table.Cell className="px-4 py-5">
                    <Button
                      isIconOnly
                      variant="ghost"
                      className="h-8 w-8 rounded-full text-[#24345f]">
                      <Icon
                        icon="lucide:ellipsis-vertical"
                        className="text-sm"
                      />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      <div className="flex flex-col gap-3 px-6 py-4 text-[14px] text-[#5b6787] lg:flex-row lg:items-center lg:justify-between">
        <div>
          {sortedRows.length > 0
            ? `Showing ${(currentPage - 1) * rowsPerPageValue + 1} to ${Math.min(
                currentPage * rowsPerPageValue,
                sortedRows.length
              )} of ${sortedRows.length} entries`
            : 'Showing 0 to 0 of 0 entries'}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 rounded-lg px-4"
            isDisabled={currentPage <= 1}
            onPress={() => setPage(value => Math.max(1, value - 1))}>
            Previous
          </Button>
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            className="h-10 rounded-lg px-4"
            isDisabled={currentPage >= totalPages}
            onPress={() => setPage(value => Math.min(totalPages, value + 1))}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
