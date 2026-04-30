import type { AcademicMenuItem, ActionItem } from './types'

export const sidebarItems: AcademicMenuItem[] = [
  {
    key: 'classes',
    title: 'Classes',
    href: '/academic1/classes',
    icon: 'lucide:book-open',
    children: [
      {
        key: 'allclasses',
        title: 'All Classes',
        href: '/academic1/classes/allclasses',
        icon: 'lucide:list'
      },
      {
        key: 'schedule',
        title: 'Schedule',
        href: '/academic1/classes/schedule',
        icon: 'lucide:calendar-clock'
      }
    ]
  },
  {
    key: 'classroom',
    title: 'Class Room',
    href: '/academic1/classroom',
    icon: 'lucide:layout-grid'
  },
  {
    key: 'classroutine',
    title: 'Class Routine',
    href: '/academic1/classroutine',
    icon: 'lucide:calendar-days'
  },
  {
    key: 'section',
    title: 'Section',
    href: '/academic1/section',
    icon: 'lucide:split-square-horizontal'
  },
  {
    key: 'subject',
    title: 'Subject',
    href: '/academic1/subject',
    icon: 'lucide:book'
  },
  {
    key: 'syllabus',
    title: 'Syllabus',
    href: '/academic1/syllabus',
    icon: 'lucide:file-text'
  },
  {
    key: 'timetable',
    title: 'Time Table',
    href: '/academic1/timetable',
    icon: 'lucide:clock'
  },
  {
    key: 'homework',
    title: 'Home Work',
    href: '/academic1/homework',
    icon: 'lucide:clipboard-list'
  },
  {
    key: 'examinations',
    title: 'Examinations',
    href: '/academic1/examinations',
    icon: 'lucide:graduation-cap',
    children: [
      {
        key: 'exam',
        title: 'Exam',
        href: '/academic1/examinations/exam',
        icon: 'lucide:file-pen'
      },
      {
        key: 'exam-schedule',
        title: 'Exam Schedule',
        href: '/academic1/examinations/exam-schedule',
        icon: 'lucide:calendar-check'
      },
      {
        key: 'grades',
        title: 'Grades',
        href: '/academic1/examinations/grades',
        icon: 'lucide:badge-check'
      },
      {
        key: 'exam-attendance',
        title: 'Exam Attendance',
        href: '/academic1/examinations/exam-attendance',
        icon: 'lucide:user-check'
      },
      {
        key: 'exam-results',
        title: 'Exam Results',
        href: '/academic1/examinations/exam-results',
        icon: 'lucide:chart-no-axes-column'
      }
    ]
  },
  {
    key: 'reasons',
    title: 'Reasons',
    href: '/academic1/reasons',
    icon: 'lucide:circle-help'
  }
]

export const defaultLeftActions: ActionItem[] = [
  {
    key: 'back',
    label: 'Back',
    icon: 'lucide:arrow-left',
    onAction: () => window.history.back()
  },
  {
    key: 'forward',
    label: 'Forward',
    icon: 'lucide:arrow-right',
    onAction: () => window.history.forward()
  }
]

export const defaultRightActions: ActionItem[] = [
  {
    key: 'search',
    label: 'Search',
    icon: 'lucide:search',
    kind: 'search'
  },
  {
    key: 'import',
    label: 'Import',
    icon: 'lucide:upload',
    kind: 'menu'
  },
  {
    key: 'print',
    label: 'Print',
    icon: 'lucide:printer',
    kind: 'menu',
    onAction: () => window.print()
  },
  {
    key: 'export',
    label: 'Export',
    icon: 'lucide:download',
    kind: 'menu'
  },
  {
    key: 'refresh',
    label: 'Refresh',
    icon: 'lucide:refresh-cw',
    kind: 'refresh',
    onAction: () => window.location.reload()
  },
  {
    key: 'create',
    label: 'Create',
    icon: 'lucide:plus',
    kind: 'primary'
  }
]

export const createLabelsByPageKey: Record<string, string> = {
  allclasses: 'Add Class',
  schedule: 'Add Schedule',
  classroom: 'Add Classroom',
  classroutine: 'Add Class Routine',
  section: 'Add Section',
  syllabus: 'Add Subject Group',
  reasons: 'Add Reactions',
  subject: 'Add Subject',
  timetable: 'Add Timetable',
  homework: 'Add Homework',
  exam: 'Add Exam',
  'exam-schedule': 'Add Exam Schedule',
  grades: 'Add Grades'
}

export const createExcludedPageKeys = new Set([
  'exam-attendance',
  'exam-results'
])
