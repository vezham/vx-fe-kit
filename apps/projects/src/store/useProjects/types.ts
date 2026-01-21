export type Owner = {
  avatar: string
  email: string
  name: string
}

export type Project = {
  id: number
  projectId: number
  owner: Owner
  project: string
  startdate: Date
  dueDate: Date
  tags: Tags[]
  status: Status
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
  | 'paid'
  | 'draft'
  | 'overdue'
  | 'sent'
  | 'onhold'
  | 'pending'
  | 'cancelled'

export type Dates = 'all' | 'last7Days' | 'last30Days' | 'last60Days'

export type RQProject = object

export type RQListUsers = RQProject

export interface RQGetUsers extends RQProject {
  id: number
}
