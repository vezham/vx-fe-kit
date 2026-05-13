import type { SortDescriptor } from '@vezham/react/v3'

import type {
  OperationColumn,
  OperationPageConfig,
  OperationRow
} from './types'

const columns: OperationColumn[] = [
  {
    key: 'feesGroup',
    label: 'Fees Group',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'description',
    label: 'Description',
    type: 'text',
    allowsSorting: true,
    minWidth: 300
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
    allowsSorting: true,
    minWidth: 120
  }
]
const rows: OperationRow[] = [
  {
    id: 'fees-group-0',
    createdAt: '2026-05-11',
    displayId: 'FG80482',
    feesGroup: 'Tuition Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-1',
    createdAt: '2026-05-10',
    displayId: 'FG80481',
    feesGroup: 'Monthly Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-2',
    createdAt: '2026-05-09',
    displayId: 'FG80480',
    feesGroup: 'Class 1 General',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-3',
    createdAt: '2026-05-08',
    displayId: 'FG8048-1',
    feesGroup: 'Class 1 Lump Sum',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-4',
    createdAt: '2026-05-07',
    displayId: 'FG8048-2',
    feesGroup: 'Class 1- I Installment',
    description: 'The money that you pay to be taught',
    status: 'Inactive'
  },
  {
    id: 'fees-group-5',
    createdAt: '2026-05-06',
    displayId: 'FG8048-3',
    feesGroup: 'Class 1-II Installment',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-6',
    createdAt: '2026-05-05',
    displayId: 'FG8048-4',
    feesGroup: 'Class 1-III Installment',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-7',
    createdAt: '2026-05-11',
    displayId: 'FG8048-5',
    feesGroup: 'Discount',
    description: 'The money that you pay to be taught',
    status: 'Inactive'
  },
  {
    id: 'fees-group-8',
    createdAt: '2026-05-10',
    displayId: 'FG8048-6',
    feesGroup: 'Class 3- I Installment',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-group-9',
    createdAt: '2026-05-09',
    displayId: 'FG8048-7',
    feesGroup: 'Class 4- I Installment',
    description: 'The money that you pay to be taught',
    status: 'Active'
  }
]

export const feesGroupConfig = makeConfig({
  key: 'fees-group',
  title: 'Fees Collection',
  pageTitle: 'Fees Group',
  listTitle: 'Fees Collection',
  addLabel: 'Add Fees Group',
  ariaLabel: 'Fees Group',
  breadcrumb: ['Dashboard', 'Fees Collection', 'Fees Group'],
  columns,
  rows,
  filters: [
    {
      key: 'id',
      label: 'Id',
      values: rows.map(row => row.displayId)
    },
    {
      key: 'name',
      label: 'Name',
      values: ['Francis', 'James', 'Charles']
    },
    {
      key: 'status',
      label: 'Status',
      values: ['Active', 'Inactive']
    }
  ],
  initialColumn: 'feesGroup',
  tableMinWidth: 1120
})

function makeConfig(
  config: Omit<OperationPageConfig, 'initialSort' | 'sortOptions'> & {
    initialColumn: string
  }
): OperationPageConfig {
  const initialSort = {
    column: config.initialColumn,
    direction: 'ascending'
  } satisfies SortDescriptor
  return {
    ...config,
    initialSort,
    sortOptions: [
      { key: 'ascending', label: 'Ascending', descriptor: initialSort },
      {
        key: 'descending',
        label: 'Descending',
        descriptor: {
          column: config.initialColumn,
          direction: 'descending'
        } satisfies SortDescriptor
      },
      {
        key: 'recentlyAdded',
        label: 'Recently Added',
        descriptor: {
          column: 'createdAt',
          direction: 'descending'
        } satisfies SortDescriptor
      }
    ]
  }
}
