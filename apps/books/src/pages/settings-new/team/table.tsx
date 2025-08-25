'use client'
import type { Selection, SortDescriptor } from '@heroui/react'
import {
  Button,
  Chip,
  cn,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  ScrollShadow,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon
} from '@heroui/shared-icons'
import { motion } from 'framer-motion'
import type { ColumnsKey } from './data'
import { columns, INITIAL_VISIBLE_COLUMNS, statusColorMap, users } from './data'
import { Users } from './types'
import { tableStyles } from './variant'

export const Component = () => {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [rowsPerPage] = useState(5)
  const [page, setPage] = useState(1)

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'userInfo',
    direction: 'ascending'
  })

  const [workerTypeFilter, setWorkerTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [startDateFilter, setStartDateFilter] = useState('all')

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter(column =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [visibleColumns])

  const itemFilter = useCallback(
    (col: Users) => {
      const allWorkerType = workerTypeFilter === 'all'
      const allStatus = statusFilter === 'all'
      const allStartDate = startDateFilter === 'all'

      const startDateMatch = startDateFilter.match(/(\d+)(?=Days)/)
      const daysAgo = startDateMatch ? +startDateMatch[1] : 0
      const dateLimit = new Date()
      dateLimit.setDate(dateLimit.getDate() - daysAgo)

      const isDateValid = allStartDate || new Date(col.lastLogin) >= dateLimit

      return (
        (allWorkerType || workerTypeFilter === col.workerType.toLowerCase()) &&
        (allStatus || statusFilter === col.status.toLowerCase()) &&
        isDateValid
      )
    },
    [startDateFilter, statusFilter, workerTypeFilter]
  )

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users]

    if (filterValue) {
      filteredUsers = filteredUsers.filter(user =>
        user.userInfo.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    }

    filteredUsers = filteredUsers.filter(itemFilter)

    return filteredUsers
  }, [filterValue, itemFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Users, b: Users) => {
      const col = sortDescriptor.column as keyof Users

      let first = a[col]
      let second = b[col]

      if (col === 'userInfo') {
        first = a[col].name
        second = b[col].name
      }

      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const filterSelectedKeys = useMemo(() => {
    if (selectedKeys === 'all') {
      return new Set(filteredItems.map(item => String(item.id)))
    }
    return new Set(
      Array.from(selectedKeys).filter(key =>
        filteredItems.some(item => String(item.id) === key)
      )
    )
  }, [selectedKeys, filteredItems])

  const renderCell = useCallback((user: Users, columnKey: React.Key) => {
    const userKey = columnKey as ColumnsKey
    const cellValue = user[userKey as unknown as keyof Users] as string

    switch (userKey) {
      case 'userInfo':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user[userKey]?.avatar }}
            classNames={{
              name: tableStyles.cell.userInfoName,
              description: tableStyles.cell.userInfoDescription
            }}
            description={user[userKey].email}
            name={user[userKey].name}>
            {user[userKey].email}
          </User>
        )
      case 'lastLogin':
        return (
          <div className={tableStyles.cell.lastLoginContainer}>
            <Icon
              className={tableStyles.cell.lastLoginIcon}
              icon="solar:calendar-minimalistic-linear"
            />
            <p className={tableStyles.cell.lastLoginText}>
              {new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              }).format(cellValue as unknown as Date)}
            </p>
          </div>
        )
      case 'role':
        return (
          <Button variant="bordered" size="sm">
            {cellValue}
          </Button>
        )
      case 'status': {
        const statusValue = user.status
        const StatusIcon = statusColorMap[statusValue]

        return (
          <div className={tableStyles.cell.statusContainer}>
            {StatusIcon}
            <span className={tableStyles.cell.statusText}>{statusValue}</span>
          </div>
        )
      }
      case 'actions':
        return (
          <div className={tableStyles.cell.actionsContainer}>
            <EditIcon
              className={tableStyles.cell.actionIcon}
              height={18}
              width={18}
            />
            <DeleteIcon
              className={tableStyles.cell.actionIcon}
              height={18}
              width={18}
            />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className={tableStyles.cell.actionDropdownButton}>
                  <Icon icon="solar:menu-dots-bold" width={18} height={18} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="More actions">
                <DropdownItem key="duplicate">Duplicate</DropdownItem>
                <DropdownItem key="archive">Archive</DropdownItem>
                <DropdownItem key="share">Share</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value || '')
    setPage(1)
  }, [])

  const onSelectionChange = useCallback((keys: Selection) => {
    setSelectedKeys(keys)
  }, [])

  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const toggleSearch = useCallback(() => {
    setIsSearchExpanded(prev => !prev)
  }, [])

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [isSearchExpanded])

  const topBar = useMemo(() => {
    const isSelectionEmpty =
      selectedKeys === 'all' ? false : selectedKeys.size === 0

    return (
      <div className={tableStyles.topBarContainer}>
        <div className={tableStyles.topBarLeft}>
          <div className={tableStyles.topBarLeftInner}>
            <p className={tableStyles.membersText}>Members</p>

            <Chip className={tableStyles.chip} size="sm" variant="flat">
              {users.length}
            </Chip>
          </div>

          {!isSelectionEmpty && (
            <div className={tableStyles.selectedActionsContainer}>
              <Divider className={tableStyles.divider} orientation="vertical" />

              <div className={tableStyles.selectedCountText}>
                {selectedKeys === 'all'
                  ? 'All items selected'
                  : `${selectedKeys.size} Selected`}
              </div>

              <Divider className="block h-5 sm:hidden" orientation="vertical" />

              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className={tableStyles.selectedActionsButton}
                    endContent={
                      <Icon
                        className={tableStyles.dropdownIcon}
                        icon="solar:alt-arrow-down-linear"
                      />
                    }
                    size="sm"
                    variant="flat">
                    Selected Actions
                  </Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="Selected Actions">
                  <DropdownItem key="send-email">Send email</DropdownItem>

                  <DropdownItem key="pay-invoices">Pay invoices</DropdownItem>

                  <DropdownItem key="bulk-edit">Bulk edit</DropdownItem>

                  <DropdownItem key="end-contract">End contract</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </div>

        <div className={tableStyles.topBarRight}>
          <motion.div
            initial={{ width: 40 }}
            animate={{ width: isSearchExpanded ? 150 : 40 }}
            transition={{ ease: 'easeInOut' }}
            className={tableStyles.searchContainer}>
            {isSearchExpanded ? (
              <Input
                className={tableStyles.searchInput}
                ref={searchInputRef}
                endContent={
                  <button
                    className="focus:outline-none"
                    onClick={() => {
                      if (filterValue) {
                        setFilterValue('')
                      } else {
                        setIsSearchExpanded(false)
                      }
                    }}>
                    {filterValue ? (
                      <CloseIcon
                        className={tableStyles.searchCloseIcon}
                        width={16}
                      />
                    ) : (
                      <CloseIcon
                        className={tableStyles.searchCloseIcon}
                        width={16}
                      />
                    )}
                  </button>
                }
                placeholder="Search"
                size="sm"
                value={filterValue}
                onValueChange={onSearchChange}
              />
            ) : (
              <button
                className={tableStyles.searchButton}
                onClick={toggleSearch}>
                <SearchIcon className="text-default-600" width={18} />
              </button>
            )}
          </motion.div>

          <div className="flex items-center gap-2">
            <div className={tableStyles.filterSortButtons}>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button
                    className={tableStyles.filterSortButton}
                    size="sm"
                    startContent={
                      <Icon
                        className={tableStyles.filterSortIcon}
                        icon="solar:tuning-2-linear"
                        width={16}
                      />
                    }>
                    {!isSearchExpanded && isSelectionEmpty && 'Filter'}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className={tableStyles.popoverContent}>
                  <div className={tableStyles.filterPopoverContent}>
                    <RadioGroup
                      label="Worker Type"
                      className="sm:pt-10"
                      value={workerTypeFilter}
                      onValueChange={setWorkerTypeFilter}>
                      <Radio value="all">All</Radio>
                      <Radio value="employee">Employee</Radio>

                      <Radio value="contractor">Contractor</Radio>
                    </RadioGroup>

                    <RadioGroup
                      label="Status"
                      value={statusFilter}
                      onValueChange={setStatusFilter}>
                      <Radio value="all">All</Radio>
                      <Radio value="active">Active</Radio>
                      <Radio value="inactive">Inactive</Radio>
                      <Radio value="pending">Pending</Radio>

                      <Radio value="vacation">Vacation</Radio>
                    </RadioGroup>

                    <RadioGroup
                      label="Start Date"
                      value={startDateFilter}
                      onValueChange={setStartDateFilter}>
                      <Radio value="all">All</Radio>

                      <Radio value="last7Days">Last 7 days</Radio>
                      <Radio value="last30Days">Last 30 days</Radio>

                      <Radio value="last60Days">Last 60 days</Radio>
                    </RadioGroup>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className={tableStyles.filterSortButtons}>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className={tableStyles.filterSortButton}
                    size="sm"
                    startContent={
                      <Icon
                        className={tableStyles.filterSortIcon}
                        icon="solar:sort-linear"
                        width={16}
                      />
                    }>
                    {!isSearchExpanded && isSelectionEmpty && 'Sort'}
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  aria-label="Sort"
                  items={headerColumns.filter(
                    c => !['actions', 'teams'].includes(c.uid)
                  )}>
                  {item => (
                    <DropdownItem
                      key={item.uid}
                      onPress={() => {
                        setSortDescriptor({
                          column: item.uid,
                          direction:
                            sortDescriptor.direction === 'ascending'
                              ? 'descending'
                              : 'ascending'
                        })
                      }}>
                      {item.name}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className={tableStyles.filterSortButtons}>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button
                    className={tableStyles.filterSortButton}
                    size="sm"
                    startContent={
                      <Icon
                        className={tableStyles.filterSortIcon}
                        icon="solar:sort-horizontal-linear"
                        width={16}
                      />
                    }>
                    {!isSearchExpanded && isSelectionEmpty && 'Columns'}
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Columns"
                  items={columns.filter(c => !['actions'].includes(c.uid))}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}>
                  {item => (
                    <DropdownItem key={item.uid}>{item.name}</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className={tableStyles.mobileActions}>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className={tableStyles.mobileActionsButton}>
                    <Icon icon="solar:menu-dots-bold" width={18} height={18} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="More actions" closeOnSelect={false}>
                  <DropdownItem key="filter" className="p-0">
                    <Popover placement="bottom">
                      <PopoverTrigger>
                        <Button
                          variant="light"
                          size="sm"
                          fullWidth
                          startContent={
                            <Icon icon="solar:tuning-2-linear" width={16} />
                          }
                          className={tableStyles.mobileFilterButton}>
                          Filter
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className={tableStyles.popoverContent}>
                        <div className={tableStyles.filterPopoverContent}>
                          <RadioGroup
                            className="pt-10"
                            label="Worker Type"
                            value={workerTypeFilter}
                            onValueChange={setWorkerTypeFilter}>
                            <Radio value="all">All</Radio>
                            <Radio value="employee">Employee</Radio>

                            <Radio value="contractor">Contractor</Radio>
                          </RadioGroup>

                          <RadioGroup
                            label="Status"
                            value={statusFilter}
                            onValueChange={setStatusFilter}>
                            <Radio value="all">All</Radio>
                            <Radio value="active">Active</Radio>

                            <Radio value="inactive">Inactive</Radio>

                            <Radio value="pending">Pending</Radio>

                            <Radio value="vacation">Vacation</Radio>
                          </RadioGroup>

                          <RadioGroup
                            label="Start Date"
                            value={startDateFilter}
                            onValueChange={setStartDateFilter}>
                            <Radio value="all">All</Radio>
                            <Radio value="last7Days">Last 7 days</Radio>

                            <Radio value="last30Days">Last 30 days</Radio>

                            <Radio value="last60Days">Last 60 days</Radio>
                          </RadioGroup>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </DropdownItem>

                  <DropdownItem key="sort" className="p-0">
                    <Dropdown placement="right">
                      <DropdownTrigger>
                        <Button
                          variant="light"
                          size="sm"
                          fullWidth
                          startContent={
                            <Icon icon="solar:sort-linear" width={16} />
                          }
                          className={tableStyles.mobileFilterButton}>
                          Sort
                        </Button>
                      </DropdownTrigger>

                      <DropdownMenu
                        aria-label="Sort"
                        items={headerColumns.filter(
                          c => !['actions', 'teams'].includes(c.uid)
                        )}>
                        {item => (
                          <DropdownItem
                            key={item.uid}
                            onPress={() => {
                              setSortDescriptor({
                                column: item.uid,
                                direction:
                                  sortDescriptor.direction === 'ascending'
                                    ? 'descending'
                                    : 'ascending'
                              })
                            }}>
                            {item.name}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownItem>

                  <DropdownItem key="columns" className="p-0">
                    <Dropdown placement="right" closeOnSelect={false}>
                      <DropdownTrigger>
                        <Button
                          variant="light"
                          size="sm"
                          fullWidth
                          startContent={
                            <Icon
                              icon="solar:sort-horizontal-linear"
                              width={16}
                            />
                          }
                          className={tableStyles.mobileFilterButton}>
                          Columns
                        </Button>
                      </DropdownTrigger>

                      <DropdownMenu
                        disallowEmptySelection
                        aria-label="Columns"
                        items={columns.filter(
                          c => !['actions'].includes(c.uid)
                        )}
                        selectedKeys={visibleColumns}
                        selectionMode="multiple"
                        onSelectionChange={setVisibleColumns}>
                        {item => (
                          <DropdownItem key={item.uid}>
                            {item.name}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    )
  }, [
    filterValue,
    visibleColumns,
    selectedKeys,
    headerColumns,
    sortDescriptor,
    statusFilter,
    workerTypeFilter,
    startDateFilter,
    onSearchChange,
    setVisibleColumns,
    isSearchExpanded,
    toggleSearch
  ])

  const bottomContent = useMemo(() => {
    return (
      <div className={tableStyles.paginationContainer}>
        <div>
          <Pagination
            isCompact
            showControls
            showShadow
            size="sm"
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
        <div className={tableStyles.paginationButtonContainer}>
          <Button
            isDisabled={page === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}>
            Previous
          </Button>
          <Button
            isDisabled={page === pages}
            size="sm"
            variant="flat"
            onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    )
  }, [page, pages, onPreviousPage, onNextPage])

  const handleMemberClick = useCallback(() => {
    setSortDescriptor(prev => ({
      column: 'userInfo',
      direction: prev.direction === 'ascending' ? 'descending' : 'ascending'
    }))
  }, [])

  return (
    <div className={tableStyles.wrapper}>
      <div>{topBar}</div>
      <ScrollShadow orientation="horizontal">
        <Table
          removeWrapper
          isHeaderSticky
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContentPlacement="outside"
          classNames={tableStyles.table}
          selectedKeys={filterSelectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContentPlacement="outside"
          onSelectionChange={onSelectionChange}
          onSortChange={setSortDescriptor}>
          <TableHeader columns={headerColumns}>
            {column => (
              <TableColumn
                key={column.uid}
                align={column.uid === 'actions' ? 'end' : 'start'}
                className={cn([
                  column.uid === 'actions' ? tableStyles.tableHeader : ''
                ])}>
                {column.uid === 'userInfo' ? (
                  <div
                    onClick={handleMemberClick}
                    className={tableStyles.tableHeaderUser}>
                    {column.name}
                    {sortDescriptor.column === column.uid &&
                      (sortDescriptor.direction === 'ascending' ? (
                        <ChevronUpIcon className={tableStyles.sortIcon} />
                      ) : (
                        <ChevronDownIcon className={tableStyles.sortIcon} />
                      ))}
                  </div>
                ) : column.info ? (
                  <div className={tableStyles.tableHeaderInfo}>
                    {column.name}
                  </div>
                ) : (
                  column.name
                )}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={'No users found'} items={sortedItems}>
            {item => (
              <TableRow key={item.id}>
                {columnKey => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollShadow>
      <div>{bottomContent}</div>
    </div>
  )
}

export default Component
