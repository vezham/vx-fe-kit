import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React from 'react'

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner
} from '@vezham/react/v2'

import Header from '../../../../components/header'
import {
  useCashFlowSummary,
  useFinancingCashFlow,
  useInvestingCashFlow,
  useOperatingCashFlow
} from '../../../../store/reports/useCashflow'
import {
  formatCurrency,
  getPeriodProps
} from '../../../../store/reports/useCashflow/data'
import End from '../../actionbar/endContent'
import Start from '../../actionbar/headContent'
import { usePermit } from '../../utils'
import { cashFlowPeriod } from './types'
import { cashFlowVariants } from './variant'

const CashFlowStatement: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] =
    React.useState<cashFlowPeriod>('monthly')

  const { readOnly: canGet } = usePermit('cashflow', 'get')

  // Queries
  const operating = useOperatingCashFlow.list({ period: selectedPeriod })
  const investing = useInvestingCashFlow.list({ period: selectedPeriod })
  const financing = useFinancingCashFlow.list({ period: selectedPeriod })
  const summary = useCashFlowSummary.list({ period: selectedPeriod })

  const {
    container,
    headerWrapper,
    title,
    gridContainer,
    sectionTitle,
    itemWrapper,
    itemRow,
    itemLabel,
    itemValue,
    totalLine,
    totalRow,
    totalLabel,
    totalValue,
    cardContainer,
    summaryRow,
    summaryLabel,
    summaryValue,
    netCashChangeValue
  } = cashFlowVariants()

  const renderCardContent = (
    title: string,
    dataQuery: any,
    totalLabelText: string,
    footerLabel: string,
    footerValue?: number,
    isNetChange = false
  ) => {
    // Loading state: entire card
    if (dataQuery.isLoading) {
      return (
        <Card className={cardContainer()}>
          <CardBody className="flex items-center justify-center">
            <Spinner size="md" />
          </CardBody>
        </Card>
      )
    }

    // Error state: entire card
    if (dataQuery.isError || !dataQuery.data) {
      return (
        <Card className={cardContainer()}>
          <div className="text-center">
            <Alert
              variant="faded"
              color="default"
              title={`Error loading ${title}`}
              hideIcon
              className="flex h-[255px] flex-col items-center justify-center">
              <Button
                color="danger"
                size="sm"
                variant="light"
                className="mx-auto mt-2"
                onPress={dataQuery.refetch}>
                Try Again
              </Button>
            </Alert>
          </div>
        </Card>
      )
    }

    // Success state: normal card
    return (
      <Card className={cardContainer()}>
        <CardHeader>
          <h3 className={sectionTitle()}>{title}</h3>
        </CardHeader>
        <CardBody>
          <div className={itemWrapper()}>
            {dataQuery.data.items.map((item: any, idx: number) => (
              <div key={idx} className={itemRow()}>
                <span className={itemLabel()}>{item.label}</span>
                <span
                  className={itemValue({
                    valueState: item.value < 0 ? 'negative' : 'positive'
                  })}>
                  {formatCurrency(item.value)}
                </span>
              </div>
            ))}
            <div className={totalLine()}>
              <div className={totalRow()}>
                <span className={totalLabel()}>{totalLabelText}</span>
                <span
                  className={totalValue({
                    valueState:
                      dataQuery.data.total < 0 ? 'negative' : 'positive'
                  })}>
                  {formatCurrency(dataQuery.data.total)}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
        {footerLabel && (
          <CardFooter>
            <div className={summaryRow()}>
              <span className={summaryLabel()}>{footerLabel}</span>
              <span
                className={
                  isNetChange
                    ? netCashChangeValue({
                        valueState:
                          footerValue && footerValue < 0
                            ? 'negative'
                            : 'positive'
                      })
                    : summaryValue({ valueState: 'positive' })
                }>
                {footerValue !== undefined ? formatCurrency(footerValue) : '--'}
              </span>
            </div>
          </CardFooter>
        )}
      </Card>
    )
  }

  return (
    <>
      <div className="pb-4">
        <Header
          startContent={<Start />}
          mainTitle="Cash Flow"
          mainDescription="Comprehensive reports and analytics"
          endContent={<End />}
        />
      </div>

      {/* Controls */}
      <div className="mb-4 flex flex-col justify-end gap-2 sm:flex-row">
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
              const value = Array.from(keys)[0] as cashFlowPeriod
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
          className="flex min-w-[160px] items-center justify-center gap-2 sm:w-auto"
          startContent={<Icon icon="solar:download-line-duotone" width={20} />}>
          Export / Download
        </Button>
      </div>

      <motion.div
        className={container()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}>
        <div className={headerWrapper()}>
          <h2 className={title()}>Cash Flow Statement</h2>
        </div>

        <div className={gridContainer()}>
          {renderCardContent(
            'Operating Activities',
            operating,
            'Operating Cash Flow',
            'Beginning Cash',
            summary.data?.beginningCash
          )}
          {renderCardContent(
            'Investing Activities',
            investing,
            'Investing Cash Flow',
            'Net Cash Change',
            summary.data?.netCashChange,
            true
          )}
          {renderCardContent(
            'Financing Activities',
            financing,
            'Financing Cash Flow',
            'Ending Cash',
            summary.data?.endingCash
          )}
        </div>
      </motion.div>
    </>
  )
}

export default CashFlowStatement
