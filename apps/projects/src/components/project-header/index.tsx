import { Icon } from '@iconify/react'
import { Outlet, useNavigate } from '@tanstack/react-router'

import { Button, Tab, Tabs, useDisclosure } from '@vezham/react/v2'

import { useTasks } from '../../store/useTasks'
import { TaskDrawer } from '../project-task-drawer'
import { ProjectsHeaderProps, useProjectsHeaderProps } from './types'

export const ProjectsHeader: React.FC<ProjectsHeaderProps> = props => {
  // ⭐ SAFETY GUARD
  if (!props.headerContent) return null

  const navigate = useNavigate()
  const { data: tasks = [] } = useTasks()
  const {
    isOpen: isTaskOpen,
    onOpen: openTask,
    onOpenChange: onTaskChange
  } = useDisclosure()

  const {
    getHeaderProps,
    getTitleProps,
    getSubtitleProps,
    getTabsContainerProps,
    getActionsContainerProps,
    getMobileButtonProps,
    getOutletContainerProps,
    slots
  } = useProjectsHeaderProps(props)

  const handleTabClick = (tab: string) => {
    if (!props.activeProject?.projectsId) return

    const route = tab === 'overview' ? '' : `/${tab}`

    navigate({
      to: `/projects/$projectId${route}`,
      params: { projectId: props.activeProject.projectsId }
    })
  }

  return (
    <div {...props.getDetailsAreaProps()}>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-between">
        {/* HEADER */}
        <div {...getHeaderProps()}>
          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <Button
                  isIconOnly
                  variant="flat"
                  size="sm"
                  onPress={props.onBack}
                  {...getMobileButtonProps()}>
                  <Icon icon="mdi:arrow-left" width={16} height={16} />
                </Button>

                <h1 {...getTitleProps()}>{props.headerContent.title}</h1>
              </div>

              {props.headerContent.subtitle && (
                <p {...getSubtitleProps()}>{props.headerContent.subtitle}</p>
              )}
            </div>

            {/* DELETE BUTTON */}
            {props.activeTab === 'overview' && props.activeProject && (
              <Button
                isIconOnly
                color="danger"
                variant="flat"
                size="sm"
                onPress={props.onDeleteActiveProject}>
                <Icon icon="solar:trash-bin-trash-linear" width={16} />
              </Button>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div {...getActionsContainerProps()}>
          {props.activeTab === 'tasks' && tasks.length > 0 && (
            <Button
              size="sm"
              color="primary"
              startContent={<Icon icon="lucide:plus" />}
              onPress={openTask}>
              Add Task
            </Button>
          )}

          {props.activeTab === 'reports' && (
            <Button
              size="sm"
              color="primary"
              startContent={<Icon icon="lucide:plus" />}>
              Add Report
            </Button>
          )}
        </div>
      </div>

      {/* TABS */}
      <div {...getTabsContainerProps()}>
        <div className={slots.tabsWrapper()}>
          <Tabs
            variant="light"
            color="primary"
            size="md"
            selectedKey={props.activeTab}
            classNames={{
              base: slots.tabs(),
              tabList: slots.tabList()
            }}>
            <Tab
              key="overview"
              title="Overview"
              onClick={() => handleTabClick('overview')}
            />
            <Tab
              key="tasks"
              title="Tasks"
              onClick={() => handleTabClick('tasks')}
            />
            <Tab
              key="reports"
              title="Reports"
              onClick={() => handleTabClick('reports')}
            />
          </Tabs>
        </div>

        {/* TASK DRAWER */}
        {props.activeProject && (
          <TaskDrawer
            isOpen={isTaskOpen}
            onOpenChange={onTaskChange}
            projectId={props.activeProject.projectsId}
            selectedUserId={props.selectedUserId}
            selectedIndex={props.selectedIndex}
            selectedUser={props.selectedUser}
            selectedLoading={props.selectedLoading}
            selectedError={props.selectedError}
            setSelectedKeys={props.setSelectedKeys}
            setSelectedUserId={props.setSelectedUserId}
            setSelectedIndex={props.setSelectedIndex}
            selectedRefetch={props.selectedRefetch}
          />
        )}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

ProjectsHeader.displayName = 'ProjectsHeader'
