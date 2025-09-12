import { cn } from '@heroui/react'
import { Icon } from '@iconify/react'
import { FinancialRowProps } from './types'

export const cardVariants = {
  base: 'border-default-200 dark:border-default-100 border shadow-none',
  slots: {
    iconContainer: (changeType: string) =>
      cn('mt-1 flex h-8 w-8 items-center justify-center rounded-md', {
        'bg-success-50': changeType === 'positive',
        'bg-warning-50': changeType === 'neutral',
        'bg-danger-50': changeType === 'negative'
      }),
    icon: (changeType: string, iconName: string) => {
      if (changeType === 'positive') {
        return <Icon className="text-success" icon={iconName} width={20} />
      } else if (changeType === 'neutral') {
        return <Icon className="text-warning" icon={iconName} width={20} />
      } else {
        return <Icon className="text-danger" icon={iconName} width={20} />
      }
    },
    title: 'text-small text-default-500 mx-4 font-medium',
    value: 'text-default-700 px-4 text-2xl font-semibold',
    chipPosition: (position: string) =>
      cn('absolute right-4', {
        'top-4': position === 'top',
        'bottom-4': position === 'bottom'
      }),
    chipContent: 'font-semibold text-[0.65rem]',
    chipIcon: (changeType: string) => {
      if (changeType === 'positive') {
        return (
          <Icon height={12} icon={'solar:arrow-right-up-linear'} width={12} />
        )
      } else if (changeType === 'neutral') {
        return <Icon height={12} icon={'solar:arrow-right-linear'} width={12} />
      } else {
        return (
          <Icon height={12} icon={'solar:arrow-right-down-linear'} width={12} />
        )
      }
    },
    viewAllButton:
      'text-default-500 flex justify-start text-xs data-pressed:scale-100'
  },
  variants: {
    color: {
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger'
    }
  }
}

// Analytics variants
export const analyticsVariants = {
  base: 'border-default-200  mt-4 border shadow-none',
  slots: {
    title: 'text-medium text-foreground font-medium',
    chip: 'bg-success-100 text-success-600 font-medium',
    chartContainer: 'min-h-[300px] [&_.recharts-surface]:outline-hidden'
  }
}

// SalesFlow variants
export const salesFlowVariants = {
  base: 'border-default-200 mt-4 border shadow-none',
  slots: {
    title: 'text-default-900 text-xl font-semibold',
    selectTrigger: 'min-w-[150px] bg-gray-50 border-none',
    selectValue: 'text-default-700',
    statValue: 'text-default-900 text-3xl font-semibold',
    statTitle: 'text-default-500 text-sm',
    chartContainer: 'h-[300px] w-full px-4'
  }
}

// Income variants
export const incomeVariants = {
  base: 'border-default-200 mt-4 border p-6 shadow-none',
  slots: {
    title: 'text-2xl font-bold',
    iconButton: 'text-default-500',
    financialRow: (noMargin: boolean) =>
      cn('flex items-center justify-between', { 'mb-4': !noMargin }),
    label: (isBold: boolean) =>
      cn(isBold ? 'text-lg font-bold' : 'text-default-700'),
    amountContainer: 'flex items-center gap-4',
    iconWrapper: 'flex items-center text-lg',
    amount: (isBold: boolean) =>
      cn(isBold ? 'text-lg font-bold' : 'text-right'),
    percentage: (percentageColor: string) =>
      cn(percentageColor, 'w-12 text-right')
  }
}

// CashFlow variants
export const cashFlowVariants = {
  base: 'border-default-200 relative mt-4 w-full border p-6 shadow-none',
  slots: {
    title: 'text-foreground text-2xl font-bold',
    yearSelector: 'bg-default-100 min-w-[100px]'
  }
}

// Financial row component
export const FinancialRow = ({
  label,
  amount,
  percentage,
  icons,
  percentageColor,
  isBold = false,
  noMargin = false
}: FinancialRowProps) => {
  return (
    <div className={incomeVariants.slots.financialRow(noMargin)}>
      <span className={incomeVariants.slots.label(isBold)}>{label}</span>
      <div className={incomeVariants.slots.amountContainer}>
        <div className={incomeVariants.slots.iconWrapper}>
          <Icon icon={icons as string} />
          <span className={incomeVariants.slots.amount(isBold)}>{amount}</span>
        </div>
        <div>
          <span className={incomeVariants.slots.percentage(percentageColor)}>
            {percentage}
          </span>
        </div>
      </div>
    </div>
  )
}

// Custom legend component for charts
export const CustomLegend = () => {
  const legendVariants = {
    base: 'mt-2 flex items-center justify-center gap-4 sm:gap-8',
    item: 'flex items-center gap-2',
    income: 'h-3 w-3 rounded-full bg-blue-500',
    incomeLabel: 'text-tiny text-gray-600',
    expenses: 'h-3 w-3 rounded-full bg-pink-600',
    expensesLabel: 'text-tiny text-gray-600'
  }
  return (
    <div className={legendVariants.base}>
      <div className={legendVariants.item}>
        <div className={legendVariants.income}></div>
        <span className={legendVariants.incomeLabel}>Income / Sales</span>
      </div>
      <div className={legendVariants.item}>
        <div className={legendVariants.expenses}></div>
        <span className={legendVariants.expensesLabel}>
          Expenses / Purchases
        </span>
      </div>
    </div>
  )
}
