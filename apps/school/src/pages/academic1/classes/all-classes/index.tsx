import { Icon } from '@iconify/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  Alert,
  Button,
  Checkbox,
  Chip,
  CloseButton,
  DateField,
  DateRangePicker,
  Drawer,
  Dropdown,
  Input,
  Label,
  ListBox,
  Pagination,
  RangeCalendar,
  SearchField,
  Select,
  type Selection,
  type SortDescriptor,
  Surface,
  Switch,
  Table,
  Tooltip
} from '@vezham/react/v3'

import {
  classOptions,
  dateOptions,
  emptyForm,
  initialRows,
  rowCountOptions,
  sectionOptions,
  sortOptions,
  statusOptions
} from './data'
import type {
  ClassDetailSummaryProps,
  ClassDetailsProps,
  ClassDrawerProps,
  ClassFormErrors,
  ClassFormProps,
  ClassFormState,
  ClassRow,
  ClassStatus,
  CustomDateRangeValue,
  DatePresetKey,
  DateRangeFilter,
  DetailLineProps,
  DrawerMode,
  DrawerQueryState,
  FilterDraft,
  FilterDropdownProps,
  OpenDrawerOptions,
  SortableHeaderProps,
  ToastState
} from './types'
import { useDisclosure } from './types'
import {
  classNames,
  getTableRowClassName,
  hiddenTextareaStyles
} from './variants'

export default function AllClassesPage() {
  const [data, setData] = useState<ClassRow[]>(initialRows)
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [page, setPage] = useState(1)
  const [datePreset, setDatePreset] = useState<DatePresetKey>('last7')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [isCustomDateRangeOpen, setIsCustomDateRangeOpen] = useState(false)
  const [customDateRange, setCustomDateRange] =
    useState<DateRangeFilter | null>(null)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'className',
    direction: 'ascending'
  })
  const [filters, setFilters] = useState<FilterDraft>({
    className: null,
    section: null,
    status: null
  })
  const [draftFilters, setDraftFilters] = useState<FilterDraft>(filters)
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [mode, setMode] = useState<DrawerMode>('view')
  const [form, setForm] = useState<ClassFormState>(emptyForm)
  const [formErrors, setFormErrors] = useState<ClassFormErrors>({})
  const [toast, setToast] = useState<ToastState | null>(null)
  const drawer = useDisclosure()

  const activeDateRange = useMemo(() => {
    if (datePreset === 'custom') {
      return customDateRange
    }

    return getPresetDateRange(datePreset)
  }, [customDateRange, datePreset])

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return data.filter(row => {
      const matchesQuery =
        !query ||
        row.id.toLowerCase().includes(query) ||
        row.className.toLowerCase().includes(query) ||
        row.section.toLowerCase().includes(query) ||
        row.status.toLowerCase().includes(query)
      const matchesDate =
        !activeDateRange ||
        isISODateInRange(
          row.createdAt,
          activeDateRange.start,
          activeDateRange.end
        )

      return (
        matchesQuery &&
        matchesDate &&
        (!filters.className || row.className === filters.className) &&
        (!filters.section || row.section === filters.section) &&
        (!filters.status || row.status === filters.status)
      )
    })
  }, [activeDateRange, data, filters, searchQuery])

  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((firstRow, secondRow) => {
      const first = firstRow[sortDescriptor.column as keyof ClassRow]
      const second = secondRow[sortDescriptor.column as keyof ClassRow]
      const comparison =
        typeof first === 'number' && typeof second === 'number'
          ? first - second
          : String(first).localeCompare(String(second), undefined, {
              numeric: true
            })

      return sortDescriptor.direction === 'descending'
        ? comparison * -1
        : comparison
    })
  }, [filteredRows, sortDescriptor])

  const pageSize = Number(rowsPerPage)
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  const selectedRow = useMemo(
    () => data.find(row => row.id === activeRowId) ?? null,
    [activeRowId, data]
  )
  const selectedRowIndex = activeRowId
    ? sortedRows.findIndex(row => row.id === activeRowId)
    : -1
  const tableSelectedKeys = useMemo<Selection>(
    () => (activeRowId ? new Set([activeRowId]) : new Set()),
    [activeRowId]
  )

  const activeSortLabel =
    sortOptions.find(
      option =>
        option.descriptor.column === sortDescriptor.column &&
        option.descriptor.direction === sortDescriptor.direction
    )?.label ?? 'Ascending'

  const activeDateLabel =
    datePreset === 'custom'
      ? customDateRange
        ? formatDateRangeLabel(customDateRange)
        : 'Custom Range'
      : formatDateRangeLabel(getPresetDateRange(datePreset))

  const showToast = useCallback(
    (message: string, status: ToastState['status'] = 'success') => {
      setToast({ message, status })
    },
    []
  )

  const copyText = useCallback(async (value: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value)
      return
    }

    const textarea = document.createElement('textarea')

    textarea.value = value
    textarea.setAttribute('readonly', '')
    Object.assign(textarea.style, hiddenTextareaStyles)
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }, [])

  const updateDrawerQuery = useCallback(
    (nextState: DrawerQueryState | null, replace = false) => {
      const url = new URL(window.location.href)

      if (nextState) {
        url.searchParams.set('id', nextState.id)
        url.searchParams.set('mode', nextState.mode)
      } else {
        url.searchParams.delete('id')
        url.searchParams.delete('mode')
      }

      window.history[replace ? 'replaceState' : 'pushState'](
        null,
        '',
        `${url.pathname}${url.search}${url.hash}`
      )
    },
    []
  )

  const openDrawer = useCallback(
    (
      nextMode: DrawerMode,
      row: ClassRow | null,
      options: OpenDrawerOptions = {}
    ) => {
      setMode(nextMode)
      setActiveRowId(row?.id ?? null)
      setForm(row ? rowToForm(row) : emptyForm)
      setFormErrors({})
      drawer.onOpen()

      if (options.syncUrl !== false) {
        updateDrawerQuery(
          row && nextMode !== 'create' ? { id: row.id, mode: nextMode } : null,
          options.replaceUrl
        )
      }
    },
    [drawer, updateDrawerQuery]
  )

  const updateTableSelection = useCallback(
    (keys: Selection) => {
      if (keys === 'all') {
        return
      }

      const nextId = Array.from(keys)[0]?.toString()

      if (!nextId) {
        setActiveRowId(null)
        drawer.onClose()
        updateDrawerQuery(null)
        return
      }

      const row = data.find(item => item.id === nextId)

      if (row) {
        openDrawer('view', row)
      }
    },
    [data, drawer, openDrawer, updateDrawerQuery]
  )

  const closeDrawer = useCallback(() => {
    setFormErrors({})
    drawer.onClose()
    setActiveRowId(null)
    updateDrawerQuery(null)
  }, [drawer, updateDrawerQuery])

  const setDrawerMode = useCallback(
    (nextMode: Exclude<DrawerMode, 'create'>) => {
      setMode(nextMode)

      if (selectedRow) {
        updateDrawerQuery({ id: selectedRow.id, mode: nextMode })
      }
    },
    [selectedRow, updateDrawerQuery]
  )

  const goToRowAt = useCallback(
    (index: number) => {
      const nextRow = sortedRows[index]

      if (!nextRow) {
        return
      }

      setActiveRowId(nextRow.id)
      setForm(rowToForm(nextRow))
      setMode(currentMode => (currentMode === 'create' ? 'view' : currentMode))
      updateDrawerQuery({
        id: nextRow.id,
        mode: mode === 'edit' ? 'edit' : 'view'
      })
    },
    [mode, sortedRows, updateDrawerQuery]
  )

  const goToNextRow = useCallback(() => {
    if (selectedRowIndex < 0) {
      goToRowAt(0)
      return
    }

    goToRowAt(Math.min(sortedRows.length - 1, selectedRowIndex + 1))
  }, [goToRowAt, selectedRowIndex, sortedRows.length])

  const goToPreviousRow = useCallback(() => {
    if (selectedRowIndex < 0) {
      goToRowAt(0)
      return
    }

    goToRowAt(Math.max(0, selectedRowIndex - 1))
  }, [goToRowAt, selectedRowIndex])

  useEffect(() => {
    const openAddClass = () => openDrawer('create', null)

    window.addEventListener('academic:class:open', openAddClass)
    return () => window.removeEventListener('academic:class:open', openAddClass)
  }, [openDrawer])

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeoutId = window.setTimeout(() => setToast(null), 2200)

    return () => window.clearTimeout(timeoutId)
  }, [toast])

  useEffect(() => {
    const syncDrawerFromUrl = () => {
      const params = new URLSearchParams(window.location.search)
      const id = params.get('id')
      const urlMode = params.get('mode')

      if (!id || (urlMode !== 'view' && urlMode !== 'edit')) {
        setActiveRowId(null)
        drawer.onClose()
        return
      }

      const row = data.find(item => item.id === id)

      if (!row) {
        setActiveRowId(null)
        drawer.onClose()
        return
      }

      setMode(urlMode)
      setActiveRowId(row.id)
      setForm(rowToForm(row))
      setFormErrors({})
      drawer.onOpen()
    }

    syncDrawerFromUrl()
    window.addEventListener('popstate', syncDrawerFromUrl)

    return () => window.removeEventListener('popstate', syncDrawerFromUrl)
  }, [data])

  useEffect(() => {
    if (!activeRowId) {
      return
    }

    const rowIndex = sortedRows.findIndex(row => row.id === activeRowId)

    if (rowIndex < 0) {
      return
    }

    const nextPage = Math.floor(rowIndex / pageSize) + 1

    if (nextPage !== currentPage) {
      setPage(nextPage)
      return
    }

    window.requestAnimationFrame(() => {
      document
        .querySelector(`[data-class-row-id="${activeRowId}"]`)
        ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    })
  }, [activeRowId, currentPage, pageSize, sortedRows])

  useEffect(() => {
    if (!drawer.isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.metaKey) {
        return
      }

      if (mode === 'create') {
        if (event.key === '/') {
          event.preventDefault()
          closeDrawer()
        }

        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        goToNextRow()
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        goToPreviousRow()
      }

      if (event.key === '/') {
        event.preventDefault()
        closeDrawer()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeDrawer, drawer.isOpen, goToNextRow, goToPreviousRow, mode])

  const updateDatePreset = (key: DatePresetKey) => {
    setDatePreset(key)
    setPage(1)

    if (key === 'custom') {
      setIsCustomDateRangeOpen(true)
      setIsDateDropdownOpen(true)
      window.setTimeout(() => {
        setIsCustomDateRangeOpen(true)
        setIsDateDropdownOpen(true)
      }, 0)
      return
    }

    setIsCustomDateRangeOpen(false)
    setIsDateDropdownOpen(false)
  }

  const updateCustomDateRange = (value: CustomDateRangeValue | null) => {
    setDatePreset('custom')
    setPage(1)

    if (!value?.start || !value?.end) {
      setCustomDateRange(null)
      return
    }

    setCustomDateRange({
      start: String(value.start),
      end: String(value.end)
    })
    setIsDateDropdownOpen(false)
    setIsCustomDateRangeOpen(false)
  }

  const updateSearch = (value: string) => {
    setSearchQuery(value)
    setPage(1)
  }

  const updateRowsPerPage = (value: string | number | null) => {
    setRowsPerPage(value ? String(value) : '10')
    setPage(1)
  }

  const applyFilters = () => {
    setFilters(draftFilters)
    setPage(1)
  }

  const resetFilters = () => {
    const emptyFilters = { className: null, section: null, status: null }

    setDraftFilters(emptyFilters)
    setFilters(emptyFilters)
    setPage(1)
  }

  const updateSortDescriptor = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor)
    setPage(1)
  }

  const updateForm = (field: keyof ClassFormState, value: string) => {
    setForm(current => ({ ...current, [field]: value }))
    setFormErrors(current => ({ ...current, [field]: undefined }))
  }

  const saveClass = () => {
    const className = form.className.trim()
    const section = form.section.trim()
    const students = Number(form.students)
    const subjects = Number(form.subjects)
    const errors = validateClassForm(form)

    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }

    if (mode === 'create') {
      const newRow: ClassRow = {
        id: createNextClassId(data),
        className,
        section,
        students,
        subjects,
        status: form.status,
        createdAt: toISODate(new Date()),
        viewedAt: toISODate(new Date())
      }

      setData(current => [newRow, ...current])
      setForm(emptyForm)
      setActiveRowId(null)
      setMode('view')
      setPage(1)
      closeDrawer()
      return
    }

    if (!selectedRow) {
      return
    }

    const updatedRow: ClassRow = {
      ...selectedRow,
      className,
      section,
      students,
      subjects,
      status: form.status
    }

    setData(current =>
      current.map(row => (row.id === updatedRow.id ? updatedRow : row))
    )
    setActiveRowId(updatedRow.id)
    setMode('view')
    updateDrawerQuery({ id: updatedRow.id, mode: 'view' })
  }

  const deleteClass = (rowId: string) => {
    setData(current => current.filter(row => row.id !== rowId))

    if (activeRowId === rowId) {
      setActiveRowId(null)
      drawer.onClose()
      updateDrawerQuery(null)
    }

    showToast('Item deleted')
  }

  const getClassUrl = (
    row: ClassRow,
    nextMode: Exclude<DrawerMode, 'create'> = 'view'
  ) => {
    const url = new URL(window.location.href)

    url.searchParams.set('id', row.id)
    url.searchParams.set('mode', nextMode)
    url.hash = ''

    return url.toString()
  }

  const copyClassLink = (row: ClassRow) => {
    const classUrl = getClassUrl(row, mode === 'edit' ? 'edit' : 'view')

    void copyText(classUrl)
      .then(() => {
        showToast('URL copied')
      })
      .catch(() => {
        showToast('Unable to copy URL', 'danger')
      })
  }

  const copyClassId = (row: ClassRow) => {
    void copyText(row.id)
      .then(() => {
        showToast('ID copied')
      })
      .catch(() => {
        showToast('Unable to copy ID', 'danger')
      })
  }

  const openClassPage = (row: ClassRow) => {
    window.open(getClassUrl(row), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className={classNames.page}>
      <Surface className={classNames.toolbar}>
        <div className={classNames.headerRow}>
          <div>
            <p className={classNames.mutedText}>Classes</p>
            <h1 className={classNames.title}>Classes List</h1>
          </div>

          <div className={classNames.toolbarActions}>
            <Dropdown
              isOpen={isDateDropdownOpen}
              onOpenChange={open => {
                setIsDateDropdownOpen(open)
                if (!open) {
                  setIsCustomDateRangeOpen(false)
                }
              }}>
              <Dropdown.Trigger>
                <Button variant="outline">
                  <Icon icon="lucide:calendar-days" width={16} />
                  {activeDateLabel}
                  <Icon icon="lucide:chevron-down" width={16} />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <Surface className={classNames.datePopover}>
                  {isCustomDateRangeOpen ? (
                    <div
                      className={classNames.customDatePanel}
                      onClick={event => event.stopPropagation()}>
                      <Button
                        variant="ghost"
                        onPress={() => setIsCustomDateRangeOpen(false)}>
                        <Icon icon="lucide:chevron-left" width={16} />
                        Date presets
                      </Button>
                      <DateRangePicker
                        defaultOpen
                        aria-label="Class custom date range"
                        className={classNames.fullWidth}
                        endName="endDate"
                        startName="startDate"
                        onChange={updateCustomDateRange}>
                        <DateField.Group fullWidth>
                          <DateField.Input slot="start">
                            {segment => <DateField.Segment segment={segment} />}
                          </DateField.Input>
                          <DateRangePicker.RangeSeparator />
                          <DateField.Input slot="end">
                            {segment => <DateField.Segment segment={segment} />}
                          </DateField.Input>
                          <DateField.Suffix>
                            <DateRangePicker.Trigger>
                              <DateRangePicker.TriggerIndicator />
                            </DateRangePicker.Trigger>
                          </DateField.Suffix>
                        </DateField.Group>
                        <DateRangePicker.Popover>
                          <RangeCalendar aria-label="Class custom date range">
                            <RangeCalendar.Header>
                              <RangeCalendar.Heading />
                              <RangeCalendar.NavButton slot="previous" />
                              <RangeCalendar.NavButton slot="next" />
                            </RangeCalendar.Header>
                            <RangeCalendar.Grid>
                              <RangeCalendar.GridHeader>
                                {day => (
                                  <RangeCalendar.HeaderCell>
                                    {day}
                                  </RangeCalendar.HeaderCell>
                                )}
                              </RangeCalendar.GridHeader>
                              <RangeCalendar.GridBody>
                                {date => <RangeCalendar.Cell date={date} />}
                              </RangeCalendar.GridBody>
                            </RangeCalendar.Grid>
                          </RangeCalendar>
                        </DateRangePicker.Popover>
                      </DateRangePicker>
                    </div>
                  ) : (
                    <Dropdown.Menu aria-label="Date presets">
                      {dateOptions.map(option => (
                        <Dropdown.Item
                          key={option.key}
                          id={option.key}
                          textValue={option.label}
                          onPress={() => updateDatePreset(option.key)}>
                          <span className={classNames.dateOptionLabel}>
                            {option.label}
                            {datePreset === option.key && (
                              <Icon icon="lucide:check" width={16} />
                            )}
                          </span>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  )}
                </Surface>
              </Dropdown.Popover>
            </Dropdown>

            <FilterDropdown
              draftFilters={draftFilters}
              setDraftFilters={setDraftFilters}
              onApply={applyFilters}
              onReset={resetFilters}
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
                <Dropdown.Menu aria-label="Sort classes">
                  {sortOptions.map(option => (
                    <Dropdown.Item
                      key={option.key}
                      id={option.key}
                      textValue={option.label}
                      onPress={() => updateSortDescriptor(option.descriptor)}>
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>

        <div className={classNames.headerRow}>
          <div className={classNames.rowsControls}>
            <Label>Rows per page</Label>
            <Select
              aria-label="Rows per page"
              value={rowsPerPage}
              onChange={updateRowsPerPage}>
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
            aria-label="Search classes"
            value={searchQuery}
            onChange={updateSearch}>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </div>
      </Surface>

      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="All classes"
            className={classNames.tableContent}
            selectedKeys={tableSelectedKeys}
            selectionMode="single"
            sortDescriptor={sortDescriptor}
            onSelectionChange={updateTableSelection}
            onSortChange={updateSortDescriptor}>
            <Table.Header>
              <Table.Column className={classNames.selectionColumn} />
              <Table.Column allowsSorting isRowHeader id="id">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    ID
                  </SortableHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="className">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Class
                  </SortableHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="section">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Section
                  </SortableHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="students">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Students
                  </SortableHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="subjects">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Subjects
                  </SortableHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="createdAt">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Created
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
              {paginatedRows.map(row => (
                <Table.Row
                  key={row.id}
                  id={row.id}
                  data-class-row-id={row.id}
                  className={getTableRowClassName(activeRowId === row.id)}
                  onClick={() => openDrawer('view', row)}>
                  <Table.Cell>
                    <Checkbox
                      aria-label={`Select class ${row.id}`}
                      slot="selection"
                      onClick={event => event.stopPropagation()}>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox>
                  </Table.Cell>
                  <Table.Cell>{row.id}</Table.Cell>
                  <Table.Cell>{row.className}</Table.Cell>
                  <Table.Cell>{row.section}</Table.Cell>
                  <Table.Cell>{row.students}</Table.Cell>
                  <Table.Cell>
                    {row.subjects.toString().padStart(2, '0')}
                  </Table.Cell>
                  <Table.Cell>{formatDisplayDate(row.createdAt)}</Table.Cell>
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
                        onPress={() => openDrawer('edit', row)}>
                        <Icon icon="lucide:pencil" width={16} />
                      </Button>
                      <Button
                        isIconOnly
                        aria-label={`Delete ${row.id}`}
                        variant="outline"
                        onPress={() => deleteClass(row.id)}>
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
                              onPress={() => openDrawer('view', row)}>
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
              {getPaginationSummary(currentPage, pageSize, sortedRows.length)}
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={currentPage <= 1}
                  onPress={() => setPage(value => Math.max(1, value - 1))}>
                  <Pagination.PreviousIcon />
                  <span>Prev</span>
                </Pagination.Previous>
              </Pagination.Item>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                item => (
                  <Pagination.Item key={item}>
                    <Pagination.Link
                      isActive={item === currentPage}
                      onPress={() => setPage(item)}>
                      {item}
                    </Pagination.Link>
                  </Pagination.Item>
                )
              )}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={currentPage >= totalPages}
                  onPress={() =>
                    setPage(value => Math.min(totalPages, value + 1))
                  }>
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>

      <ClassDrawer
        canGoNext={
          selectedRowIndex >= 0 && selectedRowIndex < sortedRows.length - 1
        }
        canGoPrevious={selectedRowIndex > 0}
        drawerState={drawer}
        form={form}
        formErrors={formErrors}
        mode={mode}
        row={selectedRow}
        onCancel={closeDrawer}
        onClose={closeDrawer}
        onCopyId={copyClassId}
        onCopyLink={copyClassLink}
        onEdit={() => setDrawerMode('edit')}
        onFormChange={updateForm}
        onGoNext={goToNextRow}
        onGoPrevious={goToPreviousRow}
        onOpenPage={openClassPage}
        onSave={saveClass}
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

function TableEmptyState() {
  return (
    <div className={classNames.emptyState}>
      <Icon className={classNames.emptyIcon} icon="lucide:inbox" width={42} />
      <p className={classNames.emptyText}>No results found</p>
    </div>
  )
}

function FilterDropdown({
  draftFilters,
  setDraftFilters,
  onApply,
  onReset
}: FilterDropdownProps) {
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
          <Select
            fullWidth
            aria-label="Filter by class"
            placeholder="Select class"
            value={draftFilters.className}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                className: value ? String(value) : null
              })
            }>
            <Label>Class</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {classOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Select
            fullWidth
            aria-label="Filter by section"
            placeholder="Select section"
            value={draftFilters.section}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                section: value ? String(value) : null
              })
            }>
            <Label>Section</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {sectionOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Select
            fullWidth
            aria-label="Filter by status"
            placeholder="Select status"
            value={draftFilters.status}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                status: value ? (String(value) as ClassStatus) : null
              })
            }>
            <Label>Status</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {statusOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

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

function ClassDrawer({
  canGoNext,
  canGoPrevious,
  drawerState,
  form,
  formErrors,
  mode,
  row,
  onCancel,
  onClose,
  onCopyId,
  onCopyLink,
  onEdit,
  onFormChange,
  onGoNext,
  onGoPrevious,
  onOpenPage,
  onSave
}: ClassDrawerProps) {
  const isFormMode = mode === 'create' || mode === 'edit'
  const showNavigation = mode !== 'create'
  const drawerTitle = mode === 'create' ? 'Add Class' : row ? `#${row.id}` : ''

  return (
    <Drawer state={drawerState}>
      <Drawer.Backdrop variant="transparent">
        <Drawer.Content placement="right">
          <Drawer.Dialog className={classNames.drawerDialog}>
            <Drawer.Header className={classNames.drawerHeader}>
              <div className={classNames.drawerHeaderRow}>
                <div className={classNames.drawerTitleGroup}>
                  <Button
                    isIconOnly
                    aria-label="Close class drawer"
                    variant="ghost"
                    onPress={onClose}>
                    <Icon icon="lucide:chevrons-right" width={24} />
                  </Button>
                  <span className={classNames.drawerTitle}>{drawerTitle}</span>
                  {row && (
                    <Tooltip delay={0}>
                      <Tooltip.Trigger>
                        <Button
                          isIconOnly
                          aria-label={`Copy ID ${row.id}`}
                          variant="ghost"
                          onPress={() => onCopyId(row)}>
                          <Icon icon="lucide:copy" width={16} />
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>Copy ID</Tooltip.Content>
                    </Tooltip>
                  )}
                </div>

                <div className={classNames.drawerActions}>
                  {row && (
                    <>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`Copy URL for ${row.id}`}
                            variant="secondary"
                            onPress={() => onCopyLink(row)}>
                            <Icon icon="lucide:link" width={16} />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Copy URL</Tooltip.Content>
                      </Tooltip>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`Open ${row.id}`}
                            variant="secondary"
                            onPress={() => onOpenPage(row)}>
                            <Icon icon="lucide:arrow-up-right" width={16} />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Copy URL</Tooltip.Content>
                      </Tooltip>
                    </>
                  )}

                  {showNavigation && (
                    <>
                      <Button
                        isIconOnly
                        aria-label="Next class"
                        isDisabled={!canGoNext}
                        variant="secondary"
                        onPress={onGoNext}>
                        <Icon icon="lucide:chevron-up" width={18} />
                      </Button>
                      <Button
                        isIconOnly
                        aria-label="Previous class"
                        isDisabled={!canGoPrevious}
                        variant="secondary"
                        onPress={onGoPrevious}>
                        <Icon icon="lucide:chevron-down" width={18} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Drawer.Header>

            <Drawer.Body className={classNames.drawerBody}>
              {isFormMode ? (
                <ClassForm
                  form={form}
                  formErrors={formErrors}
                  mode={mode}
                  row={row}
                  onFormChange={onFormChange}
                />
              ) : (
                <ClassDetails row={row} />
              )}
            </Drawer.Body>

            <Drawer.Footer className={classNames.drawerFooter}>
              {isFormMode ? (
                <div className={classNames.drawerFormFooterActions}>
                  <Button variant="secondary" onPress={onCancel}>
                    Cancel
                  </Button>
                  <Button onPress={onSave}>
                    {mode === 'create' ? 'Add Class' : 'Save'}
                  </Button>
                </div>
              ) : (
                <div className={classNames.drawerViewFooterActions}>
                  <Button
                    className={classNames.flexOne}
                    variant="secondary"
                    onPress={onEdit}>
                    <Icon icon="lucide:pencil" width={16} />
                    Edit
                  </Button>
                  <Button className={classNames.flexOne} onPress={onClose}>
                    Close
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

function ClassForm({
  form,
  formErrors,
  mode,
  row,
  onFormChange
}: ClassFormProps) {
  return (
    <div className={classNames.form}>
      {mode === 'edit' && row && <ClassDetailSummary row={row} />}

      <div className={classNames.formFields}>
        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>Class Name</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.className)}
            placeholder="Enter class name"
            value={form.className}
            onChange={event => onFormChange('className', event.target.value)}
          />
          {formErrors.className && (
            <p className={classNames.fieldError}>{formErrors.className}</p>
          )}
        </div>

        <Select
          fullWidth
          aria-label="Section"
          aria-invalid={Boolean(formErrors.section)}
          placeholder="Select section"
          value={form.section || null}
          onChange={value =>
            onFormChange('section', value ? String(value) : '')
          }>
          <Label className={classNames.fieldLabel}>Section</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {sectionOptions.map(option => (
                <ListBox.Item key={option} id={option} textValue={option}>
                  {option}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        {formErrors.section && (
          <p className={classNames.selectError}>{formErrors.section}</p>
        )}

        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>No of Students</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.students)}
            min={0}
            placeholder="Enter students"
            type="number"
            value={form.students}
            onChange={event => onFormChange('students', event.target.value)}
          />
          {formErrors.students && (
            <p className={classNames.fieldError}>{formErrors.students}</p>
          )}
        </div>

        <div className={classNames.field}>
          <Label className={classNames.fieldLabel}>No of Subjects</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.subjects)}
            min={0}
            placeholder="Enter subjects"
            type="number"
            value={form.subjects}
            onChange={event => onFormChange('subjects', event.target.value)}
          />
          {formErrors.subjects && (
            <p className={classNames.fieldError}>{formErrors.subjects}</p>
          )}
        </div>
      </div>

      <div className={classNames.statusRow}>
        <div>
          <div className={classNames.fieldLabel}>Status</div>
          <div className={classNames.statusHelp}>
            Change the Status by toggle
          </div>
        </div>
        <Switch
          aria-label="Class status"
          isSelected={form.status === 'Active'}
          onChange={isSelected =>
            onFormChange('status', isSelected ? 'Active' : 'Inactive')
          }>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch>
      </div>
    </div>
  )
}

function ClassDetails({ row }: ClassDetailsProps) {
  if (!row) {
    return null
  }

  return (
    <div className={classNames.details}>
      <ClassDetailSummary row={row} />
    </div>
  )
}

function ClassDetailSummary({ row }: ClassDetailSummaryProps) {
  return (
    <div className={classNames.detailSummary}>
      <DetailLine label="Class" value={row.className} />
      <DetailLine label="Section" value={row.section} />
      <DetailLine label="Students" value={String(row.students)} />
      <DetailLine label="Subjects" value={String(row.subjects)} />

      <div className={classNames.detailChipRow}>
        <span className={classNames.detailHeading}>Status:</span>
        <Chip
          color={row.status === 'Active' ? 'success' : 'danger'}
          variant="soft">
          <span aria-hidden="true">●</span>
          <Chip.Label>{row.status}</Chip.Label>
        </Chip>
      </div>

      <div className={classNames.detailTagsRow}>
        <span className={classNames.detailHeading}>Tags:</span>
        {getClassTags(row).map(tag => (
          <Chip key={tag} variant="soft">
            <Chip.Label>{tag}</Chip.Label>
          </Chip>
        ))}
      </div>
    </div>
  )
}

function DetailLine({ label, value }: DetailLineProps) {
  return (
    <div className={classNames.detailLine}>
      <span className={classNames.fieldLabel}>{label}:</span>
      <span className={classNames.detailValue}>{value}</span>
    </div>
  )
}

function SortableHeader({ children, sortDirection }: SortableHeaderProps) {
  const icon =
    sortDirection === 'ascending'
      ? 'lucide:chevron-up'
      : sortDirection === 'descending'
        ? 'lucide:chevron-down'
        : 'lucide:chevrons-up-down'

  return (
    <span className={classNames.sortableHeader}>
      {children}
      <Icon icon={icon} width={14} />
    </span>
  )
}

function getClassTags(row: ClassRow) {
  return [`Grade ${row.className}`, `Section ${row.section}`, row.status]
}

function getPresetDateRange(preset: Exclude<DatePresetKey, 'custom'>) {
  const today = startOfDay(new Date())

  if (preset === 'today') {
    return { start: toISODate(today), end: toISODate(today) }
  }

  if (preset === 'yesterday') {
    const yesterday = addDays(today, -1)
    return { start: toISODate(yesterday), end: toISODate(yesterday) }
  }

  if (preset === 'last7') {
    return { start: toISODate(addDays(today, -6)), end: toISODate(today) }
  }

  if (preset === 'last30') {
    return { start: toISODate(addDays(today, -29)), end: toISODate(today) }
  }

  if (preset === 'thisYear') {
    const year = today.getFullYear()
    return { start: `${year}-01-01`, end: `${year}-12-31` }
  }

  const nextYear = today.getFullYear() + 1
  return { start: `${nextYear}-01-01`, end: `${nextYear}-12-31` }
}

function isISODateInRange(date: string, start: string, end: string) {
  return date >= start && date <= end
}

function rowToForm(row: ClassRow): ClassFormState {
  return {
    className: row.className,
    section: row.section,
    students: String(row.students),
    subjects: String(row.subjects),
    status: row.status
  }
}

function validateClassForm(form: ClassFormState) {
  const errors: ClassFormErrors = {}
  const students = Number(form.students)
  const subjects = Number(form.subjects)

  if (!form.className.trim()) {
    errors.className = 'Class name is required.'
  }

  if (!form.section.trim()) {
    errors.section = 'Section is required.'
  }

  if (!form.students.trim() || !Number.isFinite(students) || students < 0) {
    errors.students = 'No of students is required.'
  }

  if (!form.subjects.trim() || !Number.isFinite(subjects) || subjects < 0) {
    errors.subjects = 'No of subjects is required.'
  }

  return errors
}

function createNextClassId(rows: ClassRow[]) {
  const nextNumber =
    Math.max(0, ...rows.map(row => Number(row.id.replace(/\D/g, '')) || 0)) + 1

  return `C${String(nextNumber).padStart(6, '0')}`
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function toISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatDisplayDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

function formatDateRangeLabel(range: DateRangeFilter) {
  return `${formatNumericDate(range.start)} - ${formatNumericDate(range.end)}`
}

function formatNumericDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

function getPaginationSummary(page: number, pageSize: number, total: number) {
  if (!total) {
    return 'Showing 0 of 0 entries'
  }

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return `Showing ${start}-${end} of ${total} entries`
}
