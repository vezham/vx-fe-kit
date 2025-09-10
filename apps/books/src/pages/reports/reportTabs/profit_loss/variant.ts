/* eslint-disable @nx/enforce-module-boundaries */
import { tv } from 'tailwind-variants'
import { FinancialData, RowVariantProps } from './types'

export const rowVariants = tv({
  slots: {
    base: 'border-b border-gray-200',
    accountCell: 'px-4',
    valueCell: 'text-right',
    changeCell: 'text-right'
  },
  variants: {
    isHeader: {
      true: {
        base: 'bg-default-100 border-t border-b border-gray-200 font-semibold uppercase'
      }
    },
    isTotal: {
      true: {
        base: 'border-t border-b border-gray-200 font-semibold'
      }
    },
    isNetIncome: {
      true: {
        base: 'bg-default-100 border-t border-b border-gray-200 font-bold',
        valueCell: 'font-semibold',
        changeCell: 'font-semibold'
      }
    },
    isAccount: {
      true: {
        accountCell: 'pr-4 pl-8'
      }
    },
    isPositive: {
      true: {
        changeCell: 'text-green-600',
        valueCell: 'text-green-600'
      }
    },
    isNegative: {
      true: {
        changeCell: 'text-red-600',
        valueCell: 'text-red-600'
      }
    }
  },
  compoundVariants: [
    {
      isHeader: true,
      isTotal: true,
      className: 'bg-default-100 font-semibold uppercase'
    },
    { isTotal: true, isNetIncome: true, className: 'bg-default-100 font-bold' },
    {
      isHeader: true,
      isNetIncome: true,
      className: 'bg-default-100 font-bold uppercase'
    }
  ],
  defaultVariants: {
    isHeader: false,
    isTotal: false,
    isNetIncome: false,
    isAccount: false
  }
})

// **Helper to automatically compute positive/negative for a row**
export const getRowVariantProps = (item: FinancialData): RowVariantProps => {
  const isNetIncome = !!item.isNetIncome
  const isPositive = isNetIncome
    ? (item.currentPeriod ?? 0) > (item.previousPeriod ?? 0)
    : (item.change ?? 0) > 0
  const isNegative = isNetIncome
    ? (item.currentPeriod ?? 0) < (item.previousPeriod ?? 0)
    : (item.change ?? 0) < 0

  return {
    isHeader: !!item.isHeader,
    isTotal: !!item.isTotal,
    isNetIncome,
    isAccount: !item.isHeader && !item.isTotal && !item.isNetIncome,
    isPositive,
    isNegative
  }
}
