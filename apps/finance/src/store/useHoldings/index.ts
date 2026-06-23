import { HOLDINGS } from './data'

export const totalBalanceUsd = HOLDINGS.reduce((sum, item) => sum + item.usd, 0)

export const holdingCount = HOLDINGS.length

export const topHolding = [...HOLDINGS].sort((a, b) => b.usd - a.usd)[0]
