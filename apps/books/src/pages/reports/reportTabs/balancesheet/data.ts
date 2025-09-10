import { FinancialData } from './types'

export const getFinancialData = (selectedPeriod: string): FinancialData[] => {
  // Weekly
  const weeklyData: FinancialData[] = [
    { category: 'ASSETS', isHeader: true },
    {
      category: 'Cash and Cash Equivalents',
      currentPeriod: 82000,
      previousPeriod: 71250,
      change: 10750,
      percentChange: 15.1
    },
    {
      category: 'Accounts Receivable',
      currentPeriod: 11250,
      previousPeriod: 9500,
      change: 1750,
      percentChange: 18.4
    },
    {
      category: 'Inventory',
      currentPeriod: 3000,
      previousPeriod: 3750,
      change: -750,
      percentChange: -20.0
    },
    {
      category: 'Property, Plant & Equipment',
      currentPeriod: 3000,
      previousPeriod: 3750,
      change: -750,
      percentChange: -20.0
    },
    {
      category: 'Total Assets',
      isTotal: true,
      currentPeriod: 96250,
      previousPeriod: 84500,
      change: 11750,
      percentChange: 13.9
    },
    { category: 'LIABILITIES', isHeader: true },
    {
      category: 'Accounts Payable',
      currentPeriod: 41250,
      previousPeriod: 35500,
      change: 5750,
      percentChange: 16.2
    },
    {
      category: 'Accrued Expenses',
      currentPeriod: 11250,
      previousPeriod: 9500,
      change: 1750,
      percentChange: 18.4
    },
    {
      category: 'Long-term Debt',
      currentPeriod: 18250,
      previousPeriod: 17000,
      change: 1250,
      percentChange: 7.4
    },
    {
      category: 'Total Liabilities',
      isTotal: true,
      currentPeriod: 77750,
      previousPeriod: 68250,
      change: 9500,
      percentChange: 13.9
    },
    { category: 'EQUITY', isHeader: true },
    {
      category: 'Retained Earnings',
      currentPeriod: 41250,
      previousPeriod: 35500,
      change: 5750,
      percentChange: 16.2
    },
    {
      category: 'Common Stock',
      currentPeriod: 11250,
      previousPeriod: 9500,
      change: 1750,
      percentChange: 18.4
    },
    {
      category: 'Total Equity',
      isTotal: true,
      currentPeriod: 77750,
      previousPeriod: 68250,
      change: 9500,
      percentChange: 13.9
    },
    {
      category: 'TOTAL LIABILITIES & EQUITY',
      isTotalEquity: true,
      currentPeriod: 18500,
      previousPeriod: 16250,
      change: 2250,
      percentChange: 13.8
    }
  ]

  // Monthly
  const monthlyData: FinancialData[] = [
    { category: 'ASSETS', isHeader: true },
    {
      category: 'Cash and Cash Equivalents',
      currentPeriod: 328000,
      previousPeriod: 285000,
      change: 43000,
      percentChange: 15.1
    },
    {
      category: 'Accounts Receivable',
      currentPeriod: 45000,
      previousPeriod: 38000,
      change: 7000,
      percentChange: 18.4
    },
    {
      category: 'Inventory',
      currentPeriod: 12000,
      previousPeriod: 15000,
      change: -3000,
      percentChange: -20.0
    },
    {
      category: 'Property,Plant & Equipment',
      currentPeriod: 12000,
      previousPeriod: 15000,
      change: -3000,
      percentChange: -20.0
    },
    {
      category: 'Total Assets',
      isTotal: true,
      currentPeriod: 385000,
      previousPeriod: 338000,
      change: 47000,
      percentChange: 15.2
    },
    { category: 'LIABILITIES', isHeader: true },
    {
      category: 'Accounts Payable',
      currentPeriod: 165000,
      previousPeriod: 142000,
      change: 23000,
      percentChange: 16.2
    },
    {
      category: 'Accrued Expenses',
      currentPeriod: 45000,
      previousPeriod: 38000,
      change: 7000,
      percentChange: 18.4
    },
    {
      category: 'Long-term Debt',
      currentPeriod: 73000,
      previousPeriod: 68000,
      change: 5000,
      percentChange: 7.4
    },
    {
      category: 'Total Liabilities',
      isTotal: true,
      currentPeriod: 311000,
      previousPeriod: 273000,
      change: 38000,
      percentChange: 13.8
    },
    { category: 'EQUITY', isHeader: true },
    {
      category: 'Retained Earnings',
      currentPeriod: 165000,
      previousPeriod: 142000,
      change: 23000,
      percentChange: 16.2
    },
    {
      category: 'Common Stock',
      currentPeriod: 45000,
      previousPeriod: 38000,
      change: 7000,
      percentChange: 18.4
    },
    {
      category: 'Total Equity',
      isTotal: true,
      currentPeriod: 385000,
      previousPeriod: 338000,
      change: 47000,
      percentChange: 15.2
    },
    {
      category: 'TOTAL LIABILITIES & EQUITY',
      isTotalEquity: true,
      currentPeriod: 74000,
      previousPeriod: 64000,
      change: 10000,
      percentChange: 17.2
    }
  ]

  // Quarterly
  const quarterlyData: FinancialData[] = [
    { category: 'ASSETS', isHeader: true },
    {
      category: 'Cash and Cash Equivalents',
      currentPeriod: 984000,
      previousPeriod: 855000,
      change: 129000,
      percentChange: 15.1
    },
    {
      category: 'Accounts Receivable',
      currentPeriod: 135000,
      previousPeriod: 114000,
      change: 21000,
      percentChange: 18.4
    },
    {
      category: 'Inventory',
      currentPeriod: 36000,
      previousPeriod: 45000,
      change: -9000,
      percentChange: -20.0
    },
    {
      category: 'Property, Plant & Equipment',
      currentPeriod: 36000,
      previousPeriod: 45000,
      change: -9000,
      percentChange: -20.0
    },
    {
      category: 'Total Assets',
      isTotal: true,
      currentPeriod: 1155000,
      previousPeriod: 1014000,
      change: 141000,
      percentChange: 13.9
    },
    { category: 'LIABILITIES', isHeader: true },
    {
      category: 'Accounts Payable',
      currentPeriod: 495000,
      previousPeriod: 426000,
      change: 69000,
      percentChange: 16.2
    },
    {
      category: 'Accrued Expenses',
      currentPeriod: 135000,
      previousPeriod: 114000,
      change: 21000,
      percentChange: 18.4
    },
    {
      category: 'Long-term Debt',
      currentPeriod: 219000,
      previousPeriod: 204000,
      change: 15000,
      percentChange: 7.4
    },
    {
      category: 'Total Liabilities',
      isTotal: true,
      currentPeriod: 933000,
      previousPeriod: 819000,
      change: 114000,
      percentChange: 13.9
    },
    { category: 'EQUITY', isHeader: true },
    {
      category: 'Retained Earnings',
      currentPeriod: 495000,
      previousPeriod: 426000,
      change: 69000,
      percentChange: 16.2
    },
    {
      category: 'Common Stock',
      currentPeriod: 135000,
      previousPeriod: 114000,
      change: 21000,
      percentChange: 18.4
    },
    {
      category: 'Total Equity',
      isTotal: true,
      currentPeriod: 933000,
      previousPeriod: 819000,
      change: 114000,
      percentChange: 13.9
    },
    {
      category: 'TOTAL LIABILITIES & EQUITY',
      isTotalEquity: true,
      currentPeriod: 222000,
      previousPeriod: 195000,
      change: 27000,
      percentChange: 13.8
    }
  ]

  // Yearly
  const yearlyData: FinancialData[] = [
    { category: 'ASSETS', isHeader: true },
    {
      category: 'Cash and Cash Equivalents',
      currentPeriod: 3936000,
      previousPeriod: 3420000,
      change: 516000,
      percentChange: 15.1
    },
    {
      category: 'Accounts Receivable',
      currentPeriod: 540000,
      previousPeriod: 456000,
      change: 84000,
      percentChange: 18.4
    },
    {
      category: 'Inventory',
      currentPeriod: 144000,
      previousPeriod: 180000,
      change: -36000,
      percentChange: -20.0
    },
    {
      category: 'Property, Plant & Equipment',
      currentPeriod: 144000,
      previousPeriod: 180000,
      change: -36000,
      percentChange: -20.0
    },
    {
      category: 'Total Assets',
      isTotal: true,
      currentPeriod: 4620000,
      previousPeriod: 4056000,
      change: 564000,
      percentChange: 13.9
    },
    { category: 'LIABILITIES', isHeader: true },
    {
      category: 'Accounts Payable ',
      currentPeriod: 1980000,
      previousPeriod: 1704000,
      change: 276000,
      percentChange: 16.2
    },
    {
      category: 'Accrued Expenses',
      currentPeriod: 540000,
      previousPeriod: 456000,
      change: 84000,
      percentChange: 18.4
    },
    {
      category: 'Long-term Debt',
      currentPeriod: 876000,
      previousPeriod: 816000,
      change: 60000,
      percentChange: 7.4
    },
    {
      category: 'Total Liabilities',
      isTotal: true,
      currentPeriod: 3732000,
      previousPeriod: 3276000,
      change: 456000,
      percentChange: 13.9
    },
    { category: 'EQUITY', isHeader: true },
    {
      category: 'Retained Earnings ',
      currentPeriod: 1980000,
      previousPeriod: 1704000,
      change: 276000,
      percentChange: 16.2
    },
    {
      category: 'Common Stock',
      currentPeriod: 540000,
      previousPeriod: 456000,
      change: 84000,
      percentChange: 18.4
    },
    {
      category: 'TOTAL LIABILITIES & EQUITY',
      isTotalLiability: true,
      isTotalEquity: true,
      currentPeriod: 888000,
      previousPeriod: 780000,
      change: 108000,
      percentChange: 13.8
    }
  ]

  switch (selectedPeriod) {
    case 'Weekly':
      return weeklyData
    case 'Quarterly':
      return quarterlyData
    case 'Yearly':
      return yearlyData
    default:
      return monthlyData
  }
}
