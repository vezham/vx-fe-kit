import { MenuItem } from './types'

// export const items: MenuItem[] = [
//   {
//     key: 'home',
//     icon: 'lucide:wallet',
//     iconActive: 'solar:wallet-bold',
//     href: '/',
//     title: 'Home'
//   },
//   {
//     key: 'channel',
//     icon: 'lucide:library',
//     iconActive: 'solar:library-bold',
//     href: '/channels',
//     title: 'Channels'
//   },
//   {
//     key: 'academic',
//     icon: 'lucide:settings',
//     iconActive: 'solar:settings-bold',
//     href: '/academic',
//     title: 'Academic'
//   },
//   {
//     key: 'operations',
//     icon: 'lucide:package',
//     iconActive: 'solar:box-bold',
//     href: '/operations',
//     title: 'Operations'
//   },
//   {
//     key: 'reports',
//     icon: 'lucide:bar-chart-2',
//     iconActive: 'solar:chart-bold',
//     href: '/reports',
//     title: 'Reports'
//   }
// ]

export const items: MenuItem[] = [
  {
    key: 'home',
    icon: 'lucide:home',
    iconActive: 'solar:home-bold',
    href: '/',
    title: 'Home'
  },
  {
    key: 'channel',
    icon: 'lucide:library',
    iconActive: 'solar:library-bold',
    href: '/channels',
    title: 'Channels'
  },
  {
    key: 'academic',
    icon: 'lucide:graduation-cap',
    iconActive: 'solar:graduation-cap-bold',
    title: 'Academic',
    href: '/academic',
    submenu: [
      {
        key: 'classes',
        icon: 'lucide:book-open',
        title: 'Classes'
      },
      {
        key: 'class-room',
        icon: 'lucide:layout-grid',
        title: 'Class Room'
      },
      {
        key: 'subject',
        icon: 'lucide:book',
        title: 'Subject'
      },
      {
        key: 'home-work',
        icon: 'lucide:clipboard-list',
        href: '/academic/homework',
        title: 'Home Work'
      },
      {
        key: 'examinations',
        icon: 'lucide:file-text',
        title: 'Examinations'
      }
    ]
  },
  {
    key: 'operations',
    icon: 'lucide:package',
    iconActive: 'solar:box-bold',
    href: '/operations',
    title: 'Operations'
  },
  {
    key: 'reports',
    icon: 'lucide:bar-chart-2',
    iconActive: 'solar:chart-bold',
    href: '/reports',
    title: 'Reports'
  }
]
