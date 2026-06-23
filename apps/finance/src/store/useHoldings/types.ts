export type Holding = {
  readonly id: string
  readonly name: string
  readonly ticker: string
  readonly avatar: string
  readonly color: string
  /** Amount held in native units (e.g. 0.236 BTC). */
  readonly amount: string
  /** USD-formatted value of the holding. */
  readonly value: string
  /** Raw USD value used for sorting / allocation math. */
  readonly usd: number
  /** 24-hour percent change as a signed number. */
  readonly change24h: number
  /** Signed 7-day price series used for sparklines. */
  readonly spark: readonly number[]
}

export type RQHoldings = Record<string, never>

export type HoldingsResponse = {
  holdings: Holding[]
}
