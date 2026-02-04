import { Icon } from '@iconify/react'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  ScrollShadow,
  Spacer,
  useDisclosure
} from '@vezham/react/v2'

import { DeleteIcon, EyeFilledIcon } from '@vx-oss/heroui-v2-shared-icons'

import { useProjects } from '../../store/useProjects'
import { getDateProps, getStatusProps } from '../../store/useProjects/data'
import { AddProjectDrawer } from '../project-drawer'
import { ProjectsSidebarProps, useProjectsSidebarProps } from './types'

export const ProjectsSidebar: React.FC<ProjectsSidebarProps> = props => {
  const { data: projects = [], isLoading: isProjectLoading } = useProjects()
  const {
    isOpen: isProjectOpen,
    onOpen: openProject,
    onOpenChange: onProjectChange
  } = useDisclosure()

  const {
    getContainerProps,
    getHeaderProps,
    getHeaderTitleProps,
    getCounterBadgeProps,
    getAddButtonProps,
    getSearchContainerProps,
    getFilterButtonProps,
    getFilterPopoverContentProps,
    getScrollAreaProps,
    getProjectItemProps,
    getProjectContentProps,
    getProjectInfoProps,
    getProjectIconProps,
    getProjectNameProps,
    slots
  } = useProjectsSidebarProps(props)

  if (isProjectLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-default-500">Loading projects...</div>
      </div>
    )
  }

  return (
    <div {...getContainerProps()}>
      <div {...getHeaderProps()}>
        <h1 {...getHeaderTitleProps()}>Projects</h1>
        <span {...getCounterBadgeProps()}>{projects.length}</span>
      </div>
      <Spacer y={4} />

      <div className="flex items-center gap-2">
        <Button
          fullWidth
          size="sm"
          startContent={<Icon icon="lucide:plus" />}
          color="primary"
          onPress={openProject}
          {...getAddButtonProps()}>
          Add Project
        </Button>

        <Popover placement="bottom">
          <PopoverTrigger>
            <Button
              isIconOnly
              size="sm"
              startContent={<Icon icon="solar:tuning-2-linear" width={16} />}
              {...getFilterButtonProps()}
            />
          </PopoverTrigger>
          <PopoverContent>
            <div {...getFilterPopoverContentProps()}>
              <RadioGroup
                label="Status"
                value={props.statusFilter}
                onValueChange={props.setStatusFilter}>
                <Radio value="all">All</Radio>
                {Object.entries(getStatusProps).map(([key, { label }]) => (
                  <Radio key={key} value={key}>
                    {label}
                  </Radio>
                ))}
              </RadioGroup>
              <Spacer y={5} />
              <RadioGroup
                label="Start Date"
                value={props.startDateFilter}
                onValueChange={props.setStartDateFilter}>
                {Object.entries(getDateProps).map(([key, { label }]) => (
                  <Radio key={key} value={key}>
                    {label}
                  </Radio>
                ))}
              </RadioGroup>
              <Spacer y={5} />
              <RadioGroup
                label="Due Date"
                value={props.dueDateFilter}
                onValueChange={props.setDueDateFilter}>
                {Object.entries(getDateProps).map(([key, { label }]) => (
                  <Radio key={key} value={key}>
                    {label}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <AddProjectDrawer isOpen={isProjectOpen} onOpenChange={onProjectChange} />

      <Spacer y={4} />
      <div {...getSearchContainerProps()}>
        <Input
          size="sm"
          placeholder="Search projects..."
          startContent={<Icon icon="lucide:search" />}
          value={props.searchValue}
          onValueChange={props.onSearchChange}
        />
      </div>
      <Spacer y={4} />
      <ScrollShadow {...getScrollAreaProps()}>
        {props.projects.map(p => (
          <div key={p.projectsId} {...getProjectItemProps(p.projectsId)}>
            <div {...getProjectContentProps()}>
              <div {...getProjectInfoProps()}>
                <Icon icon="lucide:folder" {...getProjectIconProps()} />
                <p {...getProjectNameProps()}>{p.project}</p>
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
                    onClick={() => props.onSelect(p.projectsId)}
                    key="view">
                    View
                  </DropdownItem>
                  <DropdownItem
                    className="text-danger"
                    startContent={<DeleteIcon />}
                    onClick={() => props.onDeleteProject(p.projectsId)}
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
  )
}

ProjectsSidebar.displayName = 'ProjectsSidebar'
