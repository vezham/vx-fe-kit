import { Icon } from '@iconify/react'

import { Tooltip } from '@vezham/react-v3'

import { InfoPanelDefinition, useInfoPanel } from '../../info-panel'
import { BookmarksContent } from '../bookmarks'

export function Bookmarks1Trigger() {
  const { activeInfoPanel, toggleInfoPanel } = useInfoPanel()
  const isActive = activeInfoPanel === 'bookmarks1'

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>
        <span aria-label="Bookmarks1">
          <Icon
            className={isActive ? 'text-muted' : ''}
            icon={isActive ? 'solar:star-bold' : 'solar:star-linear'}
            width={24}
            onClick={() => toggleInfoPanel('bookmarks1')}
          />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content placement="right">Bookmarks1</Tooltip.Content>
    </Tooltip>
  )
}

export function Bookmarks1Content() {
  return <BookmarksContent isOpen={false} onClose={() => undefined} />
}

export const bookmarks1Panel: InfoPanelDefinition = {
  title: 'Bookmarks1',
  content: <Bookmarks1Content />
}
