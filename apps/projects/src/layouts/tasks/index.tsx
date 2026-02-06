import { Icon } from '@iconify/react'
import { Outlet, useNavigate, useParams } from '@tanstack/react-router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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

import { DeleteIcon, EditIcon, EyeIcon } from '@vx-oss/heroui-v2-shared-icons'

import { CopyText } from '../../components/copytext'
import { TaskDrawer } from '../../components/project-task-drawer'
import { BottomContent } from '../../components/project-task-footer'
import { HeaderContent } from '../../components/project-task-header'
import { TaskDetailModal } from '../../components/project-task-modal'
import { useDeleteTask, useTasks } from '../../store/useTasks'
import {
  Columns,
  INITIAL_VISIBLE_COLUMNS,
  getColumnProps,
  getStatusProps
} from '../../store/useTasks/data'
import { useTableCellProps } from './types'
import { TaskSectionProps, useTaskSectionProps } from './types'

const ProjectTask = () => {
  const {
    getBaseProps,
    getCardProps,
    getCardBodyProps,
    getTableWrapperProps,
    getLoadingContainerProps,
    getEmptyStateProps,
    children
  } = useTaskSectionProps({} as TaskSectionProps)

  const {
    data: users = [],
    isLoading: taskLoading,
    isError: taskError,
    refetch: refetchTask
  } = useTasks()

  const { mutate: deleteTask } = useDeleteTask()

  const handleDelete = useCallback((id: number) => deleteTask(id), [deleteTask])

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

  const { isOpen: isTaskOpen, onOpenChange: onTaskChange } = useDisclosure()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { projectId, taskId } = useParams({
    strict: false
  })
  const isModalOpen = Boolean(taskId)

  const selectedTask = useMemo(
    () => users.find(u => u.taskId === Number(taskId)),
    [users, taskId]
  )

  const closeModal = () => {
    navigate({
      to: '/projects/$projectId/tasks',
      params: { projectId }
    })
  }

  const itemFilter = useCallback(
    (col: any) => {
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
          user.taskname,
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
      const col = sortDescriptor.column as keyof any
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

  const handleRowClick = (task: any) => {
    navigate({
      to: '/projects/$projectId/tasks/$taskId',
      params: {
        taskId: String(task.taskId)
      }
    })
  }

  const handleView = (task: any) => {
    navigate({
      to: '/projects/$projectId/tasks/$taskId',
      params: {
        projectId: String(task.projectsId),
        taskId: String(task.taskId)
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

  const {
    getLastLoginContainerProps,
    getLastLoginIconProps,
    getLastLoginTextProps,
    getActionsContainerProps,
    getActionIconProps,
    getActionButtonProps,
    getTagsContainerProps,
    getTagChipProps,
    getMoreTagChipProps,
    getTruncateTextProps
  } = useTableCellProps()

  const renderCell = useCallback(
    (user: any, columnKey: React.Key) => {
      const key = columnKey as Columns
      const value = user[key as keyof any] as any

      switch (key) {
        case 'taskId':
          return <CopyText>{String(value)}</CopyText>

        case 'owner':
          return (
            <User
              avatarProps={{ radius: 'lg', src: value.avatar }}
              name={value.name}
              description={value.email}
            />
          )
        case 'taskname':
        case 'description':
          return <p {...getTruncateTextProps()}>{value}</p>
        case 'priority':
        case 'billingtype':
          return <p {...getTruncateTextProps()}>{value}</p>

        case 'startDate':
        case 'dueDate':
          return (
            <div {...getLastLoginContainerProps()}>
              <Icon
                icon="solar:calendar-minimalistic-linear"
                {...getLastLoginIconProps()}
              />
              <p {...getLastLoginTextProps()}>
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
            <div {...getTagsContainerProps()}>
              {value.slice(0, 4).map((tag: string, i: number) =>
                i < 3 ? (
                  <Chip
                    key={tag}
                    {...getTagChipProps()}
                    size="sm"
                    variant="flat">
                    {tag}
                  </Chip>
                ) : (
                  <Chip
                    key="more"
                    {...getMoreTagChipProps()}
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
            <div {...getActionsContainerProps()}>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                {...getActionButtonProps()}
                onPress={() => {
                  handleView(user)
                }}>
                <EyeIcon {...getActionIconProps()} height={18} width={18} />
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

  if (!taskLoading && users.length === 0) {
    return (
      <div {...getEmptyStateProps()}>
        <div>No tasks found</div>
        <Button color="primary" onPress={() => onTaskChange(true)}>
          Create Your Task
        </Button>
        <TaskDrawer
          isOpen={isTaskOpen}
          onOpenChange={onTaskChange}
          projectId={projectId ? Number(projectId) : undefined}
        />
      </div>
    )
  }

  return (
    <div {...getBaseProps()}>
      <div className="w-full md:pl-3">
        <Card {...getCardProps()}>
          <CardBody {...getCardBodyProps()}>
            <div {...getTableWrapperProps()}>
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
                  <div {...getLoadingContainerProps()}>
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
                      emptyContent="No tasks found">
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
      <TaskDetailModal
        isOpen={isModalOpen}
        onOpenChange={closeModal}
        task={selectedTask}>
        <Outlet />
      </TaskDetailModal>
      <TaskDrawer
        isOpen={isTaskOpen}
        onOpenChange={onTaskChange}
        projectId={projectId ? Number(projectId) : undefined}
      />
    </div>
  )
}

export { ProjectTask }
