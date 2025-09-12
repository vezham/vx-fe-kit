import { CardData, ChartData, SalesData, YearlyData } from './types'

// Card data
export const cardData: CardData[] = [
  {
    title: 'Total Sales',
    value: '$15,400',
    change: '0.0%',
    changeType: 'neutral',
    trendChipPosition: 'top',
    iconName: 'solar:wallet-money-outline'
  },
  {
    title: 'Net Profit',
    value: '$10,400',
    change: '3.3%',
    changeType: 'negative',
    trendChipPosition: 'top',
    iconName: 'solar:hand-money-linear'
  }
]

// Analytics chart data
export const fullChartData: ChartData[] = [
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

// SalesFlow data
export const salesData: SalesData = {
  title: 'Sales Performance',
  timeRanges: {
    'last-2-weeks': {
      kpiStats: [
        {
          title: 'Weekly Sales',
          value: '$28,441',
          change: '3.3%',
          changeType: 'positive'
        },
        {
          title: 'Daily Sales',
          value: '$4,063',
          change: '3.3%',
          changeType: 'positive'
        },
        {
          title: 'Total Sales',
          value: '278',
          change: '3.3%',
          changeType: 'positive'
        }
      ],
      chartData: [
        { day: '01', value: 62 },
        { day: '02', value: 52 },
        { day: '03', value: 41 },
        { day: '04', value: 75 },
        { day: '05', value: 48 },
        { day: '06', value: 22 },
        { day: '07', value: 63 },
        { day: '08', value: 33 },
        { day: '09', value: 35 },
        { day: '10', value: 42 },
        { day: '11', value: 12 },
        { day: '12', value: 64 },
        { day: '13', value: 54 },
        { day: '14', value: 45 }
      ]
    },
    'last-month': {
      kpiStats: [
        {
          title: 'Monthly Sales',
          value: '$112,874',
          change: '5.2%',
          changeType: 'positive'
        },
        {
          title: 'Daily Sales',
          value: '$3,762',
          change: '2.1%',
          changeType: 'positive'
        },
        {
          title: 'Total Sales',
          value: '1,245',
          change: '4.7%',
          changeType: 'positive'
        }
      ],
      chartData: [
        { day: '01', value: 58 },
        { day: '05', value: 62 },
        { day: '10', value: 45 },
        { day: '15', value: 78 },
        { day: '20', value: 56 },
        { day: '25', value: 67 },
        { day: '30', value: 72 }
      ]
    },
    'last-quarter': {
      kpiStats: [
        {
          title: 'Quarterly Sales',
          value: '$342,128',
          change: '8.7%',
          changeType: 'positive'
        },
        {
          title: 'Monthly Sales',
          value: '$114,043',
          change: '1.2%',
          changeType: 'negative'
        },
        {
          title: 'Total Sales',
          value: '3,842',
          change: '6.5%',
          changeType: 'positive'
        }
      ],
      chartData: [
        { day: 'Jan', value: 85 },
        { day: 'Feb', value: 72 },
        { day: 'Mar', value: 93 },
        { day: 'Apr', value: 97 }
      ]
    }
  }
}

//Income

export const financialRows = [
  {
    label: 'Total Income',
    amount: '4,719.00',
    percentage: '100%',
    percentageColor: 'text-default-400',
    icons: 'lucide:dollar-sign'
  },
  {
    label: 'Cost of Goods Sold',
    amount: '1,663.00',
    percentage: '-35%',
    percentageColor: 'text-default-400',
    icons: 'lucide:dollar-sign'
  },
  {
    label: 'Gross Profit',
    amount: '3,056.00',
    percentage: '65%',
    percentageColor: 'text-default-400',
    icons: 'lucide:dollar-sign',
    isBold: true,
    divider: true
  },
  {
    label: 'Total Operating Cost',
    amount: '1,607.00',
    percentage: '-34%',
    percentageColor: 'text-default-400',
    icons: 'lucide:dollar-sign'
  },
  {
    label: 'Operating Profit (EBIT)',
    amount: '1,499.00',
    percentage: '-31%',
    percentageColor: 'text-default-400',
    icons: 'lucide:dollar-sign',
    isBold: true
  },
  {
    label: 'Taxes',
    amount: '820.00',
    percentage: '-17%',
    percentageColor: 'text-default-400',
    icons: 'lucide:dollar-sign'
  },
  {
    label: 'Net Profit',
    amount: '629.00',
    percentage: '13%',
    percentageColor: 'text-default-400',
    icons: 'lucide:dollar-sign',
    isBold: true,
    divider: true
  }
]

// CashFlow data
export const cashFlowData: YearlyData[] = [
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

// Utility functions
export function aggregateData(data: ChartData[], view: string) {
  switch (view) {
    case 'day':
      return data.flatMap(monthData =>
        Array.from({ length: 30 }, (_, i) => ({
          date: `${monthData.month}-${i + 1}`,
          sales: Math.round(monthData.sales / 30 + Math.random() * 2000),
          purchases: Math.round(monthData.purchases / 30 + Math.random() * 1500)
        }))
      )
    case 'week':
      return data.flatMap(monthData =>
        Array.from({ length: 4 }, (_, i) => ({
          date: `${monthData.month}-W${i + 1}`,
          sales: Math.round(monthData.sales / 4 + Math.random() * 4000),
          purchases: Math.round(monthData.purchases / 4 + Math.random() * 2500)
        }))
      )
    case 'month':
      return data.map(m => ({
        date: m.month,
        sales: m.sales,
        purchases: m.purchases
      }))
    case 'year':
    default: {
      const totalSales = data.reduce((sum, d) => sum + d.sales, 0)
      const totalPurchases = data.reduce((sum, d) => sum + d.purchases, 0)
      return [{ date: '2024', sales: totalSales, purchases: totalPurchases }]
    }
  }
}

export const formatMonth = (month: string) => {
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

export const formatCurrency = (value: number) => {
  return `$${value}`
}
