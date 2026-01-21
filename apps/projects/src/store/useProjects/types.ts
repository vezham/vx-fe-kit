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

export type Project = {
  id: number
  projectId: number
  owner: Owner
  project: string
  description: string
  startDate: Date
  dueDate: Date
  tags: Tags[]
  status: Status
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
  | 'Active'
  | 'InProgress'
  | 'InTesting'
  | 'Delayed'
  | 'OnHold'
  | 'Approved'
  | 'Cancelled'
  | 'Planning'
  | 'Completed'
  | 'Invoiced'

export type Dates = 'all' | 'last7Days' | 'last30Days' | 'last60Days'

export type RQProject = object

export type RQListUsers = RQProject

export interface RQGetUsers extends RQProject {
  id: number
}
