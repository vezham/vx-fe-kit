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
  { icon: 'lucide:scissors', label: 'Cut', shortcut: '⌘X' },
  { icon: 'lucide:copy', label: 'Copy', shortcut: '⌘C' },
  { icon: 'lucide:clipboard', label: 'Paste', shortcut: '⌘V' },
  { icon: 'lucide:trash-2', label: 'Delete', color: 'danger', shortcut: '⌘⌫' }
]
