export interface EmailAddress {
  name: string
  email: string
  avatar?: string
}

export type CurrentUser = EmailAddress & {
  id: string
}

export type CurrentUserResponse = CurrentUser

export type RQCurrentUserUpdate = Partial<Omit<CurrentUserResponse, 'id'>>
