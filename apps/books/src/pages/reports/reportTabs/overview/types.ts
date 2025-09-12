// Types for the financial dashboard components

// Analytics component types
export type ChartData = {
  month: string
  sales: number
  purchases: number
}

// SalesFlow component types
export type TimeRange = 'last-2-weeks' | 'last-month' | 'last-quarter'

export type KpiStat = {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'neutral' | 'negative'
}

export type ChartDataPoint = {
  day: string
  value: number
}

export type SalesData = {
  title: string
  timeRanges: Record<
    TimeRange,
    {
      kpiStats: KpiStat[]
      chartData: ChartDataPoint[]
    }
  >
}

// CashFlow component types
export type MonthlyData = {
  month: string
  value: number
}

export type YearlyData = {
  year: number
  data: MonthlyData[]
}

// Income component types
export interface FinancialRowProps {
  label: string
  amount: string
  percentage: string
  percentageColor: string
  isBold?: boolean
  icons?: React.ReactNode
  noMargin?: boolean
}

// Card data type
export type CardData = {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'neutral' | 'negative'
  trendChipPosition: 'top' | 'bottom'
  iconName: string
}
