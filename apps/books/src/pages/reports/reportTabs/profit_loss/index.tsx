import { Icon } from '@iconify/react'
import React from 'react'

import {
  Alert,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@vezham/react/v2'

import Header from '../../../../components/header'
import { useProfitLoss } from '../../../../store/reports/useProfitLoss'
import { getPeriodProps } from '../../../../store/reports/useProfitLoss/data'
import End from '../../actionbar/endContent'
import Start from '../../actionbar/headContent'
import { usePermit } from '../../utils'
import { FinancialData, ProfitLossPeriod } from './types'
import { rowVariants } from './variant'

const FinancialReport: React.FC<object> = () => {
  const [selectedPeriod, setSelectedPeriod] =
    React.useState<ProfitLossPeriod>('monthly')

  const {
    data: plData = [],
    isLoading,
    isError,
    refetch
  } = useProfitLoss.list({
    period: selectedPeriod
  })

  const { readOnly: canGet } = usePermit('profit_loss', 'get')

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`
  }

  const formatChange = (value: number) => {
    return value >= 0 ? `+${formatCurrency(value)}` : formatCurrency(value)
  }

  const formatPercentChange = (value: number) => {
    return value >= 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`
  }

  return (
    <>
      <div className="pb-4">
        <Header
          startContent={<Start />}
          mainTitle="Profit & Loss"
          mainDescription="View comprehensive reports and analytics"
          endContent={<End />}
        />
      </div>

      {/* Period Selector + Export Button */}
      <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:justify-end">
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="md"
              className="bg-default-100 hover:bg-default-200 w-full sm:w-auto"
              startContent={<Icon icon="lucide:calendar" width={20} />}>
              {getPeriodProps[selectedPeriod]?.label ?? selectedPeriod}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Date period options"
            selectionMode="single"
            selectedKeys={new Set([selectedPeriod])}
            onSelectionChange={keys => {
              const value = Array.from(keys)[0] as ProfitLossPeriod
              setSelectedPeriod(value)
            }}>
            {Object.entries(getPeriodProps).map(([key, { label }]) => (
              <DropdownItem key={key} value={key}>
                {label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Button
          size="md"
          variant="solid"
          color="primary"
          isDisabled={canGet}
          className="flex w-full items-center justify-center gap-2 sm:w-auto"
          startContent={<Icon icon="solar:download-line-duotone" width={20} />}>
          Export / Download
        </Button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-md pb-10 shadow-none">
        <Table
          aria-label="Financial report table"
          removeWrapper
          classNames={{
            th: 'text-medium bg-transparent text-gray-700',
            td: 'py-3'
          }}>
          <TableHeader>
            <TableColumn className="px-4 text-left">Account</TableColumn>
            <TableColumn className="text-right">Current Period</TableColumn>
            <TableColumn className="text-right">Previous Period</TableColumn>
            <TableColumn className="text-right">Change</TableColumn>
            <TableColumn className="text-right">% Change</TableColumn>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="grid h-100 items-center justify-center">
                    <Spinner
                      size="lg"
                      classNames={{ label: 'text-foreground' }}
                      label="Loading"
                      variant="gradient"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Alert
                    variant="faded"
                    color="default"
                    title="Error loading Profit & Loss"
                    hideIcon
                    className="mt-6 flex flex-col items-center justify-center">
                    <Button
                      color="danger"
                      size="sm"
                      variant="light"
                      className="mx-auto mt-2"
                      onPress={() => {
                        refetch()
                      }}>
                      Try Again
                    </Button>
                  </Alert>
                </TableCell>
              </TableRow>
            ) : (
              plData.map((item: FinancialData, index: number) => (
                <TableRow
                  key={index}
                  className={rowVariants({
                    isHeader: item.isHeader,
                    isTotal: item.isTotal,
                    isNetIncome: item.isNetIncome,
                    isPositive: item.isNetIncome
                      ? (item.currentPeriod ?? 0) > (item.previousPeriod ?? 0)
                      : (item.change ?? 0) > 0,
                    isNegative: item.isNetIncome
                      ? (item.currentPeriod ?? 0) < (item.previousPeriod ?? 0)
                      : (item.change ?? 0) < 0
                  }).base()}>
                  <TableCell
                    className={rowVariants({
                      isAccount:
                        !item.isHeader && !item.isTotal && !item.isNetIncome
                    }).accountCell()}>
                    {item.category}
                  </TableCell>

                  <TableCell
                    className={rowVariants({
                      isNetIncome: item.isNetIncome,
                      isPositive:
                        item.isNetIncome &&
                        (item.currentPeriod ?? 0) > (item.previousPeriod ?? 0),
                      isNegative:
                        item.isNetIncome &&
                        (item.currentPeriod ?? 0) < (item.previousPeriod ?? 0)
                    }).valueCell()}>
                    {item.currentPeriod != null
                      ? formatCurrency(item.currentPeriod)
                      : ''}
                  </TableCell>

                  <TableCell className="text-right">
                    {item.previousPeriod != null
                      ? formatCurrency(item.previousPeriod)
                      : ''}
                  </TableCell>

                  <TableCell
                    className={rowVariants({
                      isPositive: (item.change ?? 0) > 0,
                      isNegative: (item.change ?? 0) < 0
                    }).changeCell()}>
                    {item.change != null ? formatChange(item.change) : ''}
                  </TableCell>

                  <TableCell
                    className={rowVariants({
                      isPositive: (item.percentChange ?? 0) > 0,
                      isNegative: (item.percentChange ?? 0) < 0
                    }).changeCell()}>
                    {item.percentChange != null
                      ? formatPercentChange(item.percentChange)
                      : ''}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default FinancialReport
