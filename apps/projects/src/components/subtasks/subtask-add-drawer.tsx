// import { CalendarDate, today } from '@internationalized/date'
// import { useEffect, useMemo, useState } from 'react'

// import {
//   Avatar,
//   Button,
//   Chip,
//   DatePicker,
//   Drawer,
//   DrawerBody,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   Input,
//   Select,
//   SelectItem,
//   Spinner,
//   Tooltip
// } from '@vezham/react/v2'

// import { useProjects } from '../../store/useProjects'
// import { useCreateSubTask } from '../../store/useSubTasks'
// import { getStatusProps, statuses, tags } from '../../store/useSubTasks/data'
// import { billingType, priority } from '../../store/useSubTasks/data'
// import { useTasks } from '../../store/useTasks'
// import {
//   Attachment,
//   Status,
//   SubTask,
//   SubTaskDrawerProps,
//   Tags,
//   useSubTaskDrawerProps
// } from './types'

// const getAttachmentType = (file: File): Attachment['type'] => {
//   if (file.type.startsWith('image/')) return 'image'
//   if (file.type.includes('pdf')) return 'pdf'
//   if (file.type.includes('word') || file.name.endsWith('.doc')) return 'doc'
//   if (file.type.includes('sheet') || file.name.endsWith('.xlsx')) return 'sheet'
//   return 'other'
// }

// const dateToCalendarDate = (date: Date): CalendarDate => {
//   return new CalendarDate(
//     date.getFullYear(),
//     date.getMonth() + 1,
//     date.getDate()
//   )
// }

// const calendarDateToDate = (calendarDate: CalendarDate): Date => {
//   return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day)
// }

// const SubTaskDrawer = ({
//   isOpen,
//   onOpenChange,
//   taskId
// }: SubTaskDrawerProps) => {
//   const { data: tasks = [], isLoading: tasksLoading } = useTasks()
//   const { data: projects = [], isLoading: projectsLoading } = useProjects()

//   const { mutateAsync } = useCreateSubTask()

//   const {
//     getDrawerHeaderProps,
//     getCloseButtonProps,
//     getDrawerBodyProps,
//     getLoadingTextProps,
//     getGridContainerProps,
//     getTagsContainerProps,
//     getAttachmentsContainerProps,
//     getDrawerFooterProps,
//     getCancelButtonProps,
//     getSubmitButtonProps,
//     getInputProps,
//     getSelectProps,
//     getChipProps
//   } = useSubTaskDrawerProps({ isOpen, onOpenChange })

//   const numerictaskId = useMemo(
//     () => (taskId ? Number(taskId) : undefined),
//     [taskId]
//   )

//   const owners = useMemo(
//     () =>
//       Array.from(new Map(projects.map(p => [p.owner.name, p.owner])).values()),
//     [projects]
//   )

//   const [startCalendarDate, setStartCalendarDate] = useState<CalendarDate>(
//     dateToCalendarDate(new Date())
//   )
//   const [dueCalendarDate, setDueCalendarDate] = useState<CalendarDate>(
//     dateToCalendarDate(new Date())
//   )

//   useEffect(() => {
//     if (numerictaskId) {
//       setForm(f => ({
//         ...f,
//         taskId: numerictaskId
//       }))
//     }
//   }, [numerictaskId])

//   const getInitials = (name: string) =>
//     name
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase()

//   const getInitialForm = (): Omit<SubTask, 'id'> => ({
//     taskId: numerictaskId,
//     subtaskId: Math.floor(Math.random() * 1000),
//     subtaskname: '',
//     description: '',
//     owner: {
//       name: '',
//       email: '',
//       avatar: ''
//     },
//     startDate: new Date(),
//     dueDate: new Date(),
//     priority: 'None',
//     billingtype: 'None',
//     status: 'Open',
//     tags: [],
//     attachments: []
//   })

//   const [form, setForm] = useState<Omit<SubTask, 'id'>>(getInitialForm())

//   const isFormValid = useMemo(
//     () =>
//       form.taskId &&
//       form.subtaskname.trim().length > 0 &&
//       form.description.trim().length > 0 &&
//       form.owner.name.trim().length > 0 &&
//       form.tags.length > 0,
//     [form]
//   )

//   const handleFileUpload = (files: FileList | null) => {
//     if (!files) return

//     const uploaded: Attachment[] = Array.from(files).map(file => ({
//       id: `${file.name}-${Date.now()}`,
//       name: file.name,
//       url: URL.createObjectURL(file),
//       type: getAttachmentType(file)
//     }))

//     setForm(f => ({
//       ...f,
//       attachments: [...f.attachments, ...uploaded]
//     }))
//   }

//   const removeAttachment = (id: string) => {
//     setForm(f => ({
//       ...f,
//       attachments: f.attachments.filter(a => a.id !== id)
//     }))
//   }

//   const onSubmit = async () => {
//     if (!isFormValid) return

//     await mutateAsync({
//       id: Date.now(),
//       ...form
//     })

//     setForm(getInitialForm())
//     onOpenChange(false)
//     const todayDate = today('UTC')
//     setStartCalendarDate(todayDate)
//     setDueCalendarDate(todayDate)
//   }

//   const handleStartDateChange = (calendarDate: CalendarDate) => {
//     setStartCalendarDate(calendarDate)
//     const date = calendarDateToDate(calendarDate)
//     setForm(f => ({ ...f, startDate: date }))
//   }

//   const handleDueDateChange = (calendarDate: CalendarDate) => {
//     setDueCalendarDate(calendarDate)
//     const date = calendarDateToDate(calendarDate)
//     setForm(f => ({ ...f, dueDate: date }))
//   }

//   return (
//     <Drawer
//       hideCloseButton
//       size="lg"
//       isOpen={isOpen}
//       onOpenChange={onOpenChange}
//       placement="right">
//       <DrawerContent>
//         <DrawerHeader {...getDrawerHeaderProps()}>
//           <Tooltip content="Close">
//             <Button
//               isIconOnly
//               size="sm"
//               variant="light"
//               {...getCloseButtonProps()}
//               onPress={() => onOpenChange(false)}>
//               <svg
//                 fill="none"
//                 height="20"
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 width="20"
//                 xmlns="http://www.w3.org/2000/svg">
//                 <path d="m13 17 5-5-5-5M6 17 l5-5-5-5" />
//               </svg>
//             </Button>
//           </Tooltip>
//           Add SubTask
//         </DrawerHeader>

//         <DrawerBody {...getDrawerBodyProps()}>
//           {tasksLoading ? (
//             <div {...getLoadingTextProps()}>
//               <Spinner size="sm" /> Loading subtasks...
//             </div>
//           ) : (
//             <Select
//               label="Task"
//               isDisabled
//               selectedKeys={numerictaskId ? [String(numerictaskId)] : []}
//               {...getSelectProps()}>
//               {tasks.map(t => (
//                 <SelectItem key={String(t.id)}>{t.taskname}</SelectItem>
//               ))}
//             </Select>
//           )}

//           <>
//             <Input
//               label="Name"
//               autoFocus={isOpen}
//               value={form.subtaskname}
//               onValueChange={v => setForm(f => ({ ...f, subtaskname: v }))}
//               isRequired
//               {...getInputProps()}
//             />

//             <Input
//               label="Description"
//               value={form.description}
//               onValueChange={v => setForm(f => ({ ...f, description: v }))}
//               isRequired
//               {...getInputProps()}
//             />

//             <Select
//               label="Owner"
//               selectedKeys={[form.owner.name]}
//               onSelectionChange={keys => {
//                 const owner = owners.find(o => o.name === [...keys][0])
//                 if (!owner) return
//                 setForm(f => ({
//                   ...f,
//                   owner: {
//                     name: owner.name,
//                     avatar: owner.avatar || ''
//                   }
//                 }))
//               }}
//               isRequired
//               {...getSelectProps()}>
//               {owners.map(o => (
//                 <SelectItem key={o.name} textValue={o.name}>
//                   <div className="flex items-center gap-2">
//                     <Avatar
//                       size="sm"
//                       src={o.avatar || undefined}
//                       name={o.avatar ? undefined : getInitials(o.name)}
//                     />
//                     {o.name}
//                   </div>
//                 </SelectItem>
//               ))}
//             </Select>

//             <div {...getGridContainerProps()}>
//               <DatePicker
//                 label="Start Date"
//                 value={startCalendarDate}
//                 onChange={handleStartDateChange}
//                 className="w-full"
//                 isRequired
//               />

//               <DatePicker
//                 label="Due Date"
//                 value={dueCalendarDate}
//                 onChange={handleDueDateChange}
//                 className="w-full"
//                 isRequired
//               />
//             </div>

//             <div {...getGridContainerProps()}>
//               <Select
//                 label="Priority"
//                 selectedKeys={[form.priority]}
//                 {...getSelectProps()}>
//                 {priority.map(p => (
//                   <SelectItem
//                     key={p}
//                     onPress={() => setForm(f => ({ ...f, priority: p }))}>
//                     {p}
//                   </SelectItem>
//                 ))}
//               </Select>

//               <Select
//                 label="Billing Type"
//                 selectedKeys={[form.billingtype]}
//                 {...getSelectProps()}>
//                 {billingType.map(b => (
//                   <SelectItem
//                     key={b}
//                     onPress={() =>
//                       setForm(f => ({
//                         ...f,
//                         billingtype: b
//                       }))
//                     }>
//                     {b}
//                   </SelectItem>
//                 ))}
//               </Select>
//             </div>

//             <Select
//               label="Status"
//               selectedKeys={[form.status]}
//               onSelectionChange={keys =>
//                 setForm(f => ({ ...f, status: [...keys][0] as Status }))
//               }
//               {...getSelectProps()}
//               startContent={
//                 form.status && (
//                   <div
//                     className={`h-3 w-3 rounded-full ${
//                       getStatusProps[form.status]?.color.split(' ')[0] ||
//                       'bg-default-300'
//                     }`}
//                   />
//                 )
//               }>
//               {statuses.map(s => (
//                 <SelectItem
//                   key={s}
//                   textValue={s}
//                   startContent={
//                     <div
//                       className={`h-3 w-3 rounded-full ${
//                         getStatusProps[s]?.color.split(' ')[0] ||
//                         'bg-default-300'
//                       }`}
//                     />
//                   }>
//                   {s}
//                 </SelectItem>
//               ))}
//             </Select>

//             <Select
//               label="Tags"
//               selectionMode="multiple"
//               selectedKeys={form.tags}
//               onSelectionChange={keys =>
//                 setForm(f => ({
//                   ...f,
//                   tags: [...keys] as Tags[]
//                 }))
//               }
//               {...getSelectProps()}>
//               {tags.map(tag => (
//                 <SelectItem key={tag}>{tag}</SelectItem>
//               ))}
//             </Select>

//             <div {...getTagsContainerProps()}>
//               {form.tags.map(tag => (
//                 <Chip key={tag} size="sm" {...getChipProps()}>
//                   {tag}
//                 </Chip>
//               ))}
//             </div>

//             <Input
//               type="file"
//               label="Attachments"
//               multiple
//               onChange={e => handleFileUpload(e.currentTarget.files)}
//               {...getInputProps()}
//             />

//             <div {...getAttachmentsContainerProps()}>
//               {form.attachments.map(att => (
//                 <Chip
//                   key={att.id}
//                   size="sm"
//                   onClose={() => removeAttachment(att.id)}
//                   {...getChipProps()}>
//                   {att.name}
//                 </Chip>
//               ))}
//             </div>
//           </>
//         </DrawerBody>

//         <DrawerFooter {...getDrawerFooterProps()}>
//           <Button
//             variant="light"
//             {...getCancelButtonProps()}
//             onPress={onOpenChange}>
//             Cancel
//           </Button>
//           <Button
//             color="primary"
//             isDisabled={!isFormValid}
//             {...getSubmitButtonProps()}
//             onPress={onSubmit}>
//             Add SubTask
//           </Button>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   )
// }

// SubTaskDrawer.displayName = 'SubTaskDrawer'
// export { SubTaskDrawer }
