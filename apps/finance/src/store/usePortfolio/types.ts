export type TimeRangeId = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'

export type PortfolioPoint = {
  readonly t: string
  readonly value: number
}

export type PortfolioRange = {
  readonly id: TimeRangeId
  readonly label: string
  /** Inclusive-sampled series of portfolio values over the range. */
  readonly series: readonly PortfolioPoint[]
  /** Gross change in USD over the range (signed). */
  readonly delta: number
  /** Percent change over the range (signed). */
  readonly deltaPercent: number
}

export type RQPortfolio = Record<string, never>

export type PortfolioResponse = {
  ranges: PortfolioRange[]
}
