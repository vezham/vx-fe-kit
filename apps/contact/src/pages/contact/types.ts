export type Contact = {
  id: number
  firstName: string
  lastName?: string
  avatar?: string
  company?: string
  jobTitle?: string
  emails?: string[]
  phones?: string[]
  addresses?: string[]
  birthday?: string
  favorite?: boolean
  createdAt: string
  updatedAt: string
}
