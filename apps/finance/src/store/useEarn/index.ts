import { EARN_OPPORTUNITIES } from './data'

export const totalOpportunities = EARN_OPPORTUNITIES.length

export const highestApy = Math.max(...EARN_OPPORTUNITIES.map(item => item.apy))

export const lowestApy = Math.min(...EARN_OPPORTUNITIES.map(item => item.apy))

export const averageApy =
  EARN_OPPORTUNITIES.reduce((sum, item) => sum + item.apy, 0) /
  EARN_OPPORTUNITIES.length

export const lowRiskOpportunities = EARN_OPPORTUNITIES.filter(
  item => item.risk === 'Low'
)

export const mediumRiskOpportunities = EARN_OPPORTUNITIES.filter(
  item => item.risk === 'Medium'
)

export const highRiskOpportunities = EARN_OPPORTUNITIES.filter(
  item => item.risk === 'High'
)

export const stakingOpportunities = EARN_OPPORTUNITIES.filter(
  item => item.kind === 'Staking'
)

export const lendingOpportunities = EARN_OPPORTUNITIES.filter(
  item => item.kind === 'Lending'
)

export const liquidityOpportunities = EARN_OPPORTUNITIES.filter(
  item => item.kind === 'Liquidity'
)

export const vaultOpportunities = EARN_OPPORTUNITIES.filter(
  item => item.kind === 'Vault'
)

export const topApyOpportunity = [...EARN_OPPORTUNITIES].sort(
  (a, b) => b.apy - a.apy
)[0]

export function getEarnOpportunity(id: string) {
  return EARN_OPPORTUNITIES.find(item => item.id === id)
}
