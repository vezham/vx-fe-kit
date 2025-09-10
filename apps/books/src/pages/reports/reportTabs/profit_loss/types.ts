export interface FinancialData {
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

export interface RowVariantProps {
  isHeader?: boolean
  isTotal?: boolean
  isNetIncome?: boolean
  isAccount?: boolean
  item?: FinancialData
  isPositive: boolean
  isNegative: boolean
}
