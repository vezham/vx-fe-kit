'use client'
import type { Selection, SortDescriptor } from '@heroui/react'
import {
  Alert,
  Button,
  Card,
  CardBody,
  Chip,
  cn,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
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
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
  User
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon
} from '@heroui/shared-icons'
import { motion } from 'framer-motion'

import { usePurchaseUsers } from '../../../store/books/usePurchase'
import type { ColumnsKey } from '../../../store/books/usePurchase/data'
import {
  chipColorMap,
  columns,
  INITIAL_VISIBLE_COLUMNS
} from '../../../store/books/usePurchase/data'
import { teamSettingStyles } from '../../settings-new/team/variant'
import { Users } from './types'
import { tableStyles } from './variant'

const Component = () => {
  const {
    data: users = [],
    isLoading,
    isError,
    refetch
  } = usePurchaseUsers.list({})
  const [tableData, setTableData] = useState<Users[]>([])
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [rowsPerPage] = useState(5)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (users.length) {
      setTableData(users)
    }
  }, [users])

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'userInfo',
    direction: 'ascending'
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedUser, setSelectedUser] = useState<Users | null>(null)

  // 🟢 handle row click
  const handleRowClick = (user: Users) => {
    setSelectedUser(user)
    setSelectedKeys(new Set([user.id]))
    onOpen()
  }

  const handleDrawerClose = () => {
    setSelectedUser(null)
    setSelectedKeys(new Set()) // ✅ clear selection when drawer closes
  }

  const [statusFilter, setStatusFilter] = useState('all')
  const [startDateFilter, setStartDateFilter] = useState('all')

  const handleDelete = useCallback(
    (id: number) => {
      setTableData(prev => prev.filter(u => u.id !== id))
    },
    [setTableData]
  )

  const handleEdit = useCallback(
    (id: number) => {
      setTableData(prev => prev.map(u => (u.id === id ? { ...u } : u)))
    },
    [setTableData]
  )

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter(column =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [visibleColumns])

  const itemFilter = useCallback(
    (col: Users) => {
      const allStatus = statusFilter === 'all'
      const allStartDate = startDateFilter === 'all'

      const startDateMatch = startDateFilter.match(/(\d+)(?=Days)/)
      const daysAgo = startDateMatch ? +startDateMatch[1] : 0
      const dateLimit = new Date()
      dateLimit.setDate(dateLimit.getDate() - daysAgo)

      const isDateValid = allStartDate || new Date(col.lastLogin) >= dateLimit

      return (
        (allStatus || statusFilter === col.status.toLowerCase()) && isDateValid
      )
    },
    [startDateFilter, statusFilter]
  )
  const filteredItems = useMemo(() => {
    let filteredUsers = [...tableData]

    if (filterValue) {
      filteredUsers = filteredUsers.filter(user =>
        user.userInfo.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    }

    filteredUsers = filteredUsers.filter(itemFilter)
    return filteredUsers
  }, [filterValue, itemFilter, tableData])

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

  const renderCell = useCallback(
    (user: Users, columnKey: React.Key) => {
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
          return (
            <Chip
              className={chipColorMap[statusValue] || ''}
              variant="solid"
              radius="sm"
              startContent={
                <Icon icon="solar:circle-bold" width={24} height={24} />
              }>
              {statusValue}
            </Chip>
          )
        }
        case 'actions':
          return (
            <div className={tableStyles.cell.actionsContainer}>
              <Button
                className={tableStyles.actionButton}
                variant="light"
                onClick={() => handleEdit(user.id)}>
                <EditIcon
                  className={tableStyles.cell.actionIcon}
                  height={18}
                  width={18}
                />
              </Button>

              <Button
                className={tableStyles.actionButton}
                variant="light"
                onClick={() => handleDelete(user.id)}>
                <DeleteIcon
                  className={tableStyles.cell.actionIcon}
                  height={18}
                  width={18}
                />
              </Button>
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
    },
    [handleEdit, handleDelete]
  )

  const onSelectionChange = useCallback((keys: Selection) => {
    setSelectedKeys(keys)
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
            <p className={tableStyles.membersText}>Orders</p>

            <Chip className={tableStyles.chip} size="sm" variant="flat">
              {users.length}
            </Chip>
          </div>

          <div>
            {!isSelectionEmpty && (
              <div className={tableStyles.selectedActionsContainer}>
                <Divider
                  className={tableStyles.divider}
                  orientation="vertical"
                />

                <div className={tableStyles.selectedCountText}>
                  {selectedKeys === 'all'
                    ? 'All selected'
                    : `${selectedKeys.size} Selected`}
                </div>

                <Divider
                  className="block h-5 sm:hidden"
                  orientation="vertical"
                />

                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      size="sm"
                      variant="flat"
                      className={tableStyles.selectedActions}>
                      {/* Mobile (sm-) — only the 3-dots icon */}
                      <span className={tableStyles.selectedActionsMoreButton}>
                        <Icon
                          icon="solar:menu-dots-bold"
                          width={10}
                          height={10}
                        />
                      </span>

                      {/* Desktop (sm+) — label + arrow */}
                      <span className={tableStyles.selectedActionsButton}>
                        <span>Selected Actions</span>
                        <Icon
                          className={tableStyles.dropdownIcon}
                          icon="solar:alt-arrow-down-linear"
                        />
                      </span>
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
        </div>
        {isSelectionEmpty && (
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
                      {!isSearchExpanded && 'Filter'}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className={tableStyles.popoverContent}>
                    <div className={tableStyles.filterPopoverContent}>
                      <RadioGroup label="Worker Type" className="sm:pt-10">
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
                      {!isSearchExpanded && 'Sort'}
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
                      {!isSearchExpanded && 'Columns'}
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
                      <Icon
                        icon="solar:menu-dots-bold"
                        width={18}
                        height={18}
                      />
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
                            <RadioGroup className="pt-10" label="Worker Type">
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
                      <Dropdown placement="bottom">
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
                      <Dropdown placement="bottom" closeOnSelect={false}>
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
        )}
      </div>
    )
  }, [
    selectedKeys,
    users.length,
    isSearchExpanded,
    filterValue,
    onSearchChange,
    toggleSearch,
    statusFilter,
    startDateFilter,
    headerColumns,
    visibleColumns,
    sortDescriptor.direction
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
            onPress={onPreviousPage}
            className="flex min-w-[5px] items-center gap-1"
            startContent={<ChevronLeftIcon className="hidden sm:flex" />}>
            {/* Mobile only */}
            <ChevronLeftIcon className="inline sm:hidden" />

            {/* Desktop only */}
            <span className="flex hidden items-center gap-1 sm:inline">
              Previous
            </span>
          </Button>

          <Button
            isDisabled={page === pages}
            size="sm"
            variant="flat"
            onPress={onNextPage}
            className="flex min-w-[5px] items-center gap-1"
            endContent={<ChevronRightIcon className="hidden sm:flex" />}>
            {/* Mobile only */}
            <ChevronRightIcon className="inline sm:hidden" />

            {/* Desktop only */}
            <span className="flex hidden items-center gap-1 sm:inline">
              Next
            </span>
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

  if (isError)
    return (
      <Alert
        variant="faded"
        color="default"
        title="Error loading PurchaseStats"
        className="mt-6">
        <Button
          color="default"
          size="sm"
          className="mt-2"
          onPress={() => {
            refetch()
          }}>
          Try Again
        </Button>
      </Alert>
    )

  return (
    <div className={teamSettingStyles.tableSectionContainer}>
      <div className={teamSettingStyles.tableWrapper}>
        <Card className={teamSettingStyles.tableCard} shadow="none">
          <CardBody>
            <div className={tableStyles.wrapper}>
              {!isLoading && <div>{topBar}</div>}
              <ScrollShadow orientation="horizontal">
                {isLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />{' '}
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/5 rounded" />{' '}
                          <Skeleton className="h-3 w-2/5 rounded" />{' '}
                        </div>
                        <Skeleton className="h-6 w-20 rounded" />{' '}
                      </div>
                    ))}
                  </div>
                ) : (
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
                            column.uid === 'actions'
                              ? tableStyles.tableHeader
                              : ''
                          ])}>
                          {column.uid === 'userInfo' ? (
                            <div
                              onClick={handleMemberClick}
                              className={tableStyles.tableHeaderUser}>
                              {column.name}
                              {sortDescriptor.column === column.uid &&
                                (sortDescriptor.direction === 'ascending' ? (
                                  <ChevronUpIcon
                                    className={tableStyles.sortIcon}
                                  />
                                ) : (
                                  <ChevronDownIcon
                                    className={tableStyles.sortIcon}
                                  />
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
                    <TableBody
                      emptyContent={'No users found'}
                      items={sortedItems}>
                      {item => (
                        <TableRow
                          key={item.id}
                          onClick={() => handleRowClick(item)}>
                          {columnKey => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                          )}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </ScrollShadow>
              {!isLoading && <div>{bottomContent}</div>}
            </div>
          </CardBody>
        </Card>
      </div>
      <Drawer
        isOpen={isOpen}
        onOpenChange={() => {
          if (!isOpen) {
            handleDrawerClose()
          }

          onOpenChange()
        }}
        size="sm">
        <DrawerContent>
          {onClose => (
            <>
              <DrawerHeader></DrawerHeader>

              <DrawerBody>
                {selectedUser ? (
                  <div className="space-y-4">
                    <User
                      avatarProps={{
                        src:
                          selectedUser.userInfo.avatar ||
                          'https://i.pravatar.cc/150?u=a04258',
                        name: selectedUser.userInfo.name
                      }}
                      name={selectedUser.userInfo.name}
                      description={selectedUser.userInfo.email}
                    />

                    <div>
                      <b>Role:</b> {selectedUser.role}
                    </div>

                    <div className="flex items-center gap-2">
                      <b>Status:</b>
                      <Chip
                        radius="sm"
                        color={
                          selectedUser.status === 'Active'
                            ? 'success'
                            : selectedUser.status === 'Pending'
                              ? 'default'
                              : selectedUser.status === 'Inactive'
                                ? 'danger'
                                : selectedUser.status === 'Vacation'
                                  ? 'warning'
                                  : 'default'
                        }
                        variant="dot">
                        {selectedUser.status}
                      </Chip>
                    </div>

                    <div>
                      <b>Last Login:</b>{' '}
                      {new Date(selectedUser.lastLogin).toLocaleDateString()}
                    </div>
                  </div>
                ) : (
                  <p>No user selected</p>
                )}
              </DrawerBody>
              <DrawerFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Component
