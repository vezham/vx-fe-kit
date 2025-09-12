export interface FinancialData {
  category: string
  isHeader?: boolean
  isTotal?: boolean
  isTotalEquity?: boolean
  isTotalLiability?: boolean
  currentPeriod?: number
  previousPeriod?: number
  change?: number
  percentChange?: number
}

export interface RowVariantProps {
  isHeader?: boolean
  isTotal?: boolean
  isTotalLiability?: boolean
  isTotalEquity?: boolean
  isAccount?: boolean
  item?: FinancialData
  isPositive: boolean
  isNegative: boolean
}

export type BalanceSheetPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly'

export type RQBalanceSheet = {
  period?: BalanceSheetPeriod
}

export type RQListBalanceSheet = RQBalanceSheet

export interface RQGetBalanceSheet extends RQBalanceSheet {
  category: string
}
