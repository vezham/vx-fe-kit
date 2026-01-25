// 'use client'
// import { Icon } from '@iconify/react'
// import React, {
//   forwardRef,
//   memo,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState
// } from 'react'
// import type { Selection, SortDescriptor } from '@vezham/react/v2'
// import {
//   Alert,
//   Button,
//   Card,
//   CardBody,
//   Chip,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   ScrollShadow,
//   Spinner,
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
//   Tooltip,
//   User,
//   cn,
//   useDisclosure
// } from '@vezham/react/v2'
// import {
//   DeleteIcon,
//   EditIcon,
//   EyeFilledIcon,
//   SendFilledIcon
// } from '@vx-oss/heroui-v2-shared-icons'
// import {
//   useDeleteProject,
//   useProject,
//   useProjectList
// } from '../../store/useProjects'
// import {
//   Columns,
//   INITIAL_VISIBLE_COLUMNS,
//   getColumnProps,
//   getStatusProps
// } from '../../store/useProjects/data'
// import { BottomContent } from './BottomContent'
// import { HeaderContent } from './HeaderContent'
// import { ProjectDrawer } from './ProjectDrawer'
// import { CopyTextProps, Project, Tags } from './types'
// import { copyTextVariants, tableStyles } from './variant'
// import Sidebar from '../../components/sidebar/sidebar'
// const CopyText = memo(
//   forwardRef<HTMLDivElement, CopyTextProps>((props, forwardedRef) => {
//     const {
//       className,
//       textClassName,
//       children,
//       copyText = 'Copy',
//       timeout = 1500,
//       variant = 'default',
//       ...rest
//     } = props
//     const [copied, setCopied] = React.useState(false)
//     const [copyTimeout, setCopyTimeout] = React.useState<ReturnType<
//       typeof setTimeout
//     > | null>(null)
//     const onClearTimeout = () => {
//       if (copyTimeout) clearTimeout(copyTimeout)
//     }
//     const handleClick = () => {
//       onClearTimeout()
//       navigator.clipboard.writeText(children).then(
//         () => {
//           setCopied(true)
//           setCopyTimeout(
//             setTimeout(() => {
//               setCopied(false)
//             }, timeout)
//           )
//         },
//         err => {
//           console.error('Failed to copy:', err)
//         }
//       )
//     }
//     const content = useMemo(
//       () => (copied ? 'Copied!' : copyText),
//       [copied, copyText]
//     )
//     return (
//       <div
//         ref={forwardedRef}
//         {...rest}
//         className={copyTextVariants[variant](className)}>
//         <span className={textClassName}>{children}</span>
//         <Tooltip className="text-foreground" content={content} closeDelay={100}>
//           <Button
//             isIconOnly
//             size="sm"
//             variant="light"
//             className="text-foreground h-7 w-7 min-w-7"
//             onPress={handleClick}>
//             {copied ? (
//               <Icon
//                 className="text-success h-[14px] w-[14px]"
//                 icon="solar:check-read-linear"
//               />
//             ) : (
//               <Icon className="h-[14px] w-[14px]" icon="solar:copy-linear" />
//             )}
//           </Button>
//         </Tooltip>
//       </div>
//     )
//   })
// )
// const Component = () => {
//   const {
//     data: users = [],
//     isLoading: projectLoading,
//     isError: projectError,
//     refetch: refetchProject
//   } = useProjectList({})
//   const { mutate: deleteProject } = useDeleteProject()
//   const handleDelete = useCallback(
//     (id: number) => {
//       deleteProject(id)
//     },
//     [deleteProject]
//   )
//   // State management
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
//   const [filterValue, setFilterValue] = useState('')
//   const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
//   const [visibleColumns, setVisibleColumns] = useState<Selection>(
//     new Set(INITIAL_VISIBLE_COLUMNS)
//   )
//   const [rowsPerPage] = useState(5)
//   const [page, setPage] = useState(1)
//   const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
//     column: 'owner',
//     direction: 'ascending'
//   })
//   const [statusFilter, setStatusFilter] = useState('all')
//   const [startDateFilter, setStartDateFilter] = useState('all')
//   const [dueDateFilter, setDueDateFilter] = useState('all')
//   const [isPageLoading, setIsPageLoading] = useState(false)
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false)
//   // Hooks
//   const { isOpen, onOpen, onOpenChange } = useDisclosure()
//   const searchInputRef = useRef<HTMLInputElement>(null)
//   const {
//     data: selectedUser,
//     isLoading: selectedLoading,
//     isError: selectedError,
//     refetch: selectedRefetch
//   } = useProject({ id: selectedUserId ?? 0 })
//   // Event handlers
//   const handleRowClick = (user: Project) => {
//     const index = sortedItems.findIndex(i => i.id === user.id)
//     setSelectedIndex(index)
//     setSelectedUserId(user.id)
//     setSelectedKeys(new Set([user.id]))
//     onOpen()
//   }
//   const handleEdit = useCallback(
//     (id: number) => {
//       setSelectedUserId(id)
//       onOpen()
//     },
//     [onOpen]
//   )
//   // Filtering and sorting logic
//   const headerColumns = useMemo(() => {
//     if (visibleColumns === 'all') return Object.values(getColumnProps)
//     return Object.values(getColumnProps).filter(column =>
//       Array.from(visibleColumns).includes(column.id)
//     )
//   }, [visibleColumns])
//   const itemFilter = useCallback(
//     (col: Project) => {
//       const statusMatch =
//         statusFilter === 'all' ||
//         col.status.toLowerCase() === statusFilter.toLowerCase()
//       const startDateMatch = (() => {
//         if (startDateFilter === 'all') return true
//         const match = startDateFilter.match(/(\d+)(?=Days)/)
//         const daysAgo = match ? +match[1] : 0
//         const limit = new Date()
//         limit.setDate(limit.getDate() - daysAgo)
//         return new Date(col.startDate) >= limit
//       })()
//       const dueDateMatch = (() => {
//         if (dueDateFilter === 'all') return true
//         const match = dueDateFilter.match(/(\d+)(?=Days)/)
//         const daysAgo = match ? +match[1] : 0
//         const limit = new Date()
//         limit.setDate(limit.getDate() - daysAgo)
//         return new Date(col.dueDate) >= limit
//       })()
//       return statusMatch && startDateMatch && dueDateMatch
//     },
//     [statusFilter, startDateFilter, dueDateFilter]
//   )
//   const filteredItems = useMemo(() => {
//     let filteredUsers = [...users]
//     if (filterValue) {
//       const lowerFilter = filterValue.toLowerCase()
//       filteredUsers = filteredUsers.filter(user => {
//         const values = [
//           user.project,
//           user.startDate?.toString(),
//           user.dueDate?.toString(),
//           user.id?.toString(),
//           user.owner?.name,
//           user.status,
//           user.projectId,
//           ...(user.tags?.map(tag => tag.toString()) || [])
//         ]
//         return values.some(val =>
//           String(val ?? '')
//             .toLowerCase()
//             .includes(lowerFilter)
//         )
//       })
//     }
//     filteredUsers = filteredUsers.filter(itemFilter)
//     return filteredUsers
//   }, [filterValue, itemFilter, users])
//   const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1
//   const items = useMemo(() => {
//     const start = (page - 1) * rowsPerPage
//     const end = start + rowsPerPage
//     return filteredItems.slice(start, end)
//   }, [page, filteredItems, rowsPerPage])
//   const sortedItems = useMemo(() => {
//     return [...items].sort((a: Project, b: Project) => {
//       const col = sortDescriptor.column as keyof Project
//       let first = a[col]
//       let second = b[col]
//       if (col === 'owner') {
//         first = a[col].name
//         second = b[col].name
//       }
//       const cmp = first < second ? -1 : first > second ? 1 : 0
//       return sortDescriptor.direction === 'descending' ? -cmp : cmp
//     })
//   }, [sortDescriptor, items])
//   const filterSelectedKeys = useMemo(() => {
//     if (selectedKeys === 'all') {
//       return new Set(filteredItems.map(item => String(item.id)))
//     }
//     return new Set(
//       Array.from(selectedKeys).filter(key =>
//         filteredItems.some(item => String(item.id) === key)
//       )
//     )
//   }, [selectedKeys, filteredItems])
//   // Cell renderer
//   const renderCell = useCallback(
//     (user: Project, columnKey: React.Key) => {
//       const userKey = columnKey as Columns
//       const cellValue = user[userKey as unknown as keyof Project] as string
//       switch (userKey) {
//         case 'projectId':
//           return <CopyText>{String(cellValue)}</CopyText>
//         case 'owner':
//           return (
//             <User
//               avatarProps={{ radius: 'lg', src: user[userKey].avatar }}
//               classNames={{
//                 name: 'text-default-foreground',
//                 description: 'text-default-500'
//               }}
//               description={user[userKey].email}
//               name={user[userKey].name}>
//               {user[userKey].email}
//             </User>
//           )
//         case 'project':
//           return <p className="w-full truncate">{cellValue}</p>
//         case 'startdate':
//           return (
//             <div className={tableStyles.cell.lastLoginContainer}>
//               <Icon
//                 className={tableStyles.cell.lastLoginIcon}
//                 icon="solar:calendar-minimalistic-linear"
//               />
//               <p className={tableStyles.cell.lastLoginText}>
//                 {new Intl.DateTimeFormat('en-US', {
//                   month: 'long',
//                   day: 'numeric',
//                   year: 'numeric'
//                 }).format(cellValue as unknown as Date)}
//               </p>
//             </div>
//           )
//         case 'duedate':
//           return (
//             <div className={tableStyles.cell.lastLoginContainer}>
//               <Icon
//                 className={tableStyles.cell.lastLoginIcon}
//                 icon="solar:calendar-minimalistic-linear"
//               />
//               <p className={tableStyles.cell.lastLoginText}>
//                 {new Intl.DateTimeFormat('en-US', {
//                   month: 'long',
//                   day: 'numeric',
//                   year: 'numeric'
//                 }).format(cellValue as unknown as Date)}
//               </p>
//             </div>
//           )
//         case 'status': {
//           const statusValue = user.status
//           const key = statusValue as keyof typeof getStatusProps
//           const { label, color } = getStatusProps[key] || {}
//           return (
//             <Chip
//               className={`${color} ${label}`}
//               variant="solid"
//               radius="sm"
//               startContent={
//                 <Icon icon="solar:circle-linear" width={24} height={24} />
//               }>
//               {statusValue}
//             </Chip>
//           )
//         }
//         case 'tags':
//           return (
//             <div className="float-start flex gap-1">
//               {user.tags.slice(0, 4).map((tag: Tags, index: number) =>
//                 index < 3 ? (
//                   <Chip
//                     key={tag}
//                     className="bg-default-100 text-default-800 rounded-xl px-[6px] capitalize"
//                     size="sm"
//                     variant="flat">
//                     {tag}
//                   </Chip>
//                 ) : (
//                   <Chip
//                     key="more"
//                     className="text-default-500"
//                     size="sm"
//                     variant="flat">
//                     +{user.tags.length - 3}
//                   </Chip>
//                 )
//               )}
//             </div>
//           )
//         case 'actions':
//           return (
//             <div className={`${tableStyles.cell.actionsContainer}`}>
//               <Button
//                 isIconOnly
//                 size="sm"
//                 variant="light"
//                 className={tableStyles.actionButton}>
//                 <EyeFilledIcon
//                   className={tableStyles.cell.actionIcon}
//                   height={18}
//                   width={18}
//                 />
//               </Button>
//               <Button
//                 isIconOnly
//                 size="sm"
//                 variant="light"
//                 className={tableStyles.actionButton}
//                 onClick={e => handleEdit(user.id)}>
//                 <EditIcon
//                   className={tableStyles.cell.actionIcon}
//                   height={18}
//                   width={18}
//                 />
//               </Button>
//               <Dropdown placement="bottom-end">
//                 <DropdownTrigger>
//                   <Button
//                     isIconOnly
//                     size="sm"
//                     variant="light"
//                     className={tableStyles.actionButton}>
//                     <Icon icon="solar:menu-dots-bold" width={18} height={18} />
//                   </Button>
//                 </DropdownTrigger>
//                 <DropdownMenu aria-label="More actions">
//                   <DropdownItem
//                     key="delete"
//                     className="text-danger"
//                     color="default"
//                     startContent={
//                       <DeleteIcon
//                         className={tableStyles.cell.actionIcon}
//                         height={18}
//                         width={18}
//                       />
//                     }
//                     onClick={() => handleDelete(user.id)}>
//                     Delete
//                   </DropdownItem>
//                   <DropdownItem
//                     key="send"
//                     className={tableStyles.actionButton}
//                     startContent={<SendFilledIcon width={20} />}>
//                     Send
//                   </DropdownItem>
//                   <DropdownItem
//                     key="download"
//                     variant="light"
//                     startContent={
//                       <Icon icon="solar:download-line-duotone" width={20} />
//                     }>
//                     Download
//                   </DropdownItem>
//                 </DropdownMenu>
//               </Dropdown>
//             </div>
//           )
//         default:
//           return cellValue
//       }
//     },
//     [handleEdit, handleDelete]
//   )
//   // Pagination handlers
//   const onSelectionChange = useCallback((keys: Selection) => {
//     setSelectedKeys(keys)
//   }, [])
//   const sleep = () => new Promise(resolve => setTimeout(resolve, 500))
//   const onNextPage = useCallback(async () => {
//     if (page < pages) {
//       setIsPageLoading(true)
//       await sleep()
//       setPage(prev => prev + 1)
//       setIsPageLoading(false)
//     }
//   }, [page, pages])
//   const onPreviousPage = useCallback(async () => {
//     if (page > 1) {
//       setIsPageLoading(true)
//       await sleep()
//       setPage(prev => prev - 1)
//       setIsPageLoading(false)
//     }
//   }, [page])
//   const onPaginationChange = async (newPage: number) => {
//     if (newPage !== page) {
//       setIsPageLoading(true)
//       await sleep()
//       setPage(newPage)
//       setIsPageLoading(false)
//     }
//   }
//   // Search handlers
//   const onSearchChange = useCallback((value?: string) => {
//     setFilterValue(value || '')
//     setPage(1)
//   }, [])
//   const toggleSearch = useCallback(() => {
//     setIsSearchExpanded(prev => !prev)
//   }, [])
//   useEffect(() => {
//     if (isSearchExpanded && searchInputRef.current) {
//       setTimeout(() => {
//         searchInputRef.current?.focus()
//       }, 100)
//     }
//   }, [isSearchExpanded])
//   if (projectError)
//     return (
//       <Alert
//         variant="faded"
//         color="default"
//         title="Error loading Purchase"
//         hideIcon
//         className="mt-6 flex flex-col items-center">
//         <Button
//           color="danger"
//           size="sm"
//           variant="light"
//           className="mx-auto mt-2"
//           onPress={() => {
//             refetchProject()
//           }}>
//           Try Again
//         </Button>
//       </Alert>
//     )
//   return (
//     <div className="flex items-start justify-between p-0">
//       <div className="w-full">
//         <Card
//           className="sm:border-default-200 mt-4 bg-transparent sm:border"
//           shadow="none">
//           <CardBody>
//             <div className={tableStyles.wrapper}>
//               {!projectLoading && (
//                 <HeaderContent
//                   selectedKeys={selectedKeys}
//                   usersLength={users.length}
//                   isSearchExpanded={isSearchExpanded}
//                   filterValue={filterValue}
//                   statusFilter={statusFilter}
//                   startDateFilter={startDateFilter}
//                   dueDateFilter={dueDateFilter}
//                   headerColumns={headerColumns}
//                   visibleColumns={visibleColumns}
//                   sortDescriptor={sortDescriptor}
//                   onSearchChange={onSearchChange}
//                   toggleSearch={toggleSearch}
//                   setStatusFilter={setStatusFilter}
//                   setStartDateFilter={setStartDateFilter}
//                   setDueDateFilter={setDueDateFilter}
//                   setVisibleColumns={setVisibleColumns}
//                   setSortDescriptor={setSortDescriptor}
//                   searchInputRef={searchInputRef}
//                   setFilterValue={setFilterValue}
//                 />
//               )}
//               <ScrollShadow orientation="horizontal">
//                 {projectLoading ? (
//                   <div className="flex h-75 items-center justify-center">
//                     <Spinner size="lg" />
//                   </div>
//                 ) : (
//                   <Table
//                     removeWrapper
//                     aria-label="Users Table"
//                     bottomContentPlacement="outside"
//                     selectedKeys={filterSelectedKeys}
//                     selectionMode="multiple"
//                     sortDescriptor={sortDescriptor}
//                     topContentPlacement="outside"
//                     onSelectionChange={onSelectionChange}
//                     onSortChange={setSortDescriptor}>
//                     <TableHeader columns={headerColumns}>
//                       {column => (
//                         <TableColumn
//                           key={column.id}
//                           allowsSorting={
//                             column.id !== 'actions' && column.id !== 'tags'
//                           }
//                           align={column.id === 'actions' ? 'end' : 'start'}
//                           className={cn([
//                             column.id === 'actions'
//                               ? 'flex items-center justify-end px-[20px]'
//                               : ''
//                           ])}>
//                           <span>{column.label}</span>
//                         </TableColumn>
//                       )}
//                     </TableHeader>
//                     <TableBody
//                       emptyContent={'No users found'}
//                       items={isPageLoading ? [] : sortedItems}>
//                       {isPageLoading ? (
//                         <TableRow>
//                           <TableCell colSpan={headerColumns.length}>
//                             <div className="flex h-75 items-center justify-center">
//                               <Spinner size="lg" color="primary" />
//                             </div>
//                           </TableCell>
//                         </TableRow>
//                       ) : (
//                         item => (
//                           <TableRow
//                             key={item.id}
//                             className="group"
//                             onClick={() => handleRowClick(item)}>
//                             {columnKey => (
//                               <TableCell>
//                                 {renderCell(item, columnKey)}
//                               </TableCell>
//                             )}
//                           </TableRow>
//                         )
//                       )}
//                     </TableBody>
//                   </Table>
//                 )}
//               </ScrollShadow>
//               {!projectLoading && (
//                 <BottomContent
//                   page={page}
//                   pages={pages}
//                   onPaginationChange={onPaginationChange}
//                   onPreviousPage={onPreviousPage}
//                   onNextPage={onNextPage}
//                 />
//               )}
//             </div>
//           </CardBody>
//         </Card>
//       </div>
//       <ProjectDrawer
//         isOpen={isOpen}
//         selectedUserId={selectedUserId}
//         selectedIndex={selectedIndex}
//         sortedItems={sortedItems}
//         selectedUser={selectedUser}
//         selectedLoading={selectedLoading}
//         selectedError={selectedError}
//         onOpenChange={onOpenChange}
//         setSelectedKeys={setSelectedKeys}
//         setSelectedUserId={setSelectedUserId}
//         setSelectedIndex={setSelectedIndex}
//         selectedRefetch={selectedRefetch}
//       />
//     </div>
//   )
// }
// export default Component
import { Icon } from '@iconify/react'
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams
} from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

import {
  Alert,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  ScrollShadow,
  Spacer,
  Tab,
  Tabs,
  useDisclosure
} from '@vezham/react/v2'

import { DeleteIcon, EyeFilledIcon } from '@vx-oss/heroui-v2-shared-icons'

import { useDeleteProject, useProjects } from '../../store/useProjects'
import { useTask } from '../../store/useTasks'
import { AddProjectDrawer } from './AddProjectDrawer'
import { TaskDrawer } from './tasks/TaskDrawer'

const ProjectLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { projectId } = useParams({ strict: false })

  const { data: projects = [], isError, refetch } = useProjects()
  const { mutate: deleteProject } = useDeleteProject()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))

  const {
    isOpen: isProjectOpen,
    onOpen: openProject,
    onOpenChange: onProjectChange
  } = useDisclosure()

  // Task drawer (NEW)
  const {
    isOpen: isTaskOpen,
    onOpen: openTask,
    onOpenChange: onTaskChange
  } = useDisclosure()

  const {
    data: selectedUser,
    isLoading: selectedLoading,
    isError: selectedError,
    refetch: selectedRefetch
  } = useTask({ id: selectedUserId ?? 0 })

  const [searchValue, setSearchValue] = useState('')
  const [showDetails, setShowDetails] = useState(false) // mobile only

  const filteredProjects = useMemo(() => {
    if (!searchValue) return projects
    return projects.filter(p =>
      p.project.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [projects, searchValue])

  const activeId = Number(projectId)

  const activeTab = (() => {
    if (!projectId) return 'overview'
    if (location.pathname.endsWith('/tasks')) return 'tasks'
    if (location.pathname.endsWith('/reports')) return 'reports'
    return 'overview'
  })()

  const handleSelect = (id: number) => {
    navigate({
      to: '/projects/$projectId',
      params: { projectId: id }
    })
    setShowDetails(true)
  }

  const handleDelete = (id: number) => {
    deleteProject(id, {
      onSuccess: () => {
        setShowDetails(false)
        navigate({ to: '/projects' })
      }
    })
  }

  useEffect(() => {
    if (!projectId) {
      setShowDetails(true)
    } else {
      setShowDetails(false)
    }
  }, [projectId])

  if (isError) {
    return (
      <Alert title="Error loading projects" variant="faded">
        <Button size="sm" onPress={refetch}>
          Retry
        </Button>
      </Alert>
    )
  }

  return (
    <div className="flex h-screen">
      <div
        className={`border-default-200 w-full px-2 lg:w-72 lg:border-r ${
          showDetails ? 'hidden lg:block' : 'block'
        } overflow-y-auto`}>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Projects</h1>
            <span className="bg-default-100 rounded-lg px-3 py-1">
              {projects.length}
            </span>
          </div>

          <Spacer y={4} />

          <div className="block lg:hidden">
            <Button
              fullWidth
              size="sm"
              startContent={<Icon icon="lucide:plus" />}
              color="primary"
              onPress={openProject}>
              Add Project
            </Button>
          </div>

          <AddProjectDrawer
            isOpen={isProjectOpen}
            onOpenChange={onProjectChange}
          />

          <Spacer y={4} />

          <Input
            size="sm"
            placeholder="Search projects..."
            startContent={<Icon icon="lucide:search" />}
            value={searchValue}
            onValueChange={setSearchValue}
          />

          <Spacer y={4} />

          <ScrollShadow>
            {filteredProjects.map(project => (
              <div
                key={project.id}
                onClick={() => handleSelect(project.id)}
                className={`my-1 cursor-pointer rounded-lg px-2 py-2 ${
                  project.id === activeId
                    ? 'bg-primary-50 border-primary-200 border'
                    : 'hover:bg-default-100'
                }`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <Icon icon="lucide:folder" className="shrink-0" />
                    <p className="truncate text-sm">{project.project}</p>
                  </div>

                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <Icon icon="solar:menu-dots-bold" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        startContent={<EyeFilledIcon />}
                        onClick={() => handleSelect(project.id)}
                        key="view">
                        View
                      </DropdownItem>
                      <DropdownItem
                        className="text-danger"
                        startContent={<DeleteIcon />}
                        onClick={() => handleDelete(project.id)}
                        key="delete">
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            ))}
          </ScrollShadow>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div
          className={`h-full overflow-y-auto p-2 ${
            showDetails ? 'block' : 'hidden lg:block'
          }`}>
          <div className="px-3">
            <h1 className="text-3xl font-bold">Projects & Tasks</h1>
            <p className="text-default-500 mt-2">
              Manage your projects and tasks
            </p>
          </div>

          <div className="mt-4 flex w-full flex-col items-start justify-between sm:flex-row sm:items-center">
            {/* Tabs Container */}
            <div className="w-full py-4 sm:w-auto md:px-2">
              <Tabs
                variant="light"
                color="primary"
                size="md"
                classNames={{
                  base: 'flex w-full sm:w-auto',
                  tabList: 'w-full sm:w-auto'
                }}
                selectedKey={activeTab}>
                <Tab
                  key="overview"
                  title="Overview"
                  onClick={() =>
                    navigate({
                      to: '/projects/$projectId',
                      params: { projectId: activeId }
                    })
                  }
                />
                <Tab
                  key="tasks"
                  title="Tasks"
                  onClick={() =>
                    navigate({
                      to: '/projects/$projectId/tasks',
                      params: { projectId: activeId }
                    })
                  }
                />
                <Tab
                  key="reports"
                  title="Reports"
                  onClick={() =>
                    navigate({
                      to: '/projects/$projectId/reports',
                      params: { projectId: activeId }
                    })
                  }
                />
              </Tabs>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              {activeTab === 'overview' && (
                <Button
                  className="w-full flex-shrink-0 sm:w-auto"
                  size="sm"
                  color="primary"
                  onPress={openProject}
                  startContent={<Icon icon="lucide:plus" />}>
                  Add Project
                </Button>
              )}

              {activeTab === 'tasks' && (
                <Button
                  className="w-full flex-shrink-0 sm:w-auto"
                  size="sm"
                  color="primary"
                  startContent={<Icon icon="lucide:plus" />}
                  onPress={openTask}>
                  Add Task
                </Button>
              )}

              {activeTab === 'reports' && (
                <Button
                  className="w-full flex-shrink-0 sm:w-auto"
                  size="sm"
                  color="primary"
                  startContent={<Icon icon="lucide:plus" />}>
                  Add Report
                </Button>
              )}

              <TaskDrawer
                isOpen={isTaskOpen}
                onOpenChange={onTaskChange}
                selectedUserId={selectedUserId}
                selectedIndex={selectedIndex}
                selectedUser={selectedUser}
                selectedLoading={selectedLoading}
                selectedError={selectedError}
                setSelectedKeys={setSelectedKeys}
                setSelectedUserId={setSelectedUserId}
                setSelectedIndex={setSelectedIndex}
                selectedRefetch={selectedRefetch}
              />
            </div>
          </div>

          <div className="overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProjectLayout }
