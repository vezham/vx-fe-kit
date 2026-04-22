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
    submenu: [
      {
        key: 'classes',
        icon: 'lucide:book-open',
        title: 'Classes',
        submenu: [
          {
            key: 'all-classes',
            title: 'All Classes',
            href: '/academic/classes/all'
          },
          {
            key: 'schedule',
            title: 'Schedule',
            href: '/academic/classes/schedule'
          }
        ]
      },
      {
        key: 'class-room',
        icon: 'lucide:layout-grid',
        title: 'Class Room',
        submenu: [
          {
            key: 'class-routine',
            title: 'Class Routine',
            href: '/academic/class-room/routine'
          },
          {
            key: 'section',
            title: 'Section',
            href: '/academic/class-room/section'
          }
        ]
      },
      {
        key: 'subject',
        icon: 'lucide:book',
        title: 'Subject',
        submenu: [
          {
            key: 'syllabus',
            title: 'Syllabus',
            href: '/academic/subject/syllabus'
          },
          {
            key: 'time-table',
            title: 'Time Table',
            href: '/academic/subject/time-table'
          }
        ]
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
        title: 'Examinations',
        submenu: [
          {
            key: 'reasons',
            title: 'Reasons',
            href: '/academic/examinations/reasons'
          }
        ]
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
