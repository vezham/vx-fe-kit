'use client'

import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import React from 'react'

import type { Selection, SortDescriptor } from '@vezham/react/v2'
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
} from '../../../store/useTasks/data'
import { tableStyles } from '../variant'

interface HeaderContentProps {
  selectedKeys: Selection
  usersLength: number
  isSearchExpanded: boolean
  filterValue: string
  statusFilter: string
  startDateFilter: string
  dueDateFilter: string
  headerColumns: any[]
  visibleColumns: Selection
  sortDescriptor: SortDescriptor
  onSearchChange: (value?: string) => void
  toggleSearch: () => void
  setStatusFilter: (value: string) => void
  setStartDateFilter: (value: string) => void
  setDueDateFilter: (value: string) => void
  setVisibleColumns: (columns: Selection) => void
  setSortDescriptor: (descriptor: SortDescriptor) => void
  searchInputRef: React.RefObject<HTMLInputElement | null>
  setFilterValue: (value: string) => void
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  selectedKeys,
  usersLength,
  isSearchExpanded,
  filterValue,
  statusFilter,
  startDateFilter,
  dueDateFilter,
  headerColumns,
  visibleColumns,
  sortDescriptor,
  onSearchChange,
  toggleSearch,
  setStatusFilter,
  setStartDateFilter,
  setDueDateFilter,
  setVisibleColumns,
  setSortDescriptor,
  searchInputRef,
  setFilterValue
}) => {
  const isSelectionEmpty =
    selectedKeys === 'all' ? false : selectedKeys.size === 0

  return (
    <div className={tableStyles.topBarContainer}>
      <div className={tableStyles.topBarLeft}>
        <div className={tableStyles.topBarLeftInner}>
          <p className={tableStyles.membersText}>SubTasks</p>
          <Chip className={tableStyles.chip} size="sm" variant="flat">
            {usersLength}
          </Chip>
        </div>

        <div>
          {!isSelectionEmpty && (
            <div className={tableStyles.selectedActionsContainer}>
              <Divider className={tableStyles.divider} orientation="vertical" />
              <div className={tableStyles.selectedCountText}>
                {selectedKeys === 'all'
                  ? 'All selected'
                  : `${selectedKeys.size} Selected`}
              </div>
              <Divider className="block h-5 sm:hidden" orientation="vertical" />
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    size="sm"
                    variant="flat"
                    className={tableStyles.selectedActions}>
                    <span className={tableStyles.selectedActionsMoreButton}>
                      <Icon
                        icon="solar:menu-dots-bold"
                        width={10}
                        height={10}
                      />
                    </span>
                    <span className={tableStyles.selectedActionsButton}>
                      <span>Selected Actions</span>
                      <Icon
                        className={tableStyles.dropdownIcon}
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
        <div className={tableStyles.topBarRight}>
          <motion.div
            initial={{ width: 40 }}
            animate={{ width: isSearchExpanded ? 150 : 40 }}
            transition={{ ease: 'easeInOut' }}
            className={tableStyles.searchContainer}>
            {isSearchExpanded ? (
              <Input
                className={tableStyles.searchInput}
                ref={searchInputRef}
                endContent={
                  <button
                    className="focus:outline-none"
                    onClick={() => {
                      if (filterValue) {
                        setFilterValue('')
                      } else {
                        toggleSearch()
                      }
                    }}>
                    <CloseIcon
                      className={tableStyles.searchCloseIcon}
                      width={16}
                    />
                  </button>
                }
                placeholder="Search"
                size="sm"
                value={filterValue}
                onValueChange={onSearchChange}
              />
            ) : (
              <button
                className={tableStyles.searchButton}
                onClick={toggleSearch}>
                <SearchIcon className="text-default-600" width={18} />
              </button>
            )}
          </motion.div>

          <div className="flex items-center gap-2">
            <div className={tableStyles.filterSortButtons}>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Button
                    className={tableStyles.filterSortButton}
                    size="sm"
                    startContent={
                      <Icon
                        className={tableStyles.filterSortIcon}
                        icon="solar:tuning-2-linear"
                        width={16}
                      />
                    }>
                    {!isSearchExpanded && 'Filter'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={tableStyles.popoverContent}>
                  <div className={tableStyles.filterPopoverContent}>
                    <RadioGroup
                      label="Status"
                      value={statusFilter}
                      onValueChange={setStatusFilter}>
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
                      value={startDateFilter}
                      onValueChange={setStartDateFilter}>
                      {Object.entries(getDateProps).map(([key, { label }]) => (
                        <Radio key={key} value={key}>
                          {label}
                        </Radio>
                      ))}
                    </RadioGroup>
                    <Spacer y={5} />
                    <RadioGroup
                      label="Due Date"
                      value={dueDateFilter}
                      onValueChange={setDueDateFilter}>
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

            <div className={tableStyles.filterSortButtons}>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className={tableStyles.filterSortButton}
                    size="sm"
                    startContent={
                      <Icon
                        className={tableStyles.filterSortIcon}
                        icon="solar:sort-linear"
                        width={16}
                      />
                    }>
                    {!isSearchExpanded && 'Sort'}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Sort">
                  {headerColumns
                    .filter(c => !['actions', 'teams'].includes(c.id))
                    .map(item => (
                      <DropdownItem
                        key={item.id}
                        className={
                          sortDescriptor.column === item.id
                            ? 'bg-default-100 font-medium'
                            : ''
                        }
                        endContent={
                          sortDescriptor.column === item.id ? (
                            <Icon
                              icon={
                                sortDescriptor.direction === 'ascending'
                                  ? 'solar:arrow-up-linear'
                                  : 'solar:arrow-down-linear'
                              }
                              width={14}
                              height={14}
                            />
                          ) : null
                        }
                        onPress={() => {
                          setSortDescriptor({
                            column: item.id,
                            direction:
                              sortDescriptor.column === item.id &&
                              sortDescriptor.direction === 'ascending'
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

            <div className={tableStyles.filterSortButtons}>
              <Dropdown closeOnSelect={false}>
                <DropdownTrigger>
                  <Button
                    className={tableStyles.filterSortButton}
                    size="sm"
                    startContent={
                      <Icon
                        className={tableStyles.filterSortIcon}
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
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}>
                  {Object.entries(getColumnProps)
                    .filter(([key]) => key !== 'actions')
                    .map(([key, col]) => (
                      <DropdownItem key={key}>{col.label}</DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className={tableStyles.mobileActions}>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className={tableStyles.mobileActionsButton}>
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
                          className={tableStyles.mobileFilterButton}>
                          Filter
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className={tableStyles.popoverContent}>
                        <div className={tableStyles.filterPopoverContent}>
                          <RadioGroup
                            label="Status"
                            value={statusFilter}
                            onValueChange={setStatusFilter}>
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
                            value={startDateFilter}
                            onValueChange={setStartDateFilter}>
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
                            value={dueDateFilter}
                            onValueChange={setDueDateFilter}>
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
                          className={tableStyles.mobileFilterButton}>
                          Sort
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Sort">
                        {headerColumns
                          .filter(c => !['actions', 'teams'].includes(c.id))
                          .map(item => (
                            <DropdownItem
                              key={item.id}
                              className={
                                sortDescriptor.column === item.id
                                  ? 'bg-default-100 font-medium'
                                  : ''
                              }
                              endContent={
                                sortDescriptor.column === item.id ? (
                                  <Icon
                                    icon={
                                      sortDescriptor.direction === 'ascending'
                                        ? 'solar:arrow-up-linear'
                                        : 'solar:arrow-down-linear'
                                    }
                                    width={14}
                                    height={14}
                                  />
                                ) : null
                              }
                              onPress={() => {
                                setSortDescriptor({
                                  column: item.id,
                                  direction:
                                    sortDescriptor.column === item.id &&
                                    sortDescriptor.direction === 'ascending'
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
                          className={tableStyles.mobileFilterButton}>
                          Columns
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        disallowEmptySelection
                        aria-label="Columns"
                        items={Object.entries(getColumnProps)
                          .map(([uid, col]) => ({ uid, ...col }))
                          .filter(c => c.uid !== 'actions')}
                        selectedKeys={visibleColumns}
                        selectionMode="multiple"
                        onSelectionChange={setVisibleColumns}>
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
