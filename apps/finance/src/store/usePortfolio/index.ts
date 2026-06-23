import { ALL_TIME, ONE_D, ONE_M, ONE_W, ONE_Y, THREE_M } from './data'
import type { PortfolioPoint, PortfolioRange, TimeRangeId } from './types'

function buildRange(
  id: TimeRangeId,
  label: string,
  series: PortfolioPoint[]
): PortfolioRange {
  const first = series[0]?.value ?? 0
  const last = series[series.length - 1]?.value ?? first

  const delta = last - first

  return {
    id,
    label,
    series,
    delta,
    deltaPercent: first === 0 ? 0 : (delta / first) * 100
  }
}

export const PORTFOLIO_RANGES: PortfolioRange[] = [
  buildRange('1D', '1D', [...ONE_D]),
  buildRange('1W', '1W', [...ONE_W]),
  buildRange('1M', '1M', [...ONE_M]),
  buildRange('3M', '3M', [...THREE_M]),
  buildRange('1Y', '1Y', [...ONE_Y]),
  buildRange('ALL', 'All', [...ALL_TIME])
]

export const DEFAULT_RANGE_ID: TimeRangeId = '1M'

export const PORTFOLIO_BY_RANGE = Object.fromEntries(
  PORTFOLIO_RANGES.map(range => [range.id, range])
) as Record<TimeRangeId, PortfolioRange>

export function getPortfolioRange(id: TimeRangeId) {
  return PORTFOLIO_BY_RANGE[id]
}
