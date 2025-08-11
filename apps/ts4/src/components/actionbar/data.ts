import { ActionButtonProps } from './types'

export const searchAction: ActionButtonProps = {
  icon: 'lucide:search',
  label: 'Search'
  // onClick: () => alert("Search clicked!"),
}

export const viewActions: ActionButtonProps[] = [
  { icon: 'lucide:grid', label: 'Grid' },
  { icon: 'lucide:list', label: 'List' },
  { icon: 'lucide:layout-grid', label: 'Tile' }
]

export const otherActions: ActionButtonProps[] = [
  { icon: 'lucide:scissors', label: 'Cut' },
  { icon: 'lucide:copy', label: 'Copy' },
  { icon: 'lucide:clipboard', label: 'Paste' },
  { icon: 'lucide:trash-2', label: 'Delete', color: 'danger' }
]
