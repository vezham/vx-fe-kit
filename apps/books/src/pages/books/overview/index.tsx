'use client'

import type { CardProps } from '@heroui/react'
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Skeleton,
  Spacer
} from '@heroui/react'
import { Icon } from '@iconify/react'

import { usePurchaseStats } from '../../../store/books/usePurchase'
import type { purchaseStats } from '../../../store/books/usePurchase/types'
import { useSalesStats } from '../../../store/books/useSales'
import type { salesStats } from '../../../store/books/useSales/types'
import { cardVariants as cv } from './variant'

type CardData =
  | (salesStats & { type: 'sales' })
  | (purchaseStats & { type: 'purchase' })

export default function Component(props: CardProps) {
  const {
    data: purchaseStats,
    isLoading: isPurchaseLoading,
    isError: isPurchaseError,
    refetch: refetchPurchase
  } = usePurchaseStats.list({})
  const {
    data: salesStats,
    isLoading: isSalesLoading,
    isError: isSalesError,
    refetch: refetchSales
  } = useSalesStats.list({})

  if (isSalesError || isPurchaseError)
    return (
      <Alert
        variant="faded"
        color="default"
        title="Error loading Overview"
        className="mt-6">
        <Button
          color="default"
          size="sm"
          className="mt-2"
          onPress={() => {
            refetchPurchase()
            refetchSales()
          }}>
          Try Again
        </Button>
      </Alert>
    )

  const cardsData: CardData[] = [
    ...(salesStats?.map(inv => ({ ...inv, type: 'sales' as const })) ?? []),
    ...(purchaseStats?.map(inv => ({ ...inv, type: 'purchase' as const })) ??
      [])
  ]

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {isPurchaseLoading || isSalesLoading ? (
        Array.from({ length: cardsData.length }).map((_, i) => (
          <Card key={i} className={cv.wrapper} {...props}>
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
        ))
      ) : cardsData.length === 0 ? (
        <div className="text-default-500 col-span-full flex items-center justify-center py-10">
          No stats found
        </div>
      ) : (
        cardsData.map(inv => (
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
                      ? `$ ${inv.totalInvoiced.toLocaleString()}`
                      : `$ ${inv.totalBilled.toLocaleString()}`}
                  </p>
                  <p className={cv.paid}>$ {inv.paid.toLocaleString()}</p>
                  <p className={cv.outstanding}>
                    $ {inv.outstanding.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardBody>

            <Spacer y={6} />
            <CardFooter className={cv.footer}>
              <div className={cv.footerLeft}>
                <Icon icon="solar:file-text-linear" width={20} />
                {inv.type === 'sales' ? 'Total Invoices' : 'Total Bills'}
              </div>
              <div>
                {inv.type === 'sales' ? inv.totalInvoices : inv.totalBills}
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
