/* eslint-disable @nx/enforce-module-boundaries */
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

// Define the data structure for cash flow by month
type MonthlyData = {
  month: string
  value: number
}

// Define the data structure for yearly cash flow
type YearlyData = {
  year: number
  data: MonthlyData[]
}

// Sample data for multiple years
const cashFlowData: YearlyData[] = [
  {
    year: 2024,
    data: [
      { month: 'Jan', value: 400 },
      { month: 'Feb', value: 380 },
      { month: 'Mar', value: 340 },
      { month: 'Apr', value: 320 },
      { month: 'May', value: 300 },
      { month: 'Jun', value: 320 },
      { month: 'Jul', value: 450 },
      { month: 'Aug', value: 300 },
      { month: 'Sep', value: 280 },
      { month: 'Oct', value: 220 },
      { month: 'Nov', value: 180 },
      { month: 'Dec', value: 160 }
    ]
  },
  {
    year: 2023,
    data: [
      { month: 'Jan', value: 350 },
      { month: 'Feb', value: 370 },
      { month: 'Mar', value: 390 },
      { month: 'Apr', value: 410 },
      { month: 'May', value: 380 },
      { month: 'Jun', value: 400 },
      { month: 'Jul', value: 420 },
      { month: 'Aug', value: 390 },
      { month: 'Sep', value: 370 },
      { month: 'Oct', value: 350 },
      { month: 'Nov', value: 330 },
      { month: 'Dec', value: 340 }
    ]
  },
  {
    year: 2022,
    data: [
      { month: 'Jan', value: 280 },
      { month: 'Feb', value: 300 },
      { month: 'Mar', value: 320 },
      { month: 'Apr', value: 340 },
      { month: 'May', value: 360 },
      { month: 'Jun', value: 380 },
      { month: 'Jul', value: 400 },
      { month: 'Aug', value: 420 },
      { month: 'Sep', value: 440 },
      { month: 'Oct', value: 460 },
      { month: 'Nov', value: 480 },
      { month: 'Dec', value: 500 }
    ]
  }
]

// Format month names
const formatMonth = (month: string) => {
  const monthNumber =
    {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11
    }[month] ?? 0

  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    new Date(2024, monthNumber, 1)
  )
}

// Format currency values
const formatCurrency = (value: number) => {
  return `$${value}`
}

const CashFlowChart: React.FC = () => {
  // State for selected year
  const [selectedYear, setSelectedYear] = React.useState<number>(2024)

  // Get data for the selected year
  const yearData = React.useMemo(() => {
    return cashFlowData.find(data => data.year === selectedYear)?.data || []
  }, [selectedYear])

  // Available years for dropdown
  const availableYears = React.useMemo(() => {
    return cashFlowData.map(data => data.year)
  }, [])

  return (
    <Card className="border-default-200 relative mt-4 w-full border p-6 shadow-none">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-foreground text-2xl font-bold">
          Cash at the end of the month
        </h2>

        {/* Year selector dropdown */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              variant="flat"
              className="bg-default-100 min-w-[100px]"
              endContent={
                <Icon icon="lucide:chevron-down" width={16} height={16} />
              }>
              {selectedYear}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Select Year"
            onAction={key => setSelectedYear(Number(key))}
            selectedKeys={[selectedYear.toString()]}>
            {availableYears.map(year => (
              <DropdownItem key={year.toString()}>{year}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={yearData}
          className="overflow-x-auto"
          margin={{ top: 5, right: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--heroui-primary-500))"
                stopOpacity={0.2}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--heroui-primary-100))"
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--heroui-default-200))"
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickFormatter={formatMonth}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[0, 500]}
            ticks={[0, 100, 200, 300, 400, 500]}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const value = payload[0].value as number
                return (
                  <div className="bg-foreground text-background rounded-medium p-2 shadow-sm">
                    <p className="text-lg font-bold">{formatCurrency(value)}</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--heroui-primary-500))"
            strokeWidth={2}
            fill="url(#cashGradient)"
            activeDot={{
              r: 6,
              stroke: 'hsl(var(--heroui-primary-500))',
              strokeWidth: 2,
              fill: 'hsl(var(--heroui-background))'
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default CashFlowChart
