export interface EmailAddress {
  name: string
  email: string
  avatar?: string
}

export type CurrentUserResponse = EmailAddress
