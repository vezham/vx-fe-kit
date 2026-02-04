// import { Icon } from '@iconify/react'
// import {
//   Outlet,
//   useLocation,
//   useNavigate,
//   useParams
// } from '@tanstack/react-router'
// import { useEffect, useMemo, useState } from 'react'

// import {
//   Alert,
//   Button,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   Input,
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
//   Radio,
//   RadioGroup,
//   ScrollShadow,
//   Spacer,
//   Tab,
//   Tabs,
//   useDisclosure
// } from '@vezham/react/v2'

// import { DeleteIcon, EyeFilledIcon, } from '@vx-oss/heroui-v2-shared-icons'

// import { useDeleteProject, useProjects } from '../../store/useProjects'
// import { getDateProps, getStatusProps } from '../../store/useProjects/data'
// import { useTask, useTasks } from '../../store/useTasks'
// import { TaskDrawer } from '../tasks/task-add-drawer'
// import { AddProjectDrawer } from './project-add-drawer'
// import { ProjectsProps, ProjectsSidebarProps, useProjectsProps, useProjectsSidebarProps } from './types'

// const ProjectsComponent: React.FC<ProjectsProps> = originalProps => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { projectId } = useParams({ strict: false })

//   const { data: projects = [], isError: isProjectError, refetch: refetchProject, isLoading: isProjectLoading } = useProjects()
//   const { data: tasks = [], isError: isTaskError, refetch: refetchTask, isLoading: isTaskLoading } = useTasks()

//   const { mutate: deleteProject } = useDeleteProject()

//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
//   const [selectedKeys, setSelectedKeys] = useState<Set<number>>(new Set())
//   const [statusFilter, setStatusFilter] = useState('all')
//   const [startDateFilter, setStartDateFilter] = useState('all')
//   const [dueDateFilter, setDueDateFilter] = useState('all')
//   const [searchValue, setSearchValue] = useState('')

//   const { isOpen: isProjectOpen, onOpen: openProject, onOpenChange: onProjectChange } = useDisclosure()
//   const { isOpen: isTaskOpen, onOpen: openTask, onOpenChange: onTaskChange } = useDisclosure()

//   const { data: selectedUser, isLoading: selectedLoading, isError: selectedError, refetch: selectedRefetch } = useTask({ id: selectedUserId ?? 0 })

//   const [showDetails, setShowDetails] = useState(false)
//   const [activeId, setActiveId] = useState<number | null>(null)

//   // Helper: normalize date
//   const normalizeDate = (value: string | Date) => {
//     const d = value instanceof Date ? new Date(value) : new Date(value)
//     if (Number.isNaN(d.getTime())) return null
//     d.setHours(0, 0, 0, 0)
//     return d
//   }

//   const isDateInRange = (dateValue: string | Date, filter: string) => {
//     if (filter === 'all') return true
//     if (!dateValue) return false

//     const date = normalizeDate(dateValue)
//     if (!date) return false

//     const today = new Date()
//     today.setHours(0, 0, 0, 0)

//     const diffInDays = Math.floor(
//       (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
//     )

//     switch (filter) {
//       case 'last7Days':
//         return diffInDays >= 0 && diffInDays <= 7
//       case 'last30Days':
//         return diffInDays >= 0 && diffInDays <= 30
//       case 'last60Days':
//         return diffInDays >= 0 && diffInDays <= 60
//       default:
//         return true
//     }
//   }

//   const filteredProjects = useMemo(() => {
//     const search = searchValue.trim().toLowerCase()
//     return projects.filter(project => {
//       const matchesSearch =
//         !search ||
//         project.project?.toLowerCase().includes(search) ||
//         project.projectsId?.toString().includes(search) ||
//         project.owner?.name?.toLowerCase().includes(search)

//       const matchesStatus =
//         statusFilter === 'all' || project.status === statusFilter

//       const matchesStartDate = isDateInRange(project.startDate, startDateFilter)
//       const matchesDueDate = isDateInRange(project.dueDate, dueDateFilter)

//       return (
//         matchesSearch && matchesStatus && matchesStartDate && matchesDueDate
//       )
//     })
//   }, [projects, searchValue, statusFilter, startDateFilter, dueDateFilter])

//   useEffect(() => {
//     if (isProjectLoading || projects.length === 0) return;

//     if (!projectId) {
//       const firstProjectId = projects[0].projectsId;
//       setActiveId(firstProjectId);
//       setShowDetails(true);
//       navigate({
//         to: '/projects/$projectId/overview',
//         params: { projectId: firstProjectId },
//         replace: true,
//       });
//     } else {
//       const projectExists = projects.find(p => p.projectsId === Number(projectId));
//       if (projectExists) {
//         setActiveId(Number(projectId));
//         setShowDetails(true);
//       } else {
//         const firstProjectId = projects[0].projectsId;
//         setActiveId(firstProjectId);
//         setShowDetails(true);
//         navigate({
//           to: '/projects/$projectId/overview',
//           params: { projectId: firstProjectId },
//           replace: true,
//         });
//       }
//     }
//   }, [projects, projectId, isProjectLoading, navigate]);

//   const handleSelect = (projectId: number) => {
//     setActiveId(projectId)
//     setShowDetails(false)
//     navigate({
//       to: '/projects/$projectId/overview',
//       params: { projectId }
//     })
//   }

//   const handleDelete = (projectsId: number) => {
//     deleteProject(projectsId, {
//       onSuccess: () => {
//         setShowDetails(false)
//         navigate({ to: '/projects' })
//       }
//     })
//   }

//   const handleBack = () => {
//     setShowDetails(true)
//   }

//   const handleDeleteActiveProject = () => {
//     if (!activeId) return
//     deleteProject(activeId, {
//       onSuccess: () => {
//         navigate({ to: '/projects' })
//         setShowDetails(false)
//       }
//     })
//   }

//   const activeProject = useMemo(() => {
//     if (!activeId) return null
//     return projects.find(p => p.projectsId === activeId) ?? null
//   }, [projects, activeId])

//   const activeTab = (() => {
//     if (!activeId) return 'overview'
//     if (location.pathname.includes('/tasks')) return 'tasks'
//     if (location.pathname.includes('/reports')) return 'reports'
//     return 'overview'
//   })()

//   const headerContent = useMemo(() => {
//     if (!activeProject) return { title: 'Projects & Tasks', subtitle: 'Manage your projects and tasks' }
//     switch (activeTab) {
//       case 'tasks': return { title: 'Tasks', subtitle: `Project: ${activeProject.project}` }
//       case 'reports': return { title: 'Reports', subtitle: `Project: ${activeProject.project}` }
//       case 'overview':
//       default: return { title: activeProject.project, subtitle: activeProject.description || 'Project overview and details' }
//     }
//   }, [activeProject, activeTab])

//   const {
//     getBaseProps,
//     getSidebarProps,
//     getContentAreaProps,
//     getDetailsAreaProps,
//     getHeaderProps,
//     getTitleProps,
//     getSubtitleProps,
//     getTabsContainerProps,
//     getActionsContainerProps,
//     getOutletContainerProps,
//     getLoadingContainerProps,
//     getEmptyStateProps,
//     getMobileButtonProps,
//     slots
//   } = useProjectsProps({ ...originalProps, showDetails })

//   const sidebarProps: ProjectsSidebarProps = {
//     projects: filteredProjects,
//     activeId,
//     searchValue,
//     statusFilter,
//     startDateFilter,
//     dueDateFilter,
//     onSelect: handleSelect,
//     onSearchChange: setSearchValue,
//     setStatusFilter,
//     setStartDateFilter,
//     setDueDateFilter,
//     onAddProject: openProject,
//     onDeleteProject: handleDelete,
//     showDetails
//   }
//   const {
//     getContainerProps,
//     getHeaderProps: getSidebarHeaderProps,
//     getAddButtonProps,
//     getSearchContainerProps,
//     getFilterButtonProps,
//     getScrollAreaProps,
//     getFilterPopoverContentProps,
//     getProjectItemProps,
//     getProjectContentProps,
//     getProjectInfoProps,
//     getProjectIconProps,
//     getProjectNameProps,
//     getCounterBadgeProps,
//     getHeaderTitleProps
//   } = useProjectsSidebarProps(sidebarProps)

//   if (isProjectLoading) return <div {...getLoadingContainerProps()} className="text-center">Loading projects...</div>
//   if (isProjectError) return (
//     <Alert title="Error loading projects" variant="faded">
//       <Button size="sm" onPress={refetchProject}>Retry</Button>
//     </Alert>
//   )
//   if (projects.length === 0) return (
//     <div {...getEmptyStateProps()}>
//       <div className="text-default-500 mb-4">No projects found</div>
//       <Button color="primary" onPress={openProject}>Create Your First Project</Button>
//       <AddProjectDrawer isOpen={isProjectOpen} onOpenChange={onProjectChange} />
//     </div>
//   )

//   return (
//     <div {...getBaseProps()}>
//       <div {...getSidebarProps()}>
//         <div {...getContainerProps()}>
//           <div {...getSidebarHeaderProps()}>
//             <h1 {...getHeaderTitleProps()}>Projects</h1>
//             <span {...getCounterBadgeProps()}>{projects.length}</span>
//           </div>
//           <Spacer y={4} />

//           <div className="flex items-center gap-2">
//             <Button fullWidth size="sm" startContent={<Icon icon="lucide:plus" />} color="primary" onPress={openProject}    {...getAddButtonProps()}>
//               Add Project
//             </Button>

//             <Popover placement="bottom">
//               <PopoverTrigger>
//                 <Button
//                   isIconOnly
//                   size="sm"
//                   startContent={
//                     <Icon icon="solar:tuning-2-linear" width={16} />
//                   }
//                   {...getFilterButtonProps()}></Button>
//               </PopoverTrigger>
//               <PopoverContent>
//                 <div {...getFilterPopoverContentProps()}>
//                   <RadioGroup
//                     label="Status"
//                     value={statusFilter}
//                     onValueChange={setStatusFilter}>
//                     <Radio value="all">All</Radio>
//                     {Object.entries(getStatusProps).map(([key, { label }]) => (
//                       <Radio key={key} value={key}>
//                         {label}
//                       </Radio>
//                     ))}
//                   </RadioGroup>
//                   <Spacer y={5} />
//                   <RadioGroup
//                     label="Start Date"
//                     value={startDateFilter}
//                     onValueChange={setStartDateFilter}>
//                     {Object.entries(getDateProps).map(([key, { label }]) => (
//                       <Radio key={key} value={key}>
//                         {label}
//                       </Radio>
//                     ))}
//                   </RadioGroup>
//                   <Spacer y={5} />
//                   <RadioGroup
//                     label="Due Date"
//                     value={dueDateFilter}
//                     onValueChange={setDueDateFilter}>
//                     {Object.entries(getDateProps).map(([key, { label }]) => (
//                       <Radio key={key} value={key}>
//                         {label}
//                       </Radio>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           </div>

//           <AddProjectDrawer isOpen={isProjectOpen} onOpenChange={onProjectChange} />

//           <Spacer y={4} />
//           <div {...getSearchContainerProps()}>
//             <Input size="sm" placeholder="Search projects..." startContent={<Icon icon="lucide:search" />} value={searchValue} onValueChange={setSearchValue} />
//           </div>
//           <Spacer y={4} />
//           <ScrollShadow {...getScrollAreaProps()}>
//             {filteredProjects.map(p => (
//               <div key={p.projectsId} {...getProjectItemProps(p.projectsId)}>
//                 <div {...getProjectContentProps()}>
//                   <div {...getProjectInfoProps()}>
//                     <Icon icon="lucide:folder" {...getProjectIconProps()} />
//                     <p {...getProjectNameProps()}>{p.project}</p>
//                   </div>
//                   <Dropdown placement="bottom-end">
//                     <DropdownTrigger>
//                       <Button isIconOnly size="sm" variant="light"><Icon icon="solar:menu-dots-bold" /></Button>
//                     </DropdownTrigger>
//                     <DropdownMenu>
//                       <DropdownItem startContent={<EyeFilledIcon />} onClick={() => handleSelect(p.projectsId)} key={''}>View</DropdownItem>
//                       <DropdownItem className="text-danger" startContent={<DeleteIcon />} onClick={() => handleDelete(p.projectsId)} key={''}>Delete</DropdownItem>
//                     </DropdownMenu>
//                   </Dropdown>
//                 </div>
//               </div>
//             ))}
//           </ScrollShadow>
//         </div>
//       </div>

//       {/* Content / Details */}
//       <div {...getContentAreaProps()}>
//         <div {...getDetailsAreaProps()}>

//           <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-between">
//             <div {...getHeaderProps()}>
//               <div className="flex w-full justify-between gap-4">
//                 <div className="flex flex-col gap-1">
//                   <div className="flex items-center gap-3">
//                     <Button isIconOnly variant="flat" size="sm" onPress={handleBack} {...getMobileButtonProps()}>
//                       <Icon icon="mdi:arrow-left" width={16} height={16} />
//                     <h1 {...getTitleProps()}>{headerContent.title}</h1>
//                   </div>
//                   {headerContent.subtitle && <p {...getSubtitleProps()}>{headerContent.subtitle}</p>}
//                 </div>
//                 {activeTab === 'overview' && activeId && (
//                   <Button isIconOnly color="danger" variant="flat" size="sm" onPress={handleDeleteActiveProject}>
//                     <Icon icon="solar:trash-bin-trash-linear" width={16} />
//                   </Button>
//                 )}
//               </div>
//             </div>
//             <div {...getActionsContainerProps()}>
//               {activeTab === 'tasks' && tasks.length > 0 && (
//                 <Button size="sm" color="primary" startContent={<Icon icon="lucide:plus" />} onPress={openTask}>Add Task</Button>
//               )}
//               {activeTab === 'reports' && (
//                 <Button size="sm" color="primary" startContent={<Icon icon="lucide:plus" />}>Add Report</Button>
//               )}
//             </div>
//           </div>

//           <div {...getTabsContainerProps()}>
//             <div className={slots.tabsWrapper()}>
//               <Tabs
//                 variant="light"
//                 color="primary"
//                 size="md"
//                 classNames={{
//                   base: slots.tabs(),
//                   tabList: slots.tabList()
//                 }}
//                 selectedKey={activeTab}>
//                 <Tab
//                   key="overview"
//                   title="Overview"
//                   onClick={() =>
//                     activeId &&
//                     navigate({
//                       to: '/projects/$projectId',
//                       params: { projectId: activeId }
//                     })
//                   }
//                 />
//                 <Tab
//                   key="tasks"
//                   title="Tasks"
//                   onClick={() =>
//                     activeId &&
//                     navigate({
//                       to: '/projects/$projectId/tasks',
//                       params: { projectId: activeId }
//                     })
//                   }
//                 />
//                 <Tab
//                   key="reports"
//                   title="Reports"
//                   onClick={() =>
//                     activeId &&
//                     navigate({
//                       to: '/projects/$projectId/reports',
//                       params: { projectId: activeId }
//                     })
//                   }
//                 />
//               </Tabs>
//             </div>

//             <TaskDrawer
//               isOpen={isTaskOpen}
//               onOpenChange={onTaskChange}
//               projectId={activeProject?.projectsId ?? undefined}
//               selectedUserId={selectedUserId}
//               selectedIndex={selectedIndex}
//               selectedUser={selectedUser}
//               selectedLoading={selectedLoading}
//               selectedError={selectedError}
//               setSelectedKeys={setSelectedKeys}
//               setSelectedUserId={setSelectedUserId}
//               setSelectedIndex={setSelectedIndex}
//               selectedRefetch={selectedRefetch}
//             />
//           </div>

//           <div {...getOutletContainerProps()}>
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// ProjectsComponent.displayName = 'Projects'
// export { ProjectsComponent as Projects }
