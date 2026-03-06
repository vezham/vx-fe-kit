import { FinancialData, ProfitLossPeriod } from './types'

type periodProps = {
  label: string
}

export const getPeriodProps: Record<ProfitLossPeriod, periodProps> = {
  weekly: {
    label: 'Weekly'
  },
  monthly: {
    label: 'Monthly'
  },
  quarterly: {
    label: 'Quarterly'
  },
  yearly: {
    label: 'Yearly'
  }
}

export const weeklyData: FinancialData[] = [
  { category: 'REVENUE', isHeader: true },
  {
    category: 'Sales Revenue',
    currentPeriod: 82000,
    previousPeriod: 71250,
    change: 10750,
    percentChange: 15.1
  },
  {
    category: 'Service Revenue',
    currentPeriod: 11250,
    previousPeriod: 9500,
    change: 1750,
    percentChange: 18.4
  },
  {
    category: 'Other Revenue',
    currentPeriod: 3000,
    previousPeriod: 3750,
    change: -750,
    percentChange: -20.0
  },
  {
    category: 'Total Revenue',
    isTotal: true,
    currentPeriod: 96250,
    previousPeriod: 84500,
    change: 11750,
    percentChange: 13.9
  },
  { category: 'EXPENSES', isHeader: true },
  {
    category: 'Cost of Goods Sold',
    currentPeriod: 41250,
    previousPeriod: 35500,
    change: 5750,
    percentChange: 16.2
  },
  {
    category: 'Operating Expenses',
    currentPeriod: 11250,
    previousPeriod: 9500,
    change: 1750,
    percentChange: 18.4
  },
  {
    category: 'Administrative Expenses',
    currentPeriod: 18250,
    previousPeriod: 17000,
    change: 1250,
    percentChange: 7.4
  },
  {
    category: 'Marketing Expenses',
    currentPeriod: 7000,
    previousPeriod: 6250,
    change: 750,
    percentChange: 12.0
  },
  {
    category: 'Total Expenses',
    isTotal: true,
    currentPeriod: 77750,
    previousPeriod: 68250,
    change: 9500,
    percentChange: 13.9
  },
  {
    category: 'NET INCOME',
    isNetIncome: true,
    currentPeriod: 18500,
    previousPeriod: 16250,
    change: 2250,
    percentChange: 13.8
  }
]

// Monthly data (default)
export const monthlyData: FinancialData[] = [
  { category: 'REVENUE', isHeader: true },
  {
    category: 'Sales Revenue',
    currentPeriod: 328000,
    previousPeriod: 285000,
    change: 43000,
    percentChange: 15.1
  },
  {
    category: 'Service Revenue',
    currentPeriod: 45000,
    previousPeriod: 38000,
    change: 7000,
    percentChange: 18.4
  },
  {
    category: 'Other Revenue',
    currentPeriod: 12000,
    previousPeriod: 15000,
    change: -3000,
    percentChange: -20.0
  },
  {
    category: 'Total Revenue',
    isTotal: true,
    currentPeriod: 385000,
    previousPeriod: 338000,
    change: 47000,
    percentChange: 15.2
  },
  { category: 'EXPENSES', isHeader: true },
  {
    category: 'Cost of Goods Sold',
    currentPeriod: 165000,
    previousPeriod: 142000,
    change: 23000,
    percentChange: 16.2
  },
  {
    category: 'Operating Expenses',
    currentPeriod: 45000,
    previousPeriod: 38000,
    change: 7000,
    percentChange: 18.4
  },
  {
    category: 'Administrative Expenses',
    currentPeriod: 73000,
    previousPeriod: 68000,
    change: 5000,
    percentChange: 7.4
  },
  {
    category: 'Marketing Expenses',
    currentPeriod: 28000,
    previousPeriod: 25000,
    change: 3000,
    percentChange: 12.0
  },
  {
    category: 'Total Expenses',
    isTotal: true,
    currentPeriod: 311000,
    previousPeriod: 273000,
    change: 38000,
    percentChange: 13.8
  },
  {
    category: 'NET INCOME',
    isNetIncome: true,
    currentPeriod: 74000,
    previousPeriod: 64000,
    change: 10000,
    percentChange: 17.2
  }
]

// Quarterly data
export const quarterlyData: FinancialData[] = [
  { category: 'REVENUE', isHeader: true },
  {
    category: 'Sales Revenue',
    currentPeriod: 984000,
    previousPeriod: 855000,
    change: 129000,
    percentChange: 15.1
  },
  {
    category: 'Service Revenue',
    currentPeriod: 135000,
    previousPeriod: 114000,
    change: 21000,
    percentChange: 18.4
  },
  {
    category: 'Other Revenue',
    currentPeriod: 36000,
    previousPeriod: 45000,
    change: -9000,
    percentChange: -20.0
  },
  {
    category: 'Total Revenue',
    isTotal: true,
    currentPeriod: 1155000,
    previousPeriod: 1014000,
    change: 141000,
    percentChange: 13.9
  },
  { category: 'EXPENSES', isHeader: true },
  {
    category: 'Cost of Goods Sold',
    currentPeriod: 495000,
    previousPeriod: 426000,
    change: 69000,
    percentChange: 16.2
  },
  {
    category: 'Operating Expenses',
    currentPeriod: 135000,
    previousPeriod: 114000,
    change: 21000,
    percentChange: 18.4
  },
  {
    category: 'Administrative Expenses',
    currentPeriod: 219000,
    previousPeriod: 204000,
    change: 15000,
    percentChange: 7.4
  },
  {
    category: 'Marketing Expenses',
    currentPeriod: 84000,
    previousPeriod: 75000,
    change: 9000,
    percentChange: 12.0
  },
  {
    category: 'Total Expenses',
    isTotal: true,
    currentPeriod: 933000,
    previousPeriod: 819000,
    change: 114000,
    percentChange: 13.9
  },
  {
    category: 'NET INCOME',
    isNetIncome: true,
    currentPeriod: 222000,
    previousPeriod: 195000,
    change: 27000,
    percentChange: 13.8
  }
]

// Yearly data
export const yearlyData: FinancialData[] = [
  { category: 'REVENUE', isHeader: true },
  {
    category: 'Sales Revenue',
    currentPeriod: 3936000,
    previousPeriod: 3420000,
    change: 516000,
    percentChange: 15.1
  },
  {
    category: 'Service Revenue',
    currentPeriod: 540000,
    previousPeriod: 456000,
    change: 84000,
    percentChange: 18.4
  },
  {
    category: 'Other Revenue',
    currentPeriod: 144000,
    previousPeriod: 180000,
    change: -36000,
    percentChange: -20.0
  },
  {
    category: 'Total Revenue',
    isTotal: true,
    currentPeriod: 4620000,
    previousPeriod: 4056000,
    change: 564000,
    percentChange: 13.9
  },
  { category: 'EXPENSES', isHeader: true },
  {
    category: 'Cost of Goods Sold',
    currentPeriod: 1980000,
    previousPeriod: 1704000,
    change: 276000,
    percentChange: 16.2
  },
  {
    category: 'Operating Expenses',
    currentPeriod: 540000,
    previousPeriod: 456000,
    change: 84000,
    percentChange: 18.4
  },
  {
    category: 'Administrative Expenses',
    currentPeriod: 876000,
    previousPeriod: 816000,
    change: 60000,
    percentChange: 7.4
  },
  {
    category: 'Marketing Expenses',
    currentPeriod: 336000,
    previousPeriod: 300000,
    change: 36000,
    percentChange: 12.0
  },
  {
    category: 'Total Expenses',
    isTotal: true,
    currentPeriod: 3732000,
    previousPeriod: 3276000,
    change: 456000,
    percentChange: 13.9
  },
  {
    category: 'NET INCOME',
    isNetIncome: true,
    currentPeriod: 888000,
    previousPeriod: 780000,
    change: 108000,
    percentChange: 13.8
  }
]

export const mockDataByPeriod: Record<ProfitLossPeriod, FinancialData[]> = {
  weekly: weeklyData,
  monthly: monthlyData,
  quarterly: quarterlyData,
  yearly: yearlyData
}
