import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React from 'react'

import {
  Button,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Spacer
} from '@vezham/react/v2'

import { CloseIcon, SearchIcon } from '@vx-oss/heroui-v2-shared-icons'

import {
  getColumnProps,
  getDateProps,
  getStatusProps
} from '../../store/useTasks/data'
import { HeaderContentProps, useHeaderContentProps } from './types'

export const HeaderContent: React.FC<HeaderContentProps> = originalProps => {
  const {
    getTopBarContainerProps,
    getTopBarLeftProps,
    getTopBarLeftInnerProps,
    getMembersTextProps,
    getChipProps,
    getSelectedActionsContainerProps,
    getDividerProps,
    getSelectedCountTextProps,
    getSelectedActionsProps,
    getSelectedActionsButtonProps,
    getSelectedActionsMoreButtonProps,
    getDropdownIconProps,
    getTopBarRightProps,
    getSearchContainerProps,
    getSearchButtonProps,
    getSearchInputProps,
    getSearchCloseIconProps,
    getFilterSortButtonsProps,
    getFilterSortButtonProps,
    getFilterSortIconProps,
    getPopoverContentProps,
    getFilterPopoverContentProps,
    getMobileActionsProps,
    getMobileActionsButtonProps,
    getMobileFilterButtonProps,
    getSearchFocusButtonProps,
    isSearchExpanded
  } = useHeaderContentProps(originalProps)

  const isSelectionEmpty =
    originalProps.selectedKeys === 'all'
      ? false
      : originalProps.selectedKeys.size === 0

  return (
    <div {...getTopBarContainerProps()}>
      <div {...getTopBarLeftProps()}>
        <div {...getTopBarLeftInnerProps()}>
          <p {...getMembersTextProps()}>Tasks</p>
          <Chip {...getChipProps()} size="sm" variant="flat">
            {originalProps.usersLength}
          </Chip>
        </div>

        <div>
          {!isSelectionEmpty && (
            <div {...getSelectedActionsContainerProps()}>
              <Divider {...getDividerProps()} orientation="vertical" />
              <div {...getSelectedCountTextProps()}>
                {originalProps.selectedKeys === 'all'
                  ? 'All selected'
                  : `${originalProps.selectedKeys.size} Selected`}
              </div>
              <Divider className="block h-5 sm:hidden" orientation="vertical" />
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    size="sm"
                    variant="flat"
                    {...getSelectedActionsProps()}>
                    <span {...getSelectedActionsMoreButtonProps()}>
                      <Icon
                        icon="solar:menu-dots-bold"
                        width={10}
                        height={10}
                      />
                    </span>
                    <span {...getSelectedActionsButtonProps()}>
                      <span>Selected Actions</span>
                      <Icon
                        {...getDropdownIconProps()}
                        icon="solar:alt-arrow-down-linear"
                      />
                    </span>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Selected Actions">
                  <DropdownItem key="send-email">Send email</DropdownItem>
                  <DropdownItem key="pay-invoices">Bulk delete</DropdownItem>
                  <DropdownItem key="bulk-edit">Bulk edit</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
      {isSelectionEmpty && (
        <div {...getTopBarRightProps()}>
          <motion.div
            initial={{ width: 40 }}
            animate={{ width: isSearchExpanded ? 150 : 40 }}
            transition={{ ease: 'easeInOut' }}
            {...getSearchContainerProps()}>
            {isSearchExpanded ? (
              <Input
                {...getSearchInputProps()}
                ref={originalProps.searchInputRef}
                endContent={
                  <button
                    {...getSearchFocusButtonProps()}
                    onClick={() => {
                      if (originalProps.filterValue) {
                        originalProps.setFilterValue('')
                      } else {
                        originalProps.toggleSearch()
                      }
                    }}>
                    <CloseIcon {...getSearchCloseIconProps()} width={16} />
                  </button>
                }
                placeholder="Search"
                size="sm"
                value={originalProps.filterValue}
                onValueChange={originalProps.onSearchChange}
              />
            ) : (
              <button
                {...getSearchButtonProps()}
                onClick={originalProps.toggleSearch}>
                <SearchIcon className="text-default-600" width={18} />
              </button>
            )}
          </motion.div>

          <div className="flex items-center gap-2">
            <div {...getFilterSortButtonsProps()}>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button
                    {...getFilterSortButtonProps()}
                    size="sm"
                    startContent={
                      <Icon
                        {...getFilterSortIconProps()}
                        icon="solar:tuning-2-linear"
                        width={16}
                      />
                    }>
                    {!isSearchExpanded && 'Filter'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent {...getPopoverContentProps()}>
                  <div {...getFilterPopoverContentProps()}>
                    <RadioGroup
                      label="Status"
                      value={originalProps.statusFilter}
                      onValueChange={originalProps.setStatusFilter}>
                      <Radio value="all">All</Radio>
                      {Object.entries(getStatusProps).map(
                        ([key, { label }]) => (
                          <Radio key={key} value={key}>
                            {label}
                          </Radio>
                        )
                      )}
                    </RadioGroup>
                    <Spacer y={5} />
                    <RadioGroup
                      label="Start Date"
                      value={originalProps.startDateFilter}
                      onValueChange={originalProps.setStartDateFilter}>
                      {Object.entries(getDateProps).map(([key, { label }]) => (
                        <Radio key={key} value={key}>
                          {label}
                        </Radio>
                      ))}
                    </RadioGroup>
                    <Spacer y={5} />
                    <RadioGroup
                      label="Due Date"
                      value={originalProps.dueDateFilter}
                      onValueChange={originalProps.setDueDateFilter}>
                      {Object.entries(getDateProps).map(([key, { label }]) => (
                        <Radio key={key} value={key}>
                          {label}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div {...getFilterSortButtonsProps()}>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    {...getFilterSortButtonProps()}
                    size="sm"
                    startContent={
                      <Icon
                        {...getFilterSortIconProps()}
                        icon="solar:sort-linear"
                        width={16}
                      />
                    }>
                    {!isSearchExpanded && 'Sort'}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Sort">
                  {originalProps.headerColumns
                    .filter(c => !['actions', 'teams'].includes(c.id))
                    .map(item => (
                      <DropdownItem
                        key={item.id}
                        className={
                          originalProps.sortDescriptor.column === item.id
                            ? 'bg-default-100 font-medium'
                            : ''
                        }
                        endContent={
                          originalProps.sortDescriptor.column === item.id ? (
                            <Icon
                              icon={
                                originalProps.sortDescriptor.direction ===
                                'ascending'
                                  ? 'solar:arrow-up-linear'
                                  : 'solar:arrow-down-linear'
                              }
                              width={14}
                              height={14}
                            />
                          ) : null
                        }
                        onPress={() => {
                          originalProps.setSortDescriptor({
                            column: item.id,
                            direction:
                              originalProps.sortDescriptor.column === item.id &&
                              originalProps.sortDescriptor.direction ===
                                'ascending'
                                ? 'descending'
                                : 'ascending'
                          })
                        }}>
                        {item.label}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <div {...getFilterSortButtonsProps()}>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button
                    {...getFilterSortButtonProps()}
                    size="sm"
                    startContent={
                      <Icon
                        {...getFilterSortIconProps()}
                        icon="solar:sort-horizontal-linear"
                        width={16}
                      />
                    }>
                    {!isSearchExpanded && 'Columns'}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Columns"
                  selectedKeys={originalProps.visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={originalProps.setVisibleColumns}>
                  {Object.entries(getColumnProps)
                    .filter(([key]) => key !== 'actions')
                    .map(([key, col]) => (
                      <DropdownItem key={key}>{col.label}</DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <div {...getMobileActionsProps()}>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    {...getMobileActionsButtonProps()}>
                    <Icon icon="solar:menu-dots-bold" width={18} height={18} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="More actions" closeOnSelect={false}>
                  <DropdownItem key="filter" className="p-0">
                    <Popover placement="bottom">
                      <PopoverTrigger>
                        <Button
                          variant="light"
                          size="sm"
                          fullWidth
                          startContent={
                            <Icon icon="solar:tuning-2-linear" width={16} />
                          }
                          {...getMobileFilterButtonProps()}>
                          Filter
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent {...getPopoverContentProps()}>
                        <div {...getFilterPopoverContentProps()}>
                          <RadioGroup
                            label="Status"
                            value={originalProps.statusFilter}
                            onValueChange={originalProps.setStatusFilter}>
                            <Radio value="all">All</Radio>
                            {Object.entries(getStatusProps).map(
                              ([key, { label }]) => (
                                <Radio key={key} value={key}>
                                  {label}
                                </Radio>
                              )
                            )}
                          </RadioGroup>
                          <Spacer y={5} />
                          <RadioGroup
                            label="Start Date"
                            value={originalProps.startDateFilter}
                            onValueChange={originalProps.setStartDateFilter}>
                            {Object.entries(getDateProps).map(
                              ([key, { label }]) => (
                                <Radio key={key} value={key}>
                                  {label}
                                </Radio>
                              )
                            )}
                          </RadioGroup>
                          <Spacer y={5} />
                          <RadioGroup
                            label="Due Date"
                            value={originalProps.dueDateFilter}
                            onValueChange={originalProps.setDueDateFilter}>
                            {Object.entries(getDateProps).map(
                              ([key, { label }]) => (
                                <Radio key={key} value={key}>
                                  {label}
                                </Radio>
                              )
                            )}
                          </RadioGroup>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </DropdownItem>

                  <DropdownItem key="sort" className="p-0">
                    <Dropdown placement="bottom">
                      <DropdownTrigger>
                        <Button
                          variant="light"
                          size="sm"
                          fullWidth
                          startContent={
                            <Icon icon="solar:sort-linear" width={16} />
                          }
                          {...getMobileFilterButtonProps()}>
                          Sort
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Sort">
                        {originalProps.headerColumns
                          .filter(c => !['actions', 'teams'].includes(c.id))
                          .map(item => (
                            <DropdownItem
                              key={item.id}
                              className={
                                originalProps.sortDescriptor.column === item.id
                                  ? 'bg-default-100 font-medium'
                                  : ''
                              }
                              endContent={
                                originalProps.sortDescriptor.column ===
                                item.id ? (
                                  <Icon
                                    icon={
                                      originalProps.sortDescriptor.direction ===
                                      'ascending'
                                        ? 'solar:arrow-up-linear'
                                        : 'solar:arrow-down-linear'
                                    }
                                    width={14}
                                    height={14}
                                  />
                                ) : null
                              }
                              onPress={() => {
                                originalProps.setSortDescriptor({
                                  column: item.id,
                                  direction:
                                    originalProps.sortDescriptor.column ===
                                      item.id &&
                                    originalProps.sortDescriptor.direction ===
                                      'ascending'
                                      ? 'descending'
                                      : 'ascending'
                                })
                              }}>
                              {item.label}
                            </DropdownItem>
                          ))}
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownItem>

                  <DropdownItem key="columns" className="p-0">
                    <Dropdown placement="bottom" closeOnSelect={false}>
                      <DropdownTrigger>
                        <Button
                          variant="light"
                          size="sm"
                          fullWidth
                          startContent={
                            <Icon
                              icon="solar:sort-horizontal-linear"
                              width={16}
                            />
                          }
                          {...getMobileFilterButtonProps()}>
                          Columns
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        disallowEmptySelection
                        aria-label="Columns"
                        items={Object.entries(getColumnProps)
                          .map(([uid, col]) => ({ uid, ...col }))
                          .filter(c => c.uid !== 'actions')}
                        selectedKeys={originalProps.visibleColumns}
                        selectionMode="multiple"
                        onSelectionChange={originalProps.setVisibleColumns}>
                        {item => (
                          <DropdownItem key={item.uid}>
                            {item.label}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

HeaderContent.displayName = 'HeaderContent'
