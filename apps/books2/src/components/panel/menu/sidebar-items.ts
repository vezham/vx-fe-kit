// export const items: MenuItem[] = [
//   {
//     key: 'bank',
//     icon: 'lucide:wallet',
//     href: '/bank',
//     title: 'Bank'
//   },
//   {
//     key: 'books',
//     icon: 'lucide:library',
//     href: '/books',
//     title: 'Books'
//   },
//   {
//     key: 'reports',
//     icon: 'lucide:bar-chart-2',
//     href: '/reports',
//     title: 'Reports'
//   },
//   {
//     key: 'settings',
//     icon: 'lucide:layers',
//     href: '/settings',
//     title: 'Settings'
//   },
//   {
//     key: 'inventory',
//     icon: 'lucide:package',
//     title: 'Inventory'
//   }
// ]
import { MenuItem } from './types'

export const items: MenuItem[] = [
  {
    key: 'bank',
    icon: 'lucide:wallet',
    iconActive: 'solar:wallet-bold',
    href: '/bank',
    title: 'Bank'
  },
  {
    key: 'books',
    icon: 'lucide:library',
    iconActive: 'solar:library-bold',
    href: '/books',
    title: 'Books'
  },
  {
    key: 'reports',
    icon: 'lucide:bar-chart-2',
    iconActive: 'solar:chart-bold',
    href: '/reports',
    title: 'Reports'
  },
  {
    key: 'settings',
    icon: 'lucide:settings',
    iconActive: 'solar:settings-bold',
    href: '/settings',
    title: 'Settings'
  },
  {
    key: 'inventory',
    icon: 'lucide:package',
    iconActive: 'solar:box-bold',
    href: '/inventory',
    title: 'Inventory'
  }
]
