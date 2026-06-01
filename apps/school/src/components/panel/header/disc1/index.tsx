import { Icon } from '@iconify/react'

import { Tooltip } from '@vezham/react-v3'

import { InfoPanelDefinition, useInfoPanel } from '../../info-panel'
import { DiskContent } from '../disc'

export function Disc1Trigger() {
  const { activeInfoPanel, toggleInfoPanel } = useInfoPanel()
  const isActive = activeInfoPanel === 'disc1'

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>
        <span aria-label="Disc1">
          <Icon
            className={isActive ? 'text-muted' : ''}
            icon={isActive ? 'solar:archive-bold' : 'solar:archive-linear'}
            width={24}
            onClick={() => toggleInfoPanel('disc1')}
          />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content placement="right">Disc1</Tooltip.Content>
    </Tooltip>
  )
}

export function Disc1Content() {
  return <DiskContent isOpen={false} onClose={() => undefined} />
}

export const disc1Panel: InfoPanelDefinition = {
  title: 'Disc1',
  content: <Disc1Content />
}
