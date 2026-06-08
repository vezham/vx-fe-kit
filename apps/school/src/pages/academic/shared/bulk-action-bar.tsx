import { ActionBar } from '@heroui-pro/react/action-bar'
import { Icon } from '@iconify/react'

import { Button, Chip, Separator, Tooltip } from '@vezham/react-v3'

type BulkActionBarProps = {
  ariaLabel: string
  selectedCount: number
  onEdit: () => void
  onCopyIds: () => void
  onCopyLinks: () => void
  onDelete: () => void
  onClearSelection: () => void
  editLabel: string
  deleteLabel: string
}

export function BulkActionBar({
  ariaLabel,
  selectedCount,
  onEdit,
  onCopyIds,
  onCopyLinks,
  onDelete,
  onClearSelection,
  editLabel,
  deleteLabel
}: BulkActionBarProps) {
  return (
    <ActionBar aria-label={ariaLabel} isOpen={selectedCount > 0}>
      <ActionBar.Prefix>
        <Chip className="shrink-0 tabular-nums" size="sm">
          {selectedCount}
        </Chip>
      </ActionBar.Prefix>
      <Separator />
      <ActionBar.Content>
        <Button
          aria-label={editLabel}
          isDisabled={selectedCount !== 1}
          size="sm"
          variant="ghost"
          onPress={onEdit}>
          <Icon icon="lucide:pencil" width={16} />
          <span className="action-bar__label">Edit</span>
        </Button>
        <Button
          aria-label="Copy selected IDs"
          size="sm"
          variant="ghost"
          onPress={onCopyIds}>
          <Icon icon="lucide:hash" width={16} />
          <span className="action-bar__label">Copy IDs</span>
        </Button>
        <Button
          aria-label="Copy selected links"
          size="sm"
          variant="ghost"
          onPress={onCopyLinks}>
          <Icon icon="lucide:link" width={16} />
          <span className="action-bar__label">Copy Links</span>
        </Button>
        <Button
          aria-label={deleteLabel}
          className="text-danger bg-danger/10"
          size="sm"
          variant="ghost"
          onPress={onDelete}>
          <Icon icon="lucide:trash-2" width={16} />
          <span className="action-bar__label">Delete</span>
        </Button>
      </ActionBar.Content>
      <Separator />
      <ActionBar.Suffix>
        <Tooltip delay={0}>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              aria-label="Clear selection"
              size="sm"
              variant="ghost"
              onPress={onClearSelection}>
              <Icon icon="lucide:x" width={16} />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Clear selection</Tooltip.Content>
        </Tooltip>
      </ActionBar.Suffix>
    </ActionBar>
  )
}
