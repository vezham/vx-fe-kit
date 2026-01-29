// import { Icon } from '@iconify/react'
// import React from 'react'
// import {
//     Button,
//     Card,
//     CardBody,
//     Chip,
//     Divider,
//     Image,
//     User
// } from '@vezham/react/v2'
// import { Attachment, Project } from './types'
// interface ProjectDetailsProps {
//     project: Project
//     onBack?: () => void
//     onDelete?: () => void
// }
// const AttachmentItem = ({ file }: { file: Attachment }) => {
//     switch (file.type) {
//         case 'image':
//             return (
//                 <div className="w-fit overflow-hidden rounded-md border">
//                     <Image
//                         src={file.url}
//                         alt={file.name}
//                         width={200}
//                         height={140}
//                         className="object-cover"
//                     />
//                     <p className="text-default-500 px-2 py-1 text-xs">{file.name}</p>
//                 </div>
//             )
//         case 'pdf':
//             return (
//                 <a
//                     href={file.url}
//                     target="_blank"
//                     className="text-danger flex items-center gap-2 text-sm hover:underline">
//                     <Icon icon="solar:file-pdf-linear" width={18} />
//                     {file.name}
//                 </a>
//             )
//         case 'doc':
//             return (
//                 <a
//                     href={file.url}
//                     target="_blank"
//                     className="text-primary flex items-center gap-2 text-sm hover:underline">
//                     <Icon icon="solar:file-text-linear" width={18} />
//                     {file.name}
//                 </a>
//             )
//         case 'sheet':
//             return (
//                 <a
//                     href={file.url}
//                     target="_blank"
//                     className="text-success flex items-center gap-2 text-sm hover:underline">
//                     <Icon icon="solar:file-spreadsheet-linear" width={18} />
//                     {file.name}
//                 </a>
//             )
//         default:
//             return (
//                 <a
//                     href={file.url}
//                     target="_blank"
//                     className="text-default-500 flex items-center gap-2 text-sm hover:underline">
//                     <Icon icon="solar:file-linear" width={18} />
//                     {file.name}
//                 </a>
//             )
//     }
// }
// const ProjectDetails: React.FC<ProjectDetailsProps> = ({
//     project,
//     onBack,
//     onDelete
// }) => {
//     if (!project) return null
//     return (
//         <div className=" ">
//             <div className="border-default-200 flex items-center justify-between border-t pt-2">
//                 <div className="flex items-center gap-3 p-3">
//                     <Button
//                         isIconOnly
//                         variant="flat"
//                         size="sm"
//                         onPress={onBack}
//                         className="block lg:hidden">
//                         <Icon
//                             className="ml-2"
//                             icon="mdi:arrow-left"
//                             width={16}
//                             height={16}
//                         />
//                     </Button>
//                     <h1 className="text-xl font-bold lg:text-2xl">{project.project}</h1>
//                 </div>
//                 <div className="flex gap-2">
//                     <Button
//                         isIconOnly
//                         color="danger"
//                         variant="flat"
//                         size="sm"
//                         onPress={onDelete}>
//                         <Icon icon="solar:trash-bin-trash-linear" width={16} />
//                     </Button>
//                 </div>
//             </div>
//             <Card shadow="none">
//                 <CardBody>
//                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                         {/* Project Info */}
//                         <div className="space-y-4">
//                             <h2 className="text-lg font-semibold">Project Information</h2>
//                             <div className="space-y-3">
//                                 <div>
//                                     <p className="text-default-500 text-sm">Project ID</p>
//                                     <p className="py-1 font-medium">{project.projectsId}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-default-500 py-1 text-sm">Status</p>
//                                     <Chip
//                                         radius="sm"
//                                         color={
//                                             project.status === 'Active'
//                                                 ? 'success'
//                                                 : project.status === 'InProgress'
//                                                     ? 'warning'
//                                                     : project.status === 'Delayed'
//                                                         ? 'danger'
//                                                         : project.status === 'OnHold'
//                                                             ? 'warning'
//                                                             : project.status === 'Approved'
//                                                                 ? 'primary'
//                                                                 : project.status === 'InTesting'
//                                                                     ? 'default'
//                                                                     : project.status === 'Cancelled'
//                                                                         ? 'danger'
//                                                                         : project.status === 'Planning'
//                                                                             ? 'primary'
//                                                                             : project.status === 'Completed'
//                                                                                 ? 'success'
//                                                                                 : project.status === 'Invoiced'
//                                                                                     ? 'secondary'
//                                                                                     : 'default'
//                                         }
//                                         variant="dot">
//                                         {project.status}
//                                     </Chip>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* Dates */}
//                         <div className="space-y-4">
//                             <h2 className="text-lg font-semibold">Timeline</h2>
//                             <div className="space-y-3">
//                                 <div>
//                                     <p className="text-default-500 text-sm">Start Date</p>
//                                     <div className="flex items-center gap-2 py-1">
//                                         <Icon
//                                             icon="solar:calendar-minimalistic-linear"
//                                             className="text-default-400"
//                                         />
//                                         <p className="font-medium">
//                                             {new Date(project.startDate).toLocaleDateString('en-US', {
//                                                 weekday: 'long',
//                                                 year: 'numeric',
//                                                 month: 'long',
//                                                 day: 'numeric'
//                                             })}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <p className="text-default-500 text-sm">Due Date</p>
//                                     <div className="flex items-center gap-2 py-1">
//                                         <Icon
//                                             icon="solar:calendar-minimalistic-linear"
//                                             className="text-default-400"
//                                         />
//                                         <p className="font-medium">
//                                             {new Date(project.dueDate).toLocaleDateString('en-US', {
//                                                 weekday: 'long',
//                                                 year: 'numeric',
//                                                 month: 'long',
//                                                 day: 'numeric'
//                                             })}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <Divider className="my-6" />
//                     {/* Owner */}
//                     <div className="space-y-4">
//                         <h2 className="text-lg font-semibold">Project Owner</h2>
//                         <User
//                             avatarProps={{
//                                 radius: 'lg',
//                                 src: project.owner.avatar,
//                                 size: 'lg'
//                             }}
//                             classNames={{
//                                 name: 'text-xl font-semibold text-default-foreground',
//                                 description: 'text-default-500'
//                             }}
//                             description={project.owner.email}
//                             name={project.owner.name}
//                         />
//                     </div>
//                     {/* Tags */}
//                     <div className="my-6 space-y-4">
//                         <h2 className="text-lg font-semibold">Tags</h2>
//                         <div className="flex flex-wrap gap-2">
//                             {project.tags.map((tag, index) => (
//                                 <Chip key={index} variant="solid" size="sm">
//                                     {tag}
//                                 </Chip>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="mb-4 text-justify">{project.description}</div>
//                     <div>
//                         <b>Attachments:</b>
//                         <div className="mt-2 space-y-3">
//                             {project.attachments.map(file => (
//                                 <AttachmentItem key={file.id} file={file} />
//                             ))}
//                         </div>
//                     </div>
//                 </CardBody>
//             </Card>
//         </div>
//     )
// }
// export { ProjectDetails }
// project-details.tsx
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
