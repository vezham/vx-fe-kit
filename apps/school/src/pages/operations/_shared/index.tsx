import { Icon } from '@iconify/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  CloseButton,
  Drawer,
  Dropdown,
  Input,
  Label,
  ListBox,
  Pagination,
  SearchField,
  Select,
  type Selection,
  type SortDescriptor,
  Surface,
  Table
} from '@vezham/react/v3'

import type {
  DatePresetKey,
  DateRangeFilter,
  DrawerMode,
  FilterDraft,
  OperationColumn,
  OperationPageConfig,
  OperationRow,
  OperationStatus,
  PersonValue
} from './types'
import { useDisclosure } from './types'
import { classNames, getTableRowClassName } from './variant'

const rowCountOptions = ['10', '25', '50']
const dateOptions: { key: DatePresetKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7', label: 'Last 7 Days' },
  { key: 'last30', label: 'Last 30 Days' }
]

export default function OperationsTablePage({
  config
}: {
  config: OperationPageConfig
}) {
  const [data, setData] = useState<OperationRow[]>(config.rows)
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [page, setPage] = useState(1)
  const [datePreset, setDatePreset] = useState<DatePresetKey>('last7')
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>(
    config.initialSort
  )
  const emptyFilters = useMemo(
    () =>
      config.filters.reduce<FilterDraft>((draft, filter) => {
        draft[filter.key] = null
        return draft
      }, {}),
    [config.filters]
  )
  const [filters, setFilters] = useState<FilterDraft>(emptyFilters)
  const [draftFilters, setDraftFilters] = useState<FilterDraft>(emptyFilters)
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Selection>(new Set())
  const [mode, setMode] = useState<DrawerMode>('view')
  const [form, setForm] = useState<FilterDraft>({})
  const [toast, setToast] = useState<{
    message: string
    status: 'success' | 'danger'
  } | null>(null)
  const drawer = useDisclosure()

  const activeDateRange = getPresetDateRange(datePreset)
  const editableColumns = useMemo(
    () => config.columns.filter(column => column.type !== 'button'),
    [config.columns]
  )

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return data.filter(row => {
      const matchesQuery =
        !query ||
        config.columns.some(column =>
          getSearchText(row[column.key]).toLowerCase().includes(query)
        )
      const matchesDate = isISODateInRange(
        row.createdAt,
        activeDateRange.start,
        activeDateRange.end
      )
      const matchesFilters = config.filters.every(filter => {
        const activeValue = filters[filter.key]

        return (
          !activeValue || String(getSortValue(row[filter.key])) === activeValue
        )
      })

      return matchesQuery && matchesDate && matchesFilters
    })
  }, [
    activeDateRange.end,
    activeDateRange.start,
    config.columns,
    config.filters,
    data,
    filters,
    searchQuery
  ])

  const sortedRows = useMemo(
    () =>
      [...filteredRows].sort((firstRow, secondRow) => {
        const first = getSortValue(firstRow[sortDescriptor.column as string])
        const second = getSortValue(secondRow[sortDescriptor.column as string])
        const comparison =
          typeof first === 'number' && typeof second === 'number'
            ? first - second
            : String(first ?? '').localeCompare(
                String(second ?? ''),
                undefined,
                {
                  numeric: true
                }
              )

        return sortDescriptor.direction === 'descending'
          ? comparison * -1
          : comparison
      }),
    [filteredRows, sortDescriptor]
  )

  const pageSize = Number(rowsPerPage)
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  const selectedRow = data.find(row => row.id === activeRowId) ?? null
  const selectedRowIndex = activeRowId
    ? sortedRows.findIndex(row => row.id === activeRowId)
    : -1
  const activeSortLabel =
    config.sortOptions.find(
      option =>
        option.descriptor.column === sortDescriptor.column &&
        option.descriptor.direction === sortDescriptor.direction
    )?.label ?? 'A-Z'

  const openDrawer = useCallback(
    (nextMode: DrawerMode, row?: OperationRow) => {
      setMode(nextMode)

      if (row) {
        setActiveRowId(row.id)
        setForm(rowToForm(row, editableColumns))
      } else {
        setActiveRowId(null)
        setForm(createEmptyForm(editableColumns))
      }

      drawer.onOpen()
    },
    [drawer, editableColumns]
  )

  const closeDrawer = useCallback(() => {
    drawer.onClose()
    setActiveRowId(null)
    setMode('view')
  }, [drawer])

  useEffect(() => {
    const eventName = `operations:${config.key}:create`
    const onCreate = () => openDrawer('create')

    window.addEventListener(eventName, onCreate)

    return () => window.removeEventListener(eventName, onCreate)
  }, [config.key, openDrawer])

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeoutId = window.setTimeout(() => setToast(null), 2200)

    return () => window.clearTimeout(timeoutId)
  }, [toast])

  const saveRow = () => {
    if (mode === 'create') {
      const nextRow = formToNewRow(form, editableColumns, data.length + 1)

      setData(current => [nextRow, ...current])
      setToast({ message: `${config.pageTitle} added`, status: 'success' })
      closeDrawer()
      return
    }

    if (!selectedRow) {
      return
    }

    const updatedRow = formToRow(selectedRow, form, editableColumns)

    setData(current =>
      current.map(row => (row.id === updatedRow.id ? updatedRow : row))
    )
    setActiveRowId(updatedRow.id)
    setMode('view')
    setToast({ message: `${config.pageTitle} updated`, status: 'success' })
  }

  const deleteRow = (rowId: string) => {
    setData(current => current.filter(row => row.id !== rowId))
    setToast({ message: 'Item deleted', status: 'success' })

    if (activeRowId === rowId) {
      closeDrawer()
    }
  }

  return (
    <section className={classNames.page}>
      <div className={classNames.pageHeader}>
        <div>
          <h1 className={classNames.heading}>{config.pageTitle}</h1>
          <div className={classNames.breadcrumbs}>
            {config.breadcrumb.map((item, index) => (
              <span
                key={item}
                className={
                  index === config.breadcrumb.length - 1
                    ? classNames.breadcrumbCurrent
                    : undefined
                }>
                {index > 0 ? <span aria-hidden="true">/</span> : null} {item}
              </span>
            ))}
          </div>
        </div>

        <div className={classNames.topActions}>
          <Button isIconOnly aria-label="Refresh" variant="outline">
            <Icon icon="lucide:refresh-cw" width={16} />
          </Button>
          <Button
            isIconOnly
            aria-label="Print"
            variant="outline"
            onPress={() => window.print()}>
            <Icon icon="lucide:printer" width={16} />
          </Button>
          <Button className={classNames.exportButton} variant="secondary">
            <Icon icon="lucide:file-down" width={16} />
            Export
            <Icon icon="lucide:chevron-down" width={16} />
          </Button>
          <Button onPress={() => openDrawer('create')}>
            <Icon icon="lucide:plus-circle" width={16} />
            {config.addLabel}
          </Button>
        </div>
      </div>

      <Surface className={classNames.toolbar}>
        <div className={classNames.toolbarTop}>
          <h2 className={classNames.title}>{config.listTitle}</h2>
          <div className={classNames.toolbarActions}>
            <Dropdown>
              <Dropdown.Trigger>
                <Button variant="outline">
                  <Icon icon="lucide:calendar-days" width={16} />
                  {formatDateRangeLabel(activeDateRange)}
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu aria-label="Date presets">
                  {dateOptions.map(option => (
                    <Dropdown.Item
                      key={option.key}
                      id={option.key}
                      textValue={option.label}
                      onPress={() => setDatePreset(option.key)}>
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>

            <FilterDropdown
              draftFilters={draftFilters}
              filters={config.filters}
              setDraftFilters={setDraftFilters}
              onApply={() => {
                setFilters(draftFilters)
                setPage(1)
              }}
              onReset={() => {
                setDraftFilters(emptyFilters)
                setFilters(emptyFilters)
                setPage(1)
              }}
            />

            <Dropdown>
              <Dropdown.Trigger>
                <Button variant="outline">
                  <Icon icon="lucide:arrow-up-down" width={16} />
                  Sort by {activeSortLabel}
                  <Icon icon="lucide:chevron-down" width={16} />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Dropdown.Menu aria-label={`Sort ${config.pageTitle}`}>
                  {config.sortOptions.map(option => (
                    <Dropdown.Item
                      key={option.key}
                      id={option.key}
                      textValue={option.label}
                      onPress={() => {
                        setSortDescriptor(option.descriptor)
                        setPage(1)
                      }}>
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>

        <div className={classNames.controlsRow}>
          <div className={classNames.rowsControls}>
            <Label>Row Per Page</Label>
            <Select
              aria-label="Rows per page"
              value={rowsPerPage}
              onChange={value => {
                setRowsPerPage(value ? String(value) : '10')
                setPage(1)
              }}>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {rowCountOptions.map(option => (
                    <ListBox.Item key={option} id={option} textValue={option}>
                      {option}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
            <Label>Entries</Label>
          </div>

          <SearchField
            aria-label={`Search ${config.pageTitle}`}
            value={searchQuery}
            onChange={value => {
              setSearchQuery(value)
              setPage(1)
            }}>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </div>

        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label={config.ariaLabel}
              className={classNames.tableContent}
              selectedKeys={selectedRowKeys}
              selectionMode="multiple"
              sortDescriptor={sortDescriptor}
              style={{ minWidth: config.tableMinWidth }}
              onSelectionChange={setSelectedRowKeys}
              onSortChange={descriptor => {
                setSortDescriptor(descriptor)
                setPage(1)
              }}>
              <Table.Header>
                <Table.Column className={classNames.selectionColumn} />
                {config.columns.map(column => (
                  <Table.Column
                    key={column.key}
                    allowsSorting={column.allowsSorting}
                    id={column.key}
                    isRowHeader={column.type === 'person'}
                    style={{ minWidth: column.minWidth }}>
                    {({ sortDirection }) => (
                      <SortableHeader sortDirection={sortDirection}>
                        {column.label}
                      </SortableHeader>
                    )}
                  </Table.Column>
                ))}
                <Table.Column>Action</Table.Column>
              </Table.Header>

              <Table.Body renderEmptyState={() => <TableEmptyState />}>
                {paginatedRows.map(row => (
                  <Table.Row
                    key={row.id}
                    id={row.id}
                    className={getTableRowClassName(activeRowId === row.id)}
                    onClick={() => openDrawer('view', row)}>
                    <Table.Cell>
                      <Checkbox
                        aria-label={`Select ${row.id}`}
                        slot="selection"
                        onClick={event => event.stopPropagation()}>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                      </Checkbox>
                    </Table.Cell>
                    {config.columns.map(column => (
                      <Table.Cell key={column.key}>
                        <OperationCell
                          column={column}
                          row={row}
                          onAction={() => openDrawer('view', row)}
                        />
                      </Table.Cell>
                    ))}
                    <Table.Cell>
                      <div
                        className={classNames.rowActions}
                        onClick={event => event.stopPropagation()}>
                        <Dropdown>
                          <Dropdown.Trigger>
                            <Button
                              isIconOnly
                              aria-label={`More actions for ${row.id}`}
                              variant="ghost">
                              <Icon icon="lucide:more-vertical" width={18} />
                            </Button>
                          </Dropdown.Trigger>
                          <Dropdown.Popover>
                            <Dropdown.Menu aria-label={`Actions for ${row.id}`}>
                              <Dropdown.Item
                                id="view"
                                textValue="View"
                                onPress={() => openDrawer('view', row)}>
                                <span className={classNames.menuItemLabel}>
                                  <Icon icon="lucide:eye" width={16} />
                                  View
                                </span>
                              </Dropdown.Item>
                              <Dropdown.Item
                                id="edit"
                                textValue="Edit"
                                onPress={() => openDrawer('edit', row)}>
                                <span className={classNames.menuItemLabel}>
                                  <Icon icon="lucide:pencil" width={16} />
                                  Edit
                                </span>
                              </Dropdown.Item>
                              <Dropdown.Item
                                id="delete"
                                textValue="Delete"
                                onPress={() => deleteRow(row.id)}>
                                <span className={classNames.menuItemLabel}>
                                  <Icon
                                    className={classNames.dangerIcon}
                                    icon="lucide:trash-2"
                                    width={16}
                                  />
                                  Delete
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
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={currentPage <= 1}
                    onPress={() => setPage(value => Math.max(1, value - 1))}>
                    <span>Prev</span>
                  </Pagination.Previous>
                </Pagination.Item>
                {getPaginationItems(totalPages).map(item => (
                  <Pagination.Item key={item}>
                    <Pagination.Link
                      isActive={item === currentPage}
                      onPress={() => setPage(item)}>
                      {item}
                    </Pagination.Link>
                  </Pagination.Item>
                ))}
                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={currentPage >= totalPages}
                    onPress={() =>
                      setPage(value => Math.min(totalPages, value + 1))
                    }>
                    <span>Next</span>
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </Table.Footer>
        </Table>
      </Surface>

      <OperationsDrawer
        columns={editableColumns}
        drawerState={drawer}
        form={form}
        mode={mode}
        row={selectedRow}
        title={config.pageTitle}
        canGoNext={
          selectedRowIndex >= 0 && selectedRowIndex < sortedRows.length - 1
        }
        canGoPrevious={selectedRowIndex > 0}
        onCancel={closeDrawer}
        onClose={closeDrawer}
        onEdit={() => setMode('edit')}
        onFormChange={(field, value) =>
          setForm(current => ({ ...current, [field]: value }))
        }
        onGoNext={() => {
          const next = sortedRows[selectedRowIndex + 1]
          if (next) openDrawer(mode, next)
        }}
        onGoPrevious={() => {
          const previous = sortedRows[selectedRowIndex - 1]
          if (previous) openDrawer(mode, previous)
        }}
        onSave={saveRow}
      />

      {toast && (
        <div className={classNames.toast}>
          <Alert status={toast.status}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{toast.message}</Alert.Title>
            </Alert.Content>
            <CloseButton onClick={() => setToast(null)} />
          </Alert>
        </div>
      )}
    </section>
  )
}

function FilterDropdown({
  filters,
  draftFilters,
  setDraftFilters,
  onApply,
  onReset
}: {
  filters: OperationPageConfig['filters']
  draftFilters: FilterDraft
  setDraftFilters: (filters: FilterDraft) => void
  onApply: () => void
  onReset: () => void
}) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="outline">
          <Icon icon="lucide:filter" width={16} />
          Filter
          <Icon icon="lucide:chevron-down" width={16} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Surface className={classNames.filterPanel}>
          <h2 className={classNames.filterTitle}>Filter</h2>
          {filters.map(filter => (
            <Select
              key={filter.key}
              fullWidth
              aria-label={`Filter by ${filter.label}`}
              value={draftFilters[filter.key]}
              onChange={value =>
                setDraftFilters({
                  ...draftFilters,
                  [filter.key]: value ? String(value) : null
                })
              }>
              <Label>{filter.label}</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {filter.values.map(option => (
                    <ListBox.Item key={option} id={option} textValue={option}>
                      {option}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          ))}
          <div className={classNames.filterActions}>
            <Button variant="secondary" onPress={onReset}>
              Reset
            </Button>
            <Button onPress={onApply}>Apply</Button>
          </div>
        </Surface>
      </Dropdown.Popover>
    </Dropdown>
  )
}

function OperationCell({
  column,
  row,
  onAction
}: {
  column: OperationColumn
  row: OperationRow
  onAction: () => void
}) {
  const value = row[column.key]

  if (column.type === 'person') return <PersonCell value={value} />
  if (column.type === 'link') {
    return <span className={classNames.link}>{String(value)}</span>
  }
  if (column.type === 'status') {
    return <StatusChip status={String(value) as OperationStatus} />
  }
  if (column.type === 'badge') return <Badge value={String(value)} />
  if (column.type === 'button') {
    return (
      <Button
        className={classNames.actionButton}
        variant="secondary"
        onPress={onAction}>
        {String(value)}
      </Button>
    )
  }
  if (column.type === 'code') {
    return <span className={classNames.code}>{String(value)}</span>
  }

  return <span>{String(value ?? '')}</span>
}

function PersonCell({ value }: { value: unknown }) {
  const personValue = value as PersonValue

  return (
    <div className={classNames.personCell}>
      <Avatar className={classNames.personAvatar} size="sm">
        {personValue.avatar && (
          <Avatar.Image src={personValue.avatar} alt={personValue.name} />
        )}
        <Avatar.Fallback>{getInitials(personValue.name)}</Avatar.Fallback>
      </Avatar>
      <span className={classNames.personText}>
        <span className={classNames.personName}>{personValue.name}</span>
        {personValue.subtitle ? (
          <span className={classNames.personSubtitle}>
            {personValue.subtitle}
          </span>
        ) : null}
      </span>
    </div>
  )
}

function StatusChip({ status }: { status: OperationStatus }) {
  const isPositive = status === 'Active' || status === 'Paid'
  const color = isPositive ? '#56bf3b' : '#ef4860'

  return (
    <span
      className={classNames.statusText}
      style={{ backgroundColor: isPositive ? '#eef9ec' : '#fdecef', color }}>
      <span
        className={classNames.statusDot}
        style={{ backgroundColor: color }}
      />
      {status}
    </span>
  )
}

function Badge({ value }: { value: string }) {
  const color =
    value === 'Fixed'
      ? ['#fdecef', '#ef4860']
      : value === 'Percentage'
        ? ['#eaf2ff', '#2f6fe4']
        : ['#fff7df', '#d89b10']

  return (
    <span
      className={classNames.badge}
      style={{ backgroundColor: color[0], color: color[1] }}>
      {value}
    </span>
  )
}

function SortableHeader({
  children,
  sortDirection
}: {
  children: string
  sortDirection?: 'ascending' | 'descending'
}) {
  return (
    <span className={classNames.sortableHeader}>
      {children}
      {sortDirection && <Icon icon="lucide:chevrons-up-down" width={12} />}
    </span>
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

function OperationsDrawer({
  columns,
  drawerState,
  form,
  mode,
  row,
  title,
  canGoNext,
  canGoPrevious,
  onCancel,
  onClose,
  onEdit,
  onFormChange,
  onGoNext,
  onGoPrevious,
  onSave
}: {
  columns: OperationColumn[]
  drawerState: ReturnType<typeof useDisclosure>
  form: FilterDraft
  mode: DrawerMode
  row: OperationRow | null
  title: string
  canGoNext: boolean
  canGoPrevious: boolean
  onCancel: () => void
  onClose: () => void
  onEdit: () => void
  onFormChange: (field: string, value: string) => void
  onGoNext: () => void
  onGoPrevious: () => void
  onSave: () => void
}) {
  const isFormMode = mode === 'edit' || mode === 'create'

  return (
    <Drawer state={drawerState}>
      <Drawer.Backdrop variant="transparent">
        <Drawer.Content placement="right">
          <Drawer.Dialog className={classNames.drawerDialog}>
            <Drawer.Header className={classNames.drawerHeader}>
              <div className={classNames.drawerHeaderRow}>
                <div className={classNames.drawerTitleGroup}>
                  <CloseButton onClick={onClose} />
                  <h2 className={classNames.drawerTitle}>
                    {mode === 'create'
                      ? `Add ${title}`
                      : row
                        ? `#${row.id}`
                        : title}
                  </h2>
                </div>
                <div className={classNames.drawerActions}>
                  <Button
                    isIconOnly
                    aria-label="Previous row"
                    isDisabled={!canGoPrevious || mode === 'create'}
                    variant="ghost"
                    onPress={onGoPrevious}>
                    <Icon icon="lucide:chevron-up" width={18} />
                  </Button>
                  <Button
                    isIconOnly
                    aria-label="Next row"
                    isDisabled={!canGoNext || mode === 'create'}
                    variant="ghost"
                    onPress={onGoNext}>
                    <Icon icon="lucide:chevron-down" width={18} />
                  </Button>
                </div>
              </div>
            </Drawer.Header>
            <Drawer.Body className={classNames.drawerBody}>
              {isFormMode ? (
                <div className={classNames.form}>
                  {columns.map(column => (
                    <div key={column.key} className={classNames.field}>
                      <Label className={classNames.fieldLabel}>
                        {column.label || column.key}
                      </Label>
                      <Input
                        value={form[column.key] ?? ''}
                        onChange={event =>
                          onFormChange(column.key, event.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={classNames.details}>
                  {columns.map(column => (
                    <div key={column.key} className={classNames.detailLine}>
                      <p className={classNames.detailLabel}>
                        {column.label || column.key}
                      </p>
                      <div className={classNames.detailValue}>
                        {row ? (
                          <OperationCell
                            column={column}
                            row={row}
                            onAction={() => undefined}
                          />
                        ) : (
                          '-'
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Drawer.Body>
            <Drawer.Footer className={classNames.drawerFooter}>
              {isFormMode ? (
                <div className={classNames.drawerFormFooterActions}>
                  <Button variant="secondary" onPress={onCancel}>
                    Cancel
                  </Button>
                  <Button onPress={onSave}>
                    {mode === 'create' ? 'Create' : 'Save'}
                  </Button>
                </div>
              ) : (
                <div className={classNames.drawerViewFooterActions}>
                  <Button
                    className={classNames.flexOne}
                    variant="secondary"
                    onPress={onClose}>
                    Close
                  </Button>
                  <Button className={classNames.flexOne} onPress={onEdit}>
                    Edit
                  </Button>
                </div>
              )}
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}

function rowToForm(row: OperationRow, columns: OperationColumn[]): FilterDraft {
  return columns.reduce<FilterDraft>((draft, column) => {
    draft[column.key] = String(getSortValue(row[column.key]) ?? '')
    return draft
  }, {})
}

function createEmptyForm(columns: OperationColumn[]): FilterDraft {
  return columns.reduce<FilterDraft>((draft, column) => {
    draft[column.key] = ''
    return draft
  }, {})
}

function formToRow(
  row: OperationRow,
  form: FilterDraft,
  columns: OperationColumn[]
) {
  return columns.reduce<OperationRow>(
    (draft, column) => {
      const original = row[column.key]
      const value = form[column.key] ?? ''

      draft[column.key] =
        typeof original === 'number'
          ? Number(value)
          : isPersonValue(original)
            ? { ...original, name: value }
            : value

      return draft
    },
    { ...row }
  )
}

function formToNewRow(
  form: FilterDraft,
  columns: OperationColumn[],
  index: number
) {
  const row: OperationRow = {
    id: `operation-${Date.now()}`,
    createdAt: '2026-05-11'
  }

  columns.forEach(column => {
    row[column.key] =
      form[column.key] || (column.type === 'status' ? 'Active' : `New ${index}`)
  })

  return row
}

function getPresetDateRange(key: DatePresetKey): DateRangeFilter {
  if (key === 'today') return { start: '2026-05-11', end: '2026-05-11' }
  if (key === 'yesterday') return { start: '2026-05-10', end: '2026-05-10' }
  if (key === 'last30') return { start: '2026-04-12', end: '2026-05-11' }

  return { start: '2026-05-05', end: '2026-05-11' }
}

function formatDateRangeLabel(range: DateRangeFilter) {
  return `${range.start.replace(/-/g, '/')} - ${range.end.replace(/-/g, '/')}`
}

function isISODateInRange(value: string, start: string, end: string) {
  return value >= start && value <= end
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function getSearchText(value: unknown) {
  if (isPersonValue(value)) {
    return `${value.name} ${value.subtitle ?? ''}`
  }

  return String(value ?? '')
}

function getSortValue(value: unknown) {
  if (isPersonValue(value)) {
    return value.name
  }

  return value as string | number
}

function isPersonValue(value: unknown): value is PersonValue {
  return value !== null && typeof value === 'object' && 'name' in value
}

function getPaginationItems(totalPages: number) {
  return Array.from(
    { length: Math.min(totalPages, 2) },
    (_, index) => index + 1
  )
}
