import { PortfolioPoint } from './types'

export const point = (t: string, value: number): PortfolioPoint => ({
  t,
  value
})

export const ONE_D: readonly PortfolioPoint[] = [
  point('00:00', 5278),
  point('02:00', 5352),
  point('04:00', 5298),
  point('06:00', 5379),
  point('08:00', 5431),
  point('10:00', 5335),
  point('12:00', 5239),
  point('14:00', 5182),
  point('16:00', 5256),
  point('18:00', 5370),
  point('20:00', 5409),
  point('22:00', 5374),
  point('24:00', 5427)
]

export const ONE_W: readonly PortfolioPoint[] = [
  point('Mon', 5160),
  point('Tue', 5278),
  point('Wed', 5085),
  point('Thu', 5247),
  point('Fri', 5497),
  point('Sat', 5341),
  point('Sun', 5427)
]

/**
 * 28-day series using layered sinusoids + a few "spike" days so the curve
 * shows realistic pumps, dumps, and ranging moves instead of a smooth arc.
 * Computed once at module load.
 */

export const ONE_M: readonly PortfolioPoint[] = (() => {
  const spikes: Readonly<Record<number, number>> = {
    13: -179,
    18: 201,
    23: -118,
    6: 142
  }

  return Array.from({ length: 28 }, (_, index) => {
    const day = index + 1
    const trend = 4946 + (index / 27) * (5427 - 4946)
    const wave = Math.sin(index * 0.9) * 92 + Math.cos(index * 0.45) * 57
    const spike = spikes[index] ?? 0

    return point(`Day ${day}`, Math.round(trend + wave + spike))
  })
})()

export const THREE_M: readonly PortfolioPoint[] = [
  point('Oct W1', 4551),
  point('Oct W2', 4847),
  point('Oct W3', 4466),
  point('Oct W4', 4810),
  point('Nov W1', 5107),
  point('Nov W2', 4729),
  point('Nov W3', 5204),
  point('Nov W4', 4902),
  point('Dec W1', 5239),
  point('Dec W2', 4963),
  point('Dec W3', 5387),
  point('Dec W4', 5427)
]

export const ONE_Y: readonly PortfolioPoint[] = [
  point('Jan', 3107),
  point('Feb', 3650),
  point('Mar', 3265),
  point('Apr', 3921),
  point('May', 3541),
  point('Jun', 4250),
  point('Jul', 3948),
  point('Aug', 4648),
  point('Sep', 4096),
  point('Oct', 4897),
  point('Nov', 4622),
  point('Dec', 5427)
]

export const ALL_TIME: readonly PortfolioPoint[] = [
  point('2019', 613),
  point('2020', 1405),
  point('2021', 2731),
  point('2022', 1133),
  point('2023', 2591),
  point('2024', 3593),
  point('2025', 5427)
]
