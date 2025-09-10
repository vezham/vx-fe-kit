import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React from 'react'
import Header from '../../../../components/header'
import End from '../../actionbar/endContent'
import Start from '../../actionbar/headContent'

// Define types for cash flow data
type CashFlowItem = {
  label: string
  value: number
}

type CashFlowSection = {
  title: string
  items: CashFlowItem[]
  total: number
}

type CashFlowSummary = {
  beginningCash: number
  netCashChange: number
  endingCash: number
}

type CashFlowData = {
  operating: CashFlowSection
  investing: CashFlowSection
  financing: CashFlowSection
  summary: CashFlowSummary
}

// Sample data for different time periods
const cashFlowData: Record<string, CashFlowData> = {
  Weekly: {
    operating: {
      title: 'Operating Activities',
      items: [
        { label: 'Net Income', value: 12500 },
        { label: 'Depreciation', value: 1200 },
        { label: 'Accounts Receivable', value: -1000 },
        { label: 'Accounts Payable', value: 800 }
      ],
      total: 13500
    },
    investing: {
      title: 'Investing Activities',
      items: [
        { label: 'Equipment Purchase', value: -2000 },
        { label: 'Asset Sale', value: 500 }
      ],
      total: -1500
    },
    financing: {
      title: 'Financing Activities',
      items: [
        { label: 'Loan Repayment', value: -800 },
        { label: 'Owner Distributions', value: -5000 }
      ],
      total: -5800
    },
    summary: {
      beginningCash: 15000,
      netCashChange: 6200,
      endingCash: 21200
    }
  },
  Monthly: {
    operating: {
      title: 'Operating Activities',
      items: [
        { label: 'Net Income', value: 97000 },
        { label: 'Depreciation', value: 5000 },
        { label: 'Accounts Receivable', value: -4000 },
        { label: 'Accounts Payable', value: 3000 }
      ],
      total: 101000
    },
    investing: {
      title: 'Investing Activities',
      items: [
        { label: 'Equipment Purchase', value: -8000 },
        { label: 'Asset Sale', value: 2000 }
      ],
      total: -6000
    },
    financing: {
      title: 'Financing Activities',
      items: [
        { label: 'Loan Repayment', value: -3000 },
        { label: 'Owner Distributions', value: -25000 }
      ],
      total: -28000
    },
    summary: {
      beginningCash: 45000,
      netCashChange: 67000,
      endingCash: 58000
    }
  },
  Quarterly: {
    operating: {
      title: 'Operating Activities',
      items: [
        { label: 'Net Income', value: 285000 },
        { label: 'Depreciation', value: 15000 },
        { label: 'Accounts Receivable', value: -12000 },
        { label: 'Accounts Payable', value: 9000 }
      ],
      total: 297000
    },
    investing: {
      title: 'Investing Activities',
      items: [
        { label: 'Equipment Purchase', value: -24000 },
        { label: 'Asset Sale', value: 6000 }
      ],
      total: -18000
    },
    financing: {
      title: 'Financing Activities',
      items: [
        { label: 'Loan Repayment', value: -9000 },
        { label: 'Owner Distributions', value: -75000 }
      ],
      total: -84000
    },
    summary: {
      beginningCash: 120000,
      netCashChange: 195000,
      endingCash: 315000
    }
  },
  Yearly: {
    operating: {
      title: 'Operating Activities',
      items: [
        { label: 'Net Income', value: 1150000 },
        { label: 'Depreciation', value: 60000 },
        { label: 'Accounts Receivable', value: -48000 },
        { label: 'Accounts Payable', value: 36000 }
      ],
      total: 1198000
    },
    investing: {
      title: 'Investing Activities',
      items: [
        { label: 'Equipment Purchase', value: -96000 },
        { label: 'Asset Sale', value: 24000 }
      ],
      total: -72000
    },
    financing: {
      title: 'Financing Activities',
      items: [
        { label: 'Loan Repayment', value: -36000 },
        { label: 'Owner Distributions', value: -300000 }
      ],
      total: -336000
    },
    summary: {
      beginningCash: 250000,
      netCashChange: 790000,
      endingCash: 1040000
    }
  }
}

// Format currency
const formatCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  return formatter.format(amount)
}

const CashFlowStatement: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('Monthly')
  const data = cashFlowData[selectedPeriod]

  return (
    <>
      <div className="pb-4">
        <Header
          startContent={<Start />}
          mainTitle={'Cash Flow'}
          mainDescription={'Comprehensive reports and analytics'}
          endContent={<End />}
        />
      </div>
      <div className="mb-4 flex flex-col justify-end gap-2 sm:flex-row">
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="md"
              className="bg-default-100 hover:bg-default-200 flex min-w-[140px] items-center justify-center gap-2 sm:w-auto"
              startContent={<Icon icon="lucide:calendar" width={20} />}>
              {selectedPeriod}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Date period options"
            selectionMode="single"
            selectedKeys={[selectedPeriod]}
            onSelectionChange={keys =>
              setSelectedPeriod(Array.from(keys)[0] as string)
            }>
            <DropdownItem key="Weekly">Weekly</DropdownItem>
            <DropdownItem key="Monthly">Monthly</DropdownItem>
            <DropdownItem key="Quarterly">Quarterly</DropdownItem>
            <DropdownItem key="Yearly">Yearly</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button
          size="md"
          variant="solid"
          color="primary"
          className="flex min-w-[160px] items-center justify-center gap-2 sm:w-auto"
          startContent={<Icon icon="solar:download-line-duotone" width={20} />}>
          Export / Download
        </Button>
      </div>

      <motion.div
        className="overflow-hidden rounded-lg bg-white shadow-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-medium text-gray-800">
            Cash Flow Statement
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 p-6 xl:grid-cols-3">
          {/* Operating Activities */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              {data.operating.title}
            </h3>
            <div className="space-y-2">
              {data.operating.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.label}</span>
                  <span
                    className={`font-medium ${item.value < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
              <div className="mt-4 border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">
                    Operating Cash Flow
                  </span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(data.operating.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Investing Activities */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              {data.investing.title}
            </h3>
            <div className="space-y-2">
              {data.investing.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.label}</span>
                  <span
                    className={`font-medium ${item.value < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
              <div className="mt-4 border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">
                    Investing Cash Flow
                  </span>
                  <span
                    className={`font-medium ${data.investing.total < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                    {formatCurrency(data.investing.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Financing Activities */}
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              {data.financing.title}
            </h3>
            <div className="space-y-2">
              {data.financing.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{item.label}</span>
                  <span
                    className={`font-medium ${item.value < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
              <div className="mt-4 border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">
                    Financing Cash Flow
                  </span>
                  <span
                    className={`font-medium ${data.financing.total < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                    {formatCurrency(data.financing.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="border-t border-gray-200 p-6">
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Beginning Cash</span>
              <span className="font-medium text-gray-800">
                {formatCurrency(data.summary.beginningCash)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Net Cash Change</span>
              <span
                className={`font-medium ${data.summary.netCashChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {formatCurrency(data.summary.netCashChange)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-800">Ending Cash</span>
              <span className="font-medium text-gray-800">
                {formatCurrency(data.summary.endingCash)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default CashFlowStatement
