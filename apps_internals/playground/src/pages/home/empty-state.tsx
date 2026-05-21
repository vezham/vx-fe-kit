import { FolderOpen } from '@gravity-ui/icons'
import { ContextMenu, EmptyState } from '@heroui-pro/react'

import { Button } from '@vezham/react/v3'

export default () => {
  return (
    <div className="w-[420px]">
      <EmptyState>
        <EmptyState.Header>
          <EmptyState.Media variant="icon">
            <FolderOpen />
          </EmptyState.Media>
          <EmptyState.Title>No Projects Yet</EmptyState.Title>
          <EmptyState.Description>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyState.Description>
        </EmptyState.Header>
        <EmptyState.Content className="flex-row gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </EmptyState.Content>
      </EmptyState>

      <ContextMenu>
        <ContextMenu.Trigger>
          <div>Right click</div>
        </ContextMenu.Trigger>

        <ContextMenu.Popover>
          <ContextMenu.Menu>
            <ContextMenu.Item id="1" textValue="Test">
              Test
            </ContextMenu.Item>
          </ContextMenu.Menu>
        </ContextMenu.Popover>
      </ContextMenu>
    </div>
  )
}
