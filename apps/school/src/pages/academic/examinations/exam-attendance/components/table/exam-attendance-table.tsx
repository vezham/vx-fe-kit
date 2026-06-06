import { Icon } from '@iconify/react'

import {
  Avatar,
  Checkbox,
  Pagination,
  type Selection,
  type SortDescriptor,
  Table
} from '@vezham/react-v3'

import type { AttendanceRow, AttendanceStatus, DrawerMode } from '../../types'
import {
  getInitials,
  getPaginationSummary,
  getStudentSecondaryText
} from '../../utils/exam-attendance'
import { classNames, getTableRowClassName } from '../../variants'
import { SortableHeader } from '../shared/sortable-header'

type ExamAttendanceTableProps = {
  activeRowId: string | null
  currentPage: number
  pageSize: number
  rows: AttendanceRow[]
  selectedKeys: Selection
  sortDescriptor: SortDescriptor
  totalPages: number
  totalRows: number
  onOpenDrawer: (mode: DrawerMode, row: AttendanceRow) => void
  onPageChange: (value: number | ((current: number) => number)) => void
  onSelectionChange: (keys: Selection) => void
  onSortChange: (descriptor: SortDescriptor) => void
}

export function ExamAttendanceTable({
  activeRowId,
  currentPage,
  pageSize,
  rows,
  selectedKeys,
  sortDescriptor,
  totalPages,
  totalRows,
  onOpenDrawer,
  onPageChange,
  onSelectionChange,
  onSortChange
}: ExamAttendanceTableProps) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Exam attendance"
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
                  Admission No
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="name">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  Student Name
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="english">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  English
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="spanish">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  Spanish
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="physics">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  Physics
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="chemistry">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  Chemistry
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="maths">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  Maths
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="computer">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  Computer
                </SortableHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="envscience">
              {({ sortDirection }) => (
                <SortableHeader sortDirection={sortDirection}>
                  Env Science
                </SortableHeader>
              )}
            </Table.Column>
          </Table.Header>

          <Table.Body renderEmptyState={() => <TableEmptyState />}>
            {rows.map(row => (
              <Table.Row
                key={row.id}
                id={row.id}
                data-attendance-row-id={row.id}
                className={getTableRowClassName(activeRowId === row.id)}
                onClick={() => onOpenDrawer('view', row)}>
                <Table.Cell>
                  <Checkbox
                    aria-label={`Select attendance ${row.id}`}
                    slot="selection"
                    onClick={event => event.stopPropagation()}>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox>
                </Table.Cell>
                <Table.Cell>{row.id}</Table.Cell>
                <Table.Cell>
                  <StudentNameCell row={row} />
                </Table.Cell>
                <Table.Cell>
                  <AttendanceMarker status={row.english} />
                </Table.Cell>
                <Table.Cell>
                  <AttendanceMarker status={row.spanish} />
                </Table.Cell>
                <Table.Cell>
                  <AttendanceMarker status={row.physics} />
                </Table.Cell>
                <Table.Cell>
                  <AttendanceMarker status={row.chemistry} />
                </Table.Cell>
                <Table.Cell>
                  <AttendanceMarker status={row.maths} />
                </Table.Cell>
                <Table.Cell>
                  <AttendanceMarker status={row.computer} />
                </Table.Cell>
                <Table.Cell>
                  <AttendanceMarker status={row.envscience} />
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
      <p className={classNames.emptyText}>No attendance found</p>
    </div>
  )
}

function StudentNameCell({ row }: { row: AttendanceRow }) {
  const secondaryText = getStudentSecondaryText(row)

  return (
    <div className={classNames.studentNameCell}>
      <Avatar className={classNames.studentNameAvatar} size="sm">
        {row.avatar && <Avatar.Image src={row.avatar} alt={row.name} />}
        <Avatar.Fallback>{getInitials(row.name)}</Avatar.Fallback>
      </Avatar>
      <div className={classNames.studentNameText}>
        <div className={classNames.studentNamePrimary}>{row.name}</div>
        {secondaryText && (
          <div className={classNames.studentNameSecondary}>{secondaryText}</div>
        )}
      </div>
    </div>
  )
}

function AttendanceMarker({ status }: { status: AttendanceStatus }) {
  const colorClass =
    status === 'Present'
      ? 'bg-success'
      : status === 'Absent'
        ? 'bg-danger'
        : 'bg-[#14b8e6]'

  return (
    <span
      aria-label={status}
      className={`${classNames.attendanceMarker} ${colorClass}`}
      role="img"
    />
  )
}
