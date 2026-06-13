import { RecentActivityTable } from '../widgets/recent-activity-table'

export function TransactionsPage() {
  return (
    <div className="bg-background mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-6 px-4 pt-4 pb-10 sm:px-6 lg:px-8">
      <RecentActivityTable showControls title="All transactions" />
    </div>
  )
}
