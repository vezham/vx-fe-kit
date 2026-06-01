import { Icon } from '@iconify/react'
import { useHotkey } from '@tanstack/react-hotkeys'
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
  Table,
  Tooltip
} from '@vezham/react-v3'

import { ShortcutTooltipLabel } from '../../../../components/shortcut-key'
import {
  classOptions,
  dateOptions,
  durationOptions,
  emptyForm,
  examOptions,
  examdateOptions,
  initialRows,
  roomOptions,
  rowCountOptions,
  sectionOptions,
  sortOptions,
  statusOptions,
  subjectOptions
} from './data'
import type {
  ClassDetailSummaryProps,
  ClassDetailsProps,
  ClassDrawerProps,
  ClassFormErrors,
  ClassFormProps,
  ClassFormState,
  ClassRow,
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
  const [rowsPerPage, setRowsPerPage] = useState('5')
  const [page, setPage] = useState(1)
  const [datePreset, setDatePreset] = useState<DatePresetKey>('last30')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [isCustomDateRangeOpen, setIsCustomDateRangeOpen] = useState(false)
  const [customDateRange, setCustomDateRange] =
    useState<DateRangeFilter | null>(null)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'type',
    direction: 'ascending'
  })
  const [filters, setFilters] = useState<FilterDraft>({
    date: null,
    subject: null,
    starttime: null,
    endtime: null,
    duration: null,
    maximum: null,
    minimum: null,
    classroom: null,
    status: null
  })
  const [draftFilters, setDraftFilters] = useState<FilterDraft>(filters)
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Selection>(new Set())
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
        row.date.toLowerCase().includes(query) ||
        row.subject.toLowerCase().includes(query) ||
        row.duration.toLowerCase().includes(query) ||
        row.starttime.toLowerCase().includes(query) ||
        row.endtime.toLowerCase().includes(query) ||
        row.classroom.toLowerCase().includes(query) ||
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
        (!filters.date || row.date === filters.date) &&
        (!filters.duration || row.duration === filters.duration) &&
        (!filters.subject || row.subject === filters.subject) &&
        (!filters.starttime || row.starttime === filters.starttime) &&
        (!filters.endtime || row.endtime === filters.endtime) &&
        (!filters.classroom || row.classroom === filters.classroom) &&
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
  const tableSelectedKeys = useMemo(
    () => (activeRowId ? new Set([activeRowId]) : selectedRowKeys),
    [activeRowId, selectedRowKeys]
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

  const updateTableSelection = useCallback((keys: Selection) => {
    setSelectedRowKeys(keys)
  }, [])

  const closeDrawer = useCallback(() => {
    setFormErrors({})
    drawer.onClose()
    setActiveRowId(null)
    updateDrawerQuery(null)
  }, [drawer, updateDrawerQuery])

  const toggleDrawer = useCallback(() => {
    if (drawer.isOpen) {
      closeDrawer()
      return
    }

    const selectedKey = Array.from(selectedRowKeys)[0]
    const selectedRow =
      sortedRows.find(row => row.id === selectedKey) ?? sortedRows[0]

    if (selectedRow) {
      openDrawer('view', selectedRow, { replaceUrl: true })
      return
    }

    openDrawer('create', null)
  }, [closeDrawer, drawer.isOpen, openDrawer, selectedRowKeys, sortedRows])

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
    const openAddSchedule = () => openDrawer('create', null)

    window.addEventListener('academic:exam-schedule:create', openAddSchedule)
    return () =>
      window.removeEventListener(
        'academic:exam-schedule:create',
        openAddSchedule
      )
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

  useHotkey('Meta+/', () => toggleDrawer())

  useHotkey('Meta+ArrowUp', () => goToNextRow(), {
    enabled: drawer.isOpen && mode !== 'create'
  })

  useHotkey('Meta+ArrowDown', () => goToPreviousRow(), {
    enabled: drawer.isOpen && mode !== 'create'
  })

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
    const emptyFilters = {
      date: null,
      duration: null,
      subject: null,
      maximum: null,
      starttime: null,
      endtime: null,
      minimum: null,
      classroom: null,
      status: null
    }

    setDraftFilters(emptyFilters)
    setFilters(emptyFilters)
    setPage(1)
  }

  const updateSortDescriptor = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor)
    setPage(1)
  }

  const updateForm = <K extends keyof ClassFormState>(
    field: K,
    value: ClassFormState[K]
  ) => {
    setForm(current => ({ ...current, [field]: value }))
    setFormErrors(current => ({ ...current, [field]: undefined }))
  }

  const saveClass = () => {
    const date = form.date.trim()
    const maximum = form.maximum.trim()
    const minimum = form.minimum.trim()
    const subject = form.subject.trim()
    const duration = form.duration.trim()
    const classroom = form.classroom.trim()
    const classes = form.classes.trim()
    const section = form.section.trim()
    const examName = form.examName.trim()
    const starttime = form.starttime
    const endtime = form.endtime

    const errors = validateClassForm(form)

    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }

    if (mode === 'create') {
      const now = toISODate(new Date())
      const nextNumber =
        Math.max(
          0,
          ...data.map(row => Number(row.id.replace(/\D/g, '')) || 0)
        ) + 1
      const newRows = form.scheduleRows.map((scheduleRow, index) => ({
        id: `C${String(nextNumber + index).padStart(6, '0')}`,
        classes,
        section,
        examName,
        date: scheduleRow.date.trim(),
        duration,
        subject: scheduleRow.subject.trim(),
        maximum: scheduleRow.maximum.trim(),
        minimum: scheduleRow.minimum.trim(),
        classroom: scheduleRow.classroom.trim(),
        starttime,
        endtime,
        status: form.status,
        createdAt: now,
        viewedAt: now
      }))

      setData(current => [...newRows, ...current])
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
      classes,
      section,
      examName,
      date,
      maximum,
      subject,
      minimum,
      duration,
      classroom,
      starttime,
      endtime,
      status: form.status
    }

    setData(current =>
      current.map(row => (row.id === updatedRow.id ? updatedRow : row))
    )
    setActiveRowId(updatedRow.id)
    setForm(rowToForm(updatedRow))
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
            <p className={classNames.mutedText}>Academic</p>
            <h1 className={classNames.title}>Exam Schedule</h1>
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
                        aria-label="Schedule custom date range"
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
                          <RangeCalendar aria-label="Schedule custom date range">
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
                <Dropdown.Menu aria-label="Sort schedules">
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
            aria-label="Search schedules"
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
            aria-label="Schedules"
            className={classNames.tableContent}
            selectedKeys={tableSelectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            onSelectionChange={updateTableSelection}
            onSortChange={updateSortDescriptor}>
            <Table.Header>
              <Table.Column className={classNames.selectionColumn} />
              {/* <Table.Column allowsSorting isRowHeader id="id">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    ID
                  </SortableHeader>
                )}
              </Table.Column> */}
              <Table.Column allowsSorting id="subject">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Subject
                  </SortableHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="date">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Exam Date
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
              <Table.Column allowsSorting id="duration">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Duration
                  </SortableHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="classroom">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Room No
                  </SortableHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="maximum">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Max Marks
                  </SortableHeader>
                )}
              </Table.Column>
              <Table.Column allowsSorting id="minimum">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Min Marks
                  </SortableHeader>
                )}
              </Table.Column>

              {/* <Table.Column allowsSorting id="status">
                {({ sortDirection }) => (
                  <SortableHeader sortDirection={sortDirection}>
                    Status
                  </SortableHeader>
                )}
              </Table.Column> */}
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
                      aria-label={`Select schedule ${row.id}`}
                      slot="selection"
                      onClick={event => event.stopPropagation()}>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox>
                  </Table.Cell>
                  {/* <Table.Cell>{row.id}</Table.Cell> */}
                  <Table.Cell>{row.subject}</Table.Cell>
                  <Table.Cell>{row.date}</Table.Cell>
                  <Table.Cell>{row.starttime}</Table.Cell>
                  <Table.Cell>{row.endtime}</Table.Cell>
                  <Table.Cell>{row.duration}</Table.Cell>
                  <Table.Cell>{row.classroom}</Table.Cell>
                  <Table.Cell>{row.maximum}</Table.Cell>
                  <Table.Cell>{row.minimum}</Table.Cell>

                  {/* <Table.Cell>
                    <Chip
                      color={row.status === 'Active' ? 'success' : 'danger'}
                      size="sm"
                      variant="soft">
                      <span aria-hidden="true">●</span>
                      <Chip.Label>{row.status}</Chip.Label>
                    </Chip>
                  </Table.Cell> */}
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
            aria-label="Filter by classes"
            placeholder="Select classes"
            value={draftFilters.classes}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                classes: value ? String(value) : null
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
            aria-label="Filter by date"
            placeholder="Select date"
            value={draftFilters.date}
            onChange={value =>
              setDraftFilters({
                ...draftFilters,
                date: value ? String(value) : null
              })
            }>
            <Label>Exam Date</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {examdateOptions.map(option => (
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
  const drawerTitle =
    mode === 'create' ? 'Add Exam Schedule' : row ? getDrawerTitle(row) : ''

  return (
    <Drawer state={drawerState}>
      <Drawer.Backdrop variant="transparent">
        <Drawer.Content placement="right">
          <Drawer.Dialog className={classNames.drawerDialog}>
            <Drawer.Header className={classNames.drawerHeader}>
              <div className={classNames.drawerHeaderRow}>
                <div className={classNames.drawerTitleGroup}>
                  <Tooltip delay={0}>
                    <Tooltip.Trigger>
                      <Button
                        isIconOnly
                        aria-label="Toggle drawer"
                        variant="ghost"
                        onPress={onClose}>
                        <Icon icon="lucide:chevrons-right" width={24} />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <ShortcutTooltipLabel
                        label="Toggle Drawer"
                        shortcut="⌘ /"
                      />
                    </Tooltip.Content>
                  </Tooltip>
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
                      <Tooltip.Content>
                        <ShortcutTooltipLabel label="Copy" shortcut="⌘ C" />
                      </Tooltip.Content>
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
                        <Tooltip.Content>
                          <ShortcutTooltipLabel label="Copy" shortcut="⌘ C" />
                        </Tooltip.Content>
                      </Tooltip>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`Edit ${row.id}`}
                            variant="secondary"
                            onPress={onEdit}>
                            <Icon icon="lucide:pencil" width={16} />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <ShortcutTooltipLabel label="Edit" shortcut="⌘ E" />
                        </Tooltip.Content>
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
                        <Tooltip.Content>Open ↗</Tooltip.Content>
                      </Tooltip>
                    </>
                  )}

                  {showNavigation && (
                    <>
                      <Button
                        isIconOnly
                        aria-label="Next schedule"
                        isDisabled={!canGoNext}
                        variant="secondary"
                        onPress={onGoNext}>
                        <Icon icon="lucide:chevron-up" width={18} />
                      </Button>
                      <Button
                        isIconOnly
                        aria-label="Previous schedule"
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
                    {mode === 'create' ? 'Add Exam Schedule' : 'Save'}
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

function ClassForm({ form, formErrors, onFormChange }: ClassFormProps) {
  const scheduleRows = form.scheduleRows.length
    ? form.scheduleRows
    : emptyForm.scheduleRows

  const updateScheduleRow = (
    rowId: string,
    field: keyof (typeof scheduleRows)[number],
    value: string
  ) => {
    onFormChange(
      'scheduleRows',
      scheduleRows.map(scheduleRow =>
        scheduleRow.id === rowId
          ? { ...scheduleRow, [field]: value }
          : scheduleRow
      )
    )
  }

  const addScheduleRow = () => {
    onFormChange('scheduleRows', [
      ...scheduleRows,
      {
        id: `schedule-row-${Date.now()}`,
        date: '',
        subject: '',
        classroom: '',
        maximum: '',
        minimum: ''
      }
    ])
  }

  const deleteScheduleRow = (rowId: string) => {
    if (scheduleRows.length === 1) {
      return
    }

    onFormChange(
      'scheduleRows',
      scheduleRows.filter(scheduleRow => scheduleRow.id !== rowId)
    )
  }

  return (
    <div className={classNames.form}>
      <div className={classNames.formFields}>
        <div className={classNames.scheduleTopGrid}>
          <Select
            fullWidth
            aria-label="Class"
            aria-invalid={Boolean(formErrors.classes)}
            placeholder="Select class"
            value={form.classes || null}
            onChange={value =>
              onFormChange('classes', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Class</Label>
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
          {formErrors.classes && (
            <p className={classNames.fieldError}>{formErrors.classes}</p>
          )}

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
            <p className={classNames.fieldError}>{formErrors.section}</p>
          )}

          <Select
            fullWidth
            aria-label="Exam name"
            aria-invalid={Boolean(formErrors.examName)}
            placeholder="Select exam name"
            value={form.examName || null}
            onChange={value =>
              onFormChange('examName', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Exam Name</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {examOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.examName && (
            <p className={classNames.fieldError}>{formErrors.examName}</p>
          )}

          <div className={classNames.field}>
            <Label className={classNames.fieldLabel}>Start Time</Label>
            <Input
              fullWidth
              aria-label="Start time"
              aria-invalid={Boolean(formErrors.starttime)}
              type="time"
              value={form.starttime}
              onChange={event => onFormChange('starttime', event.target.value)}
            />
            {formErrors.starttime && (
              <p className={classNames.fieldError}>{formErrors.starttime}</p>
            )}
          </div>

          <div className={classNames.field}>
            <Label className={classNames.fieldLabel}>End Time</Label>
            <Input
              fullWidth
              aria-label="End time"
              aria-invalid={Boolean(formErrors.endtime)}
              type="time"
              value={form.endtime}
              onChange={event => onFormChange('endtime', event.target.value)}
            />
            {formErrors.endtime && (
              <p className={classNames.fieldError}>{formErrors.endtime}</p>
            )}
          </div>

          <Select
            fullWidth
            aria-label="Duration"
            aria-invalid={Boolean(formErrors.duration)}
            placeholder="Select duration"
            value={form.duration || null}
            onChange={value =>
              onFormChange('duration', value ? String(value) : '')
            }>
            <Label className={classNames.fieldLabel}>Duration(min)</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {durationOptions.map(option => (
                  <ListBox.Item key={option} id={option} textValue={option}>
                    {option}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
          {formErrors.duration && (
            <p className={classNames.fieldError}>{formErrors.duration}</p>
          )}
        </div>

        <div className={classNames.scheduleRows}>
          {scheduleRows.map((scheduleRow, index) => (
            <div key={scheduleRow.id} className={classNames.scheduleRow}>
              <Select
                fullWidth
                aria-label={`Exam date ${index + 1}`}
                placeholder="Select"
                value={scheduleRow.date || null}
                onChange={value =>
                  updateScheduleRow(
                    scheduleRow.id,
                    'date',
                    value ? String(value) : ''
                  )
                }>
                <Label className={classNames.fieldLabel}>Exam Date</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {examdateOptions.map(option => (
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
                aria-label={`Subject ${index + 1}`}
                placeholder="Select"
                value={scheduleRow.subject || null}
                onChange={value =>
                  updateScheduleRow(
                    scheduleRow.id,
                    'subject',
                    value ? String(value) : ''
                  )
                }>
                <Label className={classNames.fieldLabel}>Subject</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {subjectOptions.map(option => (
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
                aria-label={`Room number ${index + 1}`}
                placeholder="Select"
                value={scheduleRow.classroom || null}
                onChange={value =>
                  updateScheduleRow(
                    scheduleRow.id,
                    'classroom',
                    value ? String(value) : ''
                  )
                }>
                <Label className={classNames.fieldLabel}>Room No</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {roomOptions.map(option => (
                      <ListBox.Item key={option} id={option} textValue={option}>
                        {option}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              <div className={classNames.field}>
                <Label className={classNames.fieldLabel}>Max Marks</Label>
                <Input
                  fullWidth
                  aria-label={`Max marks ${index + 1}`}
                  placeholder="Select"
                  value={scheduleRow.maximum}
                  onChange={event =>
                    updateScheduleRow(
                      scheduleRow.id,
                      'maximum',
                      event.target.value
                    )
                  }
                />
              </div>

              <div className={classNames.field}>
                <Label className={classNames.fieldLabel}>Min Marks</Label>
                <Input
                  fullWidth
                  aria-label={`Min marks ${index + 1}`}
                  placeholder="Select"
                  value={scheduleRow.minimum}
                  onChange={event =>
                    updateScheduleRow(
                      scheduleRow.id,
                      'minimum',
                      event.target.value
                    )
                  }
                />
              </div>

              <Button
                isIconOnly
                aria-label={`Delete schedule row ${index + 1}`}
                className={classNames.scheduleDeleteButton}
                isDisabled={scheduleRows.length === 1}
                variant="secondary"
                onPress={() => deleteScheduleRow(scheduleRow.id)}>
                <Icon icon="lucide:trash-2" width={18} />
              </Button>
            </div>
          ))}
        </div>

        {formErrors.scheduleRows && (
          <p className={classNames.fieldError}>{formErrors.scheduleRows}</p>
        )}

        <div>
          <Button onPress={addScheduleRow}>
            <Icon icon="lucide:plus-circle" width={16} />
            Add New
          </Button>
        </div>
      </div>

      <div className={classNames.statusRow}>
        <Select
          fullWidth
          aria-label="Status"
          aria-invalid={Boolean(formErrors.status)}
          placeholder="Select status"
          value={form.status}
          onChange={value =>
            onFormChange('status', value ? String(value) : 'Active')
          }>
          <Label className={classNames.fieldLabel}>Status</Label>
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
      </div>
      {formErrors.status && (
        <p className={classNames.selectError}>{formErrors.status}</p>
      )}
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
      <DetailLine label="Class" value={row.classes} />
      <DetailLine label="Section" value={row.section} />
      <DetailLine label="Exam Name" value={row.examName} />
      <DetailLine label="Exam Date" value={row.date} />
      <DetailLine label="Subject" value={row.subject} />
      <DetailLine label="Start Time" value={row.starttime} />
      <DetailLine label="End Time" value={row.endtime} />
      <DetailLine label="Duration" value={row.duration} />
      <DetailLine label="Room No" value={row.classroom} />
      <DetailLine label="Max Marks" value={row.maximum} />
      <DetailLine label="Min Marks" value={row.minimum} />

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
  return [
    `Grade ${row.classes}`,
    `Section ${row.section}`,
    row.examName,
    row.subject,
    `Room ${row.classroom}`,
    row.status
  ]
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

function getDrawerTitle(row: ClassRow) {
  const values = row as Record<string, unknown>
  const idValue =
    getDrawerText(values.displayId) ||
    getDrawerText(values.refId) ||
    getDrawerText(values.studentId) ||
    getDrawerText(values.admissionNo) ||
    getDrawerText(values.admissionNumber) ||
    getDrawerText(values.serialNo) ||
    getDrawerText(values.sNo) ||
    getDrawerText(values.id)
  const nameValue =
    getDrawerText(values.name) ||
    getDrawerText(values.studentName) ||
    getDrawerText(values.staffName) ||
    getDrawerText(values.teacherName)

  if (idValue) {
    return idValue.startsWith('#') ? idValue : `#${idValue}`
  }

  return nameValue || '-'
}

function getDrawerText(value: unknown) {
  if (value && typeof value === 'object' && 'name' in value) {
    return String((value as { name?: unknown }).name ?? '').trim()
  }

  if (value === null || value === undefined) return ''

  return String(value).trim().split('\n')[0]
}

function rowToForm(row: ClassRow): ClassFormState {
  return {
    classes: row.classes,
    section: row.section,
    examName: row.examName,
    subject: row.subject,
    date: row.date,
    starttime: row.starttime,
    endtime: row.endtime,
    duration: row.duration,
    classroom: row.classroom,
    maximum: row.maximum,
    minimum: row.minimum,
    status: row.status,
    scheduleRows: [
      {
        id: `${row.id}-schedule`,
        date: row.date,
        subject: row.subject,
        classroom: row.classroom,
        maximum: row.maximum,
        minimum: row.minimum
      }
    ]
  }
}

function validateClassForm(form: ClassFormState) {
  const errors: ClassFormErrors = {}

  if (!form.classes.trim()) {
    errors.classes = 'Class is required.'
  }

  if (!form.section.trim()) {
    errors.section = 'Section is required.'
  }

  if (!form.examName.trim()) {
    errors.examName = 'Exam name is required.'
  }

  if (!form.duration.trim()) {
    errors.duration = 'Duration is required.'
  }

  if (
    !form.scheduleRows.length ||
    form.scheduleRows.some(
      scheduleRow =>
        !scheduleRow.date.trim() ||
        !scheduleRow.subject.trim() ||
        !scheduleRow.classroom.trim() ||
        !scheduleRow.maximum.trim() ||
        !scheduleRow.minimum.trim()
    )
  ) {
    errors.scheduleRows = 'Complete every exam schedule row.'
  }

  if (!form.starttime.trim()) {
    errors.starttime = 'Start time is required.'
  }

  if (!form.endtime.trim()) {
    errors.endtime = 'End time is required.'
  }

  if (
    form.starttime &&
    form.endtime &&
    parseTimeOption(form.endtime) <= parseTimeOption(form.starttime)
  ) {
    errors.endtime = 'End time must be after start time.'
  }

  if (!form.status) {
    errors.status = 'Status is required.'
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

function parseTimeOption(value: string) {
  const timeInputMatch = value.match(/^(\d{2}):(\d{2})$/)

  if (timeInputMatch) {
    const [, hourValue, minuteValue] = timeInputMatch
    return Number(hourValue) * 60 + Number(minuteValue)
  }

  const match = value.match(/^(\d{2})\.(\d{2})\s(AM|PM)$/)

  if (!match) {
    return 0
  }

  const [, hourValue, minuteValue, period] = match
  const hour = Number(hourValue)
  const minute = Number(minuteValue)
  const normalizedHour =
    period === 'PM' ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour

  return normalizedHour * 60 + minute
}

function getPaginationSummary(page: number, pageSize: number, total: number) {
  if (!total) {
    return 'Showing 0 of 0 entries'
  }

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return `Showing ${start}-${end} of ${total} entries`
}
