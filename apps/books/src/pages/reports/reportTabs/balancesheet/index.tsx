/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import Header from '../../../../components/header'
import End from '../../actionbar/endContent'
import Start from '../../actionbar/headContent'
import { getFinancialData } from './data'
import { FinancialData } from './types'
import { getRowVariantProps, rowVariants } from './variant'

const BalanceSheet: React.FC<object> = () => {
  const [selectedPeriod, setSelectedPeriod] = React.useState('Monthly')
  const financialData: FinancialData[] = React.useMemo(
    () => getFinancialData(selectedPeriod),
    [selectedPeriod]
  )

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
          mainTitle={'Balance Sheet'}
          mainDescription={'Comprehensive reports and analytics'}
          endContent={<End />}
        />
      </div>
      <div className="flex flex-col gap-2 pb-4 sm:flex-row sm:justify-end">
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="md"
              className="bg-default-100 hover:bg-default-200 w-full sm:w-auto"
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
          className="flex w-full items-center justify-center gap-2 sm:w-auto"
          startContent={<Icon icon="solar:download-line-duotone" width={20} />}>
          Export / Download
        </Button>
      </div>
      <div className="overflow-x-auto rounded-md pb-10 shadow-none">
        <Table
          aria-label="Balance Sheet table"
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
            {financialData.map((item, index) => {
              const rowProps = getRowVariantProps(item)
              return (
                <TableRow key={index} className={rowVariants(rowProps).base()}>
                  <TableCell className={rowVariants(rowProps).accountCell()}>
                    {item.category}
                  </TableCell>
                  <TableCell className={rowVariants(rowProps).valueCell()}>
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
                      isPositive: item.change! > 0,
                      isNegative: item.change! < 0
                    }).changeCell()}>
                    {item.change != null ? formatChange(item.change) : ''}
                  </TableCell>

                  <TableCell
                    className={rowVariants({
                      isPositive: item.percentChange! > 0,
                      isNegative: item.percentChange! < 0
                    }).changeCell()}>
                    {item.percentChange != null
                      ? formatPercentChange(item.percentChange)
                      : ''}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default BalanceSheet
