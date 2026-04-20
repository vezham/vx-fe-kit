'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Icon } from '@iconify/react'
import React from 'react'

import { Accordion } from '@vezham/react/v3'

interface SortableFolderItemProps {
  id: string
  folder: string
  items: any[]
  getFolderAccordionProps: any
  getFolderItemProps: any
  getFolderHeadingProps: any
  getFolderTriggerProps: any
  getFolderTriggerContentProps: any
  getFolderIconProps: any
  getFolderNameProps: any
  getFolderCountProps: any
  getFolderIndicatorProps: any
  getFolderPanelProps: any
  getFolderBodyProps: any
  renderBookmarkItems: (
    items: any[],
    isFolderContent: boolean
  ) => React.ReactNode
}

export const SortableFolderItem: React.FC<SortableFolderItemProps> = ({
  id,
  folder,
  items,
  getFolderAccordionProps,
  getFolderItemProps,
  getFolderHeadingProps,
  getFolderTriggerProps,
  getFolderTriggerContentProps,
  getFolderIconProps,
  getFolderNameProps,
  getFolderCountProps,
  getFolderIndicatorProps,
  getFolderPanelProps,
  getFolderBodyProps,
  renderBookmarkItems
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  }

  const handleDragStart = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target.closest('[data-accordion-trigger]') ||
      target.closest('[data-accordion-indicator]')
    ) {
      e.stopPropagation()
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={handleDragStart}>
      <Accordion hideSeparator {...getFolderAccordionProps()}>
        <Accordion.Item {...getFolderItemProps()}>
          <Accordion.Heading {...getFolderHeadingProps()}>
            <Accordion.Trigger
              {...getFolderTriggerProps()}
              data-accordion-trigger>
              <div {...getFolderTriggerContentProps()}>
                <Icon {...getFolderIconProps()} />
                <span {...getFolderNameProps(folder)} />
                <span {...getFolderCountProps(items.length)} />
              </div>
              <Accordion.Indicator
                {...getFolderIndicatorProps()}
                data-accordion-indicator>
                <Icon icon="solar:alt-arrow-down-linear" width={18} />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel {...getFolderPanelProps()}>
            <Accordion.Body {...getFolderBodyProps()}>
              {renderBookmarkItems(items, true)}
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
