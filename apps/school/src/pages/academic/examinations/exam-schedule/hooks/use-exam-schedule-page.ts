import { useHotkey } from '@tanstack/react-hotkeys'
import { useCallback, useEffect, useMemo, useState } from 'react'

import type { Selection, SortDescriptor } from '@vezham/react-v3'

import { emptyForm, initialRows, sortOptions } from '../data'
import type {
  ClassFormErrors,
  ClassFormState,
  ClassRow,
  CustomDateRangeValue,
  DatePresetKey,
  DateRangeFilter,
  DrawerMode,
  DrawerQueryState,
  FilterDraft,
  OpenDrawerOptions,
  ToastState
} from '../types'
import { useDisclosure } from '../types'
import {
  formatDateRangeLabel,
  getPresetDateRange,
  isISODateInRange,
  toISODate
} from '../utils/date'
import { rowToForm, validateScheduleForm } from '../utils/exam-schedule'
import { hiddenTextareaStyles } from '../variants'

const emptyFilters: FilterDraft = {
  classes: null,
  section: null,
  examName: null,
  date: null,
  subject: null,
  starttime: null,
  endtime: null,
  duration: null,
  maximum: null,
  minimum: null,
  classroom: null,
  status: null
}

export function useExamSchedulePage() {
  const [data, setData] = useState<ClassRow[]>(initialRows)
  const [searchQuery, setSearchQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState('5')
  const [page, setPage] = useState(1)
  const [datePreset, setDatePreset] = useState<DatePresetKey>('thisYear')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [isCustomDateRangeOpen, setIsCustomDateRangeOpen] = useState(false)
  const [customDateRange, setCustomDateRange] =
    useState<DateRangeFilter | null>(null)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'type',
    direction: 'ascending'
  })
  const [filters, setFilters] = useState<FilterDraft>(emptyFilters)
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
        row.classes.toLowerCase().includes(query) ||
        row.section.toLowerCase().includes(query) ||
        row.examName.toLowerCase().includes(query) ||
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
        (!filters.classes || row.classes === filters.classes) &&
        (!filters.section || row.section === filters.section) &&
        (!filters.examName || row.examName === filters.examName) &&
        (!filters.date || row.date.trim() === filters.date.trim()) &&
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

  const updateDateDropdownOpen = (open: boolean) => {
    setIsDateDropdownOpen(open)
    if (!open) {
      setIsCustomDateRangeOpen(false)
    }
  }

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

  const saveSchedule = () => {
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

    const errors = validateScheduleForm(form)

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

  const deleteSchedule = (rowId: string) => {
    setData(current => current.filter(row => row.id !== rowId))

    if (activeRowId === rowId) {
      setActiveRowId(null)
      drawer.onClose()
      updateDrawerQuery(null)
    }

    showToast('Item deleted')
  }

  const getScheduleUrl = (
    row: ClassRow,
    nextMode: Exclude<DrawerMode, 'create'> = 'view'
  ) => {
    const url = new URL(window.location.href)

    url.searchParams.set('id', row.id)
    url.searchParams.set('mode', nextMode)
    url.hash = ''

    return url.toString()
  }

  const copyScheduleLink = (row: ClassRow) => {
    const classUrl = getScheduleUrl(row, mode === 'edit' ? 'edit' : 'view')

    void copyText(classUrl)
      .then(() => {
        showToast('URL copied')
      })
      .catch(() => {
        showToast('Unable to copy URL', 'danger')
      })
  }

  const copyScheduleId = (row: ClassRow) => {
    void copyText(row.id)
      .then(() => {
        showToast('ID copied')
      })
      .catch(() => {
        showToast('Unable to copy ID', 'danger')
      })
  }

  const openSchedulePage = (row: ClassRow) => {
    window.open(getScheduleUrl(row), '_blank', 'noopener,noreferrer')
  }

  return {
    toast,
    toolbar: {
      activeDateLabel,
      activeSortLabel,
      datePreset,
      draftFilters,
      isCustomDateRangeOpen,
      isDateDropdownOpen,
      rowsPerPage,
      searchQuery,
      setDraftFilters,
      onApplyFilters: applyFilters,
      onCustomDateRangeChange: updateCustomDateRange,
      onCustomDateRangeOpenChange: setIsCustomDateRangeOpen,
      onDateDropdownOpenChange: updateDateDropdownOpen,
      onDatePresetChange: updateDatePreset,
      onResetFilters: resetFilters,
      onRowsPerPageChange: updateRowsPerPage,
      onSearchChange: updateSearch,
      onSortChange: updateSortDescriptor
    },
    table: {
      activeRowId,
      currentPage,
      pageSize,
      rows: paginatedRows,
      selectedKeys: tableSelectedKeys,
      sortDescriptor,
      totalPages,
      totalRows: sortedRows.length,
      onDelete: deleteSchedule,
      onOpenDrawer: openDrawer,
      onPageChange: setPage,
      onSelectionChange: updateTableSelection,
      onSortChange: updateSortDescriptor
    },
    drawerProps: {
      canGoNext:
        selectedRowIndex >= 0 && selectedRowIndex < sortedRows.length - 1,
      canGoPrevious: selectedRowIndex > 0,
      drawerState: drawer,
      form,
      formErrors,
      mode,
      row: selectedRow,
      onCancel: closeDrawer,
      onClose: closeDrawer,
      onCopyId: copyScheduleId,
      onCopyLink: copyScheduleLink,
      onEdit: () => setDrawerMode('edit'),
      onFormChange: updateForm,
      onGoNext: goToNextRow,
      onGoPrevious: goToPreviousRow,
      onOpenPage: openSchedulePage,
      onSave: saveSchedule
    },
    onToastClose: () => setToast(null)
  }
}
