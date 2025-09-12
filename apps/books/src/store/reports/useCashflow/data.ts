import { CashFlowData, cashFlowPeriod } from './types'

type periodProps = { label: string }

export const getPeriodProps: Record<cashFlowPeriod, periodProps> = {
  weekly: { label: 'Weekly' },
  monthly: { label: 'Monthly' },
  quarterly: { label: 'Quarterly' },
  yearly: { label: 'Yearly' }
}

export const operatingData: Record<cashFlowPeriod, CashFlowData['operating']> =
  {
    weekly: {
      title: 'Operating Activities',
      items: [
        { label: 'Net Income', value: 12500 },
        { label: 'Depreciation', value: 1200 },
        { label: 'Accounts Receivable', value: -1000 },
        { label: 'Accounts Payable', value: 800 }
      ],
      total: 13500
    },
    monthly: {
      title: 'Operating Activities',
      items: [
        { label: 'Net Income', value: 97000 },
        { label: 'Depreciation', value: 5000 },
        { label: 'Accounts Receivable', value: -4000 },
        { label: 'Accounts Payable', value: 3000 }
      ],
      total: 101000
    },
    quarterly: {
      title: 'Operating Activities',
      items: [
        { label: 'Net Income', value: 285000 },
        { label: 'Depreciation', value: 15000 },
        { label: 'Accounts Receivable', value: -12000 },
        { label: 'Accounts Payable', value: 9000 }
      ],
      total: 297000
    },
    yearly: {
      title: 'Operating Activities',
      items: [
        { label: 'Net Income', value: 1150000 },
        { label: 'Depreciation', value: 60000 },
        { label: 'Accounts Receivable', value: -48000 },
        { label: 'Accounts Payable', value: 36000 }
      ],
      total: 1198000
    }
  }

export const investingData: Record<cashFlowPeriod, CashFlowData['investing']> =
  {
    weekly: {
      title: 'Investing Activities',
      items: [
        { label: 'Equipment Purchase', value: -2000 },
        { label: 'Asset Sale', value: 500 }
      ],
      total: -1500
    },
    monthly: {
      title: 'Investing Activities',
      items: [
        { label: 'Equipment Purchase', value: -8000 },
        { label: 'Asset Sale', value: 2000 }
      ],
      total: -6000
    },
    quarterly: {
      title: 'Investing Activities',
      items: [
        { label: 'Equipment Purchase', value: -24000 },
        { label: 'Asset Sale', value: 6000 }
      ],
      total: -18000
    },
    yearly: {
      title: 'Investing Activities',
      items: [
        { label: 'Equipment Purchase', value: -96000 },
        { label: 'Asset Sale', value: 24000 }
      ],
      total: -72000
    }
  }

export const financingData: Record<cashFlowPeriod, CashFlowData['financing']> =
  {
    weekly: {
      title: 'Financing Activities',
      items: [
        { label: 'Loan Repayment', value: -800 },
        { label: 'Owner Distributions', value: -5000 }
      ],
      total: -5800
    },
    monthly: {
      title: 'Financing Activities',
      items: [
        { label: 'Loan Repayment', value: -3000 },
        { label: 'Owner Distributions', value: -25000 }
      ],
      total: -28000
    },
    quarterly: {
      title: 'Financing Activities',
      items: [
        { label: 'Loan Repayment', value: -9000 },
        { label: 'Owner Distributions', value: -75000 }
      ],
      total: -84000
    },
    yearly: {
      title: 'Financing Activities',
      items: [
        { label: 'Loan Repayment', value: -36000 },
        { label: 'Owner Distributions', value: -300000 }
      ],
      total: -336000
    }
  }

export const summaryData: Record<cashFlowPeriod, CashFlowData['summary']> = {
  weekly: {
    beginningCash: 15000,
    netCashChange: 6200,
    endingCash: 21200
  },
  monthly: {
    beginningCash: 45000,
    netCashChange: 67000,
    endingCash: 58000
  },
  quarterly: {
    beginningCash: 120000,
    netCashChange: 195000,
    endingCash: 315000
  },
  yearly: {
    beginningCash: 250000,
    netCashChange: 790000,
    endingCash: 1040000
  }
}

/* ------------------ Utility ------------------ */
export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount)
