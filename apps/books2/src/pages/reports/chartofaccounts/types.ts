export interface FolderItem {
  id: string
  code: string
  name: string
  type: string
  balance: number
  children?: FolderItem[]
}

export interface FolderVariantProps {
  isChild: boolean
}
