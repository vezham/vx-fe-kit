'use client'

import { KPI } from '@heroui-pro/react'

import { HOLDINGS, TOTAL_BALANCE_USD } from '../data/holdings'

// Module-level derivations — avoid recomputing per render.
const HOLDINGS_COUNT = HOLDINGS.length
const TOP_PERFORMER = HOLDINGS.reduce((best, current) =>
  current.change24h > best.change24h ? current : best
)
// Illustrative mocks — real apps would compute these from the price series.
const CHANGE_24H_USD = 120.18
const CHANGE_24H_PERCENT = 2.24
const CHANGE_7D_PERCENT = 5.32

export function BalanceKpiStrip() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <KPI>
        <KPI.Header>
          <KPI.Title>Total balance</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            currency="USD"
            maximumFractionDigits={2}
            style="currency"
            value={TOTAL_BALANCE_USD}
          />
          <KPI.Trend trend="up">{`${CHANGE_7D_PERCENT}%`}</KPI.Trend>
        </KPI.Content>
      </KPI>
      <KPI>
        <KPI.Header>
          <KPI.Title>24h change</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            currency="USD"
            maximumFractionDigits={2}
            style="currency"
            value={CHANGE_24H_USD}
          />
          <KPI.Trend trend="up">{`${CHANGE_24H_PERCENT}%`}</KPI.Trend>
        </KPI.Content>
      </KPI>
      <KPI>
        <KPI.Header>
          <KPI.Title>Top performer · {TOP_PERFORMER.ticker}</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            maximumFractionDigits={2}
            style="decimal"
            value={TOP_PERFORMER.change24h}
          />
          <KPI.Trend trend="up">{`${TOP_PERFORMER.change24h}%`}</KPI.Trend>
        </KPI.Content>
      </KPI>
      <KPI>
        <KPI.Header>
          <KPI.Title>Holdings</KPI.Title>
        </KPI.Header>
        <KPI.Content>
          <KPI.Value
            maximumFractionDigits={0}
            style="decimal"
            value={HOLDINGS_COUNT}
          />
          <KPI.Trend trend="neutral">Assets</KPI.Trend>
        </KPI.Content>
      </KPI>
    </div>
  )
}
