import AcademicLayoutPage from '../../academic1/layout'
import { reportsSidebarItems } from './data'
import type { Props } from './types'

export default function ReportsLayoutPage(props: Props) {
  return (
    <AcademicLayoutPage
      {...props}
      layout={{
        title: 'Reports',
        navigationLabel: 'Reports navigation',
        subNavigationLabel: 'Reports sub navigation',
        createEventPrefix: 'reports',
        collapsedSidebarMode: 'hidden',
        initialSidebarCollapsed: false,
        renderChildrenInSidebar: true,
        sidebarItems: reportsSidebarItems,
        ...props.layout
      }}
    />
  )
}
