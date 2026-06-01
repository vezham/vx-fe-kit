import { Command } from '@heroui-pro/react'
import { Icon } from '@iconify/react'

interface CommandDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onAction?: () => void
}

const navigationCommands = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Open overview',
    icon: 'solar:home-smile-linear'
  },
  {
    id: 'students',
    label: 'Students',
    description: 'Browse student records',
    icon: 'solar:users-group-rounded-linear'
  },
  {
    id: 'teachers',
    label: 'Teachers',
    description: 'Browse teacher records',
    icon: 'solar:user-id-linear'
  }
]

const actionCommands = [
  {
    id: 'create-student',
    label: 'Create Student',
    description: 'Start a new student profile',
    icon: 'solar:user-plus-linear'
  },
  {
    id: 'create-teacher',
    label: 'Create Teacher',
    description: 'Start a new teacher profile',
    icon: 'solar:user-check-linear'
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Open preferences',
    icon: 'solar:settings-linear'
  }
]

export function CommandPaletteDialog({
  isOpen,
  onOpenChange,
  onAction
}: CommandDialogProps) {
  return (
    <Command>
      <Command.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        variant="blur">
        <Command.Container size="lg">
          <Command.Dialog>
            <Command.Header>
              <Command.InputGroup>
                <Command.InputGroup.Prefix>
                  <Icon icon="solar:magnifer-linear" width={18} />
                </Command.InputGroup.Prefix>
                <Command.InputGroup.Input placeholder="Search commands..." />
                <Command.InputGroup.ClearButton aria-label="Clear search" />
              </Command.InputGroup>
            </Command.Header>

            <Command.List
              aria-label="Command palette"
              renderEmptyState={() => 'No commands found.'}>
              <Command.Group heading="Navigation">
                {navigationCommands.map(command => (
                  <Command.Item
                    key={command.id}
                    id={command.id}
                    textValue={`${command.label} ${command.description}`}
                    onAction={onAction}>
                    <CommandItemContent {...command} />
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Separator />

              <Command.Group heading="Actions">
                {actionCommands.map(command => (
                  <Command.Item
                    key={command.id}
                    id={command.id}
                    textValue={`${command.label} ${command.description}`}
                    onAction={onAction}>
                    <CommandItemContent {...command} />
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command.Dialog>
        </Command.Container>
      </Command.Backdrop>
    </Command>
  )
}

function CommandItemContent({
  label,
  description,
  icon
}: {
  label: string
  description: string
  icon: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="bg-default-100 text-default-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
        <Icon icon={icon} width={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-foreground block truncate text-sm font-medium">
          {label}
        </span>
        <span className="text-muted block truncate text-xs">{description}</span>
      </span>
    </div>
  )
}
