import { Icon } from '@iconify/react'
import { useState } from 'react'

import { forwardRef } from '@vezham/react-utils'
import { Tabs, Tooltip } from '@vezham/react-v3'

import { InfoPanelDefinition, useInfoPanel } from '../../info-panel'
import { Archive } from './archive'
import { sampleArchiveItems, sampleTrashItems } from './data'
import { Trash } from './trash'
import { ArchiveItem, Props, TrashItem, useProps } from './types'

const DiskContent = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    getTabsProps,
    getTabsListContainerProps,
    getTabsListProps,
    getTabArchiveProps,
    getTabTrashProps,
    getTabIndicatorProps,
    getContainerProps,
    getSearchInputProps,
    getActionsBarProps,
    getClearAllButtonProps,
    getRestoreAllButtonProps,
    getEmptyContainerProps,
    getEmptyIconProps,
    getEmptyTitleProps,
    getEmptyDescriptionProps,
    getItemsContainerProps,
    getDateGroupProps,
    getDateHeaderProps,
    getDateLabelProps,
    getDateDividerProps,
    getItemsListProps,
    getItemProps,
    getItemFaviconProps,
    getItemFallbackIconProps,
    getItemContentProps,
    getItemTitleProps,
    getItemUrlProps,
    getItemActionsProps,
    getUnarchiveButtonProps,
    getRestoreButtonProps,
    getDeleteButtonProps,
    getDeletePermanentButtonProps,
    getActionIconProps,
    externalArchiveItems,
    externalTrashItems,
    onUnarchive,
    onDeleteFromArchive,
    onRestore,
    onDeletePermanently,
    onClearAllArchive,
    onClearAllTrash,
    onRestoreAllTrash,
    onItemClick,
    renderArchiveItem,
    renderTrashItem
  } = useProps({
    ...props,
    ref
  })

  const [activeTab, setActiveTab] = useState<string>('archive')
  const [archiveSearch, setArchiveSearch] = useState('')
  const [trashSearch, setTrashSearch] = useState('')
  const [internalArchiveItems, setInternalArchiveItems] =
    useState<ArchiveItem[]>(sampleArchiveItems)
  const [internalTrashItems, setInternalTrashItems] =
    useState<TrashItem[]>(sampleTrashItems)

  const archiveItems = externalArchiveItems || internalArchiveItems
  const trashItems = externalTrashItems || internalTrashItems

  return (
    <Component>
      <div className="flex h-full min-h-0 w-full flex-col gap-4">
        <Tabs
          variant="primary"
          {...getTabsProps()}
          selectedKey={activeTab}
          onSelectionChange={key => setActiveTab(key as string)}>
          <Tabs.ListContainer {...getTabsListContainerProps()}>
            <Tabs.List {...getTabsListProps()}>
              <Tabs.Tab {...getTabArchiveProps()}>
                <Icon icon="solar:archive-linear" width={18} className="mr-2" />
                Archive
                <Tabs.Indicator {...getTabIndicatorProps()} />
              </Tabs.Tab>
              <Tabs.Tab {...getTabTrashProps()}>
                <Icon
                  icon="solar:trash-bin-trash-linear"
                  width={18}
                  className="mr-2"
                />
                Trash
                <Tabs.Indicator {...getTabIndicatorProps()} />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>

        {activeTab === 'archive' ? (
          <Archive
            archiveItems={archiveItems}
            archiveSearch={archiveSearch}
            setArchiveSearch={setArchiveSearch}
            setInternalArchiveItems={setInternalArchiveItems}
            getSearchInputProps={getSearchInputProps}
            getActionsBarProps={getActionsBarProps}
            getClearAllButtonProps={getClearAllButtonProps}
            getContainerProps={getContainerProps}
            getEmptyContainerProps={getEmptyContainerProps}
            getEmptyIconProps={getEmptyIconProps}
            getEmptyTitleProps={getEmptyTitleProps}
            getEmptyDescriptionProps={getEmptyDescriptionProps}
            getItemsContainerProps={getItemsContainerProps}
            getDateGroupProps={getDateGroupProps}
            getDateHeaderProps={getDateHeaderProps}
            getDateLabelProps={getDateLabelProps}
            getDateDividerProps={getDateDividerProps}
            getItemsListProps={getItemsListProps}
            getItemProps={getItemProps}
            getItemFaviconProps={getItemFaviconProps}
            getItemFallbackIconProps={getItemFallbackIconProps}
            getItemContentProps={getItemContentProps}
            getItemTitleProps={getItemTitleProps}
            getItemUrlProps={getItemUrlProps}
            getItemActionsProps={getItemActionsProps}
            getUnarchiveButtonProps={getUnarchiveButtonProps}
            getDeleteButtonProps={getDeleteButtonProps}
            getActionIconProps={getActionIconProps}
            onUnarchive={onUnarchive}
            onDeleteFromArchive={onDeleteFromArchive}
            onClearAllArchive={onClearAllArchive}
            onItemClick={onItemClick}
            renderArchiveItem={renderArchiveItem}
          />
        ) : (
          <Trash
            trashItems={trashItems}
            trashSearch={trashSearch}
            setTrashSearch={setTrashSearch}
            setInternalTrashItems={setInternalTrashItems}
            getSearchInputProps={getSearchInputProps}
            getActionsBarProps={getActionsBarProps}
            getRestoreAllButtonProps={getRestoreAllButtonProps}
            getClearAllButtonProps={getClearAllButtonProps}
            getContainerProps={getContainerProps}
            getEmptyContainerProps={getEmptyContainerProps}
            getEmptyIconProps={getEmptyIconProps}
            getEmptyTitleProps={getEmptyTitleProps}
            getEmptyDescriptionProps={getEmptyDescriptionProps}
            getItemsContainerProps={getItemsContainerProps}
            getDateGroupProps={getDateGroupProps}
            getDateHeaderProps={getDateHeaderProps}
            getDateLabelProps={getDateLabelProps}
            getDateDividerProps={getDateDividerProps}
            getItemsListProps={getItemsListProps}
            getItemProps={getItemProps}
            getItemFaviconProps={getItemFaviconProps}
            getItemFallbackIconProps={getItemFallbackIconProps}
            getItemContentProps={getItemContentProps}
            getItemTitleProps={getItemTitleProps}
            getItemUrlProps={getItemUrlProps}
            getItemActionsProps={getItemActionsProps}
            getRestoreButtonProps={getRestoreButtonProps}
            getDeletePermanentButtonProps={getDeletePermanentButtonProps}
            getActionIconProps={getActionIconProps}
            onRestore={onRestore}
            onDeletePermanently={onDeletePermanently}
            onClearAllTrash={onClearAllTrash}
            onRestoreAllTrash={onRestoreAllTrash}
            renderTrashItem={renderTrashItem}
          />
        )}
      </div>
    </Component>
  )
})

DiskContent.displayName = 'DiskContent'

function DiscTrigger() {
  const { activeInfoPanel, toggleInfoPanel } = useInfoPanel()
  const isActive = activeInfoPanel === 'disc'

  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>
        <span aria-label="Disc">
          <Icon
            className={isActive ? 'text-muted' : ''}
            icon={isActive ? 'solar:archive-bold' : 'solar:archive-linear'}
            width={24}
            onClick={() => toggleInfoPanel('disc')}
          />
        </span>
      </Tooltip.Trigger>
      <Tooltip.Content placement="right">Disc</Tooltip.Content>
    </Tooltip>
  )
}

function DiscPanelContent() {
  return <DiskContent />
}

const discPanel: InfoPanelDefinition = {
  title: 'Disc',
  content: <DiscPanelContent />
}

export { DiscPanelContent, DiscTrigger, DiskContent, discPanel }
