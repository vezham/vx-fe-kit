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

import {
  Attachment,
  ProjectDetailsProps,
  useProjectDetailsProps
} from './types'

const AttachmentItem = ({ file }: { file: Attachment }) => {
  const { slots } = useProjectDetailsProps({ project: {} as any })

  switch (file.type) {
    case 'image':
      return (
        <div className={slots.attachmentItem()}>
          <Image
            src={file.url}
            alt={file.name}
            width={200}
            height={140}
            className={slots.attachmentImage()}
          />
          <p className={slots.attachmentName()}>{file.name}</p>
        </div>
      )

    case 'pdf':
      return (
        <a href={file.url} target="_blank" className={slots.pdfLink()}>
          <Icon icon="solar:file-pdf-linear" width={18} />
          {file.name}
        </a>
      )

    case 'doc':
      return (
        <a href={file.url} target="_blank" className={slots.docLink()}>
          <Icon icon="solar:file-text-linear" width={18} />
          {file.name}
        </a>
      )

    case 'sheet':
      return (
        <a href={file.url} target="_blank" className={slots.sheetLink()}>
          <Icon icon="solar:file-spreadsheet-linear" width={18} />
          {file.name}
        </a>
      )

    default:
      return (
        <a href={file.url} target="_blank" className={slots.defaultLink()}>
          <Icon icon="solar:file-linear" width={18} />
          {file.name}
        </a>
      )
  }
}

const ProjectDetails: React.FC<ProjectDetailsProps> = originalProps => {
  const {
    getContainerProps,

    getCardProps,
    getCardBodyProps,
    getGridProps,
    getTagsContainerProps,
    getAttachmentsListProps,
    slots
  } = useProjectDetailsProps(originalProps)

  const { project } = originalProps

  if (!project) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'InProgress':
        return 'warning'
      case 'Delayed':
        return 'danger'
      case 'OnHold':
        return 'warning'
      case 'Approved':
        return 'primary'
      case 'InTesting':
        return 'default'
      case 'Cancelled':
        return 'danger'
      case 'Planning':
        return 'primary'
      case 'Completed':
        return 'success'
      case 'Invoiced':
        return 'secondary'
      default:
        return 'default'
    }
  }

  return (
    <div {...getContainerProps()}>
      <Card shadow="none" {...getCardProps()}>
        <CardBody {...getCardBodyProps()}>
          <Divider className={slots.divider()} />
          <div {...getGridProps()}>
            <div className="space-y-4">
              <h2 className={slots.sectionTitle()}>Project Information</h2>
              <div className={slots.infoGroup()}>
                <div>
                  <p className={slots.infoLabel()}>Project ID</p>
                  <p className={slots.infoValue()}>{project.projectsId}</p>
                </div>
                <div>
                  <p className={slots.infoLabel()}>Status</p>
                  <div className="pt-3">
                    <Chip
                      radius="sm"
                      color={getStatusColor(project.status)}
                      variant="dot">
                      {project.status}
                    </Chip>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className={slots.sectionTitle()}>Timeline</h2>
              <div className={slots.infoGroup()}>
                <div>
                  <p className={slots.infoLabel()}>Start Date</p>
                  <div className={slots.dateContainer()}>
                    <Icon
                      icon="solar:calendar-minimalistic-linear"
                      className={slots.dateIcon()}
                    />
                    <p className={slots.infoValue()}>
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
                  <p className={slots.infoLabel()}>Due Date</p>
                  <div className={slots.dateContainer()}>
                    <Icon
                      icon="solar:calendar-minimalistic-linear"
                      className={slots.dateIcon()}
                    />
                    <p className={slots.infoValue()}>
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

          <Divider className={slots.divider()} />

          {/* Owner */}
          <div className={slots.ownerSection()}>
            <h2 className={slots.sectionTitle()}>Project Owner</h2>
            <User
              avatarProps={{
                radius: 'sm',
                src: project.owner.avatar,
                size: 'sm'
              }}
              classNames={{
                name: 'text-lg font-semibold text-default-500',
                description: 'text-default-500'
              }}
              description={project.owner.email}
              name={project.owner.name}
            />
          </div>

          {/* Tags */}
          <div className={slots.tagsSection()}>
            <h2 className={slots.sectionTitle()}>Tags</h2>
            <div {...getTagsContainerProps()}>
              {project.tags.map((tag, index) => (
                <Chip key={index} variant="solid" size="sm">
                  {tag}
                </Chip>
              ))}
            </div>
          </div>

          {project.attachments.length > 0 && (
            <div className={slots.attachmentsSection()}>
              <b>Attachments:</b>
              <div {...getAttachmentsListProps()}>
                {project.attachments.map(file => (
                  <AttachmentItem key={file.id} file={file} />
                ))}
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}

ProjectDetails.displayName = 'ProjectDetails'

export { ProjectDetails }
