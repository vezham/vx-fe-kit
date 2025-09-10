/* eslint-disable @nx/enforce-module-boundaries */
'use client'

import {
  Button,
  Card,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spacer,
  Tab,
  Tabs
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from 'recharts'

type ChartData = {
  month: string
  sales: number
  purchases: number
}

const fullChartData: ChartData[] = [
  { month: 'Jan', sales: 98000, purchases: 65000 },
  { month: 'Feb', sales: 125000, purchases: 72000 },
  { month: 'Mar', sales: 89000, purchases: 68000 },
  { month: 'Apr', sales: 156000, purchases: 85000 },
  { month: 'May', sales: 112000, purchases: 78000 },
  { month: 'Jun', sales: 167000, purchases: 92000 },
  { month: 'Jul', sales: 138000, purchases: 83000 },
  { month: 'Aug', sales: 178000, purchases: 95000 },
  { month: 'Sep', sales: 129000, purchases: 76000 },
  { month: 'Oct', sales: 159000, purchases: 88000 },
  { month: 'Nov', sales: 147000, purchases: 82000 },
  { month: 'Dec', sales: 127000, purchases: 79000 }
]

// 🔑 Utility to aggregate data by view
function aggregateData(data: ChartData[], view: string) {
  switch (view) {
    case 'day':
      // Mock: split each month into ~30 days
      return data.flatMap(monthData =>
        Array.from({ length: 30 }, (_, i) => ({
          date: `${monthData.month}-${i + 1}`,
          sales: Math.round(monthData.sales / 30 + Math.random() * 2000),
          purchases: Math.round(monthData.purchases / 30 + Math.random() * 1500)
        }))
      )
    case 'week':
      // Mock: split each month into ~4 weeks
      return data.flatMap(monthData =>
        Array.from({ length: 4 }, (_, i) => ({
          date: `${monthData.month}-W${i + 1}`,
          sales: Math.round(monthData.sales / 4 + Math.random() * 4000),
          purchases: Math.round(monthData.purchases / 4 + Math.random() * 2500)
        }))
      )
    case 'month':
      // Use original monthly data
      return data.map(m => ({
        date: m.month,
        sales: m.sales,
        purchases: m.purchases
      }))
    case 'year':
    default: {
      // Aggregate into one year
      const totalSales = data.reduce((sum, d) => sum + d.sales, 0)
      const totalPurchases = data.reduce((sum, d) => sum + d.purchases, 0)
      return [{ date: '2024', sales: totalSales, purchases: totalPurchases }]
    }
  }
}

export default function App() {
  const [activeTimeframe, setActiveTimeframe] = React.useState('12-months')
  const [activeView, setActiveView] = React.useState('month')

  // 🔑 Compute chart data dynamically
  const chartData = React.useMemo(() => {
    let filtered = fullChartData

    switch (activeTimeframe) {
      case '30-days':
        filtered = fullChartData.slice(-1) // last month only
        break
      case '7-days':
        filtered = fullChartData.slice(-1) // simulate last week
        break
      case '24-hours':
        filtered = fullChartData.slice(-1) // simulate last day
        break
      case '12-months':
      default:
        filtered = fullChartData
    }

    return aggregateData(filtered, activeView)
  }, [activeTimeframe, activeView])

  const timeframeOptions = [
    { key: '24-hours', title: '24 hours' },
    { key: '7-days', title: '7 days' },
    { key: '30-days', title: '30 days' },
    { key: '12-months', title: '12 months' }
  ]

  const viewOptions = [
    { key: 'day', title: 'Day' },
    { key: 'week', title: 'Week' },
    { key: 'month', title: 'Month' },
    { key: 'year', title: 'Year' }
  ]

  return (
    <Card
      as="dl"
      className="border-default-200 dark:border-default-100 mt-4 border shadow-none">
      <section className="flex flex-col flex-nowrap">
        <div className="flex flex-col justify-between gap-y-2 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-medium text-foreground font-medium">
                Sales & Purchases / Analytics / Gross volume
              </h2>
              <Chip
                color="success"
                variant="flat"
                radius="sm"
                startContent={
                  <Icon
                    icon="lucide:arrow-up-right"
                    className="text-success-500"
                    width={16}
                    height={16}
                  />
                }
                className="bg-success-100 text-success-600 font-medium">
                15.3%
              </Chip>
            </div>

            <Dropdown
              classNames={{ content: 'min-w-[120px]' }}
              placement="bottom-end">
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="w-auto rounded-full"
                  size="sm"
                  variant="light">
                  <Icon height={16} icon="lucide:more-vertical" width={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu itemClasses={{ title: 'text-tiny' }} variant="flat">
                <DropdownItem key="view-details">View Details</DropdownItem>
                <DropdownItem key="export-data">Export Data</DropdownItem>
                <DropdownItem key="set-alert">Set Alert</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <Spacer y={2} />
          <Tabs
            aria-label="Timeframe options"
            selectedKey={activeTimeframe}
            onSelectionChange={key => setActiveTimeframe(String(key))}
            size="sm">
            {timeframeOptions.map(option => (
              <Tab key={option.key} title={option.title} />
            ))}
          </Tabs>
          <Spacer y={2} />
          <Tabs
            aria-label="View options"
            selectedKey={activeView}
            onSelectionChange={key => setActiveView(String(key))}
            size="sm">
            {viewOptions.map(option => (
              <Tab key={option.key} title={option.title} />
            ))}
          </Tabs>
        </div>

        {/* Chart */}
        <div>
          <ResponsiveContainer
            className="min-h-[300px] [&_.recharts-surface]:outline-hidden"
            height="100%"
            width="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="10%" stopColor="#0070F3" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#0070F3" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPurchases" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="10%" stopColor="#F31260" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#F31260" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="hsl(var(--heroui-default-200))"
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.4}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: 'var(--heroui-font-size-tiny)' }}
              />

              {/* Tooltip */}
              <Tooltip
                cursor={{ stroke: '#0070F3', strokeDasharray: '3 3' }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-md bg-black px-3 py-2 text-white shadow-md">
                        <div className="text-sm font-medium">
                          Sales: $
                          {((payload[0].value as number) / 1000).toFixed(0)}k
                        </div>
                        <div className="text-sm font-medium">
                          Purchases: $
                          {((payload[1].value as number) / 1000).toFixed(0)}k
                        </div>
                        <div className="text-xs text-gray-300">{label}</div>
                      </div>
                    )
                  }
                  return null
                }}
              />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#0070F3"
                strokeWidth={2}
                fill="url(#colorSales)"
                activeDot={{
                  stroke: '#0070F3',
                  strokeWidth: 2,
                  fill: 'white',
                  r: 4
                }}
              />
              <Area
                type="monotone"
                dataKey="purchases"
                stroke="#F31260"
                strokeWidth={2}
                fill="url(#colorPurchases)"
                activeDot={{
                  stroke: '#F31260',
                  strokeWidth: 2,
                  fill: 'white',
                  r: 4
                }}
              />

              <Legend content={() => <CustomLegend />} verticalAlign="bottom" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </Card>
  )
}

function CustomLegend() {
  return (
    <div className="mt-2 flex items-center justify-center gap-4 sm:gap-8">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
        <span className="text-tiny text-gray-600">Income / Sales</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-pink-600"></div>
        <span className="text-tiny text-gray-600">Expenses / Purchases</span>
      </div>
    </div>
  )
}
