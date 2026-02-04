// 'use client'

// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from '@tanstack/react-router'

// import {
//   Button,
//   Chip,
//   Image,
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   User
// } from '@vezham/react/v2'

// import { getStatusProps } from '../../store/useTasks/data'
// import {
//   Attachment,
//   SubTaskDetailModalProps,
//   useSubTaskDetailModalProps
// } from './types'

// const AttachmentItem = ({ file }: { file: Attachment }) => {
//   switch (file.type) {
//     case 'image':
//       return (
//         <div className="w-fit overflow-hidden rounded-md border">
//           <Image
//             src={file.url}
//             alt={file.name}
//             width={200}
//             height={140}
//             className="object-cover"
//           />
//           <p className="text-default-500 px-2 py-1 text-xs">{file.name}</p>
//         </div>
//       )

//     case 'pdf':
//       return (
//         <a
//           href={file.url}
//           target="_blank"
//           className="text-danger flex items-center gap-2 text-sm hover:underline">
//           <Icon icon="solar:file-pdf-linear" width={18} />
//           {file.name}
//         </a>
//       )

//     case 'doc':
//       return (
//         <a
//           href={file.url}
//           target="_blank"
//           className="text-primary flex items-center gap-2 text-sm hover:underline">
//           <Icon icon="solar:file-text-linear" width={18} />
//           {file.name}
//         </a>
//       )

//     case 'sheet':
//       return (
//         <a
//           href={file.url}
//           target="_blank"
//           className="text-success flex items-center gap-2 text-sm hover:underline">
//           <Icon icon="solar:file-spreadsheet-linear" width={18} />
//           {file.name}
//         </a>
//       )

//     default:
//       return (
//         <a
//           href={file.url}
//           target="_blank"
//           className="text-default-500 flex items-center gap-2 text-sm hover:underline">
//           <Icon icon="solar:file-linear" width={18} />
//           {file.name}
//         </a>
//       )
//   }
// }

// const SubTaskDetailsModal = ({
//   subtask,
//   children
// }: SubTaskDetailModalProps) => {
//   const navigate = useNavigate()
//   const { taskId, subtaskId } = useParams({ strict: false })

//   const {
//     getModalContentProps,
//     getModalHeaderProps,
//     getModalBodyProps,
//     getModalFooterProps,
//     getTitleProps,
//     getDescriptionProps,
//     getOwnerContainerProps,
//     getAttachmentsSectionProps,
//     getAttachmentsGridProps,
//     hasAttachments
//   } = useSubTaskDetailModalProps({ subtask })

//   const closeModal = () => {
//     navigate({
//       to: '/projects/$projectId/tasks/$taskId/subtasks',
//       params: { taskId }
//     })
//   }

//   if (!subtask) return null

//   const status = getStatusProps[
//     subtask.status as keyof typeof getStatusProps
//   ] || {
//     label: subtask.status,
//     color: ''
//   }

//   return (
//     <Modal
//       isOpen={Boolean(subtaskId)}
//       onOpenChange={open => {
//         if (!open) closeModal()
//       }}
//       size="md"
//       scrollBehavior="inside">
//       <ModalContent {...getModalContentProps()}>
//         {onClose => (
//           <>
//             <ModalHeader {...getModalHeaderProps()}>
//               Subtask Details
//             </ModalHeader>

//             <ModalBody {...getModalBodyProps()}>
//               <p {...getTitleProps()}>{subtask.subtaskname}</p>

//               <p {...getDescriptionProps()}>{subtask.description}</p>

//               <div {...getOwnerContainerProps()}>
//                 <User
//                   avatarProps={{ src: subtask.owner.avatar, radius: 'lg' }}
//                   name={subtask.owner.name}
//                   description={subtask.owner.email}
//                 />

//                 <Chip radius="sm" className={status.color}>
//                   {status.label}
//                 </Chip>
//               </div>

//               {hasAttachments && (
//                 <div {...getAttachmentsSectionProps()}>
//                   <b>Attachments</b>
//                   <div {...getAttachmentsGridProps()}>
//                     {subtask.attachments.map(file => (
//                       <AttachmentItem key={file.id} file={file} />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {children}
//             </ModalBody>

//             <ModalFooter {...getModalFooterProps()}>
//               <Button variant="light" onPress={onClose}>
//                 Close
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   )
// }

// SubTaskDetailsModal.displayName = 'SubTaskDetailsModal'
// export { SubTaskDetailsModal }
