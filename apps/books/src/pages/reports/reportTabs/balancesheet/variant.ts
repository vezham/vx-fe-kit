import { tv } from 'tailwind-variants'
import { FinancialData, RowVariantProps } from './types'

export const rowVariants = tv({
  slots: {
    base: 'border-b border-gray-200',
    accountCell: 'px-4',
    valueCell: 'text-right', // default, no color
    changeCell: 'text-right'
  },
  variants: {
    isHeader: {
      true: {
        base: 'bg-default-100 border-t border-b border-gray-200 font-semibold uppercase'
      }
    },
    isTotal: {
      true: { base: 'border-t border-b border-gray-200 font-semibold' }
    },
    isTotalEquity: {
      true: {
        base: 'bg-default-100 border-t border-b border-gray-200 font-bold'
      }
    },
    isAccount: { true: { accountCell: 'pr-4 pl-8' } },
    isPositive: {
      true: { valueCell: 'text-green-600', changeCell: 'text-green-600' }
    },
    isNegative: {
      true: { valueCell: 'text-red-600', changeCell: 'text-red-600' }
    }
  }
})

export const getRowVariantProps = (item: FinancialData): RowVariantProps => {
  const isTotalEquity = !!item.isTotalEquity

  // Only color Current Period for TOTAL LIABILITIES & EQUITY
  const isPositive =
    isTotalEquity && item.currentPeriod != null && item.previousPeriod != null
      ? item.currentPeriod > item.previousPeriod
      : false

  const isNegative =
    isTotalEquity && item.currentPeriod != null && item.previousPeriod != null
      ? item.currentPeriod < item.previousPeriod
      : false

  return {
    isHeader: !!item.isHeader,
    isTotal: !!item.isTotal,
    isTotalEquity,
    isAccount: !item.isHeader && !item.isTotal && !item.isTotalEquity,
    isPositive,
    isNegative
  }
}
