import { ActionBar } from '@heroui-pro/react/action-bar'
import { Icon } from '@iconify/react'

import { Button, Chip, Separator, Tooltip } from '@vezham/react-v3'

type BulkActionBarProps = {
  ariaLabel: string
  selectedCount: number
  entityLabel?: string
  entityPluralLabel?: string
  editLabel?: string
  deleteLabel?: string
  onBulkEdit?: () => void
  onBulkCopyIds?: () => void
  onBulkCopyLinks?: () => void
  onBulkDelete?: () => void
  onEdit?: () => void
  onCopyIds?: () => void
  onCopyLinks?: () => void
  onDelete?: () => void
  onClearSelection: () => void
}

export function BulkActionBar({
  ariaLabel,
  entityLabel,
  entityPluralLabel,
  editLabel,
  deleteLabel,
  selectedCount,
  onBulkEdit,
  onBulkCopyIds,
  onBulkCopyLinks,
  onBulkDelete,
  onEdit,
  onCopyIds,
  onCopyLinks,
  onDelete,
  onClearSelection
}: BulkActionBarProps) {
  const resolvedEntityLabel = entityLabel ?? 'item'
  const resolvedEntityPluralLabel =
    entityPluralLabel ?? `${resolvedEntityLabel}s`
  const resolvedEdit = onBulkEdit ?? onEdit
  const resolvedCopyIds = onBulkCopyIds ?? onCopyIds
  const resolvedCopyLinks = onBulkCopyLinks ?? onCopyLinks
  const resolvedDelete = onBulkDelete ?? onDelete

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
          aria-label={`Edit selected ${resolvedEntityPluralLabel}`}
          isDisabled={selectedCount !== 1}
          size="sm"
          variant="ghost"
          onPress={resolvedEdit}>
          <Icon icon="lucide:pencil" width={16} />
          <span className="action-bar__label">{editLabel ?? 'Edit'}</span>
        </Button>
        <Button
          aria-label={`Copy selected ${resolvedEntityPluralLabel} IDs`}
          size="sm"
          variant="ghost"
          onPress={resolvedCopyIds}>
          <Icon icon="lucide:hash" width={16} />
          <span className="action-bar__label">Copy IDs</span>
        </Button>
        <Button
          aria-label={`Copy selected ${resolvedEntityPluralLabel} links`}
          size="sm"
          variant="ghost"
          onPress={resolvedCopyLinks}>
          <Icon icon="lucide:link" width={16} />
          <span className="action-bar__label">Copy Links</span>
        </Button>
        <Button
          aria-label={`Delete selected ${resolvedEntityPluralLabel}`}
          className="text-danger bg-danger/10"
          size="sm"
          variant="ghost"
          onPress={resolvedDelete}>
          <Icon icon="lucide:trash-2" width={16} />
          <span className="action-bar__label">{deleteLabel ?? 'Delete'}</span>
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
