import {
  Outlet,
  useLocation,
  useNavigate,
  useParams
} from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'

import { Alert, Button, useDisclosure } from '@vezham/react/v2'

import { ProjectsHeader } from '../../components/project-header'
import { ProjectsSidebar } from '../../components/project-sidebar'
import { useDeleteProject, useProjects } from '../../store/useProjects'
import { useTasks } from '../../store/useTasks'
import { ProjectsProps, useProjectsProps } from './types'

const ProjectLayout: React.FC<ProjectsProps> = originalProps => {
  const navigate = useNavigate()
  const location = useLocation()
  const { projectId } = useParams({ strict: false })

  const {
    data: projects = [],
    isError: isProjectError,
    refetch: refetchProject,
    isLoading: isProjectLoading
  } = useProjects()
  const { mutate: deleteProject } = useDeleteProject()
  const { data: tasks = [] } = useTasks()

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedKeys, setSelectedKeys] = useState<Set<number>>(new Set())
  const [statusFilter, setStatusFilter] = useState('all')
  const [startDateFilter, setStartDateFilter] = useState('all')
  const [dueDateFilter, setDueDateFilter] = useState('all')
  const [searchValue, setSearchValue] = useState('')

  const { isOpen: isProjectOpen, onOpen: openProject } = useDisclosure()

  const [showDetails, setShowDetails] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)

  const normalizeDate = (value: string | Date) => {
    const d = value instanceof Date ? new Date(value) : new Date(value)
    if (Number.isNaN(d.getTime())) return null
    d.setHours(0, 0, 0, 0)
    return d
  }

  const isDateInRange = (dateValue: string | Date, filter: string) => {
    if (filter === 'all') return true
    if (!dateValue) return false

    const date = normalizeDate(dateValue)
    if (!date) return false

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const diffInDays = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    )

    switch (filter) {
      case 'last7Days':
        return diffInDays >= 0 && diffInDays <= 7
      case 'last30Days':
        return diffInDays >= 0 && diffInDays <= 30
      case 'last60Days':
        return diffInDays >= 0 && diffInDays <= 60
      default:
        return true
    }
  }

  const filteredProjects = useMemo(() => {
    const search = searchValue.trim().toLowerCase()
    return projects.filter(project => {
      const matchesSearch =
        !search ||
        project.project?.toLowerCase().includes(search) ||
        project.projectsId?.toString().includes(search) ||
        project.owner?.name?.toLowerCase().includes(search)

      const matchesStatus =
        statusFilter === 'all' || project.status === statusFilter

      const matchesStartDate = isDateInRange(project.startDate, startDateFilter)
      const matchesDueDate = isDateInRange(project.dueDate, dueDateFilter)

      return (
        matchesSearch && matchesStatus && matchesStartDate && matchesDueDate
      )
    })
  }, [projects, searchValue, statusFilter, startDateFilter, dueDateFilter])

  useEffect(() => {
    if (isProjectLoading || projects.length === 0) return

    if (!projectId) {
      setActiveId(null)
      setShowDetails(true)
      return
    }

    const projectExists = projects.find(p => p.projectsId === Number(projectId))

    if (projectExists) {
      setActiveId(Number(projectId))
      setShowDetails(true)
    } else {
      setActiveId(null)
      setShowDetails(false)
    }
  }, [projects, projectId, isProjectLoading])

  const handleSelect = (projectId: number) => {
    setActiveId(projectId)
    setShowDetails(false)

    navigate({
      to: '/projects/$projectId/overview',
      params: { projectId: String(projectId) }
    })
  }

  const handleDelete = (projectsId: number) => {
    deleteProject(projectsId, {
      onSuccess: () => {
        setShowDetails(false)
        navigate({ to: '/projects' })
      }
    })
  }

  const handleBack = () => {
    setShowDetails(true)
  }

  const handleDeleteActiveProject = () => {
    if (!activeId) return
    deleteProject(activeId, {
      onSuccess: () => {
        navigate({ to: '/projects' })
        setShowDetails(false)
      }
    })
  }

  const activeProject = useMemo(() => {
    if (!activeId) return null
    return projects.find(p => p.projectsId === activeId) ?? null
  }, [projects, activeId])

  const activeTab = (() => {
    if (!activeId) return 'overview'
    if (location.pathname.includes('/tasks')) return 'tasks'
    if (location.pathname.includes('/reports')) return 'reports'
    return 'overview'
  })()

  const headerContent = useMemo(() => {
    if (!activeProject) return null

    switch (activeTab) {
      case 'tasks':
        return { title: 'Tasks', subtitle: `Project: ${activeProject.project}` }

      case 'reports':
        return {
          title: 'Reports',
          subtitle: `Project: ${activeProject.project}`
        }

      default:
        return {
          title: activeProject.project,
          subtitle: activeProject.description || 'Project overview and details'
        }
    }
  }, [activeProject, activeTab])

  const {
    getBaseProps,
    getSidebarProps,
    getContentAreaProps,
    getDetailsAreaProps,
    getLoadingContainerProps,
    getEmptyStateProps,
    getErrorContainerProps
  } = useProjectsProps({ ...originalProps, showDetails })

  if (isProjectLoading)
    return <div {...getLoadingContainerProps()}>Loading projects...</div>

  if (isProjectError)
    return (
      <div {...getErrorContainerProps()}>
        <Alert title="Error loading projects" variant="faded">
          <Button size="sm" onPress={refetchProject}>
            Retry
          </Button>
        </Alert>
      </div>
    )

  if (projects.length === 0)
    return (
      <div {...getEmptyStateProps()}>
        <div className="text-default-500 mb-4">No projects found</div>
        <Button color="primary" onPress={openProject}>
          Create Your First Project
        </Button>
      </div>
    )

  return (
    <div {...getBaseProps()}>
      <div {...getSidebarProps()}>
        <ProjectsSidebar
          projects={filteredProjects}
          activeId={activeId}
          searchValue={searchValue}
          statusFilter={statusFilter}
          startDateFilter={startDateFilter}
          dueDateFilter={dueDateFilter}
          onSelect={handleSelect}
          onSearchChange={setSearchValue}
          setStatusFilter={setStatusFilter}
          setStartDateFilter={setStartDateFilter}
          setDueDateFilter={setDueDateFilter}
          onAddProject={openProject}
          onDeleteProject={handleDelete}
          showDetails={showDetails}
        />
      </div>

      <div {...getContentAreaProps()}>
        {activeId && activeProject && headerContent ? (
          <>
            <ProjectsHeader
              headerContent={headerContent}
              activeProject={activeProject}
              activeTab={activeTab}
              onBack={handleBack}
              onDeleteActiveProject={handleDeleteActiveProject}
              getDetailsAreaProps={() => getDetailsAreaProps()}
              selectedUserId={selectedUserId}
              selectedIndex={selectedIndex}
              selectedUser={selectedUserId}
              selectedLoading={isProjectLoading}
              selectedError={isProjectError}
              setSelectedKeys={setSelectedKeys}
              setSelectedUserId={setSelectedUserId}
              setSelectedIndex={setSelectedIndex}
              selectedRefetch={refetchProject}
            />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8">
            <div className="text-center">
              <div className="text-default-500 mb-4">No project details</div>
              <p className="text-default-400 text-sm">
                Choose a project from the sidebar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

ProjectLayout.displayName = 'ProjectLayout'
export { ProjectLayout }
