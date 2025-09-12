import { tv } from 'tailwind-variants'

export const cashFlowVariants = tv({
  slots: {
    container: 'overflow-hidden rounded-lg bg-white shadow-none',
    headerWrapper: 'flex items-center justify-between border-b py-2',
    title: 'text-xl font-medium text-gray-800',
    gridContainer: 'my-6 grid grid-cols-1 gap-8 xl:grid-cols-2',
    sectionTitle: 'mb-4 text-lg font-medium text-gray-800',
    itemWrapper: 'space-y-2',
    itemRow: 'flex justify-between',
    itemLabel: 'text-gray-600',
    itemValue: 'font-medium',
    totalLine: 'mt-4 border-t border-gray-200 pt-2',
    totalRow: 'flex justify-between',
    totalLabel: 'font-medium text-gray-800',
    totalValue: 'font-medium',
    cardContainer: 'border-default-200 h-[255px] border shadow-none',
    summaryRow: 'flex w-full justify-between',
    summaryLabel: 'font-medium text-gray-800',
    summaryValue: 'font-medium',
    netCashChangeValue: 'font-medium'
  },
  variants: {
    valueState: {
      positive: {
        itemValue: 'text-gray-800',
        totalValue: 'text-gray-800',
        summaryValue: 'text-gray-800',
        netCashChangeValue: 'text-green-600'
      },
      negative: {
        itemValue: 'text-gray-800',
        totalValue: 'text-gray-800',
        summaryValue: 'text-gray-800',
        netCashChangeValue: 'text-red-600'
      }
    }
  }
})
