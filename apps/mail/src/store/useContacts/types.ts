export interface EmailAddress {
  name: string
  email: string
  avatar?: string
}

export type Contact = EmailAddress & {
  id: string
}

export type ContactsResponse = Contact[]

export type RQContactsGet = {
  id: string
}

export type RQContactsCreate = Omit<Contact, 'id'> & {
  id?: string
}

export type RQContactsDelete = {
  id: string
}
