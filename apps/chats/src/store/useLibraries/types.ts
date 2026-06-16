export type LibraryItem = {
  id: string
  title: string
  description: string
  updatedAt: string
  tags: readonly string[]
  threadId?: string
}

export type RQLibrary = Record<string, never>

export type LibraryResponse = LibraryItem[]
