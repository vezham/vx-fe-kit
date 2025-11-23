'use client'

import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import type { Selection, SortDescriptor } from '@vezham/react/v2'
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
  Spacer,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  cn,
  useDisclosure
} from '@vezham/react/v2'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  EyeFilledIcon,
  SearchIcon,
  SendFilledIcon
} from '@vx-oss/heroui-v2-shared-icons'

import { useSales } from '../../../store/books/useSales'
import type { Columns } from '../../../store/books/useSales/data'
import {
  INITIAL_VISIBLE_COLUMNS,
  getColumnProps,
  getDateProps,
  getStatusProps
} from '../../../store/books/useSales/data'
import { Sales, Tags } from '../../../store/books/useSales/types'
import { teamSettingStyles } from '../../settings-new/team/variant'
import { CopyTextProps } from './types'
import { copyTextVariants, tableStyles } from './variant'

const Component = () => {
  const {
    data: users = [],
    isLoading: salesLoading,
    isError: salesError,
    refetch: refetchSales
  } = useSales.list({})

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const {
    data: selectedUser,
    isLoading: selectedLoading,
    isError: selectedError,
    refetch: selectedRefetch
  } = useSales.get({ id: selectedUserId ?? 0 })

  const [tableData, setTableData] = useState<Sales[]>([])

  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [rowsPerPage] = useState(5)
  const [page, setPage] = useState(1)

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'vendor',
    direction: 'ascending'
  })

  useEffect(() => {
    if (users.length) {
      setTableData(users)
    }
  }, [users])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleRowClick = (user: Sales) => {
    const index = sortedItems.findIndex(i => i.id === user.id)
    setSelectedIndex(index)
    setSelectedUserId(user.id)
    setSelectedKeys(new Set([user.id]))
    onOpen()
  }

  const handleDelete = useCallback(
    (id: number) => {
      console.log('Deleting user with id:', id)
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
    if (visibleColumns === 'all') return Object.values(getColumnProps)

    return Object.values(getColumnProps).filter(column =>
      Array.from(visibleColumns).includes(column.id)
    )
  }, [visibleColumns])

  const [statusFilter, setStatusFilter] = useState('all')
  const [startDateFilter, setStartDateFilter] = useState('all')
  const [dueDateFilter, setDueDateFilter] = useState('all')

  const itemFilter = useCallback(
    (col: Sales) => {
      const statusMatch =
        statusFilter === 'all' ||
        col.status.toLowerCase() === statusFilter.toLowerCase()

      const startDateMatch = (() => {
        if (startDateFilter === 'all') return true
        const match = startDateFilter.match(/(\d+)(?=Days)/)
        const daysAgo = match ? +match[1] : 0
        const limit = new Date()
        limit.setDate(limit.getDate() - daysAgo)
        return new Date(col.date) >= limit
      })()

      const dueDateMatch = (() => {
        if (dueDateFilter === 'all') return true
        const match = dueDateFilter.match(/(\d+)(?=Days)/)
        const daysAgo = match ? +match[1] : 0
        const limit = new Date()
        limit.setDate(limit.getDate() - daysAgo)
        return new Date(col.dueDate) >= limit
      })()

      return statusMatch && startDateMatch && dueDateMatch
    },
    [statusFilter, startDateFilter, dueDateFilter]
  )

  const filteredItems = useMemo(() => {
    let filteredUsers = [...tableData]

    if (filterValue) {
      const lowerFilter = filterValue.toLowerCase()

      filteredUsers = filteredUsers.filter(user => {
        // convert all fields into a string array
        const values = [
          user.amount?.toString(),
          user.product,
          user.date?.toString(),
          user.dueDate?.toString(),
          user.id?.toString(),
          user.vendor?.name,
          user.status,
          user.orderId?.toString(),
          user.externalOrderID,
          ...(user.tags?.map(tag => tag.toString()) || [])
        ]

        // check if ANY value includes filter
        return values.some(val => val?.toLowerCase().includes(lowerFilter))
      })
    }

    filteredUsers = filteredUsers.filter(itemFilter)
    return filteredUsers
  }, [filterValue, tableData, itemFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Sales, b: Sales) => {
      const col = sortDescriptor.column as keyof Sales

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

  const CopyText = memo(
    forwardRef<HTMLDivElement, CopyTextProps>((props, forwardedRef) => {
      const {
        className,
        textClassName,
        children,
        copyText = 'Copy',
        timeout = 1500,
        variant = 'default',
        ...rest
      } = props

      const [copied, setCopied] = React.useState(false)
      const [copyTimeout, setCopyTimeout] = React.useState<ReturnType<
        typeof setTimeout
      > | null>(null)

      const onClearTimeout = () => {
        if (copyTimeout) clearTimeout(copyTimeout)
      }

      const handleClick = () => {
        onClearTimeout()
        navigator.clipboard.writeText(children).then(
          () => {
            setCopied(true)
            setCopyTimeout(
              setTimeout(() => {
                setCopied(false)
              }, timeout)
            )
          },
          err => {
            console.error('Failed to copy:', err)
          }
        )
      }

      const content = useMemo(
        () => (copied ? 'Copied!' : copyText),
        [copied, copyText]
      )

      return (
        <div
          ref={forwardedRef}
          {...rest}
          className={copyTextVariants[variant](className)}>
          <span className={textClassName}>{children}</span>

          <Tooltip
            className="text-foreground"
            content={content}
            closeDelay={100}>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="text-foreground h-7 w-7 min-w-7"
              onPress={handleClick}>
              {copied ? (
                <Icon
                  className="text-success h-[14px] w-[14px]"
                  icon="solar:check-read-linear"
                />
              ) : (
                <Icon className="h-[14px] w-[14px]" icon="solar:copy-linear" />
              )}
            </Button>
          </Tooltip>
        </div>
      )
    })
  )
  const renderCell = useCallback(
    (user: Sales, columnKey: React.Key) => {
      const userKey = columnKey as Columns
      const cellValue = user[userKey as unknown as keyof Sales] as string

      const statusValue = user.status
      const key = statusValue.toLowerCase() as keyof typeof getStatusProps
      const { color } = getStatusProps[key] || {}

      switch (userKey) {
        case 'orderId':
          return <CopyText>{String(cellValue)}</CopyText>
        case 'externalOrderID':
          return <CopyText>{String(cellValue)}</CopyText>
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
          return (
            <Chip
              className={`${color}`} // 👈 merge bg + text
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
            <div className={`${tableStyles.cell.actionsContainer}`}>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className={tableStyles.actionButton}>
                <EyeFilledIcon
                  className={tableStyles.cell.actionIcon}
                  height={18}
                  width={18}
                />
              </Button>

              <Button
                isIconOnly
                size="sm"
                variant="light"
                className={tableStyles.actionButton}
                onClick={e => handleEdit(user.id)}>
                <EditIcon
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
                    className={tableStyles.actionButton}>
                    <Icon icon="solar:menu-dots-bold" width={18} height={18} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="More actions">
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="default"
                    startContent={
                      <DeleteIcon
                        className={tableStyles.cell.actionIcon}
                        height={18}
                        width={18}
                      />
                    }
                    onClick={() => handleDelete(user.id)}>
                    Delete
                  </DropdownItem>

                  <DropdownItem
                    key="send"
                    className={tableStyles.actionButton}
                    startContent={<SendFilledIcon width={20} />}>
                    Send
                  </DropdownItem>

                  <DropdownItem
                    key="download"
                    variant="light"
                    startContent={
                      <Icon icon="solar:download-line-duotone" width={20} />
                    }>
                    Download
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        default:
          return cellValue
      }
    },
    [CopyText, handleEdit, handleDelete]
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
                      {/* Status filter */}
                      <RadioGroup
                        label="Status"
                        value={statusFilter}
                        onValueChange={setStatusFilter}>
                        <Radio value="all">All</Radio>
                        {Object.entries(getStatusProps).map(
                          ([key, { label }]) => (
                            <Radio key={key} value={key}>
                              {label}
                            </Radio>
                          )
                        )}
                      </RadioGroup>

                      <Spacer y={5} />

                      {/* Start Date filter */}
                      <RadioGroup
                        label="Start Date"
                        value={startDateFilter}
                        onValueChange={setStartDateFilter}>
                        {Object.entries(getDateProps).map(
                          ([key, { label }]) => (
                            <Radio key={key} value={key}>
                              {label}
                            </Radio>
                          )
                        )}
                      </RadioGroup>

                      <Spacer y={5} />

                      {/* Due Date filter */}
                      <RadioGroup
                        label="Due Date"
                        value={dueDateFilter}
                        onValueChange={setDueDateFilter}>
                        {Object.entries(getDateProps).map(
                          ([key, { label }]) => (
                            <Radio key={key} value={key}>
                              {label}
                            </Radio>
                          )
                        )}
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

                  <DropdownMenu aria-label="Sort">
                    {headerColumns
                      .filter(c => !['actions', 'teams'].includes(c.id))
                      .map(item => (
                        <DropdownItem
                          key={item.id}
                          className={
                            sortDescriptor.column === item.id
                              ? 'bg-default-100 font-medium'
                              : ''
                          }
                          endContent={
                            sortDescriptor.column === item.id ? (
                              <Icon
                                icon={
                                  sortDescriptor.direction === 'ascending'
                                    ? 'solar:arrow-up-linear'
                                    : 'solar:arrow-down-linear'
                                }
                                width={14}
                                height={14}
                              />
                            ) : null
                          }
                          onPress={() => {
                            setSortDescriptor({
                              column: item.id,
                              direction:
                                sortDescriptor.column === item.id &&
                                sortDescriptor.direction === 'ascending'
                                  ? 'descending'
                                  : 'ascending'
                            })
                          }}>
                          {item.label}
                        </DropdownItem>
                      ))}
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
                      <Popover placement="bottom-end">
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
                              label="Status"
                              value={statusFilter}
                              onValueChange={setStatusFilter}>
                              <Radio value="all">All</Radio>
                              {Object.entries(getStatusProps).map(
                                ([key, { label }]) => (
                                  <Radio key={key} value={key}>
                                    {label}
                                  </Radio>
                                )
                              )}
                            </RadioGroup>

                            <Spacer y={5} />

                            <RadioGroup
                              label="Start Date"
                              value={startDateFilter}
                              onValueChange={setStartDateFilter}>
                              {Object.entries(getDateProps).map(
                                ([key, { label }]) => (
                                  <Radio key={key} value={key}>
                                    {label}
                                  </Radio>
                                )
                              )}
                            </RadioGroup>

                            <Spacer y={5} />

                            <RadioGroup
                              label="Due Date"
                              value={dueDateFilter}
                              onValueChange={setDueDateFilter}>
                              {Object.entries(getDateProps).map(
                                ([key, { label }]) => (
                                  <Radio key={key} value={key}>
                                    {label}
                                  </Radio>
                                )
                              )}
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

                        <DropdownMenu aria-label="Sort">
                          {headerColumns
                            .filter(c => !['actions', 'teams'].includes(c.id))
                            .map(item => (
                              <DropdownItem
                                key={item.id}
                                className={
                                  sortDescriptor.column === item.id
                                    ? 'bg-default-100 font-medium'
                                    : ''
                                }
                                endContent={
                                  sortDescriptor.column === item.id ? (
                                    <Icon
                                      icon={
                                        sortDescriptor.direction === 'ascending'
                                          ? 'solar:arrow-up-linear'
                                          : 'solar:arrow-down-linear'
                                      }
                                      width={14}
                                      height={14}
                                    />
                                  ) : null
                                }
                                onPress={() => {
                                  setSortDescriptor({
                                    column: item.id,
                                    direction:
                                      sortDescriptor.column === item.id &&
                                      sortDescriptor.direction === 'ascending'
                                        ? 'descending'
                                        : 'ascending'
                                  })
                                }}>
                                {item.label}
                              </DropdownItem>
                            ))}
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
                            .map(([id, col]) => ({ ...col, id }))
                            .filter(c => c.id !== 'actions')}
                          selectedKeys={visibleColumns}
                          selectionMode="multiple"
                          onSelectionChange={setVisibleColumns}>
                          {item => (
                            <DropdownItem key={item.id}>
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
    dueDateFilter,
    headerColumns,
    visibleColumns,
    sortDescriptor.column,
    sortDescriptor.direction
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
  }, [page, pages, onPreviousPage, onNextPage, onPaginationChange])

  if (salesError)
    return (
      <Alert
        variant="faded"
        color="default"
        title="Error loading Sales"
        hideIcon
        className="mt-6 flex flex-col items-center justify-center">
        <Button
          color="danger"
          size="sm"
          variant="light"
          className="mx-auto mt-2"
          onPress={() => {
            refetchSales()
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
              {!salesLoading && <div>{topBar}</div>}
              <ScrollShadow orientation="horizontal">
                {salesLoading ? (
                  <div className="flex h-75 items-center justify-center">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <Table
                    removeWrapper
                    aria-label="Users Table"
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
                          key={column.id}
                          // disable sorting for specific columns
                          allowsSorting={
                            column.id !== 'actions' && column.id !== 'tags'
                          }
                          align={column.id === 'actions' ? 'end' : 'start'}
                          className={cn([
                            column.id === 'actions'
                              ? 'flex items-center justify-end px-[20px]'
                              : ''
                          ])}>
                          {column.label}
                          {/* <div
                            className="flex cursor-pointer items-center justify-between select-none"
                            onClick={() => {
                              if (
                                column.id === 'actions' ||
                                column.id === 'tags'
                              )
                                return

                              setSortDescriptor({
                                column: column.id,
                                direction:
                                  sortDescriptor.column === column.id &&
                                  sortDescriptor.direction === 'ascending'
                                    ? 'descending'
                                    : 'ascending'
                              })
                            }}>
                            {column.info && (
                              <Tooltip content={column.info}>
                                <Icon
                                  className="text-default-300"
                                  height={16}
                                  icon="solar:info-circle-linear"
                                  width={16}
                                />
                              </Tooltip>
                            )}
                          </div> */}
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
              {!salesLoading && <div>{bottomContent}</div>}
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
          {(onClose: () => void) => (
            <>
              {/* Drawer Header */}
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
                    variant="flat"
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
                    onPress={() => {
                      if (selectedUserId) {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/user/${selectedUserId}`
                        )
                      }
                    }}>
                    Copy Link
                  </Button>
                  <Button
                    className="text-small text-default-500 font-medium"
                    size="sm"
                    variant="flat"
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
                    }>
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
                      variant="flat"
                      isDisabled={selectedIndex === 0}
                      onPress={() => {
                        if (selectedIndex !== null && selectedIndex > 0) {
                          const newIndex = selectedIndex - 1
                          setSelectedIndex(newIndex)
                          const newUser = sortedItems[newIndex]
                          setSelectedUserId(newUser.id)
                          setSelectedKeys(new Set([newUser.id]))
                        }
                      }}>
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
                      variant="flat"
                      isDisabled={
                        selectedIndex === null ||
                        selectedIndex >= sortedItems.length - 1
                      }
                      onPress={() => {
                        if (
                          selectedIndex !== null &&
                          selectedIndex < sortedItems.length - 1
                        ) {
                          const newIndex = selectedIndex + 1
                          setSelectedIndex(newIndex)
                          const newUser = sortedItems[newIndex]
                          setSelectedUserId(newUser.id)
                          setSelectedKeys(new Set([newUser.id]))
                        }
                      }}>
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

              {/* Drawer Body */}
              <DrawerBody className="pt-16">
                {selectedLoading ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <Spinner size="lg" />
                    <p className="text-default-500 mt-2 text-sm">
                      Loading user...
                    </p>
                  </div>
                ) : selectedError ? (
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
                  <p className="text-default-400 text-sm">No user selected</p>
                ) : (
                  <div className="space-y-4">
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

              {/* Drawer Footer */}
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
