export type FolderItem = {
  id: string
  code: string
  name: string
  type: Types
  balance: number
  children?: FolderItem[]
}

export type FolderVariantProps = {
  isChild: boolean
}

export type Types = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'

export type RQChartofAccounts = object

export type RQListChartofAccounts = RQChartofAccounts

export interface RQGetChartofAccounts extends RQChartofAccounts {
  id: string
}
