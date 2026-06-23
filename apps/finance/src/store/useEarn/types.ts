export type EarnOpportunity = {
  readonly id: string
  readonly asset: string
  readonly assetAvatar: string
  readonly assetColor: string
  readonly protocol: string
  readonly kind: 'Staking' | 'Lending' | 'Liquidity' | 'Vault'
  /** Annual percentage yield, expressed as a number (e.g. 4.8). */
  readonly apy: number
  /** Formatted TVL (total value locked) string. */
  readonly tvl: string
  /** Risk bucket for visual emphasis. */
  readonly risk: 'Low' | 'Medium' | 'High'
}

export type RQEarn = Record<string, never>

export type EarnResponse = {
  opportunities: EarnOpportunity[]
}
