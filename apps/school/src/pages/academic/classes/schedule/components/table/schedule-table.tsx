import { Icon } from '@iconify/react'

import {
  Button,
  Checkbox,
  Chip,
  Dropdown,
  Pagination,
  type Selection,
  type SortDescriptor,
  Table
} from '@vezham/react-v3'

import type { ClassRow, DrawerMode } from '../../types'
import { getPaginationSummary } from '../../utils/schedule'
import { classNames, getTableRowClassName } from '../../variants'
import { SortableHeader } from '../shared/sortable-header'

type ScheduleTableProps = {
  activeRowId: string | null
  currentPage: number
  pageSize: number
  rows: ClassRow[]
  selectedKeys: Selection
  sortDescriptor: SortDescriptor
  totalPages: number
  totalRows: number
  onDelete: (rowId: string) => void
  onOpenDrawer: (mode: DrawerMode, row: ClassRow) => void
  onPageChange: (value: number | ((current: number) => number)) => void
  onSelectionChange: (keys: Selection) => void
  onSortChange: (descriptor: SortDescriptor) => void
}

export function ScheduleTable({
  activeRowId,
  currentPage,
  pageSize,
  rows,
  selectedKeys,
  sortDescriptor,
  totalPages,
  totalRows,
  onDelete,
  onOpenDrawer,
  onPageChange,
  onSelectionChange,
  onSortChange
}: ScheduleTableProps) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Schedules"
          className={classNames.tableContent}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          onSelectionChange={onSelectionChange}
          onSortChange={onSortChange}>
          <Table.Header>
            <Table.Column className={classNames.selectionColumn} />
            <Table.Column allowsSorting isRowHeader id="id">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  ID
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="type">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  Type
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="starttime">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  Start Time
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="endtime">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  End Time
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="status">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  Status
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>

          <Table.Body renderEmptyState={() => <TableEmptyState />}>
            {rows.map(row => (
              <Table.Row
                key={row.id}
                id={row.id}
                data-class-row-id={row.id}
                className={getTableRowClassName(activeRowId === row.id)}
                onClick={() => onOpenDrawer('view', row)}>
                <Table.Cell>
                  <Checkbox
                    aria-label={`Select schedule ${row.id}`}
                    slot="selection"
                    onClick={event => event.stopPropagation()}>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox>
                </Table.Cell>
                <Table.Cell>{row.id}</Table.Cell>
                <Table.Cell>{row.type}</Table.Cell>
                <Table.Cell>{row.starttime}</Table.Cell>
                <Table.Cell>{row.endtime}</Table.Cell>
                <Table.Cell>
                  <Chip
                    color={row.status === 'Active' ? 'success' : 'danger'}
                    size="sm"
                    variant="soft">
                    <span aria-hidden="true">●</span>
                    <Chip.Label>{row.status}</Chip.Label>
                  </Chip>
                </Table.Cell>
                <Table.Cell>
                  <div
                    className={classNames.rowActions}
                    onClick={event => event.stopPropagation()}>
                    <Button
                      isIconOnly
                      aria-label={`Edit ${row.id}`}
                      variant="ghost"
                      onPress={() => onOpenDrawer('edit', row)}>
                      <Icon icon="lucide:pencil" width={16} />
                    </Button>
                    <Button
                      isIconOnly
                      aria-label={`Delete ${row.id}`}
                      variant="outline"
                      onPress={() => onDelete(row.id)}>
                      <Icon
                        className={classNames.dangerIcon}
                        icon="lucide:trash-2"
                        width={16}
                      />
                    </Button>
                    <Dropdown>
                      <Dropdown.Trigger>
                        <Button
                          isIconOnly
                          aria-label={`More actions for ${row.id}`}
                          variant="ghost">
                          <Icon icon="lucide:more-horizontal" width={18} />
                        </Button>
                      </Dropdown.Trigger>
                      <Dropdown.Popover>
                        <Dropdown.Menu
                          aria-label={`More actions for ${row.id}`}>
                          <Dropdown.Item
                            id="view"
                            textValue="View"
                            onPress={() => onOpenDrawer('view', row)}>
                            <span className={classNames.menuItemLabel}>
                              <Icon icon="lucide:eye" width={16} />
                              View
                            </span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      <Table.Footer>
        <Pagination>
          <Pagination.Summary>
            {getPaginationSummary(currentPage, pageSize, totalRows)}
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={currentPage <= 1}
                onPress={() => onPageChange(value => Math.max(1, value - 1))}>
                <Pagination.PreviousIcon />
                <span>Prev</span>
              </Pagination.Previous>
            </Pagination.Item>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              item => (
                <Pagination.Item key={item}>
                  <Pagination.Link
                    isActive={item === currentPage}
                    onPress={() => onPageChange(item)}>
                    {item}
                  </Pagination.Link>
                </Pagination.Item>
              )
            )}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={currentPage >= totalPages}
                onPress={() =>
                  onPageChange(value => Math.min(totalPages, value + 1))
                }>
                <span>Next</span>
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  )
}

function TableEmptyState() {
  return (
    <div className={classNames.emptyState}>
      <Icon className={classNames.emptyIcon} icon="lucide:inbox" width={42} />
      <p className={classNames.emptyText}>No results found</p>
    </div>
  )
}
