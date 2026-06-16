export interface EmailAddress {
  name: string
  email: string
  avatar?: string
}

export type ContactsResponse = Record<string, EmailAddress>
