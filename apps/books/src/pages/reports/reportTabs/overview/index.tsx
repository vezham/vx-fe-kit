'use client'

import { Icon } from '@iconify/react'
import React from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import {
  Alert,
  Button,
  Card,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
  Spacer,
  Spinner,
  Tab,
  Tabs,
  cn
} from '@vezham/react/v2'

import Header from '../../../../components/header'
import End from '../../../../pages/reports/actionbar/endContent'
import Start from '../../../../pages/reports/actionbar/headContent'
import {
  useReportAnalyticsStats,
  useReportCardStats,
  useReportCashFlowStats,
  useReportIncomeStats,
  useReportSalesStats
} from '../../../../store/reports/useReportStats'
// data + mocks
import {
  aggregateData,
  formatCurrency,
  formatMonth
} from '../../../../store/reports/useReportStats/data'
import { ChartDataPoint, KpiStat, TimeRange } from './types'
import {
  CustomLegend,
  FinancialRow,
  analyticsVariants,
  cardVariants,
  cashFlowVariants,
  incomeVariants,
  salesFlowVariants
} from './variants'

// ================= MAIN COMPONENT =================
export default function Component() {
  const [activeTimeframe, setActiveTimeframe] = React.useState<
    '12-months' | '30-days' | '7-days' | '24-hours'
  >('12-months')
  const [activeView, setActiveView] = React.useState<
    'day' | 'week' | 'month' | 'year'
  >('month')

  // --- Queries ---
  const {
    data: cardsFromApi,
    isLoading: isCardsLoading,
    isError: isCardsError,
    refetch: refetchCard
  } = useReportCardStats.list({})

  const {
    data: analyticsFromApi,
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
    refetch: refetchAnalytics
  } = useReportAnalyticsStats.list({})

  const {
    data: salesFromApi,
    isLoading: isSalesLoading,
    isError: isSalesError,
    refetch: refetchSales
  } = useReportSalesStats.list({})

  const {
    data: incomeFromApi,
    isLoading: isIncomeLoading,
    isError: isIncomeError,
    refetch: refetchIncome
  } = useReportIncomeStats.list({})

  const {
    data: cashflowFromApi,
    isLoading: isCashflowLoading,
    isError: isCashflowError,
    refetch: refetchCash
  } = useReportCashFlowStats.list({})

  // --- Use API data ---
  const cardData = cardsFromApi || []
  const analyticsData = analyticsFromApi || []
  const salesApiData = salesFromApi || { title: '', timeRanges: {} }
  const financialRows = incomeFromApi || []
  const cashflowApiData = cashflowFromApi || []

  // --- Chart data ---
  const chartData = React.useMemo(() => {
    if (!analyticsData || analyticsData.length === 0) return []

    let filtered = analyticsData
    switch (activeTimeframe) {
      case '30-days':
      case '7-days':
      case '24-hours':
        filtered = analyticsData.slice(-1)
        break
      case '12-months':
      default:
        filtered = analyticsData
    }
    return aggregateData(filtered, activeView)
  }, [activeTimeframe, activeView, analyticsData])

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

  // --- SalesFlow ---
  const [selectedTimeRange, setSelectedTimeRange] =
    React.useState<TimeRange>('last-2-weeks')
  const timeRangeLabels: Record<TimeRange, string> = {
    'last-2-weeks': 'Last 2 weeks',
    'last-month': 'Last month',
    'last-quarter': 'Last quarter'
  }

  const currentSalesData = React.useMemo(() => {
    if (
      !salesApiData ||
      !salesApiData.timeRanges ||
      !(
        salesApiData.timeRanges as Record<
          TimeRange,
          { kpiStats: KpiStat[]; chartData: ChartDataPoint[] }
        >
      )[selectedTimeRange]
    ) {
      return { kpiStats: [], chartData: [] }
    }

    return (
      salesApiData.timeRanges as Record<
        TimeRange,
        { kpiStats: KpiStat[]; chartData: ChartDataPoint[] }
      >
    )[selectedTimeRange]
  }, [salesApiData, selectedTimeRange])

  const handleTimeRangeChange = (keys: Set<React.Key> | 'all') => {
    if (keys !== 'all' && keys.size > 0)
      setSelectedTimeRange(Array.from(keys)[0] as TimeRange)
  }

  // --- Income handlers ---
  const handleDownload = () => console.log('Download statement')
  const handleShare = () => console.log('Share statement')
  const handlePrint = () => window.print()

  // --- CashFlow ---
  const availableYears = React.useMemo(
    () =>
      cashflowApiData && cashflowApiData.length > 0
        ? cashflowApiData.map(d => d.year)
        : [new Date().getFullYear()],
    [cashflowApiData]
  )

  const [selectedYear, setSelectedYear] = React.useState<number>(
    availableYears[0] ?? new Date().getFullYear()
  )

  React.useEffect(() => {
    if (availableYears.length > 0 && !availableYears.includes(selectedYear)) {
      setSelectedYear(availableYears[0])
    }
  }, [availableYears, selectedYear])

  const yearData = React.useMemo(() => {
    if (!cashflowApiData || cashflowApiData.length === 0) return []
    const yearEntry = cashflowApiData.find(d => d.year === selectedYear)
    return yearEntry ? yearEntry.data : []
  }, [cashflowApiData, selectedYear])

  return (
    <>
      <div className="pb-4">
        <Header
          startContent={<Start />}
          mainTitle="Financial Reports"
          mainDescription="View comprehensive financial reports and analytics"
          endContent={<End />}
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {isCardsLoading ? (
          <Card className="border-default-200 col-span-full flex h-50 items-center justify-center border p-6 shadow-none">
            <Spinner size="lg" />
          </Card>
        ) : isCardsError ? (
          <div className="col-span-full">
            <Alert
              variant="faded"
              color="default"
              title="Failed to load stats"
              hideIcon
              className="mt-6 flex h-50 flex-col items-center justify-center">
              <Button
                color="danger"
                size="sm"
                variant="light"
                className="mx-auto mt-2"
                onPress={() => {
                  refetchCard()
                }}>
                Try Again
              </Button>
            </Alert>
          </div>
        ) : cardData && cardData.length > 0 ? (
          cardData.map(
            (
              { title, value, change, changeType, iconName, trendChipPosition },
              index
            ) => (
              <Card key={index} className={cardVariants.base}>
                <div className="flex p-4">
                  <div className={cardVariants.slots.iconContainer(changeType)}>
                    {cardVariants.slots.icon(changeType, iconName)}
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <dt className={cardVariants.slots.title}>{title}</dt>
                    <dd className={cardVariants.slots.value}>{value}</dd>
                  </div>
                  <Chip
                    className={cardVariants.slots.chipPosition(
                      trendChipPosition
                    )}
                    classNames={{ content: cardVariants.slots.chipContent }}
                    color={
                      changeType === 'positive'
                        ? 'success'
                        : changeType === 'neutral'
                          ? 'warning'
                          : 'danger'
                    }
                    radius="sm"
                    size="sm"
                    startContent={cardVariants.slots.chipIcon(changeType)}
                    variant="flat">
                    {change}
                  </Chip>
                </div>
                <div className="bg-default-100">
                  <Button
                    fullWidth
                    className={cardVariants.slots.viewAllButton}
                    radius="none"
                    variant="light">
                    View All
                  </Button>
                </div>
              </Card>
            )
          )
        ) : (
          <div className="text-default-500 col-span-full p-4 text-sm">
            No card data available
          </div>
        )}
      </div>

      {/* Analytics */}
      <div className="mt-6">
        {isAnalyticsLoading ? (
          <Card as="dl" className={analyticsVariants.base}>
            <div className="flex h-100 items-center justify-center">
              <Spinner size="lg" />
            </div>
          </Card>
        ) : isAnalyticsError ? (
          <Card as="dl" className={analyticsVariants.base}>
            <Alert
              variant="faded"
              color="default"
              title="Failed to load analytics"
              hideIcon
              className="mt-6 flex h-100 flex-col items-center justify-center">
              <Button
                color="danger"
                size="sm"
                variant="light"
                className="mx-auto mt-2"
                onPress={() => {
                  refetchAnalytics()
                }}>
                Try Again
              </Button>
            </Alert>
          </Card>
        ) : chartData && chartData.length > 0 ? (
          <Card as="dl" className={analyticsVariants.base}>
            <section className="flex flex-col flex-nowrap">
              <div className="flex flex-col justify-between gap-y-2 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className={analyticsVariants.slots.title}>
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
                      className={analyticsVariants.slots.chip}>
                      15.3%
                    </Chip>
                  </div>
                  <div>
                    <Dropdown
                      classNames={{ content: 'min-w-[120px]' }}
                      placement="bottom-end">
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          className="w-auto rounded-full"
                          size="sm"
                          variant="light">
                          <Icon
                            height={16}
                            icon="lucide:more-vertical"
                            width={16}
                          />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        itemClasses={{ title: 'text-tiny' }}
                        variant="flat">
                        <DropdownItem key="view-details">
                          View Details
                        </DropdownItem>
                        <DropdownItem key="export-data">
                          Export Data
                        </DropdownItem>
                        <DropdownItem key="set-alert">Set Alert</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <Spacer y={2} />
                <Tabs
                  aria-label="Timeframe options"
                  selectedKey={activeTimeframe}
                  onSelectionChange={key =>
                    setActiveTimeframe(String(key) as any)
                  }
                  size="sm">
                  {timeframeOptions.map(option => (
                    <Tab key={option.key} title={option.title} />
                  ))}
                </Tabs>
                <Spacer y={2} />
                <Tabs
                  aria-label="View options"
                  selectedKey={activeView}
                  onSelectionChange={key => setActiveView(String(key) as any)}
                  size="sm">
                  {viewOptions.map(option => (
                    <Tab key={option.key} title={option.title} />
                  ))}
                </Tabs>
              </div>
              <div>
                <ResponsiveContainer
                  className={analyticsVariants.slots.chartContainer}
                  height={300}
                  width="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient
                        id="colorSales"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1">
                        <stop
                          offset="10%"
                          stopColor="#0070F3"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="100%"
                          stopColor="#0070F3"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorPurchases"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1">
                        <stop
                          offset="10%"
                          stopColor="#F31260"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="100%"
                          stopColor="#F31260"
                          stopOpacity={0}
                        />
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
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const salesVal =
                            payload.find(p => p.dataKey === 'sales')?.value ??
                            payload[0].value
                          const purchasesVal =
                            payload.find(p => p.dataKey === 'purchases')
                              ?.value ?? payload[1]?.value
                          return (
                            <div className="rounded-md bg-black px-3 py-2 text-white shadow-md">
                              <div className="text-sm font-medium">
                                Sales: ${Number(salesVal).toLocaleString()}
                              </div>
                              <div className="text-sm font-medium">
                                Purchases: $
                                {Number(purchasesVal).toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-300">
                                {label}
                              </div>
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
                    <Legend
                      content={() => <CustomLegend />}
                      verticalAlign="bottom"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
          </Card>
        ) : (
          <Card as="dl" className={analyticsVariants.base}>
            <div className="text-default-500 flex items-center justify-center p-6 text-sm">
              No analytics data available
            </div>
          </Card>
        )}
      </div>

      {/* SalesFlow Section */}
      <div className="mt-6">
        {isSalesLoading ? (
          <Card className={salesFlowVariants.base}>
            <div className="flex h-100 items-center justify-center">
              <Spinner size="lg" />
            </div>
          </Card>
        ) : isSalesError ? (
          <Card className={salesFlowVariants.base}>
            <Alert
              variant="faded"
              color="default"
              title="Failed to load sales stats"
              hideIcon
              className="mt-6 flex h-100 flex-col items-center justify-center">
              <Button
                color="danger"
                size="sm"
                variant="light"
                className="mx-auto mt-2"
                onPress={() => {
                  refetchSales()
                }}>
                Try Again
              </Button>
            </Alert>
          </Card>
        ) : currentSalesData ? (
          <Card className={salesFlowVariants.base}>
            <div className="flex flex-col p-4 pb-0">
              <div className="mb-6 flex items-center justify-between">
                <h2 className={salesFlowVariants.slots.title}>
                  {salesApiData?.title || 'Sales Performance'}
                </h2>
                <div className="flex items-center gap-x-2">
                  <Select
                    aria-label="Time Range"
                    selectedKeys={[selectedTimeRange]}
                    onSelectionChange={handleTimeRangeChange}
                    classNames={{
                      trigger: salesFlowVariants.slots.selectTrigger,
                      value: salesFlowVariants.slots.selectValue
                    }}>
                    {Object.entries(timeRangeLabels).map(([key, label]) => (
                      <SelectItem key={key}>{label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              {currentSalesData.kpiStats &&
              currentSalesData.kpiStats.length > 0 ? (
                <div className="mb-6 grid w-full grid-cols-1 gap-8 sm:grid-cols-3">
                  {currentSalesData.kpiStats.map((stat, index) => (
                    <div key={index} className="mx-auto flex flex-col">
                      <div className="flex items-center gap-3">
                        <h3 className={salesFlowVariants.slots.statValue}>
                          {stat.value}
                        </h3>
                        <div
                          className={cn(
                            'flex items-center text-sm font-medium',
                            stat.changeType === 'positive'
                              ? 'text-success'
                              : stat.changeType === 'negative'
                                ? 'text-danger'
                                : 'text-warning'
                          )}>
                          <Icon
                            icon={
                              stat.changeType === 'positive'
                                ? 'lucide:trending-up'
                                : stat.changeType === 'negative'
                                  ? 'lucide:trending-down'
                                  : 'lucide:minus'
                            }
                            className="mr-1"
                            width={16}
                            height={16}
                          />
                          {stat.change}
                        </div>
                      </div>
                      <span className={salesFlowVariants.slots.statTitle}>
                        {stat.title}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-default-500 mb-6 text-sm">
                  No KPI stats available
                </div>
              )}
            </div>

            <div className={salesFlowVariants.slots.chartContainer}>
              {currentSalesData.chartData &&
              currentSalesData.chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={currentSalesData.chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#71717a', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#71717a', fontSize: 12 }}
                      domain={[0, 'dataMax + 10']}
                    />
                    <Tooltip
                      cursor={false}
                      content={({ active, payload, label }) =>
                        active && payload && payload.length ? (
                          <div className="bg-background rounded-medium border-default-200 border p-3 shadow-md">
                            <p className="text-default-700 mb-1 font-medium">
                              Day {label}
                            </p>
                            <p className="text-primary font-semibold">
                              {payload[0].value} sales
                            </p>
                          </div>
                        ) : null
                      }
                    />
                    <Bar
                      dataKey="value"
                      fill="hsl(var(--heroui-primary-500))"
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                      animationDuration={800}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-default-500 flex items-center justify-center p-6 text-sm">
                  No sales chart data available
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Card className={salesFlowVariants.base}>
            <div className="text-default-500 flex items-center justify-center p-6 text-sm">
              No sales data available
            </div>
          </Card>
        )}
      </div>

      {/* Income Section */}
      <div className="mt-6">
        {isIncomeLoading ? (
          <Card className={incomeVariants.base}>
            <div className="flex h-100 items-center justify-center">
              <Spinner size="lg" />
            </div>
          </Card>
        ) : isIncomeError ? (
          <Card className={incomeVariants.base}>
            <Alert
              variant="faded"
              color="default"
              title="Failed to load Income stats"
              hideIcon
              className="mt-6 flex h-100 flex-col items-center justify-center">
              <Button
                color="danger"
                size="sm"
                variant="light"
                className="mx-auto mt-2"
                onPress={() => {
                  refetchIncome()
                }}>
                Try Again
              </Button>
            </Alert>
          </Card>
        ) : financialRows && financialRows.length > 0 ? (
          <Card className={incomeVariants.base}>
            <div className="mb-8 flex items-center justify-between">
              <h1 className={incomeVariants.slots.title}>Income Statement</h1>
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={handleDownload}
                  aria-label="Download">
                  <Icon
                    icon="lucide:download"
                    className={incomeVariants.slots.iconButton}
                  />
                </Button>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      aria-label="More options">
                      <Icon
                        icon="lucide:more-vertical"
                        className={incomeVariants.slots.iconButton}
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Actions">
                    <DropdownItem key="share" onPress={handleShare}>
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:share-2" />
                        <span>Share</span>
                      </div>
                    </DropdownItem>
                    <DropdownItem key="print" onPress={handlePrint}>
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:printer" />
                        <span>Print</span>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <div className="space-y-4">
              {financialRows.map(row => (
                <div
                  className={
                    row.divider ? 'border-default-200 border-t pt-4' : ''
                  }>
                  <FinancialRow {...row} />
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card className={incomeVariants.base}>
            <div className="text-default-500 flex items-center justify-center p-6 text-sm">
              No income data available
            </div>
          </Card>
        )}
      </div>

      {/* CashFlow Section */}
      <div className="mt-6">
        {isCashflowLoading ? (
          <Card className={cashFlowVariants.base}>
            <div className="flex h-100 items-center justify-center p-10">
              <Spinner size="lg" />
            </div>
          </Card>
        ) : isCashflowError ? (
          <Card className={cashFlowVariants.base}>
            <Alert
              variant="faded"
              color="default"
              title="Failed to load cashflow"
              hideIcon
              className="mt-6 flex h-100 flex-col items-center justify-center">
              <Button
                color="danger"
                size="sm"
                variant="light"
                className="mx-auto mt-2"
                onPress={() => {
                  refetchCash()
                }}>
                Try Again
              </Button>
            </Alert>
          </Card>
        ) : yearData && yearData.length > 0 ? (
          <Card className={cashFlowVariants.base}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className={cashFlowVariants.slots.title}>
                Cash at the end of the month
              </h2>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    className={cashFlowVariants.slots.yearSelector}
                    endContent={
                      <Icon icon="lucide:chevron-down" width={16} height={16} />
                    }>
                    {selectedYear}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Select Year"
                  selectedKeys={selectedYear ? [String(selectedYear)] : []}
                  onAction={key => setSelectedYear(Number(key))}>
                  {availableYears.map(year => (
                    <DropdownItem key={String(year)}>{year}</DropdownItem>
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
                  content={({ active, payload }) =>
                    active && payload && payload.length ? (
                      <div className="bg-foreground text-background rounded-medium p-2 shadow-sm">
                        <p className="text-lg font-bold">
                          {formatCurrency(payload[0].value as number)}
                        </p>
                      </div>
                    ) : null
                  }
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
        ) : (
          <Card className={cashFlowVariants.base}>
            <div className="text-default-500 flex items-center justify-center p-6 text-sm">
              No cashflow data available
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
