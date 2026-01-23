// components/ProjectDetails.tsx
import { Icon } from '@iconify/react'
import React from 'react'

import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Image,
  User
} from '@vezham/react/v2'

import { Attachment, Project } from './types'

interface ProjectDetailsProps {
  project: Project
  onBack?: () => void
  onDelete?: () => void
}

const AttachmentItem = ({ file }: { file: Attachment }) => {
  switch (file.type) {
    case 'image':
      return (
        <div className="w-fit overflow-hidden rounded-md border">
          <Image
            src={file.url}
            alt={file.name}
            width={200}
            height={140}
            className="object-cover"
          />
          <p className="text-default-500 px-2 py-1 text-xs">{file.name}</p>
        </div>
      )

    case 'pdf':
      return (
        <a
          href={file.url}
          target="_blank"
          className="text-danger flex items-center gap-2 text-sm hover:underline">
          <Icon icon="solar:file-pdf-linear" width={18} />
          {file.name}
        </a>
      )

    case 'doc':
      return (
        <a
          href={file.url}
          target="_blank"
          className="text-primary flex items-center gap-2 text-sm hover:underline">
          <Icon icon="solar:file-text-linear" width={18} />
          {file.name}
        </a>
      )

    case 'sheet':
      return (
        <a
          href={file.url}
          target="_blank"
          className="text-success flex items-center gap-2 text-sm hover:underline">
          <Icon icon="solar:file-spreadsheet-linear" width={18} />
          {file.name}
        </a>
      )

    default:
      return (
        <a
          href={file.url}
          target="_blank"
          className="text-default-500 flex items-center gap-2 text-sm hover:underline">
          <Icon icon="solar:file-linear" width={18} />
          {file.name}
        </a>
      )
  }
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  onBack,
  onDelete
}) => {
  if (!project) return null

  return (
    <div className=" ">
      <div className="border-default-200 flex items-center justify-between border-t">
        <div className="flex items-center gap-3 p-3">
          <Button
            isIconOnly
            variant="flat"
            size="sm"
            onPress={onBack}
            className="block lg:hidden">
            <Icon
              className="ml-2"
              icon="mdi:arrow-left"
              width={16}
              height={16}
            />
          </Button>
          <h1 className="text-xl font-bold lg:text-2xl">{project.project}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            isIconOnly
            color="danger"
            variant="flat"
            size="sm"
            onPress={onDelete}>
            <Icon icon="solar:trash-bin-trash-linear" width={16} />
          </Button>
        </div>
      </div>

      <Card shadow="none">
        <CardBody>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Project Info */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Project Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-default-500 text-sm">Project ID</p>
                  <p className="py-1 font-medium">{project.projectId}</p>
                </div>
                <div>
                  <p className="text-default-500 py-1 text-sm">Status</p>
                  <Chip
                    radius="sm"
                    color={
                      project.status === 'Active'
                        ? 'success'
                        : project.status === 'InProgress'
                          ? 'warning'
                          : project.status === 'Delayed'
                            ? 'danger'
                            : project.status === 'OnHold'
                              ? 'warning'
                              : project.status === 'Approved'
                                ? 'primary'
                                : project.status === 'InTesting'
                                  ? 'default'
                                  : project.status === 'Cancelled'
                                    ? 'danger'
                                    : project.status === 'Planning'
                                      ? 'primary'
                                      : project.status === 'Completed'
                                        ? 'success'
                                        : project.status === 'Invoiced'
                                          ? 'secondary'
                                          : 'default'
                    }
                    variant="dot">
                    {project.status}
                  </Chip>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Timeline</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-default-500 text-sm">Start Date</p>
                  <div className="flex items-center gap-2 py-1">
                    <Icon
                      icon="solar:calendar-minimalistic-linear"
                      className="text-default-400"
                    />
                    <p className="font-medium">
                      {new Date(project.startDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-default-500 text-sm">Due Date</p>
                  <div className="flex items-center gap-2 py-1">
                    <Icon
                      icon="solar:calendar-minimalistic-linear"
                      className="text-default-400"
                    />
                    <p className="font-medium">
                      {new Date(project.dueDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider className="my-6" />

          {/* Owner */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Project Owner</h2>
            <User
              avatarProps={{
                radius: 'lg',
                src: project.owner.avatar,
                size: 'lg'
              }}
              classNames={{
                name: 'text-xl font-semibold text-default-foreground',
                description: 'text-default-500'
              }}
              description={project.owner.email}
              name={project.owner.name}
            />
          </div>

          {/* Tags */}
          <div className="my-6 space-y-4">
            <h2 className="text-lg font-semibold">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Chip key={index} variant="solid" size="sm">
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
          <div className="mb-4 text-justify">{project.description}</div>
          <div>
            <b>Attachments:</b>
            <div className="mt-2 space-y-3">
              {project.attachments.map(file => (
                <AttachmentItem key={file.id} file={file} />
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export { ProjectDetails }
