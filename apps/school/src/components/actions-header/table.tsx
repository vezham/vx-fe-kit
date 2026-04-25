import { Icon } from '@iconify/react'
import React, { useMemo, useState } from 'react'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  ListBox,
  ListBoxItem,
  Pagination,
  Select,
  SortDescriptor,
  Table
} from '@vezham/react/v3'

export default function ClassesListTable() {
  // Sample data based on the screenshot
  const initialClasses = [
    {
      id: 'C138038',
      class: 'I',
      section: 'A',
      noOfStudents: 30,
      noOfSubjects: 3,
      status: 'Active'
    },
    {
      id: 'C138037',
      class: 'I',
      section: 'B',
      noOfStudents: 25,
      noOfSubjects: 3,
      status: 'Active'
    },
    {
      id: 'C138036',
      class: 'II',
      section: 'A',
      noOfStudents: 40,
      noOfSubjects: 3,
      status: 'Active'
    },
    {
      id: 'C138035',
      class: 'II',
      section: 'B',
      noOfStudents: 35,
      noOfSubjects: 3,
      status: 'Active'
    },
    {
      id: 'C138034',
      class: 'II',
      section: 'C',
      noOfStudents: 25,
      noOfSubjects: 3,
      status: 'Inactive'
    },
    {
      id: 'C138033',
      class: 'III',
      section: 'A',
      noOfStudents: 30,
      noOfSubjects: 3,
      status: 'Active'
    },
    {
      id: 'C138032',
      class: 'III',
      section: 'B',
      noOfStudents: 25,
      noOfSubjects: 5,
      status: 'Active'
    },
    {
      id: 'C138031',
      class: 'IV',
      section: 'A',
      noOfStudents: 20,
      noOfSubjects: 5,
      status: 'Active'
    },
    {
      id: 'C138030',
      class: 'IV',
      section: 'B',
      noOfStudents: 30,
      noOfSubjects: 5,
      status: 'Inactive'
    },
    {
      id: 'C138029',
      class: 'V',
      section: 'A',
      noOfStudents: 35,
      noOfSubjects: 5,
      status: 'Active'
    }
  ]

  // State for filtering and sorting
  const [filterClass, setFilterClass] = useState<Set<string>>(new Set())
  const [filterSection, setFilterSection] = useState<Set<string>>(new Set())
  const [filterStatus, setFilterStatus] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState<Set<string>>(new Set(['10']))
  const [page, setPage] = useState(1)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'class',
    direction: 'ascending'
  })

  // Get unique values for filters
  const uniqueClasses = useMemo(
    () => [...new Set(initialClasses.map(c => c.class))],
    []
  )
  const uniqueSections = useMemo(
    () => [...new Set(initialClasses.map(c => c.section))],
    []
  )
  const uniqueStatuses = useMemo(
    () => [...new Set(initialClasses.map(c => c.status))],
    []
  )

  // Apply filters and search
  const filteredClasses = useMemo(() => {
    let filtered = [...initialClasses]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        cls =>
          cls.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cls.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cls.section.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Class filter
    if (filterClass.size > 0) {
      filtered = filtered.filter(cls => filterClass.has(cls.class))
    }

    // Section filter
    if (filterSection.size > 0) {
      filtered = filtered.filter(cls => filterSection.has(cls.section))
    }

    // Status filter
    if (filterStatus.size > 0) {
      filtered = filtered.filter(cls => filterStatus.has(cls.status))
    }

    return filtered
  }, [initialClasses, searchQuery, filterClass, filterSection, filterStatus])

  // Apply sorting
  const sortedClasses = useMemo(() => {
    const sorted = [...filteredClasses]

    if (sortDescriptor.column) {
      sorted.sort((a, b) => {
        const first = a[sortDescriptor.column as keyof typeof a]
        const second = b[sortDescriptor.column as keyof typeof b]

        let cmp = 0
        if (typeof first === 'number' && typeof second === 'number') {
          cmp = first - second
        } else {
          cmp = String(first).localeCompare(String(second))
        }

        return sortDescriptor.direction === 'descending' ? -cmp : cmp
      })
    }

    return sorted
  }, [filteredClasses, sortDescriptor])

  // Pagination
  const rowsPerPageValue = parseInt(Array.from(rowsPerPage)[0] || '10')
  const pages = Math.ceil(sortedClasses.length / rowsPerPageValue)
  const paginatedClasses = useMemo(() => {
    const start = (page - 1) * rowsPerPageValue
    const end = start + rowsPerPageValue
    return sortedClasses.slice(start, end)
  }, [sortedClasses, page, rowsPerPageValue])

  // Reset filters
  const resetFilters = () => {
    setFilterClass(new Set())
    setFilterSection(new Set())
    setFilterStatus(new Set())
    setSearchQuery('')
    setPage(1)
  }

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-sm">
      {/* Header with Date Range and Filter/Sort */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">04/17/2026 - 04/23/20</span>
          <Button size="sm" variant="light" className="min-w-0 px-2">
            <Icon icon="lucide:chevron-down" className="text-gray-500" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="bordered" className="capitalize">
                <Icon icon="lucide:filter" className="mr-1" />
                Filter ▼
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Filter options">
              <DropdownItem key="today">Today</DropdownItem>
              <DropdownItem key="yesterday">Yesterday</DropdownItem>
              <DropdownItem key="last7">Last 7 Days</DropdownItem>
              <DropdownItem key="last30">Last 30 Days</DropdownItem>
              <DropdownItem key="thisYear">This Year</DropdownItem>
              <DropdownItem key="nextYear">Next Year</DropdownItem>
              <DropdownItem key="custom">Custom Range</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="bordered" className="capitalize">
                <Icon icon="lucide:arrow-up-down" className="mr-1" />
                Sort by A-Z ▼
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Sort options">
              <DropdownItem
                key="az"
                onClick={() =>
                  setSortDescriptor({ column: 'class', direction: 'ascending' })
                }>
                Ascending
              </DropdownItem>
              <DropdownItem
                key="za"
                onClick={() =>
                  setSortDescriptor({
                    column: 'class',
                    direction: 'descending'
                  })
                }>
                Descending
              </DropdownItem>
              <DropdownItem
                key="recent"
                onClick={() =>
                  setSortDescriptor({ column: 'id', direction: 'descending' })
                }>
                Recently Viewed
              </DropdownItem>
              <DropdownItem
                key="added"
                onClick={() =>
                  setSortDescriptor({ column: 'id', direction: 'ascending' })
                }>
                Recently Added
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-4 flex flex-wrap items-end gap-4 rounded-lg bg-gray-50 p-4">
        <div className="w-32">
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Class
          </label>
          <Select
            size="sm"
            placeholder="Select"
            selectedKeys={filterClass}
            onSelectionChange={setFilterClass}>
            {uniqueClasses.map(cls => (
              <ListBox>
                <ListBox.Item key={cls}>{cls}</ListBox.Item>
              </ListBox>
            ))}
          </Select>
        </div>
        <div className="w-32">
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Section
          </label>
          <Select
            size="sm"
            placeholder="Select"
            selectedKeys={filterSection}
            onSelectionChange={setFilterSection}>
            {uniqueSections.map(sec => (
              <ListBox>
                <ListBox.Item key={sec}>{sec}</ListBox.Item>
              </ListBox>
            ))}
          </Select>
        </div>
        <div className="w-32">
          <label className="mb-1 block text-xs font-medium text-gray-500">
            Status
          </label>
          <Select
            size="sm"
            placeholder="Select"
            selectedKeys={filterStatus}
            onSelectionChange={setFilterStatus}>
            {uniqueStatuses.map(status => (
              <ListBox>
                <ListBox.Item key={status}>{status}</ListBox.Item>
              </ListBox>
            ))}
          </Select>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="bordered" onClick={resetFilters}>
            Reset
          </Button>
          <Button size="sm" color="primary" onClick={() => setPage(1)}>
            Apply
          </Button>
        </div>
      </div>

      {/* Table Controls */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows Per Page:</span>
          <Select
            size="sm"
            className="w-20"
            selectedKeys={rowsPerPage}
            onSelectionChange={setRowsPerPage}>
            <ListBox>
              <ListBox.Item key="5">5</ListBox.Item>
              <ListBox.Item key="10">10</ListBox.Item>
              <ListBox.Item key="25">25</ListBox.Item>
              <ListBox.Item key="50">50</ListBox.Item>
            </ListBox>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Entries:</span>
          <Input
            size="sm"
            placeholder="Search..."
            className="w-48"
            startContent={
              <Icon icon="lucide:search" className="text-gray-400" />
            }
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              setPage(1)
            }}
          />
        </div>
      </div>

      {/* Table */}
      <Table
        aria-label="Classes list table"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        classNames={{
          wrapper: 'shadow-none border border-gray-200 rounded-lg'
        }}>
        <Table.Header>
          <Table.Column key="id" allowsSorting>
            ID
          </Table.Column>
          <Table.Column key="class" allowsSorting>
            Class
          </Table.Column>
          <Table.Column key="section" allowsSorting>
            Section
          </Table.Column>
          <Table.Column key="noOfStudents" allowsSorting>
            No of Students
          </Table.Column>
          <Table.Column key="noOfSubjects" allowsSorting>
            No of Subjects
          </Table.Column>
          <Table.Column key="status" allowsSorting>
            Status
          </Table.Column>
          <Table.Column key="action">Action</Table.Column>
        </Table.Header>
        <Table.Body>
          {paginatedClasses.map(cls => (
            <Table.Row key={cls.id}>
              <Table.Cell>{cls.id}</Table.Cell>
              <Table.Cell>{cls.class}</Table.Cell>
              <Table.Cell>{cls.section}</Table.Cell>
              <Table.Cell>{cls.noOfStudents}</Table.Cell>
              <Table.Cell>
                {cls.noOfSubjects.toString().padStart(2, '0')}
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-1">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      cls.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <span>{cls.status}</span>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <Icon
                        icon="lucide:more-horizontal"
                        className="text-gray-500"
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem key="edit">Edit</DropdownItem>
                    <DropdownItem key="delete" className="text-danger">
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Footer with Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {(page - 1) * rowsPerPageValue + 1} to{' '}
          {Math.min(page * rowsPerPageValue, sortedClasses.length)} of{' '}
          {sortedClasses.length} entries
        </div>
        <Pagination
          total={pages}
          page={page}
          onChange={setPage}
          showControls
          color="primary"
          size="sm"
        />
      </div>
    </div>
  )
}
