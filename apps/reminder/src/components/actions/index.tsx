'use client'

import { Icon } from '@iconify/react'
import React from 'react'

import { Divider } from '@vezham/react/v2'
import { Button, Dropdown, Label, Surface } from '@vezham/react/v3'

import { ContainerActionsProps } from './types'

export const ContainerActions: React.FC<ContainerActionsProps> = ({
  showSearch = true,
  showAdd = true,
  showMore = true,
  onSearch,
  onNewReminder,
  onNewList
}) => {
  return (
    <Surface
      variant="transparent"
      className="fixed right-9 bottom-24 z-50 flex flex-col gap-4 md:top-5 md:right-5 lg:bg-transparent">
      {/* 🔍 Search */}
      {showSearch && (
        <Button
          isIconOnly
          variant="tertiary"
          size="md"
          className="shadow-md"
          onPress={() => onSearch?.('')}>
          <Icon icon="mdi:magnify" width={24} />
        </Button>
      )}

      {/* ➕ + ⋯ Group */}
      {(showAdd || showMore) && (
        <div className="border-default-200 flex flex-col items-center overflow-hidden rounded-full border shadow-lg lg:flex-row">
          {/* ➕ ADD DROPDOWN */}
          {showAdd && (
            <Dropdown>
              <Dropdown.Trigger>
                <Button
                  isIconOnly
                  size="md"
                  variant="outline"
                  className="rounded-none">
                  <Icon icon="mdi:plus" width={24} />
                </Button>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <Dropdown.Menu>
                  <Dropdown.Item key="new-reminder" onPress={onNewReminder}>
                    <Label>New Reminder</Label>
                  </Dropdown.Item>

                  <Dropdown.Item key="new-list" onPress={onNewList}>
                    <Label>New List</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}

          {showAdd && showMore && (
            <div className="hidden lg:block">
              <Divider orientation="vertical" />
            </div>
          )}

          {showAdd && showMore && (
            <div className="lg:hidden">
              <Divider />
            </div>
          )}

          {showMore && (
            <Dropdown>
              <Dropdown.Trigger>
                <Button
                  isIconOnly
                  size="md"
                  variant="tertiary"
                  className="rounded-none">
                  <Icon icon="mdi:dots-horizontal" width={24} />
                </Button>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <Dropdown.Menu>
                  <Dropdown.Item key="export">
                    <Label>Export</Label>
                  </Dropdown.Item>

                  <Dropdown.Item key="download">
                    <Label>Download</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
      )}
    </Surface>
  )
}
