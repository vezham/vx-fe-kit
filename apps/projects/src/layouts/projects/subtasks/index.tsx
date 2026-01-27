'use client'

import { Icon } from '@iconify/react'
import { Outlet, useNavigate, useParams } from '@tanstack/react-router'
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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ScrollShadow,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  useDisclosure
} from '@vezham/react/v2'

import {
  DeleteIcon,
  EditIcon,
  EyeIcon,
  SendFilledIcon
} from '@vx-oss/heroui-v2-shared-icons'

import { useDeleteSubTask, useSubTaskList } from '../../../store/useSubTasks'
import {
  Columns,
  INITIAL_VISIBLE_COLUMNS,
  getColumnProps,
  getStatusProps
} from '../../../store/useSubTasks/data'
import { useTasks } from '../../../store/useTasks'
import { Task } from '../tasks/types'
import { CopyTextProps, Project, Tags } from '../types'
import { copyTextVariants, tableStyles } from '../variant'
import { BottomContent } from './BottomContent'
import { HeaderContent } from './HeaderContent'
import { SubTaskDetailModal } from './SubTaskDetailsModal'
import { SubTask } from './types'

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

    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }, [])

    const handleCopy = async (e: React.MouseEvent) => {
      e.stopPropagation()
      try {
        await navigator.clipboard.writeText(String(children))
        setCopied(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          setCopied(false)
        }, timeout)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }

    return (
      <div
        ref={forwardedRef}
        {...rest}
        className={copyTextVariants[variant](className)}>
        <span className={textClassName}>{children}</span>
        <Tooltip
          className="text-foreground"
          content={copied ? 'Copied!' : copyText}
          closeDelay={100}>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="text-foreground h-7 w-7 min-w-7"
            onPress={handleCopy}>
            {copied ? (
              <Icon
                icon="solar:check-read-linear"
                className="text-success h-[14px] w-[14px]"
              />
            ) : (
              <Icon icon="solar:copy-linear" className="h-[14px] w-[14px]" />
            )}
          </Button>
        </Tooltip>
      </div>
    )
  })
)

const SubTaskSection = () => {
  const {
    data: users = [],
    isLoading: subtaskLoading,
    isError: subtaskError,
    refetch: refetchSubTask
  } = useSubTaskList({})
  const {
    data: tasks = [],
    isLoading: taskLoading,
    isError: taskError,
    refetch: refetchTask
  } = useTasks()

  const navigate = useNavigate()
  const { taskId, subtaskId } = useParams({ strict: false })

  const { mutate: deleteTask } = useDeleteSubTask()

  const handleDelete = useCallback((id: number) => deleteTask(id), [deleteTask])

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [rowsPerPage] = useState(7)
  const [page, setPage] = useState(1)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'owner',
    direction: 'ascending'
  })
  const [statusFilter, setStatusFilter] = useState('all')
  const [startDateFilter, setStartDateFilter] = useState('all')
  const [dueDateFilter, setDueDateFilter] = useState('all')
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)

  const isOpen = Boolean(subtaskId)

  const selectedTask = useMemo(
    () => users.find(u => u.subtaskId === Number(subtaskId)),
    [users, subtaskId]
  )

  const closeModal = () => {
    navigate({
      to: '/projects/$projectId/tasks/$taskId/subtasks',
      params: { taskId }
    })
  }

  const itemFilter = useCallback(
    (col: SubTask) => {
      const statusMatch =
        statusFilter === 'all' ||
        col.status.toLowerCase() === statusFilter.toLowerCase()
      const startDateMatch =
        startDateFilter === 'all' ||
        new Date(col.startDate) >=
          (() => {
            const match = startDateFilter.match(/(\d+)(?=Days)/)
            const daysAgo = match ? +match[1] : 0
            const limit = new Date()
            limit.setDate(limit.getDate() - daysAgo)
            return limit
          })()
      const dueDateMatch =
        dueDateFilter === 'all' ||
        new Date(col.dueDate) >=
          (() => {
            const match = dueDateFilter.match(/(\d+)(?=Days)/)
            const daysAgo = match ? +match[1] : 0
            const limit = new Date()
            limit.setDate(limit.getDate() - daysAgo)
            return limit
          })()
      return statusMatch && startDateMatch && dueDateMatch
    },
    [statusFilter, startDateFilter, dueDateFilter]
  )

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users]
    if (filterValue) {
      const lowerFilter = filterValue.toLowerCase()
      filteredUsers = filteredUsers.filter(user =>
        [
          user.projectsId,
          user.taskId,
          user.subtaskId,
          user.subtaskname,
          user.startDate?.toString(),
          user.dueDate?.toString(),
          user.id?.toString(),
          user.owner?.name,
          user.status,
          user.taskId,
          user.description,
          user.priority,
          user.billingtype,
          ...(user.tags?.map(tag => tag.toString()) || [])
        ].some(val =>
          String(val ?? '')
            .toLowerCase()
            .includes(lowerFilter)
        )
      )
    }
    return filteredUsers.filter(itemFilter)
  }, [filterValue, itemFilter, users])

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    return filteredItems.slice(start, start + rowsPerPage)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const col = sortDescriptor.column as keyof SubTask
      let first: any = a[col]
      let second: any = b[col]
      if (col === 'owner') {
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

  // const handleRowClick = useCallback(
  //   (key: React.Key) => {
  //     const user = sortedItems.find(item => item.id === Number(key))
  //     if (!user) return

  //     const index = sortedItems.findIndex(i => i.id === user.id)

  //     setSelectedIndex(index)
  //     setSelectedUserId(user.id)
  //     setSelectedKeys(new Set([String(user.id)]))
  //     onOpen()
  //   },
  //   [sortedItems, onOpen]
  // )

  const handleRowClick = (subtask: SubTask) => {
    navigate({
      to: '/projects/$projectId/tasks/$taskId/subtasks/$subtaskId',
      params: {
        taskId: String(subtask.taskId),
        subtaskId: String(subtask.subtaskId)
      }
    })
  }

  const handleView = (subtask: SubTask) => {
    navigate({
      to: '/projects/$projectId/tasks/$taskId/subtasks/$subtaskId',
      params: {
        taskId: String(subtask.taskId),
        subtaskId: String(subtask.subtaskId)
      }
    })
  }

  const headerColumns = useMemo(() => {
    return Array.from(visibleColumns).length === 0
      ? Object.values(getColumnProps)
      : Object.values(getColumnProps).filter(column =>
          visibleColumns.has(column.id)
        )
  }, [visibleColumns])

  const taskMap = useMemo(() => {
    return new Map<number, Task>(tasks.map(t => [t.taskId, t]))
  }, [tasks])

  const renderCell = useCallback(
    (user: Task, columnKey: React.Key) => {
      const key = columnKey as Columns
      const value = user[key as keyof Task] as any

      switch (key) {
        case 'subtaskId':
          return <CopyText>{String(value)}</CopyText>
        case 'taskId': {
          const task = taskMap.get(user.taskId)

          if (!task) {
            return (
              <Chip size="sm" variant="flat">
                Unknown
              </Chip>
            )
          }

          return <p>{task.taskId}</p>
        }

        case 'owner':
          return (
            <User
              avatarProps={{ radius: 'lg', src: value.avatar }}
              name={value.name}
              description={value.email}
            />
          )
        case 'subtaskname':
        case 'description':
          return <p className="max-w-[200px] truncate">{value}</p>
        case 'priority':
        case 'billingtype':
          return <p className="truncate">{value}</p>
        case 'startDate':
        case 'dueDate':
          return (
            <div className={tableStyles.cell.lastLoginContainer}>
              <Icon
                icon="solar:calendar-minimalistic-linear"
                className={tableStyles.cell.lastLoginIcon}
              />
              <p className={tableStyles.cell.lastLoginText}>
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                }).format(value)}
              </p>
            </div>
          )
        case 'status': {
          const { label, color } =
            getStatusProps[value as keyof typeof getStatusProps] || {}
          return (
            <Chip
              variant="solid"
              radius="sm"
              className={`${color} ${label}`}
              startContent={
                <Icon icon="solar:circle-linear" width={24} height={24} />
              }>
              {value}
            </Chip>
          )
        }
        case 'tags':
          return (
            <div className="flex gap-1">
              {value.slice(0, 4).map((tag: Tags, i: number) =>
                i < 3 ? (
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
                    +{value.length - 3}
                  </Chip>
                )
              )}
            </div>
          )
        case 'actions':
          return (
            <div className={tableStyles.cell.actionsContainer}>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className={tableStyles.actionButton}
                onPress={() => {
                  handleView(user)
                }}>
                <EyeIcon
                  className={tableStyles.cell.actionIcon}
                  height={18}
                  width={18}
                />
              </Button>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <Icon icon="solar:menu-dots-bold" width={18} height={18} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="More actions">
                  <DropdownItem startContent={<EditIcon width={20} />} key={''}>
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    startContent={<DeleteIcon height={18} width={18} />}
                    className="text-danger"
                    onClick={() => handleDelete(user.taskId)}
                    key={''}>
                    Delete
                  </DropdownItem>

                  <DropdownItem
                    startContent={
                      <Icon icon="solar:download-line-duotone" width={20} />
                    }
                    key={''}>
                    Download
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        default:
          return value
      }
    },
    [handleDelete, handleView]
  )

  const onSelectionChange = useCallback(
    (keys: Selection) => setSelectedKeys(keys),
    []
  )
  const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

  const onNextPage = useCallback(async () => {
    if (page < pages) {
      setIsPageLoading(true)
      await sleep()
      setPage(p => p + 1)
      setIsPageLoading(false)
    }
  }, [page, pages])
  const onPreviousPage = useCallback(async () => {
    if (page > 1) {
      setIsPageLoading(true)
      await sleep()
      setPage(p => p - 1)
      setIsPageLoading(false)
    }
  }, [page])
  const onPaginationChange = async (newPage: number) => {
    if (newPage !== page) {
      setIsPageLoading(true)
      await sleep()
      setPage(newPage)
      setIsPageLoading(false)
    }
  }

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value || '')
    setPage(1)
  }, [])
  const toggleSearch = useCallback(() => setIsSearchExpanded(prev => !prev), [])

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current)
      setTimeout(() => searchInputRef.current?.focus(), 100)
  }, [isSearchExpanded])

  if (taskError)
    return (
      <Alert
        variant="faded"
        color="default"
        title="Error loading Purchase"
        hideIcon
        className="mt-6 flex flex-col items-center">
        <Button
          color="danger"
          size="sm"
          variant="light"
          className="mx-auto mt-2"
          onPress={refetchTask}>
          Try Again
        </Button>
      </Alert>
    )

  return (
    <div className="flex items-start justify-between p-0">
      <div className="w-full">
        <Card
          className="sm:border-default-200 mt-4 bg-transparent sm:border"
          shadow="none">
          <CardBody>
            <div className={tableStyles.wrapper}>
              {!taskLoading && (
                <HeaderContent
                  selectedKeys={selectedKeys}
                  usersLength={users.length}
                  isSearchExpanded={isSearchExpanded}
                  filterValue={filterValue}
                  statusFilter={statusFilter}
                  startDateFilter={startDateFilter}
                  dueDateFilter={dueDateFilter}
                  headerColumns={headerColumns}
                  visibleColumns={visibleColumns}
                  sortDescriptor={sortDescriptor}
                  onSearchChange={onSearchChange}
                  toggleSearch={toggleSearch}
                  setStatusFilter={setStatusFilter}
                  setStartDateFilter={setStartDateFilter}
                  setDueDateFilter={setDueDateFilter}
                  setVisibleColumns={setVisibleColumns}
                  setSortDescriptor={setSortDescriptor}
                  searchInputRef={searchInputRef}
                  setFilterValue={setFilterValue}
                />
              )}
              <ScrollShadow orientation="horizontal">
                {taskLoading ? (
                  <div className="flex h-75 items-center justify-center">
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <Table
                    className="w-full"
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
                          allowsSorting={
                            column.id !== 'actions' && column.id !== 'tags'
                          }
                          align={column.id === 'actions' ? 'end' : 'start'}>
                          <span>{column.label}</span>
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody
                      items={isPageLoading ? [] : sortedItems}
                      emptyContent="No users found">
                      {item => (
                        <TableRow
                          key={item.id}
                          className="group"
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
              {!taskLoading && (
                <BottomContent
                  page={page}
                  pages={pages}
                  onPaginationChange={onPaginationChange}
                  onPreviousPage={onPreviousPage}
                  onNextPage={onNextPage}
                />
              )}
            </div>
          </CardBody>
        </Card>
      </div>
      <SubTaskDetailModal subtask={selectedTask}>
        <div className="mt-4">
          <Outlet />
        </div>
      </SubTaskDetailModal>
    </div>
  )
}

export { SubTaskSection }
