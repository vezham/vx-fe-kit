export type Owner = {
  avatar: string
  email: string
  name: string
}

export type AttachmentType =
  | 'image'
  | 'pdf'
  | 'doc'
  | 'sheet'
  | 'zip'
  | 'video'
  | 'audio'
  | 'other'

export type Attachment = {
  id: string
  name: string
  url: string
  type: AttachmentType
}

export type SubTask = {
  id: number
  taskId: number
  subtaskId: number
  subtaskname: string
  description: string
  owner: Owner
  startDate: Date
  dueDate: Date
  tags: Tags[]
  status: Status
  priority: string
  billingtype: string
  attachments: Attachment[]
}

export type Tags =
  | 'Design'
  | 'Product'
  | 'Marketing'
  | 'Management'
  | 'Engineering'
  | 'Sales'
  | 'Support'
  | 'Other'
  | (string & {})

export type Status =
  | 'Open'
  | 'InProgress'
  | 'InReview'
  | 'TobeTested'
  | 'Delayed'
  | 'OnHold'
  | 'Closed'
  | 'Cancelled'

export type Dates = 'all' | 'last7Days' | 'last30Days' | 'last60Days'

export type RQSubTask = object

export type RQListUsers = RQSubTask

export interface RQGetUsers extends RQSubTask {
  id: number
}
