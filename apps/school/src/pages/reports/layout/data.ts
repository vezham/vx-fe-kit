import type { AcademicMenuItem } from '../../academic1/layout/types'

export const reportsSidebarItems: AcademicMenuItem[] = [
  {
    key: 'attendance',
    title: 'Attendance Reports',
    href: '/reports/attendance',
    icon: 'lucide:calendar-check',
    children: [
      {
        key: 'attendance-report',
        title: 'Attendance Report',
        href: '/reports/attendance/attendance-report',
        icon: 'lucide:file-chart-column'
      },
      {
        key: 'students-attendance-type',
        title: 'Students Attendance Type',
        href: '/reports/attendance/students-attendance-type',
        icon: 'lucide:user-round-check'
      },
      {
        key: 'daily-attendance',
        title: 'Daily Attendance',
        href: '/reports/attendance/daily-attendance',
        icon: 'lucide:calendar-days'
      },
      {
        key: 'student-day-wise',
        title: 'Student Day Wise',
        href: '/reports/attendance/student-day-wise',
        icon: 'lucide:user'
      },
      {
        key: 'teacher-day-wise',
        title: 'Teacher Day Wise',
        href: '/reports/attendance/teacher-day-wise',
        icon: 'lucide:graduation-cap'
      },
      {
        key: 'staff-day-wise',
        title: 'Staff Day Wise',
        href: '/reports/attendance/staff-day-wise',
        icon: 'lucide:briefcase-business'
      },
      {
        key: 'teacher-report',
        title: 'Teacher Report',
        href: '/reports/attendance/teacher-report',
        icon: 'lucide:clipboard-list'
      },
      {
        key: 'staff-report',
        title: 'Staff Report',
        href: '/reports/attendance/staff-report',
        icon: 'lucide:clipboard-list'
      }
    ]
  },
  {
    key: 'class',
    title: 'Class Reports',
    href: '/reports/class',
    icon: 'lucide:school'
  },
  {
    key: 'student',
    title: 'Student Reports',
    href: '/reports/student',
    icon: 'lucide:users'
  },
  {
    key: 'grade',
    title: 'Grade Reports',
    href: '/reports/grade',
    icon: 'lucide:badge-check'
  },
  {
    key: 'leave',
    title: 'Leave Reports',
    href: '/reports/leave',
    icon: 'lucide:calendar-minus'
  },
  {
    key: 'fees',
    title: 'Fees Reports',
    href: '/reports/fees',
    icon: 'lucide:receipt'
  }
]
