import { SpendingByCategoryCard } from '../widgets/spending-by-category-card'
import { SpendingSummaryCard } from '../widgets/spending-summary-card'
import { SpendingTransactionsList } from '../widgets/spending-transactions-list'

export function SpendingPage() {
  return (
    <div className="bg-background mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-6 px-4 pt-4 pb-10 sm:px-6 lg:px-8">
      <SpendingByCategoryCard />
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_320px]">
        <SpendingTransactionsList />
        <SpendingSummaryCard />
      </div>
    </div>
  )
}
