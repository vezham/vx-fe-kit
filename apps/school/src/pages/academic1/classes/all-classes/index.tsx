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
  SortDescriptor,
  Surface,
  Switch,
  Table,
  Tooltip,
  useOverlayState
} from '@vezham/react/v3'

type ClassStatus = 'Active' | 'Inactive'
type DrawerMode = 'view' | 'edit' | 'create'
type ToastState = {
  message: string
  status: 'success' | 'danger'
}

type ClassRow = {
  id: string
  className: string
  section: string
  students: number
  subjects: number
  status: ClassStatus
  createdAt: string
  viewedAt: string
}

type DatePresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last30'
  | 'thisYear'
  | 'nextYear'
  | 'custom'

type DateRangeFilter = {
  start: string
  end: string
}

type PickerDateValue = {
  toString(): string
}

type FilterDraft = {
  className: string | null
  section: string | null
  status: ClassStatus | null
}

type ClassFormState = {
  className: string
  section: string
  students: string
  subjects: string
  status: ClassStatus
}

type ClassFormErrors = Partial<
  Record<'className' | 'section' | 'students' | 'subjects', string>
>

const initialRows: ClassRow[] = [
  {
    id: 'C138038',
    className: 'I',
    section: 'A',
    students: 30,
    subjects: 3,
    status: 'Active',
    createdAt: '2026-05-01',
    viewedAt: '2026-05-01'
  },
  {
    id: 'C138037',
    className: 'I',
    section: 'B',
    students: 25,
    subjects: 3,
    status: 'Active',
    createdAt: '2026-04-30',
    viewedAt: '2026-04-30'
  },
  {
    id: 'C138036',
    className: 'II',
    section: 'A',
    students: 40,
    subjects: 3,
    status: 'Active',
    createdAt: '2026-04-29',
    viewedAt: '2026-04-29'
  },
  {
    id: 'C138035',
    className: 'II',
    section: 'B',
    students: 35,
    subjects: 3,
    status: 'Active',
    createdAt: '2026-04-26',
    viewedAt: '2026-04-28'
  },
  {
    id: 'C138034',
    className: 'II',
    section: 'C',
    students: 25,
    subjects: 3,
    status: 'Inactive',
    createdAt: '2026-04-21',
    viewedAt: '2026-04-27'
  },
  {
    id: 'C138033',
    className: 'III',
    section: 'A',
    students: 30,
    subjects: 3,
    status: 'Active',
    createdAt: '2026-04-20',
    viewedAt: '2026-04-26'
  },
  {
    id: 'C138032',
    className: 'III',
    section: 'B',
    students: 25,
    subjects: 5,
    status: 'Active',
    createdAt: '2026-04-15',
    viewedAt: '2026-04-25'
  },
  {
    id: 'C138031',
    className: 'IV',
    section: 'A',
    students: 20,
    subjects: 5,
    status: 'Active',
    createdAt: '2026-03-31',
    viewedAt: '2026-04-24'
  },
  {
    id: 'C138030',
    className: 'IV',
    section: 'B',
    students: 30,
    subjects: 5,
    status: 'Inactive',
    createdAt: '2026-01-12',
    viewedAt: '2026-04-23'
  },
  {
    id: 'C138029',
    className: 'V',
    section: 'A',
    students: 35,
    subjects: 5,
    status: 'Active',
    createdAt: '2025-12-20',
    viewedAt: '2026-04-22'
  },
  {
    id: 'C138028',
    className: 'V',
    section: 'B',
    students: 32,
    subjects: 5,
    status: 'Active',
    createdAt: '2026-04-02',
    viewedAt: '2026-04-21'
  },
  {
    id: 'C138027',
    className: 'VI',
    section: 'A',
    students: 38,
    subjects: 6,
    status: 'Inactive',
    createdAt: '2027-02-14',
    viewedAt: '2026-04-20'
  }
]

const dateOptions: { key: DatePresetKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7', label: 'Last 7 Days' },
  { key: 'last30', label: 'Last 30 Days' },
  { key: 'thisYear', label: 'This Year' },
  { key: 'nextYear', label: 'Next Year' },
  { key: 'custom', label: 'Custom Range' }
]

const sortOptions = [
  {
    key: 'ascending',
    label: 'Ascending',
    descriptor: {
      column: 'className',
      direction: 'ascending'
    } satisfies SortDescriptor
  },
  {
    key: 'descending',
    label: 'Descending',
    descriptor: {
      column: 'className',
      direction: 'descending'
    } satisfies SortDescriptor
  },
  {
    key: 'recentlyViewed',
    label: 'Recently Viewed',
    descriptor: {
      column: 'viewedAt',
      direction: 'descending'
    } satisfies SortDescriptor
  },
  {
    key: 'recentlyAdded',
    label: 'Recently Added',
    descriptor: {
      column: 'createdAt',
      direction: 'descending'
    } satisfies SortDescriptor
  }
] as const

const rowCountOptions = ['5', '10', '25', '50']
const classOptions = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']
const sectionOptions = ['A', 'B', 'C', 'D']
const statusOptions: ClassStatus[] = ['Active', 'Inactive']
const emptyForm: ClassFormState = {
  className: '',
  section: '',
  students: '',
  subjects: '',
  status: 'Active'
}

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
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }, [])

  const updateDrawerQuery = useCallback(
    (
      nextState: { id: string; mode: Exclude<DrawerMode, 'create'> } | null,
      replace = false
    ) => {
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
      options: { syncUrl?: boolean; replaceUrl?: boolean } = {}
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

  const updateCustomDateRange = (
    value: { start: PickerDateValue; end: PickerDateValue } | null
  ) => {
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
    <section className="space-y-4">
      <Surface className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-muted text-sm">Classes</p>
            <h1 className="text-2xl font-semibold">Classes List</h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
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
                <Surface className="w-[360px] p-2">
                  {isCustomDateRangeOpen ? (
                    <div
                      className="space-y-3"
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
                        className="w-full"
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
                          <span className="flex w-full items-center justify-between">
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

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
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
            className="min-w-[960px]"
            selectedKeys={tableSelectedKeys}
            selectionMode="single"
            sortDescriptor={sortDescriptor}
            onSelectionChange={updateTableSelection}
            onSortChange={updateSortDescriptor}>
            <Table.Header>
              <Table.Column className="w-12" />
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
                  className={`hover:bg-primary/5 cursor-pointer transition-colors ${
                    activeRowId === row.id
                      ? 'bg-primary/10 ring-primary/20 ring-1 ring-inset'
                      : ''
                  }`}
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
                      className="flex items-center gap-1"
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
                          className="text-danger"
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
                              <span className="flex items-center gap-2">
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
        <div className="fixed top-10 left-1/2 z-[9999] w-[min(320px,calc(100vw-2rem))] -translate-x-1/2">
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
    <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-4 py-12 text-center">
      <Icon className="text-muted" icon="lucide:inbox" width={42} />
      <p className="text-muted text-lg font-medium">No results found</p>
    </div>
  )
}

function FilterDropdown({
  draftFilters,
  setDraftFilters,
  onApply,
  onReset
}: {
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
        <Surface className="flex w-80 flex-col gap-4 p-4">
          <h2 className="text-lg font-semibold">Filter</h2>
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

          <div className="flex justify-end gap-2">
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
}: {
  canGoNext: boolean
  canGoPrevious: boolean
  drawerState: ReturnType<typeof useDisclosure>
  form: ClassFormState
  formErrors: ClassFormErrors
  mode: DrawerMode
  row: ClassRow | null
  onCancel: () => void
  onClose: () => void
  onCopyId: (row: ClassRow) => void
  onCopyLink: (row: ClassRow) => void
  onEdit: () => void
  onFormChange: (field: keyof ClassFormState, value: string) => void
  onGoNext: () => void
  onGoPrevious: () => void
  onOpenPage: (row: ClassRow) => void
  onSave: () => void
}) {
  const isFormMode = mode === 'create' || mode === 'edit'
  const showNavigation = mode !== 'create'
  const drawerTitle = mode === 'create' ? 'Add Class' : row ? `#${row.id}` : ''

  return (
    <Drawer state={drawerState}>
      <Drawer.Backdrop variant="transparent">
        <Drawer.Content placement="right">
          <Drawer.Dialog className="flex h-full w-full max-w-[420px] flex-col bg-black/5 backdrop-blur-2xl">
            <Drawer.Header className="sticky top-0 z-10 border-b border-[#e8edf6] py-4">
              <div className="flex w-full items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Button
                    isIconOnly
                    aria-label="Close class drawer"
                    variant="ghost"
                    onPress={onClose}>
                    <Icon icon="lucide:chevrons-right" width={24} />
                  </Button>
                  <span className="truncate text-lg font-semibold text-[#111827]">
                    {drawerTitle}
                  </span>
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

                <div className="flex shrink-0 items-center gap-2">
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

            <Drawer.Body className="flex-1 px-4 py-4">
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

            <Drawer.Footer className="sticky bottom-0 border-t border-[#e8edf6] py-4">
              {isFormMode ? (
                <div className="flex w-full justify-end gap-3">
                  <Button variant="secondary" onPress={onCancel}>
                    Cancel
                  </Button>
                  <Button onPress={onSave}>
                    {mode === 'create' ? 'Add Class' : 'Save'}
                  </Button>
                </div>
              ) : (
                <div className="flex w-full gap-3">
                  <Button
                    className="flex-1"
                    variant="secondary"
                    onPress={onEdit}>
                    <Icon icon="lucide:pencil" width={16} />
                    Edit
                  </Button>
                  <Button className="flex-1" onPress={onClose}>
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
}: {
  form: ClassFormState
  formErrors: ClassFormErrors
  mode: DrawerMode
  row: ClassRow | null
  onFormChange: (field: keyof ClassFormState, value: string) => void
}) {
  return (
    <div className="space-y-6">
      {mode === 'edit' && row && <ClassDetailSummary row={row} />}

      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="font-bold text-[#111827]">Class Name</Label>
          <Input
            fullWidth
            aria-invalid={Boolean(formErrors.className)}
            placeholder="Enter class name"
            value={form.className}
            onChange={event => onFormChange('className', event.target.value)}
          />
          {formErrors.className && (
            <p className="text-danger text-sm">{formErrors.className}</p>
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
          <Label className="font-bold text-[#111827]">Section</Label>
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
          <p className="text-danger -mt-3 text-sm">{formErrors.section}</p>
        )}

        <div className="space-y-2">
          <Label className="font-bold text-[#111827]">No of Students</Label>
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
            <p className="text-danger text-sm">{formErrors.students}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="font-bold text-[#111827]">No of Subjects</Label>
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
            <p className="text-danger text-sm">{formErrors.subjects}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div>
          <div className="font-bold text-[#111827]">Status</div>
          <div className="text-[#20242d]">Change the Status by toggle</div>
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

function ClassDetails({ row }: { row: ClassRow | null }) {
  if (!row) {
    return null
  }

  return (
    <div className="space-y-8">
      <ClassDetailSummary row={row} />
    </div>
  )
}

function ClassDetailSummary({ row }: { row: ClassRow }) {
  return (
    <div className="space-y-6">
      <DetailLine label="Class" value={row.className} />
      <DetailLine label="Section" value={row.section} />
      <DetailLine label="Students" value={String(row.students)} />
      <DetailLine label="Subjects" value={String(row.subjects)} />

      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-[#111827]">Status:</span>
        <Chip
          color={row.status === 'Active' ? 'success' : 'danger'}
          variant="soft">
          <span aria-hidden="true">●</span>
          <Chip.Label>{row.status}</Chip.Label>
        </Chip>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xl font-bold text-[#111827]">Tags:</span>
        {getClassTags(row).map(tag => (
          <Chip key={tag} variant="soft">
            <Chip.Label>{tag}</Chip.Label>
          </Chip>
        ))}
      </div>
    </div>
  )
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-xl">
      <span className="font-bold text-[#111827]">{label}:</span>
      <span className="text-[#111827]">{value}</span>
    </div>
  )
}

function SortableHeader({
  children,
  sortDirection
}: {
  children: string
  sortDirection?: SortDescriptor['direction']
}) {
  const icon =
    sortDirection === 'ascending'
      ? 'lucide:chevron-up'
      : sortDirection === 'descending'
        ? 'lucide:chevron-down'
        : 'lucide:chevrons-up-down'

  return (
    <span className="flex items-center gap-2">
      {children}
      <Icon icon={icon} width={14} />
    </span>
  )
}

function useDisclosure() {
  const state = useOverlayState()

  return {
    ...state,
    onOpen: state.open,
    onClose: state.close,
    onOpenChange: state.setOpen
  }
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
