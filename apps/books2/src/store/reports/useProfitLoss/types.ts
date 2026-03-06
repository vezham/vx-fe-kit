export type FinancialData = {
  category: string
  isHeader?: boolean
  isTotal?: boolean
  isNetIncome?: boolean
  items?: {
    name: string
    currentPeriod: number
    previousPeriod: number
    change: number
    percentChange: number
  }[]
  currentPeriod?: number
  previousPeriod?: number
  change?: number
  percentChange?: number
}

export type RowVariantProps = {
  isHeader?: boolean
  isTotal?: boolean
  isNetIncome?: boolean
  isAccount?: boolean
  item?: FinancialData
  isPositive: boolean
  isNegative: boolean
}

// Available periods
export type ProfitLossPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly'

// Request types
export type RQProfitLoss = {
  period?: ProfitLossPeriod
}

export type RQListProfitLoss = RQProfitLoss

export interface RQGetProfitLoss extends RQProfitLoss {
  category: string
}
