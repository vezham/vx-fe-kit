import { Icon } from '@iconify/react'
import {
  Link,
  Outlet,
  createLazyFileRoute,
  useLocation,
  useNavigate
} from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import {
  Button,
  Drawer,
  Dropdown,
  InputGroup,
  Surface,
  Tabs,
  TextField
} from '@vezham/react/v3'

type AcademicMenuItem = {
  key: string
  title: string
  href: string
  icon: string
  children?: AcademicMenuItem[]
}

type AcademicTab = {
  key: string
  title: string
  href: string
}

type ActionItem = {
  key: string
  label: string
  icon: string
  onAction?: () => void
  isVisible?: (pageKey: string) => boolean
  kind?: 'search' | 'refresh' | 'menu' | 'primary'
}

type HeaderActionsConfig = {
  leftActions?: ActionItem[]
  rightActions?: ActionItem[]
}

const sidebarItems: AcademicMenuItem[] = [
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

export const Route = createLazyFileRoute('/academic1')({
  component: AcademicLayout
})

function AcademicLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  const location = useLocation()
  const activeTabs = getActiveTabs(location.pathname)
  const activePageKey = getActivePageKey(location.pathname)
  const rightActions = useMemo(
    () => getPageRightActions(activePageKey),
    [activePageKey]
  )

  return (
    <div className="bg-background flex min-h-screen min-w-0 flex-1 flex-col">
      <AcademicHeader
        tabs={activeTabs}
        activePageKey={activePageKey}
        actions={{ rightActions }}
        sidebarCollapsed={collapsed}
        onToggleSidebar={() => {
          if (window.matchMedia('(min-width: 768px)').matches) {
            setCollapsed(isCollapsed => !isCollapsed)
          } else {
            setIsSidebarOpen(true)
          }
        }}
      />

      <div className="flex min-h-0 flex-1">
        <aside
          className={`border-default-200 bg-background hidden shrink-0 overflow-hidden border-r transition-all duration-300 md:block ${
            collapsed ? 'w-0 border-r-0' : 'w-64'
          }`}>
          <AcademicSidebar collapsed={collapsed} />
        </aside>

        <main className="min-w-0 flex-1 overflow-auto p-4">
          <Surface className="min-h-full rounded-lg p-4 sm:p-5">
            <Outlet />
          </Surface>
        </main>
      </div>

      <Drawer isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <Drawer.Content placement="left">
          <Drawer.Dialog className="bg-background w-[min(20rem,calc(100vw-2rem))]">
            <div className="border-default-200 flex items-center justify-between border-b p-4">
              <Drawer.Header className="text-base font-semibold">
                Academic
              </Drawer.Header>
              <Button
                variant="ghost"
                className="h-9 w-9 min-w-9 p-0"
                aria-label="Close academic navigation"
                onClick={() => setIsSidebarOpen(false)}>
                <Icon icon="lucide:x" width={18} />
              </Button>
            </div>
            <Drawer.Body className="p-4">
              <AcademicSidebar
                collapsed={false}
                onToggle={() => undefined}
                onNavigate={() => setIsSidebarOpen(false)}
                hideToggle
              />
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </div>
  )
}

function AcademicHeader({
  tabs,
  activePageKey,
  actions,
  sidebarCollapsed,
  onToggleSidebar
}: {
  tabs: AcademicTab[]
  activePageKey: string
  actions?: HeaderActionsConfig
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
}) {
  const resolvedLeftActions = mergeActions(
    defaultLeftActions,
    actions?.leftActions
  )
  const resolvedRightActions = mergeActions(
    defaultRightActions,
    actions?.rightActions
  )
  const visibleRightActions = resolvedRightActions.filter(
    action => !action.isVisible || action.isVisible(activePageKey)
  )
  const searchAction = visibleRightActions.find(
    action => action.kind === 'search'
  )
  const primaryAction = visibleRightActions.find(
    action => action.kind === 'primary'
  )
  const refreshAction = visibleRightActions.find(
    action => action.kind === 'refresh'
  )
  const menuActions = visibleRightActions.filter(
    action => action.kind === 'menu'
  )

  return (
    <header className="border-default-200 bg-background sticky top-0 z-30 border-b px-3 py-2 sm:px-4">
      <div className="flex min-h-12 items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <Button
            variant="ghost"
            className="h-9 w-9 min-w-9 p-0"
            aria-label={
              sidebarCollapsed
                ? 'Expand academic navigation'
                : 'Collapse academic navigation'
            }
            onClick={onToggleSidebar}>
            <Icon
              icon={
                sidebarCollapsed
                  ? 'lucide:panel-left-open'
                  : 'lucide:panel-left-close'
              }
              width={18}
            />
          </Button>

          {resolvedLeftActions.map(action => (
            <Button
              key={action.key}
              variant="ghost"
              className="h-9 w-9 min-w-9 p-0"
              aria-label={action.label}
              onClick={action.onAction}>
              <Icon icon={action.icon} width={18} />
            </Button>
          ))}

          {tabs.length ? (
            <div className="hidden min-w-0 flex-1 sm:block">
              <HeaderTabs tabs={tabs} />
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {searchAction ? (
            <>
              <TextField
                aria-label={searchAction.label}
                className="hidden w-56 md:block">
                <InputGroup>
                  <InputGroup.Prefix>
                    <Icon
                      icon={searchAction.icon}
                      className="text-muted-foreground h-4 w-4"
                    />
                  </InputGroup.Prefix>
                  <InputGroup.Input placeholder={searchAction.label} />
                </InputGroup>
              </TextField>
              <Button
                variant="ghost"
                className="h-9 w-9 min-w-9 p-0 md:hidden"
                aria-label={searchAction.label}
                onClick={searchAction.onAction}>
                <Icon icon={searchAction.icon} width={18} />
              </Button>
            </>
          ) : null}

          {refreshAction ? (
            <Button
              variant="ghost"
              className="h-9 w-9 min-w-9 p-0"
              aria-label={refreshAction.label}
              onClick={refreshAction.onAction}>
              <Icon icon={refreshAction.icon} width={18} />
            </Button>
          ) : null}

          {menuActions.length ? <MoreActions actions={menuActions} /> : null}

          {primaryAction ? (
            <Button
              className="h-9 min-w-9 px-0 md:px-3"
              aria-label={primaryAction.label}
              onClick={primaryAction.onAction}>
              <Icon icon={primaryAction.icon} width={18} />
              <span className="hidden md:inline">{primaryAction.label}</span>
            </Button>
          ) : null}
        </div>
      </div>

      {tabs.length ? (
        <div className="flex min-w-0 justify-center pt-2 sm:hidden">
          <HeaderTabs tabs={tabs} />
        </div>
      ) : null}
    </header>
  )
}

function MoreActions({ actions }: { actions: ActionItem[] }) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          variant="ghost"
          className="h-9 px-0 md:px-3"
          aria-label="More actions">
          <Icon icon="lucide:more-vertical" width={18} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu>
          {actions.map(action =>
            action.key === 'export' ? (
              <Dropdown.SubmenuTrigger key={action.key}>
                <Dropdown.Item id={action.key} textValue={action.label}>
                  <span className="flex items-center gap-2">
                    <Icon icon={action.icon} width={16} />
                    {action.label}
                  </span>
                  <Dropdown.SubmenuIndicator />
                </Dropdown.Item>
                <Dropdown.Popover>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      id="export-pdf"
                      textValue="Export as PDF"
                      onPress={action.onAction}>
                      <span className="flex items-center gap-2">
                        <Icon icon="lucide:file-text" width={16} />
                        Export as PDF
                      </span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="export-excel"
                      textValue="Export as Excel"
                      onPress={action.onAction}>
                      <span className="flex items-center gap-2">
                        <Icon icon="lucide:file-spreadsheet" width={16} />
                        Export as Excel
                      </span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown.SubmenuTrigger>
            ) : (
              <Dropdown.Item
                key={action.key}
                id={action.key}
                textValue={action.label}
                onPress={action.onAction}>
                <span className="flex items-center gap-2">
                  <Icon icon={action.icon} width={16} />
                  {action.label}
                </span>
              </Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

function AcademicSidebar({
  collapsed,
  onToggle,
  onNavigate,
  hideToggle = true
}: {
  collapsed: boolean
  onToggle?: (collapsed: boolean) => void
  onNavigate?: () => void
  hideToggle?: boolean
}) {
  return (
    <nav
      className={collapsed ? 'flex justify-center p-2' : 'space-y-1 p-4'}
      aria-label="Academic navigation">
      {!hideToggle ? (
        <Button
          variant="ghost"
          className="mb-2 h-9 w-9 min-w-9 p-0"
          aria-label={
            collapsed
              ? 'Expand academic navigation'
              : 'Collapse academic navigation'
          }
          onClick={() => onToggle?.(!collapsed)}>
          <Icon
            icon={collapsed ? 'lucide:chevron-right' : 'lucide:chevron-left'}
            width={18}
          />
        </Button>
      ) : null}

      {collapsed ? null : (
        <div className="space-y-1">
          {sidebarItems.map(item => (
            <SidebarItem key={item.key} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </nav>
  )
}

function SidebarItem({
  item,
  onNavigate
}: {
  item: AcademicMenuItem
  onNavigate?: () => void
}) {
  const location = useLocation()
  const isActive =
    location.pathname === item.href ||
    location.pathname.startsWith(`${item.href}/`)

  return (
    <Link
      to={item.href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
        isActive
          ? 'bg-primary/10 text-primary text-lg font-medium active:scale-95'
          : 'text-muted hover:bg-primary/5 hover:text-muted'
      }`}
      onClick={onNavigate}>
      <Icon
        icon={item.icon}
        width={18}
        className={isActive ? 'text-primary' : 'text-muted'}
      />
      <span className={`min-w-0 truncate ${isActive ? 'font-bold' : ''}`}>
        {item.title}
      </span>
    </Link>
  )
}

function HeaderTabs({ tabs }: { tabs: AcademicTab[] }) {
  const location = useLocation()
  const navigate = useNavigate()
  const selectedKey = tabs.find(
    tab =>
      location.pathname === tab.href ||
      location.pathname.startsWith(`${tab.href}/`)
  )?.key

  return (
    <div className="scrollbar-hide w-full overflow-x-auto rounded-full sm:max-w-fit">
      <Tabs
        selectedKey={selectedKey}
        onSelectionChange={key => {
          const tab = tabs.find(item => item.key === String(key))

          if (tab) {
            navigate({ to: tab.href })
          }
        }}>
        <Tabs.ListContainer>
          <Tabs.List
            aria-label="Academic sub navigation"
            className="flex min-w-max flex-nowrap *:whitespace-nowrap">
            {tabs.map((tab, index) => (
              <Tabs.Tab
                key={tab.key}
                id={tab.key}
                className="whitespace-nowrap">
                {index > 0 ? <Tabs.Separator /> : null}
                {tab.title}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </div>
  )
}

const defaultLeftActions: ActionItem[] = [
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

const defaultRightActions: ActionItem[] = [
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

const createLabelsByPageKey: Record<string, string> = {
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

const createExcludedPageKeys = new Set(['exam-attendance', 'exam-results'])

function getPageRightActions(activePageKey: string): ActionItem[] {
  if (createExcludedPageKeys.has(activePageKey)) {
    return [
      {
        key: 'create',
        label: 'Create',
        icon: 'lucide:plus',
        kind: 'primary',
        isVisible: () => false
      }
    ]
  }

  const label = createLabelsByPageKey[activePageKey]

  return label
    ? [
        {
          key: 'create',
          label,
          icon: 'lucide:plus',
          kind: 'primary'
        }
      ]
    : []
}

function mergeActions(
  defaultActions: ActionItem[],
  pageActions?: ActionItem[]
) {
  if (!pageActions?.length) {
    return defaultActions
  }

  const actionMap = new Map(defaultActions.map(action => [action.key, action]))

  pageActions.forEach(action => {
    actionMap.set(action.key, {
      ...actionMap.get(action.key),
      ...action
    })
  })

  return Array.from(actionMap.values())
}

function getActiveTabs(pathname: string) {
  const activeItem = sidebarItems.find(
    item => pathname === item.href || pathname.startsWith(`${item.href}/`)
  )

  return (
    activeItem?.children?.map(child => ({
      key: child.key,
      title: child.title,
      href: child.href
    })) ?? []
  )
}

function getActivePageKey(pathname: string) {
  const allItems = sidebarItems.flatMap(item => [
    item,
    ...(item.children ?? [])
  ])
  const activeItem = allItems
    .filter(
      item => pathname === item.href || pathname.startsWith(`${item.href}/`)
    )
    .sort((a, b) => b.href.length - a.href.length)[0]

  return activeItem?.key ?? 'academic1'
}
