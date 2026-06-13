import { AllocationCard } from '../widgets/allocation-card'
import { HoldingsList } from '../widgets/holdings-list'
import { PortfolioChartCard } from '../widgets/portfolio-chart-card'

export function PortfolioPage() {
  return (
    <div className="bg-background mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-6 px-4 pt-4 pb-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        <PortfolioChartCard />
        <AllocationCard />
      </div>
      <HoldingsList footerLabel="Manage assets" />
    </div>
  )
}
