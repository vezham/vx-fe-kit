import type { SortDescriptor } from '@vezham/react/v3'

import type {
  OperationColumn,
  OperationPageConfig,
  OperationRow
} from './types'

const columns: OperationColumn[] = [
  {
    key: 'displayId',
    label: 'ID',
    type: 'link',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'feesType',
    label: 'Fees Type',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'feesCode',
    label: 'Fees Code',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
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
    minWidth: 280
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
    id: 'fees-type-0',
    createdAt: '2026-05-11',
    displayId: 'FG80482',
    feesType: 'Admission Fees',
    feesCode: 'Admission-Fees',
    feesGroup: 'Tuition Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-1',
    createdAt: '2026-05-10',
    displayId: 'FG80481',
    feesType: 'Apr-Mar',
    feesCode: 'Apr-Mar',
    feesGroup: 'Monthly Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-2',
    createdAt: '2026-05-09',
    displayId: 'FG80480',
    feesType: 'Bus Fees',
    feesCode: 'Bus-Fees',
    feesGroup: 'Class 1 General',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-3',
    createdAt: '2026-05-08',
    displayId: 'FG8048-1',
    feesType: '1st Installment Fees',
    feesCode: '1st-Installment-Fees',
    feesGroup: 'Class 1 Lump Sum',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-4',
    createdAt: '2026-05-07',
    displayId: 'FG8048-2',
    feesType: '2nd Installment Fees',
    feesCode: '2nd-Installment-Fees',
    feesGroup: 'Discount',
    description: 'The money that you pay to be taught',
    status: 'Inactive'
  },
  {
    id: 'fees-type-5',
    createdAt: '2026-05-06',
    displayId: 'FG8048-3',
    feesType: '3rd Installment Fees',
    feesCode: '3rd-Installment-Fees',
    feesGroup: 'Tuition Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-6',
    createdAt: '2026-05-05',
    displayId: 'FG8048-4',
    feesType: '4th Installment Fees',
    feesCode: '4th-Installment-Fees',
    feesGroup: 'Monthly Fees',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-7',
    createdAt: '2026-05-11',
    displayId: 'FG8048-5',
    feesType: 'Topper Discount',
    feesCode: 'Topper-Discount',
    feesGroup: 'Class 1 General',
    description: 'The money that you pay to be taught',
    status: 'Inactive'
  },
  {
    id: 'fees-type-8',
    createdAt: '2026-05-10',
    displayId: 'FG8048-6',
    feesType: '3rd Installment Fees',
    feesCode: '3rd-Installment-Fees',
    feesGroup: 'Class 1 Lump Sum',
    description: 'The money that you pay to be taught',
    status: 'Active'
  },
  {
    id: 'fees-type-9',
    createdAt: '2026-05-09',
    displayId: 'FG8048-7',
    feesType: '4th Installment Fees',
    feesCode: '4th-Installment-Fees',
    feesGroup: 'Discount',
    description: 'The money that you pay to be taught',
    status: 'Active'
  }
]

export const feesTypeConfig = makeConfig({
  key: 'fees-type',
  title: 'Fees Collection',
  pageTitle: 'Fees Type',
  listTitle: 'Fees Collection',
  addLabel: 'Add Fees Type',
  ariaLabel: 'Fees Type',
  breadcrumb: ['Dashboard', 'Fees Collection', 'Fees Type'],
  columns,
  rows,
  filters: [
    {
      key: 'status',
      label: 'Status',
      values: ['Active', 'Inactive']
    }
  ],
  initialColumn: 'feesType',
  tableMinWidth: 1320
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
