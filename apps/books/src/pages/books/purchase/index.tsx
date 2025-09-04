'use client'
import type { Selection, SortDescriptor } from '@heroui/react'
import {
  Alert,
  Button,
  Card,
  CardBody,
  Chip,
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
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
  User
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
  EyeFilledIcon,
  SearchIcon,
  SendFilledIcon
} from '@heroui/shared-icons'
import { motion } from 'framer-motion'

import { usePurchase } from '../../../store/books/usePurchase'
import type { Columns } from '../../../store/books/usePurchase/data'
import {
  getColumnProps,
  getStatusProps,
  INITIAL_VISIBLE_COLUMNS
} from '../../../store/books/usePurchase/data'
import { teamSettingStyles } from '../../settings-new/team/variant'
import { Purchase, Tags } from './types'
import { tableStyles } from './variant'

const Component = () => {
  const {
    data: users = [],
    isLoading: purchaseLoading,
    isError: purchaseError,
    refetch: refetchPurchase
  } = usePurchase.list({})

  // selected user id
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const {
    data: selectedUser,
    isLoading: selectedLoading,
    isError: selectedError,
    refetch: selectedRefetch
  } = usePurchase.get({ id: selectedUserId ?? 0 })

  const [tableData, setTableData] = useState<Purchase[]>([])
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
    column: 'vendor',
    direction: 'ascending'
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [statusFilter, setStatusFilter] = useState('all')
  const [startDateFilter, setStartDateFilter] = useState('all')

  // 🟢 handle row click
  const handleRowClick = (user: Purchase) => {
    setSelectedUserId(user.id)
    setSelectedKeys(new Set([user.id]))
    onOpen()
  }

  const handleDelete = useCallback(
    (id: number) => {
      setTableData(prev => prev.filter(u => u.id !== id))
    },
    [setTableData]
  )

  const handleEdit = useCallback(
    (id: number) => {
      setSelectedUserId(id)
      onOpen()
    },
    [onOpen]
  )

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return Object.values(getColumnProps)

    return Object.values(getColumnProps).filter(column =>
      Array.from(visibleColumns).includes(column.id)
    )
  }, [visibleColumns])

  const itemFilter = useCallback(
    (col: Purchase) => {
      const allStatus = statusFilter === 'all'

      const startDateMatch = startDateFilter.match(/(\d+)(?=Days)/)
      const daysAgo = startDateMatch ? +startDateMatch[1] : 0
      const dateLimit = new Date()
      dateLimit.setDate(dateLimit.getDate() - daysAgo)

      return allStatus || statusFilter === col.status.toLowerCase()
    },
    [startDateFilter, statusFilter]
  )
  const filteredItems = useMemo(() => {
    let filteredUsers = [...tableData]

    if (filterValue) {
      filteredUsers = filteredUsers.filter(user =>
        user.vendor.name.toLowerCase().includes(filterValue.toLowerCase())
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
    return [...items].sort((a: Purchase, b: Purchase) => {
      const col = sortDescriptor.column as keyof Purchase

      let first = a[col]
      let second = b[col]

      if (col === 'vendor') {
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

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Copied to clipboard:', text)
      })
      .catch(err => {
        console.error('Failed to copy:', err)
      })
  }, [])

  const renderCell = useCallback(
    (user: Purchase, columnKey: React.Key) => {
      const userKey = columnKey as Columns
      const cellValue = user[userKey as unknown as keyof Purchase] as string

      switch (userKey) {
        case 'orderId':
          return (
            <p className="text-default-400 flex items-center gap-2">
              {cellValue}
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className={tableStyles.cell.copyButton}
                onClick={e => {
                  // Change from onPress to onClick for better event handling
                  e.preventDefault()
                  e.stopPropagation()
                  copyToClipboard(String(cellValue))
                }}>
                <CopyIcon width={20} />
              </Button>
            </p>
          )
        case 'externalOrderID':
          return (
            <p className="text-default-400 flex items-center gap-2">
              {cellValue}
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className={tableStyles.cell.copyButton}
                onClick={e => {
                  // Change from onPress to onClick for better event handling
                  e.preventDefault()
                  e.stopPropagation()
                  copyToClipboard(String(cellValue))
                }}>
                <CopyIcon width={20} />
              </Button>
            </p>
          )
        case 'vendor':
          return (
            <User
              avatarProps={{ radius: 'lg', src: user[userKey].avatar }}
              classNames={{
                name: 'text-default-foreground',
                description: 'text-default-500'
              }}
              description={user[userKey].email}
              name={user[userKey].name}>
              {user[userKey].email}
            </User>
          )
        case 'product':
          return <p className="w-full truncate">{cellValue}</p>
        case 'date':
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
        case 'duedate':
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
        case 'amount':
          return <p className="w-full min-w-[55px]">$ {user.amount}</p>
        case 'status': {
          const statusValue = user.status
          const key = statusValue.toLowerCase() as keyof typeof getStatusProps
          const { label, color } = getStatusProps[key] || {}

          return (
            <Chip
              className={`${color} ${label}`} // 👈 merge bg + text
              variant="solid"
              radius="sm"
              startContent={
                <Icon icon="solar:circle-linear" width={24} height={24} />
              }>
              {statusValue}
            </Chip>
          )
        }

        case 'tags':
          return (
            <div className="float-start flex gap-1">
              {user.tags.slice(0, 4).map((tag: Tags, index: number) =>
                index < 3 ? (
                  <Chip
                    key={tag}
                    className="bg-default-100 text-default-800 rounded-xl px-[6px] capitalize"
                    size="sm"
                    variant="flat">
                    {tag}
                  </Chip>
                ) : (
                  <Chip
                    key="more"
                    className="text-default-500"
                    size="sm"
                    variant="flat">
                    +{user.tags.length - 3}
                  </Chip>
                )
              )}
            </div>
          )

        case 'actions':
          return (
            <div className={tableStyles.cell.actionsContainer}>
              <Button className={tableStyles.actionButton} variant="light">
                <EyeFilledIcon
                  className={tableStyles.cell.actionIcon}
                  height={18}
                  width={18}
                />
              </Button>
              <Button
                className={tableStyles.actionButton}
                variant="light"
                onClick={e => {
                  e.stopPropagation()
                  handleEdit(user.id)
                }}>
                <EditIcon
                  className={tableStyles.cell.actionIcon}
                  height={18}
                  width={18}
                />
              </Button>

              <Button
                className={tableStyles.actionButton}
                variant="light"
                onClick={e => {
                  e.stopPropagation()
                  handleDelete(user.id)
                }}>
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
                    className={tableStyles.cell.actionDropdownButton}
                    onClick={e => e.stopPropagation()}>
                    <Icon icon="solar:menu-dots-bold" width={18} height={18} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="More actions">
                  <DropdownItem key="send">
                    <Button
                      className={tableStyles.actionButton}
                      variant="light"
                      startContent={<SendFilledIcon width={20} />}>
                      Send
                    </Button>
                  </DropdownItem>
                  <DropdownItem key="download">
                    <Button
                      size="md"
                      variant="light"
                      startContent={
                        <Icon icon="solar:download-line-duotone" width={20} />
                      }>
                      Download
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        default:
          return cellValue
      }
    },
    [handleEdit, handleDelete, copyToClipboard]
  )

  const onSelectionChange = useCallback((keys: Selection) => {
    setSelectedKeys(keys)
  }, [])

  const [isPageLoading, setIsPageLoading] = useState(false)

  const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

  const onNextPage = useCallback(async () => {
    if (page < pages) {
      setIsPageLoading(true)
      await sleep()
      setPage(prev => prev + 1)
      setIsPageLoading(false)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(async () => {
    if (page > 1) {
      setIsPageLoading(true)
      await sleep()
      setPage(prev => prev - 1)
      setIsPageLoading(false)
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
                      c => !['actions', 'teams'].includes(c.id)
                    )}>
                    {item => (
                      <DropdownItem
                        key={item.id}
                        onPress={() => {
                          setSortDescriptor({
                            column: item.id,
                            direction:
                              sortDescriptor.direction === 'ascending'
                                ? 'descending'
                                : 'ascending'
                          })
                        }}>
                        {item.label}
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
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}>
                    {Object.entries(getColumnProps)
                      .filter(([key]) => key !== 'actions')
                      .map(([key, col]) => (
                        <DropdownItem key={key}>{col.label}</DropdownItem>
                      ))}
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
                            c => !['actions', 'teams'].includes(c.id)
                          )}>
                          {item => (
                            <DropdownItem
                              key={item.id}
                              onPress={() => {
                                setSortDescriptor({
                                  column: item.id,
                                  direction:
                                    sortDescriptor.direction === 'ascending'
                                      ? 'descending'
                                      : 'ascending'
                                })
                              }}>
                              {item.label}
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
                          items={Object.entries(getColumnProps)
                            .map(([uid, col]) => ({ uid, ...col }))
                            .filter(c => c.uid !== 'actions')}
                          selectedKeys={visibleColumns}
                          selectionMode="multiple"
                          onSelectionChange={setVisibleColumns}>
                          {item => (
                            <DropdownItem key={item.uid}>
                              {item.label}
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
    sortDescriptor
  ])

  const onPaginationChange = async (newPage: number) => {
    if (newPage !== page) {
      setIsPageLoading(true)
      await sleep()
      setPage(newPage)
      setIsPageLoading(false)
    }
  }

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
            onChange={onPaginationChange}
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
  }, [page, pages, onPaginationChange, onPreviousPage, onNextPage])

  if (purchaseError)
    return (
      <Alert
        variant="faded"
        color="danger"
        title="Error loading Purchase"
        hideIcon
        className="mt-6 flex flex-col items-center">
        <Button
          color="danger"
          size="sm"
          variant="light"
          className="mx-auto mt-2"
          onPress={() => {
            refetchPurchase()
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
              {!purchaseLoading && <div>{topBar}</div>}
              <ScrollShadow orientation="horizontal">
                {purchaseLoading ? (
                  <div className="flex h-75 items-center justify-center">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <Table
                    removeWrapper
                    aria-label="Users Table"
                    bottomContentPlacement="outside"
                    selectedKeys={filterSelectedKeys}
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    topContentPlacement="outside"
                    onSelectionChange={onSelectionChange}
                    onSortChange={setSortDescriptor}>
                    <TableHeader columns={headerColumns}>
                      {column => (
                        <TableColumn
                          key={column.id}
                          // enables sorting except for specific columns
                          allowsSorting={
                            column.id !== 'actions' && column.id !== 'tags'
                          }>
                          {column.label}
                        </TableColumn>
                      )}
                    </TableHeader>

                    <TableBody
                      emptyContent={'No users found'}
                      items={isPageLoading ? [] : sortedItems}>
                      {isPageLoading ? (
                        <TableRow>
                          <TableCell colSpan={headerColumns.length}>
                            <div className="flex h-75 items-center justify-center">
                              <Spinner size="lg" color="primary" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        item => (
                          <TableRow
                            key={item.id}
                            className="group"
                            onClick={() => handleRowClick(item)}>
                            {columnKey => (
                              <TableCell>
                                {renderCell(item, columnKey)}
                              </TableCell>
                            )}
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                )}
              </ScrollShadow>
              {!purchaseLoading && <div>{bottomContent}</div>}
            </div>
          </CardBody>
        </Card>
      </div>
      <Drawer
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: 'sm:data-[placement=right]:m-2 sm:data-[placement=left]:m-2 rounded-medium'
        }}
        isOpen={isOpen}
        onOpenChange={open => {
          if (!open) {
            setSelectedKeys(new Set([]))
            setSelectedUserId(null)
          }
          onOpenChange()
        }}>
        <DrawerContent>
          {onClose => (
            <>
              {/* Full new drawer header */}
              <DrawerHeader className="border-default-200/50 bg-content1/50 absolute inset-x-0 top-0 z-50 flex flex-row justify-between gap-2 border-b px-2 py-2 backdrop-blur-lg backdrop-saturate-150">
                {/* Close button */}
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-default-400"
                    size="sm"
                    variant="light"
                    onPress={onClose}>
                    <svg
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                    </svg>
                  </Button>
                </Tooltip>

                {/* Copy Link + Event Page */}
                <div className="flex w-full justify-start gap-2">
                  <Button
                    className="text-small text-default-500 font-medium"
                    size="sm"
                    startContent={
                      <svg
                        height="16"
                        viewBox="0 0 16 16"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3.85.75c-.908 0-1.702.328-2.265.933-.558.599-.835 1.41-.835 2.29V7.88c0 .801.23 1.548.697 2.129.472.587 1.15.96 1.951 1.06a.75.75 0 1 0 .185-1.489c-.435-.054-.752-.243-.967-.51-.219-.273-.366-.673-.366-1.19V3.973c0-.568.176-.993.433-1.268.25-.27.632-.455 1.167-.455h4.146c.479 0 .828.146 1.071.359.246.215.43.54.497.979a.75.75 0 0 0 1.483-.23c-.115-.739-.447-1.4-.99-1.877C9.51 1 8.7f6.75 7.996.75zM7.9 4.828c-.908 0-1.702.326-2.265.93-.558.6-.835 1.41-.835 2.29V3.905c0 .879.275 1.69.833 2.289.563.605 1.357.931 2.267.931h4.144c.91 0 1.705-.326 2.268-.931.558-.599.833-1.41.833-2.289V8.048c0-.879-.275-1.69-.833-2.289-.563-.605-1.357-.931-2.267-.931zm-1.6 3.22c0-.568.176-.992.432-1.266.25-.27.632-.454 1.168-.454h4.145c.54 0 .92.185 1.17.453.255.274.43.698.43 1.267v3.905c0 .569-.175.993-.43 1.267-.25.268-.631.453-1.17.453H7.898c-.54 0-.92-.185-1.17-.453-.255-.274-.43-.698-.43-1.267z"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </svg>
                    }
                    variant="flat">
                    Copy Link
                  </Button>
                  <Button
                    className="text-small text-default-500 font-medium"
                    endContent={
                      <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    }
                    size="sm"
                    variant="flat">
                    Event Page
                  </Button>
                </div>

                {/* Prev / Next arrows */}
                <div className="flex items-center gap-1">
                  <Tooltip content="Previous">
                    <Button
                      isIconOnly
                      className="text-default-500"
                      size="sm"
                      variant="flat">
                      <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </Button>
                  </Tooltip>
                  <Tooltip content="Next">
                    <Button
                      isIconOnly
                      className="text-default-500"
                      size="sm"
                      variant="flat">
                      <svg
                        fill="none"
                        height="16"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </Button>
                  </Tooltip>
                </div>
              </DrawerHeader>

              {/* Body from old drawer (User Details) */}
              <DrawerBody className="pt-16">
                {selectedLoading ? (
                  // Loading
                  <div className="flex flex-col items-center justify-center py-10">
                    <Spinner size="lg" />
                    <p className="text-default-500 mt-2 text-sm">
                      Loading user...
                    </p>
                  </div>
                ) : selectedError ? (
                  // Error
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-sm">Failed to load user details.</p>
                    <Button
                      size="sm"
                      variant="flat"
                      color="danger"
                      onPress={() => selectedRefetch()}>
                      Retry
                    </Button>
                  </div>
                ) : !selectedUser ? (
                  // Empty
                  <p className="text-default-400 text-sm">No user selected</p>
                ) : (
                  // Success
                  <div className="space-y-4">
                    <div>
                      <User
                        avatarProps={{
                          src:
                            selectedUser.vendor.avatar ||
                            'https://i.pravatar.cc/150?u=a04258',
                          name: selectedUser.vendor.name
                        }}
                        name={selectedUser.vendor.name}
                        description={selectedUser.vendor.email}
                      />
                    </div>

                    <div>
                      <b>Product:</b> {selectedUser.product}
                    </div>
                    <div>
                      <b>Date:</b>{' '}
                      {selectedUser?.date
                        ? new Intl.DateTimeFormat('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          }).format(new Date(selectedUser.date))
                        : '—'}
                    </div>

                    <div>
                      <b>Due Date:</b>{' '}
                      {selectedUser?.dueDate
                        ? new Intl.DateTimeFormat('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          }).format(new Date(selectedUser.dueDate))
                        : '—'}
                    </div>

                    <div>
                      <b>Amount:</b> {selectedUser.amount}
                    </div>

                    <div className="flex items-center gap-2">
                      <b>Status:</b>
                      <Chip
                        radius="sm"
                        color={
                          selectedUser.status === 'paid'
                            ? 'success'
                            : selectedUser.status === 'pending'
                              ? 'default'
                              : selectedUser.status === 'overdue'
                                ? 'danger'
                                : selectedUser.status === 'onhold'
                                  ? 'secondary'
                                  : selectedUser.status === 'sent'
                                    ? 'primary'
                                    : selectedUser.status === 'draft'
                                      ? 'warning'
                                      : selectedUser.status === 'cancelled'
                                        ? 'warning'
                                        : 'warning'
                        }
                        variant="dot">
                        {selectedUser.status}
                      </Chip>
                    </div>
                    <div className="flex gap-2">
                      <b>Tags:</b>
                      {selectedUser.tags
                        .slice(0, 4)
                        .map((tag: Tags, index: number) =>
                          index < 3 ? (
                            <Chip
                              key={tag}
                              className="bg-default-100 text-default-800 rounded-md px-[6px] capitalize"
                              size="sm"
                              variant="flat">
                              {tag}
                            </Chip>
                          ) : (
                            <Chip
                              key="more"
                              className="text-default-500"
                              size="sm"
                              variant="flat">
                              +{selectedUser.tags.length - 3}
                            </Chip>
                          )
                        )}
                    </div>
                  </div>
                )}
              </DrawerBody>

              {/* Footer from new drawer */}
              <DrawerFooter className="flex flex-col gap-1">
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
