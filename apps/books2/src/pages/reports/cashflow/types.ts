export type CashFlowItem = {
  label: string
  value: number
}

export type CashFlowSection = {
  title: string
  items: CashFlowItem[]
  total: number
}

export type CashFlowSummary = {
  beginningCash: number
  netCashChange: number
  endingCash: number
}

export type CashFlowData = {
  operating: CashFlowSection
  investing: CashFlowSection
  financing: CashFlowSection
  summary: CashFlowSummary
}

export type cashFlowPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly'
