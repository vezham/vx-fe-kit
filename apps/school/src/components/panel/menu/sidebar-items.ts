import { MenuItem } from './types'

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
    key: 'academic1',
    icon: 'lucide:library',
    iconActive: 'solar:library-bold',
    href: '/academic1',
    title: 'Academic1'
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
        title: 'Classes',
        href: '/academic/classes'
      },
      {
        key: 'class-room',
        icon: 'lucide:layout-grid',
        title: 'Class Room',
        href: '/academic/classroom'
      },
      {
        key: 'class-routine',
        icon: 'lucide:layout-grid',
        title: 'Class Routine',
        href: '/academic/classroutine'
      },
      {
        key: 'section',
        icon: 'lucide:layout-grid',
        title: 'Section',
        href: '/academic/section'
      },
      {
        key: 'subject',
        icon: 'lucide:book',
        title: 'Subject',
        href: '/academic/subject'
      },
      {
        key: 'syllabus',
        icon: 'lucide:layout-grid',
        title: 'Syllabus',
        href: '/academic/syllabus'
      },
      {
        key: 'timetable',
        icon: 'lucide:layout-grid',
        title: 'Time Table',
        href: '/academic/timetable'
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
        href: '/academic/examinations'
      },
      {
        key: 'reasons',
        icon: 'lucide:layout-grid',
        title: 'Reasons',
        href: '/academic/reasons'
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
