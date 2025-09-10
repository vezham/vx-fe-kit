import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@heroui/react'
import { Icon } from '@iconify/react'

const IncomeStatementCard = () => {
  const handleDownload = () => {
    console.log('Download statement')
  }

  const handleShare = () => {
    console.log('Share statement')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <Card className="border-default-200 mt-4 border p-6 shadow-none">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Income Statement</h1>
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={handleDownload}
            aria-label="Download">
            <Icon icon="lucide:download" className="text-default-500" />
          </Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                aria-label="More options">
                <Icon
                  icon="lucide:more-vertical"
                  className="text-default-500"
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions">
              <DropdownItem key="share" onPress={handleShare}>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:share-2" />
                  <span>Share</span>
                </div>
              </DropdownItem>
              <DropdownItem key="print" onPress={handlePrint}>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:printer" />
                  <span>Print</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="space-y-4">
        <FinancialRow
          label="Total Income"
          amount="$4,719.00"
          percentage="100%"
          percentageColor="text-default-400"
        />

        <FinancialRow
          label="Cost of Goods Sold"
          amount="$(1,663.00)"
          percentage="-35%"
          percentageColor="text-default-400"
        />

        <div className="border-default-200 border-t pt-4">
          <FinancialRow
            label="Gross Profit"
            amount="$3,056.00"
            percentage="65%"
            percentageColor="text-default-400"
            isBold
          />
        </div>

        <FinancialRow
          label="Total Operating Cost"
          amount="$1,607.00"
          percentage="-34%"
          percentageColor="text-default-400"
        />

        <FinancialRow
          label="Operating Profit (EBIT)"
          amount="$1,499.00"
          percentage="-31%"
          percentageColor="text-default-400"
          isBold
        />

        <FinancialRow
          label="Taxes"
          amount="(820.00)"
          percentage="-17%"
          percentageColor="text-default-400"
        />

        <div className="border-default-200 border-t pt-4">
          <FinancialRow
            label="Net Profit"
            icon={
              <div className="border-default-300 mr-2 flex h-6 w-6 items-center justify-center rounded-md border">
                <Icon icon="lucide:dollar-sign" size={16} />
              </div>
            }
            amount="$629.00"
            percentage="13%"
            percentageColor="text-default-400"
            isBold
          />
        </div>
      </div>
    </Card>
  )
}

interface FinancialRowProps {
  label: string
  amount: string
  percentage: string
  percentageColor: string
  isBold?: boolean
  noMargin?: boolean
}

const FinancialRow = ({
  label,
  amount,
  percentage,
  percentageColor,
  isBold = false,
  noMargin = false
}: FinancialRowProps) => {
  return (
    <div
      className={`flex items-center justify-between ${noMargin ? '' : 'mb-4'}`}>
      <span className={isBold ? 'text-lg font-bold' : 'text-default-700'}>
        {label}
      </span>
      <div className="flex items-center gap-4">
        <span className={isBold ? 'text-lg font-bold' : 'text-right'}>
          {amount}
        </span>
        <span className={`${percentageColor} w-12 text-right`}>
          {percentage}
        </span>
      </div>
    </div>
  )
}

export default IncomeStatementCard
