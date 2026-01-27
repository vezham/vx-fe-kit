export type Attachment = {
  id: number
  name: string
  size: number
  type: string
  url: string
}

export type Comment = {
  id: number
  author: string
  content: string
  createdAt: Date
  attachments: Attachment[]
}
