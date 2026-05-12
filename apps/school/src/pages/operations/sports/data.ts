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
    key: 'name',
    label: 'Name',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  },
  {
    key: 'coach',
    label: 'Coach',
    type: 'person',
    allowsSorting: true,
    minWidth: 180
  },
  {
    key: 'startedYear',
    label: 'Started Year',
    type: 'text',
    allowsSorting: true,
    minWidth: 120
  }
]
const rows: OperationRow[] = [
  {
    id: 'sport-0',
    createdAt: '2026-05-11',
    displayId: 'SP826329',
    name: 'Cricket',
    coach: {
      name: 'Thomas',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/20.jpg'
    },
    startedYear: 2004
  },
  {
    id: 'sport-1',
    createdAt: '2026-05-10',
    displayId: 'SP826328',
    name: 'Throwball',
    coach: {
      name: 'Mary',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg'
    },
    startedYear: 2005
  },
  {
    id: 'sport-2',
    createdAt: '2026-05-09',
    displayId: 'SP826327',
    name: 'Football',
    coach: {
      name: 'Michael',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    startedYear: 2006
  },
  {
    id: 'sport-3',
    createdAt: '2026-05-08',
    displayId: 'SP826326',
    name: 'Tennis',
    coach: {
      name: 'Jessie',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    startedYear: 2006
  },
  {
    id: 'sport-4',
    createdAt: '2026-05-07',
    displayId: 'SP826325',
    name: 'Basketball',
    coach: {
      name: 'Robert',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/24.jpg'
    },
    startedYear: 2007
  },
  {
    id: 'sport-5',
    createdAt: '2026-05-06',
    displayId: 'SP826324',
    name: 'Badminton',
    coach: {
      name: 'Colleen',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    startedYear: 2008
  },
  {
    id: 'sport-6',
    createdAt: '2026-05-05',
    displayId: 'SP826323',
    name: 'Carrom',
    coach: {
      name: 'Arthur',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/26.jpg'
    },
    startedYear: 2009
  },
  {
    id: 'sport-7',
    createdAt: '2026-05-11',
    displayId: 'SP826322',
    name: 'Chess',
    coach: {
      name: 'Claudia',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg'
    },
    startedYear: 2004
  },
  {
    id: 'sport-8',
    createdAt: '2026-05-10',
    displayId: 'SP826321',
    name: 'Hockey',
    coach: {
      name: 'Johnson',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
    },
    startedYear: 2005
  },
  {
    id: 'sport-9',
    createdAt: '2026-05-09',
    displayId: 'SP826320',
    name: 'Volleyball',
    coach: {
      name: 'Marquita',
      subtitle: '',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    startedYear: 2008
  }
]

export const sportsConfig = makeConfig({
  key: 'sports',
  title: 'Sports',
  pageTitle: 'Sports',
  listTitle: 'Sports',
  addLabel: 'Add Sport',
  ariaLabel: 'Sports',
  breadcrumb: ['Dashboard', 'Management', 'Sports'],
  columns,
  rows,
  filters: [
    {
      key: 'startedYear',
      label: 'Started Year',
      values: ['2004', '2005', '2006', '2007', '2008']
    }
  ],
  initialColumn: 'name',
  tableMinWidth: 980
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
      { key: 'ascending', label: 'A-Z', descriptor: initialSort },
      {
        key: 'descending',
        label: 'Z-A',
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
