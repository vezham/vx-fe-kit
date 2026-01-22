'use client'

import React, { useMemo } from 'react'

import { Button, Pagination } from '@vezham/react/v2'

import {
  ChevronLeftIcon,
  ChevronRightIcon
} from '@vx-oss/heroui-v2-shared-icons'

import { tableStyles } from './variant'

interface BottomContentProps {
  page: number
  pages: number
  onPaginationChange: (newPage: number) => Promise<void>
  onPreviousPage: () => Promise<void>
  onNextPage: () => Promise<void>
}

export const BottomContent: React.FC<BottomContentProps> = ({
  page,
  pages,
  onPaginationChange,
  onPreviousPage,
  onNextPage
}) => {
  return (
    <div className={tableStyles.paginationContainer}>
      <div>
        <Pagination
          isCompact
          showControls
          size="sm"
          page={page}
          total={pages}
          onChange={onPaginationChange}
        />
      </div>
      <div className={tableStyles.paginationButtonContainer}>
        <Button
          isDisabled={page === 1}
          size="sm"
          variant="flat"
          onPress={onPreviousPage}
          className="flex min-w-[5px] items-center gap-1"
          startContent={<ChevronLeftIcon className="hidden sm:flex" />}>
          <ChevronLeftIcon className="inline sm:hidden" />
          <span className="flex hidden items-center gap-1 sm:inline">
            Previous
          </span>
        </Button>

        <Button
          isDisabled={page === pages}
          size="sm"
          variant="flat"
          onPress={onNextPage}
          className="flex min-w-[5px] items-center gap-1"
          endContent={<ChevronRightIcon className="hidden sm:flex" />}>
          <ChevronRightIcon className="inline sm:hidden" />
          <span className="flex hidden items-center gap-1 sm:inline">Next</span>
        </Button>
      </div>
    </div>
  )
}
