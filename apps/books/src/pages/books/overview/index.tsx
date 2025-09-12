'use client'

import type { CardProps } from '@heroui/react'
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Skeleton,
  Spacer
} from '@heroui/react'
import { Icon } from '@iconify/react'

import { PlusFilledIcon } from '@heroui/shared-icons'
import { usePurchase } from '../../../store/books/usePurchase'
import type { purchaseStats } from '../../../store/books/usePurchase/types'
import { useSales } from '../../../store/books/useSales'
import type { salesStats } from '../../../store/books/useSales/types'
import { cardVariants as cv, widgets } from './variant'

type CardData = salesStats | purchaseStats

export default function Component(props: CardProps) {
  const {
    data: purchaseStats,
    isLoading: isPurchaseLoading,
    isError: isPurchaseError,
    refetch: refetchPurchase
  } = usePurchase.stats({})
  const {
    data: salesStats,
    isLoading: isSalesLoading,
    isError: isSalesError,
    refetch: refetchSales
  } = useSales.stats({})

  const allDataLoaded =
    !isSalesLoading && !isPurchaseLoading && !isSalesError && !isPurchaseError
  const dataIsEmpty = !salesStats?.length && !purchaseStats?.length

  const renderCard = (inv: CardData) => (
    <Card key={`${inv.type}-${inv.id}`} className={cv.wrapper} {...props}>
      <CardBody className={cv.body}>
        <div className={cv.titleWrapper}>
          <p className={cv.title}>{inv.title}</p>
          <Icon
            className={cv.menuIcon}
            icon="solar:menu-dots-bold"
            width={20}
            height={20}
          />
        </div>

        <Spacer y={6} />
        <div className={cv.gridWrapper}>
          <div className={cv.gridLabels}>
            <p className={cv.normal}>
              {inv.type === 'sales' ? 'Total Invoiced' : 'Total Billed'}
            </p>
            <p className={cv.normal}>Paid</p>
            <p className={cv.normal}>Outstanding</p>
          </div>

          <div className={cv.gridValues}>
            <p className={cv.normal}>
              {inv.type === 'sales'
                ? `$ ${(inv as salesStats).totalInvoiced.toLocaleString()}`
                : `$ ${(inv as purchaseStats).totalBilled.toLocaleString()}`}
            </p>
            <p className={cv.paid}>$ {inv.paid.toLocaleString()}</p>
            <p className={cv.outstanding}>
              $ {inv.outstanding.toLocaleString()}
            </p>
          </div>
        </div>
      </CardBody>

      <CardFooter className={cv.footer}>
        <div className={cv.footerLeft}>
          <Icon icon="solar:file-text-linear" width={20} />
          {inv.type === 'sales' ? 'Total Invoices' : 'Total Bills'}
        </div>
        <div>
          {inv.type === 'sales'
            ? (inv as salesStats).totalInvoices
            : (inv as purchaseStats).totalBills}
        </div>
      </CardFooter>
    </Card>
  )

  const renderSkeleton = () => (
    <Card className={cv.wrapper} {...props}>
      <CardBody className={cv.body}>
        <Skeleton className="h-6 w-2/3 rounded-lg" />
        <Spacer y={4} />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
        <Spacer y={2} />
        <Skeleton className="h-4 w-1/3 rounded-lg" />
        <Spacer y={2} />
        <Skeleton className="h-4 w-1/4 rounded-lg" />
      </CardBody>
      <CardFooter className={cv.footer}>
        <Skeleton className="h-4 w-1/2 rounded-lg" />
      </CardFooter>
    </Card>
  )

  const renderError = (refetch: () => void) => (
    <Alert
      hideIcon
      variant="faded"
      color="default"
      title="Error loading data"
      className="flex flex-col items-center">
      <Button
        color="danger"
        variant="light"
        size="sm"
        className="mx-auto mt-1"
        onPress={refetch}>
        Try Again
      </Button>
    </Alert>
  )

  return (
    <>
      <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isSalesLoading
          ? renderSkeleton()
          : isSalesError
            ? renderError(refetchSales)
            : salesStats?.map(inv =>
                renderCard({ ...inv, type: 'sales' as const })
              )}

        {isPurchaseLoading
          ? renderSkeleton()
          : isPurchaseError
            ? renderError(refetchPurchase)
            : purchaseStats?.map(inv =>
                renderCard({ ...inv, type: 'purchase' as const })
              )}

        {allDataLoaded && dataIsEmpty && (
          <div className="text-default-500 col-span-full flex items-center justify-center py-10">
            No stats found
          </div>
        )}
      </div>
      <div className={widgets.base}>
        <div className={widgets.wrapper}>
          <div className={widgets.content}>
            <p>Sales</p>
            <p>
              <PlusFilledIcon />
            </p>
          </div>
          <Divider />
        </div>
      </div>
    </>
  )
}
