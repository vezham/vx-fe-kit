// import { Outlet, createLazyFileRoute } from '@tanstack/react-router'
// import { useState } from 'react'
// import { useLocation, useNavigate } from '@tanstack/react-router'
// import { Surface } from '@vezham/react/v3'
// import DynamicHeader, {
//   ActionItem,
//   TabItem
// } from '../../components/actions-header'
// export const Route = createLazyFileRoute('/academic')({
//   component: RouteComponent
// })
// function RouteComponent() {
//   const location = useLocation()
//   const navigate = useNavigate()
//   const tabs: TabItem[] = [
//     {
//         key: 'classes', title: 'All Classes', icon: 'lucide:calendar',
//         href: '/academic/classes/allclasses'
//     },
//     {
//         key: 'schedule', title: 'Schedule', icon: 'lucide:calendar',
//         href: '/academic/classes/schedule'
//     }
//   ]
//   const activeTab =
//     tabs.find(tab => location.pathname.startsWith(tab.href))?.key || 'classes'
//   const actions: ActionItem[] = [
//     {
//       key: 'create',
//       label: 'Create',
//       icon: 'lucide:plus',
//       onAction: pageKey => {
//         console.log(`Add class action triggered on page: ${pageKey}`)
//       }
//     },
//     {
//       key: 'import',
//       label: 'Import Classes',
//       icon: 'lucide:upload',
//       onAction: pageKey => {
//         console.log(`Import classes on: ${pageKey}`)
//       }
//     },
//     {
//       key: 'export',
//       label: 'Export List',
//       icon: 'lucide:download',
//       shortcut: '⌘E',
//       onAction: pageKey => {
//         console.log(`Export classes on: ${pageKey}`)
//       }
//     }
//   ]
//   const handleSearch = (query: string, pageKey: string) => {
//     console.log(`Searching "${query}" on ${pageKey}`)
//   }
//   return (
//     <div className="flex min-h-screen w-full flex-col p-4">
//       <DynamicHeader
//         tabs={tabs}
//         activeTab={activeTab}
//         rightActions={actions}
//         leftActions={[
//           { key: 'back', label: 'Back', icon: 'lucide:arrow-left' },
//           { key: 'forward', label: 'Forward', icon: 'lucide:arrow-right' }
//         ]}
//         showSearch={true}
//         onSearch={handleSearch}
//       />
//       <Surface className="rounded-xl p-4">
//         <Outlet />
//       </Surface>
//     </div>
//   )
// }
// app/routes/academic/route.lazy.tsx
import { Outlet, createLazyFileRoute } from '@tanstack/react-router'
import { useLocation, useNavigate } from '@tanstack/react-router'

import { Surface } from '@vezham/react/v3'

import DynamicHeader, {
  ActionItem,
  TabItem
} from '../../components/actions-header'

export const Route = createLazyFileRoute('/academic')({
  component: RouteComponent
})

function RouteComponent() {
  const location = useLocation()
  const navigate = useNavigate()

  const openAcademicModal = (modal: 'class' | 'schedule') => {
    window.dispatchEvent(new CustomEvent(`academic:${modal}:open`))
  }

  const getCurrentSection = (pathname: string): string => {
    if (pathname.includes('/academic/classes')) return 'classes'
    if (pathname.includes('/academic/examinations')) return 'examinations'
    return 'default'
  }

  const currentSection = getCurrentSection(location.pathname)

  const getTabsForSection = (section: string): TabItem[] => {
    switch (section) {
      case 'classes':
        return [
          {
            key: 'all-classes',
            title: 'All Classes',
            icon: 'lucide:book-open',
            href: '/academic/classes/allclasses'
          },
          {
            key: 'schedule',
            title: 'Schedule',
            icon: 'lucide:calendar',
            href: '/academic/classes/schedule'
          }
        ]

      case 'examinations':
        return [
          {
            key: 'exam',
            title: 'Exam',
            icon: 'lucide:calendar',
            href: '/academic/examinations/exam'
          },
          {
            key: 'exam-schedule',
            title: 'Exam Schedule',
            icon: 'lucide:award',
            href: '/academic/examinations/schedule'
          },
          {
            key: 'grades',
            title: 'Grades',
            icon: 'lucide:bar-chart',
            href: '/academic/examinations/grades'
          },
          {
            key: 'exam-attendance',
            title: 'Exam Attendance',
            icon: 'lucide:clock',
            href: '/academic/examinations/attendance'
          },
          {
            key: 'exam-results',
            title: 'Exam Results',
            icon: 'lucide:clock',
            href: '/academic/examinations/results'
          }
        ]
      default:
        return []
    }
  }

  const getActionsForSection = (
    section: string,
    activePageKey?: string
  ): ActionItem[] => {
    switch (section) {
      case 'classes':
        return [
          {
            key: 'add',
            label: activePageKey === 'schedule' ? 'Add Schedule' : 'Add Class',
            icon: 'lucide:plus',
            onAction: pageKey => {
              openAcademicModal(pageKey === 'schedule' ? 'schedule' : 'class')
              console.log(
                pageKey === 'schedule'
                  ? `Create schedule on: ${pageKey}`
                  : `Create class on: ${pageKey}`
              )
            }
          },
          {
            key: 'refresh',
            label: 'Refresh',
            icon: 'lucide:refresh-cw',
            onAction: pageKey => {
              console.log(`Export classes on: ${pageKey}`)
            }
          },
          {
            key: 'import',
            label: 'Import Classes',
            icon: 'lucide:upload',
            onAction: pageKey => {
              console.log(`Import classes on: ${pageKey}`)
            }
          },
          {
            key: 'export',
            label: 'Export List',
            icon: 'lucide:download',
            onAction: pageKey => {
              console.log(`Export classes on: ${pageKey}`)
            }
          }
        ]
      case 'examinations':
        return [
          {
            key: 'add',
            label: 'Add Exam',
            icon: 'lucide:plus',
            onAction: pageKey => {
              console.log(`Create exam on: ${pageKey}`)
            }
          },
          {
            key: 'publish',
            label: 'Publish Results',
            icon: 'lucide:send',
            onAction: pageKey => {
              console.log(`Publish results on: ${pageKey}`)
            }
          },
          {
            key: 'export',
            label: 'Export Results',
            icon: 'lucide:download',
            shortcut: '⌘E',
            onAction: pageKey => {
              console.log(`Export results on: ${pageKey}`)
            }
          }
        ]
      default:
        return [
          {
            key: 'create',
            label: 'Create',
            icon: 'lucide:plus',
            onAction: pageKey => {
              console.log(`Create class on: ${pageKey}`)
            }
          },
          {
            key: 'refresh',
            label: 'Refresh',
            icon: 'lucide:refresh-cw',
            onAction: pageKey => {
              console.log(`Export classes on: ${pageKey}`)
            }
          },
          {
            key: 'import',
            label: 'Import Classes',
            icon: 'lucide:upload',
            onAction: pageKey => {
              console.log(`Import classes on: ${pageKey}`)
            }
          },
          {
            key: 'export',
            label: 'Export List',
            icon: 'lucide:download',
            onAction: pageKey => {
              console.log(`Export classes on: ${pageKey}`)
            }
          }
        ]
    }
  }

  const tabs = getTabsForSection(currentSection)
  const activeTab =
    tabs.find(tab => location.pathname.startsWith(tab.href))?.key ||
    tabs[0]?.key ||
    'default'
  const actions = getActionsForSection(currentSection, activeTab)

  const handleSearch = (query: string, pageKey: string) => {
    console.log(
      `Searching "${query}" on ${pageKey} for section: ${currentSection}`
    )
  }

  const leftActions: ActionItem[] = [
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

  return (
    <div className="flex min-h-screen w-full flex-col p-4">
      <DynamicHeader
        tabs={tabs}
        activeTab={activeTab}
        rightActions={actions}
        leftActions={leftActions}
        showSearch={true}
        onSearch={handleSearch}
      />
      <Surface className="rounded-xl p-4">
        <Outlet />
      </Surface>
    </div>
  )
}
