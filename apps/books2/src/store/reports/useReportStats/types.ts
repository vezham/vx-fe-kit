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
  [x: string]: any
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

// card
export type RQCardStats = object

export type RQListCardStats = RQCardStats

export interface RQGetCardStats extends RQCardStats {
  title: string
}

// analytics

export type RQAnalyticsStats = object

export type RQListAnalyticsStats = RQAnalyticsStats

// Sales

export type RQSalesStats = object

export type RQListSalesStats = RQSalesStats

// Income

export type RQIncomeStatementStats = object

export type RQListIncomeStatementStats = RQIncomeStatementStats

export interface RQGetIncomeStatementStats extends RQIncomeStatementStats {
  title: string
}

// Cashflow

export type RQCashFlowStats = object

export type RQListCashFlowStats = RQCashFlowStats
