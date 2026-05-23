'use client'

import { Agenda, useAgenda } from '@heroui-pro/react'
import { Icon } from '@iconify/react'
import {
  CalendarDate,
  CalendarDateTime,
  parseTime
} from '@internationalized/date'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Label,
  ListBox,
  Select,
  Surface,
  Tabs,
  TimeField,
  Tooltip
} from '@vezham/react/v3'

import { ShortcutKey } from '../../../components/shortcut-key'
import {
  classOptions,
  dayOptions,
  durationOptions,
  emptyFilters,
  emptyTimetableForm,
  sectionOptions,
  subjectGroupOptions,
  subjectOptions,
  teachers,
  timetableDayTabs,
  timetableEvents,
  toAgendaEvents
} from './data'
import type {
  FilterDropdownProps,
  TimetableAgendaEvent,
  TimetableDrawerProps,
  TimetableEvent,
  TimetableFilter,
  TimetableFormErrors,
  TimetableFormRow,
  TimetableFormState,
  TimetableView
} from './types'
import { useDisclosure } from './types'
import { classNames } from './variants'

export default function TimeTablePage() {
  const [events, setEvents] = useState<TimetableEvent[]>(timetableEvents)
  const [searchQuery] = useState('')
  const [view, setView] = useState<TimetableView>('week')
  const [calendarDate, setCalendarDate] = useState(getTodayCalendarDate)
  const [filters, setFilters] = useState<TimetableFilter>(emptyFilters)
  const [draftFilters, setDraftFilters] =
    useState<TimetableFilter>(emptyFilters)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [form, setForm] = useState<TimetableFormState>(emptyTimetableForm)
  const [formErrors, setFormErrors] = useState<TimetableFormErrors>({})
  const drawer = useDisclosure()

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return events.filter(event => {
      if (!isValidEvent(event)) {
        return false
      }

      const matchesQuery =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.teacher.toLowerCase().includes(query) ||
        event.subject.toLowerCase().includes(query) ||
        event.room.toLowerCase().includes(query) ||
        event.className.toLowerCase().includes(query) ||
        event.section.toLowerCase().includes(query)

      return (
        matchesQuery &&
        (!filters.className || event.className === filters.className) &&
        (!filters.section || event.section === filters.section) &&
        (!filters.teacher || event.teacher === filters.teacher) &&
        (!filters.subject || event.subject === filters.subject) &&
        (!filters.day || event.day === filters.day)
      )
    })
  }, [events, filters, searchQuery])

  const agendaEvents = useMemo(
    () => toAgendaEvents(filteredEvents),
    [filteredEvents]
  )

  const todayDate = useMemo(() => getTodayCalendarDate(), [])
  const agendaDate = useMemo(
    () => getAgendaDate(calendarDate, view),
    [calendarDate, view]
  )

  const handleEventMove = useCallback(
    (id: string, start: CalendarDateTime, end: CalendarDateTime) => {
      setEvents(current =>
        current.map(event =>
          event.id === id
            ? { ...event, day: getDayName(start), end, start }
            : event
        )
      )
    },
    []
  )

  const handleEventResize = useCallback(
    (id: string, start: CalendarDateTime, end: CalendarDateTime) => {
      setEvents(current =>
        current.map(event =>
          event.id === id
            ? { ...event, day: getDayName(start), end, start }
            : event
        )
      )
    },
    []
  )

  const agenda = useAgenda({
    date: agendaDate,
    endHour: 24,
    events: agendaEvents,
    onDateChange: setCalendarDate,
    onEventMove: handleEventMove,
    onEventResize: handleEventResize,
    onEventSelect: setSelectedEventId,
    onViewChange: updateView,
    selectedEventId,
    slotDuration: 60,
    startHour: 0,
    view,
    weekDays: 7
  })

  function updateView(nextView: TimetableView) {
    setView(nextView)
    setFilters(current => ({ ...current, view: nextView }))
    setDraftFilters(current => ({ ...current, view: nextView }))
  }

  function applyFilters() {
    setFilters(draftFilters)

    if (draftFilters.view) {
      setView(draftFilters.view)
    }
  }

  function resetFilters() {
    setFilters(emptyFilters)
    setDraftFilters(emptyFilters)
    setView('week')
    setCalendarDate(todayDate)
  }

  useEffect(() => {
    const openAddTimetable = () => openCreateDrawer()

    window.addEventListener('academic:timetable:create', openAddTimetable)

    return () => {
      window.removeEventListener('academic:timetable:create', openAddTimetable)
    }
  })

  function openCreateDrawer() {
    setForm(emptyTimetableForm)
    setFormErrors({})
    drawer.onOpen()
  }

  function closeCreateDrawer() {
    drawer.onClose()
    setFormErrors({})
  }

  function updateForm<K extends keyof TimetableFormState>(
    field: K,
    value: TimetableFormState[K]
  ) {
    setForm(current => ({ ...current, [field]: value }))
    setFormErrors(current => {
      const nextErrors = { ...current }

      delete nextErrors[field]

      return nextErrors
    })
  }

  function saveTimetableEntry() {
    const errors = validateTimetableForm(form)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)

      return
    }

    const filledRows = getFilledTimetableRows(form)
    const nextEvents = filledRows.map((row, index) => {
      const startParts = parseTimeInput(row.startTime)
      const endParts = parseTimeInput(row.endTime)
      const eventDate = getDateForDayName(calendarDate, row.day)
      const color = getSubjectColor(row.subject)

      return {
        className: form.className.trim(),
        color,
        day: row.day,
        end: new CalendarDateTime(
          eventDate.year,
          eventDate.month,
          eventDate.day,
          endParts.hour,
          endParts.minute
        ),
        id: `tt-${Date.now()}-${index}`,
        room: form.subjectGroup.trim(),
        section: form.section.trim(),
        start: new CalendarDateTime(
          eventDate.year,
          eventDate.month,
          eventDate.day,
          startParts.hour,
          startParts.minute
        ),
        status: 'confirmed',
        subject: row.subject.trim(),
        teacher: row.teacher.trim(),
        title: row.subject.trim()
      } satisfies TimetableEvent
    })

    setEvents(current => [...current, ...nextEvents])
    setSelectedEventId(nextEvents[0]?.id ?? null)
    setCalendarDate(getDateForDayName(calendarDate, filledRows[0].day))
    closeCreateDrawer()
  }

  return (
    <section className={classNames.page}>
      <Surface className={classNames.toolbar}>
        <div className={classNames.headerRow}>
          <div>
            <p className={classNames.mutedText}>Academic</p>
            <h1 className={classNames.title}>Time Table</h1>
          </div>

          <div className={classNames.toolbarActions}>
            <FilterDropdown
              draftFilters={draftFilters}
              setDraftFilters={setDraftFilters}
              onApply={applyFilters}
              onReset={resetFilters}
            />
          </div>
        </div>

        {/* <div className={classNames.headerRow}>
          <div className={classNames.metaRow}>
            <Chip className={classNames.subjectChip} variant="soft">
              Grade 10 A
            </Chip>
            <Chip className={classNames.subjectChip} variant="soft">
              {filteredEvents.length} periods
            </Chip>
            {selectedEvent && (
              <Chip color="accent" variant="soft">
                {selectedEvent.subject} with {selectedEvent.teacher}
              </Chip>
            )}
          </div>

          <SearchField
            aria-label="Search timetable"
            className={classNames.search}
            value={searchQuery}
            onChange={updateSearch}>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </div> */}
      </Surface>

      <Surface className={classNames.calendarShell}>
        {agendaEvents.length === 0 ? (
          <div className={classNames.emptyState}>
            No timetable events available
          </div>
        ) : (
          <div
            className={classNames.agendaWrapper}
            data-timetable-agenda
            style={{ height: 600, width: '100%' }}>
            <Agenda {...agenda} className={classNames.agenda}>
              <Agenda.Header>
                <Agenda.Heading />
                <Agenda.ViewSelector />
                <Agenda.Navigation>
                  <Agenda.NavButton slot="previous" />
                  <Agenda.TodayButton />
                  <Agenda.NavButton slot="next" />
                </Agenda.Navigation>
              </Agenda.Header>
              <Agenda.Body>
                {agenda.view !== 'month' ? (
                  <>
                    <Agenda.WeekHeader />
                    <Agenda.AllDaySection>
                      <Agenda.AllDayLabel>all-day</Agenda.AllDayLabel>
                      {agenda.allDayLayout.map(item => (
                        <Agenda.AllDayEvent
                          key={item.event.id}
                          colSpan={item.colSpan}
                          colStart={item.colStart}
                          event={item.event}
                          row={item.row}>
                          <AgendaAllDayEventContent
                            event={item.event as TimetableAgendaEvent}
                          />
                        </Agenda.AllDayEvent>
                      ))}
                    </Agenda.AllDaySection>
                    <Agenda.TimeGrid>
                      <Agenda.CurrentTimeIndicator />
                      {agenda.visibleDays.map(day => (
                        <Agenda.DayColumn key={day.toString()} date={day}>
                          {agenda.getEventsForDay(day).map(event => (
                            <Agenda.Event key={event.id} event={event}>
                              <AgendaEventContent
                                event={event as TimetableAgendaEvent}
                              />
                            </Agenda.Event>
                          ))}
                        </Agenda.DayColumn>
                      ))}
                    </Agenda.TimeGrid>
                  </>
                ) : (
                  <Agenda.MonthGrid>
                    {agenda.visibleWeeks.map((week, index) => {
                      const rowLayout = agenda.getMonthRowLayout(week)

                      return (
                        <Agenda.MonthRow
                          key={index}
                          spanningRowCount={rowLayout.rowCount}>
                          {rowLayout.items.map(item => (
                            <Agenda.MonthSpanningEvent
                              key={item.event.id}
                              colSpan={item.colSpan}
                              colStart={item.colStart}
                              event={item.event}
                              row={item.row}>
                              <AgendaAllDayEventContent
                                event={item.event as TimetableAgendaEvent}
                              />
                            </Agenda.MonthSpanningEvent>
                          ))}
                          {week.map((day, columnIndex) => (
                            <Agenda.MonthCell
                              key={day.toString()}
                              date={day}
                              maxEvents={2}
                              spanningRowCount={
                                rowLayout.rowCountPerCol[columnIndex] ?? 0
                              }>
                              {agenda.getPerCellEvents(day, week).map(event => (
                                <Agenda.MonthEvent key={event.id} event={event}>
                                  <AgendaMonthEventContent
                                    event={event as TimetableAgendaEvent}
                                  />
                                </Agenda.MonthEvent>
                              ))}
                            </Agenda.MonthCell>
                          ))}
                        </Agenda.MonthRow>
                      )
                    })}
                  </Agenda.MonthGrid>
                )}
              </Agenda.Body>
            </Agenda>
          </div>
        )}
      </Surface>

      <TimetableDrawer
        drawerState={drawer}
        form={form}
        formErrors={formErrors}
        onCancel={closeCreateDrawer}
        onClose={closeCreateDrawer}
        onFormChange={updateForm}
        onSave={saveTimetableEntry}
      />
    </section>
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
          <FilterSelect
            label="Class"
            options={classOptions}
            placeholder="Select class"
            value={draftFilters.className}
            onChange={value =>
              setDraftFilters({ ...draftFilters, className: value })
            }
          />
          <FilterSelect
            label="Section"
            options={sectionOptions}
            placeholder="Select section"
            value={draftFilters.section}
            onChange={value =>
              setDraftFilters({ ...draftFilters, section: value })
            }
          />
          <FilterSelect
            label="Teacher"
            options={teachers.map(teacher => teacher.name)}
            placeholder="Select teacher"
            value={draftFilters.teacher}
            onChange={value =>
              setDraftFilters({ ...draftFilters, teacher: value })
            }
          />
          <FilterSelect
            label="Subject"
            options={subjectOptions}
            placeholder="Select subject"
            value={draftFilters.subject}
            onChange={value =>
              setDraftFilters({ ...draftFilters, subject: value })
            }
          />
          <FilterSelect
            label="Day"
            options={dayOptions}
            placeholder="Select day"
            value={draftFilters.day}
            onChange={value => setDraftFilters({ ...draftFilters, day: value })}
          />

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

function TimetableDrawer({
  drawerState,
  form,
  formErrors,
  onCancel,
  onClose,
  onFormChange,
  onSave
}: TimetableDrawerProps) {
  const timetableRows = form.timetableRows.length
    ? form.timetableRows
    : emptyTimetableForm.timetableRows
  const [activeDay, setActiveDay] = useState(timetableDayTabs[0])

  const updateTimetableRow = <K extends keyof TimetableFormRow>(
    rowId: string,
    field: K,
    value: TimetableFormRow[K]
  ) => {
    onFormChange(
      'timetableRows',
      timetableRows.map(timetableRow =>
        timetableRow.id === rowId
          ? { ...timetableRow, [field]: value }
          : timetableRow
      )
    )
  }

  const addTimetableRow = (day: string) => {
    onFormChange('timetableRows', [
      ...timetableRows,
      {
        id: `timetable-row-${Date.now()}`,
        day,
        endTime: '',
        startTime: '',
        subject: '',
        teacher: ''
      }
    ])
  }

  const deleteTimetableRow = (rowId: string) => {
    const row = timetableRows.find(timetableRow => timetableRow.id === rowId)
    const dayRows = timetableRows.filter(
      timetableRow => timetableRow.day === row?.day
    )

    if (dayRows.length === 1) {
      return
    }

    onFormChange(
      'timetableRows',
      timetableRows.filter(timetableRow => timetableRow.id !== rowId)
    )
  }

  const getRowsForDay = (day: string) => {
    const dayRows = timetableRows.filter(
      timetableRow => timetableRow.day === day
    )

    if (dayRows.length) {
      return dayRows
    }

    return [
      {
        id: `timetable-row-${day.toLowerCase()}-1`,
        day,
        endTime: '',
        startTime: '',
        subject: '',
        teacher: ''
      }
    ]
  }

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
                      <span className="flex items-center gap-2 whitespace-nowrap">
                        <span>Toggle Drawer</span>
                        <ShortcutKey shortcut="⌘ /" />
                      </span>
                    </Tooltip.Content>
                  </Tooltip>
                  <span className={classNames.drawerTitle}>Add Timetable</span>
                </div>

                <div className={classNames.drawerActions} />
              </div>
            </Drawer.Header>

            <Drawer.Body className={classNames.drawerBody}>
              <form
                className={classNames.form}
                onSubmit={event => {
                  event.preventDefault()
                  onSave()
                }}>
                <div className={classNames.formFields}>
                  <div className={classNames.scheduleTopGrid}>
                    <TimetableFormSelect
                      error={formErrors.className}
                      label="Class"
                      options={classOptions}
                      placeholder="Select"
                      value={form.className}
                      onChange={value => onFormChange('className', value)}
                    />
                    <TimetableFormSelect
                      error={formErrors.section}
                      label="Section"
                      options={sectionOptions}
                      placeholder="Select"
                      value={form.section}
                      onChange={value => onFormChange('section', value)}
                    />
                    <TimetableFormSelect
                      error={formErrors.subjectGroup}
                      label="Subject Group"
                      options={subjectGroupOptions}
                      placeholder="Select"
                      value={form.subjectGroup}
                      onChange={value => onFormChange('subjectGroup', value)}
                    />
                    <TimetableTimeField
                      error={formErrors.periodStartTime}
                      label="Period Start Time"
                      value={form.periodStartTime}
                      onChange={value => onFormChange('periodStartTime', value)}
                    />
                    <TimetableFormSelect
                      error={formErrors.duration}
                      label="Duration(min)"
                      options={durationOptions}
                      placeholder="Select"
                      value={form.duration}
                      onChange={value => onFormChange('duration', value)}
                    />
                  </div>

                  <Tabs
                    className={classNames.timetableTabs}
                    selectedKey={activeDay}
                    variant="secondary"
                    onSelectionChange={key => setActiveDay(String(key))}>
                    <Tabs.ListContainer>
                      <Tabs.List
                        aria-label="Timetable weekdays"
                        className={classNames.timetableTabsList}>
                        {timetableDayTabs.map(day => (
                          <Tabs.Tab key={day} id={day}>
                            {day}
                            <Tabs.Indicator />
                          </Tabs.Tab>
                        ))}
                      </Tabs.List>
                    </Tabs.ListContainer>

                    {timetableDayTabs.map(day => {
                      const dayRows = getRowsForDay(day)

                      return (
                        <Tabs.Panel
                          key={day}
                          className={classNames.timetableTabPanel}
                          id={day}>
                          <div className={classNames.timetableRows}>
                            {dayRows.map((timetableRow, index) => (
                              <div
                                key={timetableRow.id}
                                className={classNames.timetableRow}>
                                <TimetableFormSelect
                                  label="Subject"
                                  options={subjectOptions}
                                  placeholder="Select"
                                  value={timetableRow.subject}
                                  onChange={value =>
                                    updateTimetableRow(
                                      timetableRow.id,
                                      'subject',
                                      value
                                    )
                                  }
                                />
                                <TimetableFormSelect
                                  label="Teacher"
                                  options={teachers.map(
                                    teacher => teacher.name
                                  )}
                                  placeholder="Select"
                                  value={timetableRow.teacher}
                                  onChange={value =>
                                    updateTimetableRow(
                                      timetableRow.id,
                                      'teacher',
                                      value
                                    )
                                  }
                                />
                                <TimetableTimeField
                                  label="Time From"
                                  value={timetableRow.startTime}
                                  onChange={value =>
                                    updateTimetableRow(
                                      timetableRow.id,
                                      'startTime',
                                      value
                                    )
                                  }
                                />
                                <TimetableTimeField
                                  label="Time To"
                                  value={timetableRow.endTime}
                                  onChange={value =>
                                    updateTimetableRow(
                                      timetableRow.id,
                                      'endTime',
                                      value
                                    )
                                  }
                                />
                                <Button
                                  isIconOnly
                                  aria-label={`Delete ${day} timetable row ${
                                    index + 1
                                  }`}
                                  className={classNames.timetableDeleteButton}
                                  isDisabled={dayRows.length === 1}
                                  variant="secondary"
                                  onPress={() =>
                                    deleteTimetableRow(timetableRow.id)
                                  }>
                                  <Icon icon="lucide:trash-2" width={18} />
                                </Button>
                              </div>
                            ))}
                          </div>

                          {formErrors.timetableRows && (
                            <p className={classNames.fieldError}>
                              {formErrors.timetableRows}
                            </p>
                          )}

                          <div>
                            <Button onPress={() => addTimetableRow(day)}>
                              <Icon icon="lucide:plus-circle" width={16} />
                              Add New
                            </Button>
                          </div>
                        </Tabs.Panel>
                      )
                    })}
                  </Tabs>
                </div>
              </form>
            </Drawer.Body>

            <Drawer.Footer className={classNames.drawerFooter}>
              <div className={classNames.drawerFormFooterActions}>
                <Button variant="secondary" onPress={onCancel}>
                  Cancel
                </Button>
                <Button onPress={onSave}>Add Timetable</Button>
              </div>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}

function AgendaEventContent({ event }: { event: TimetableAgendaEvent }) {
  return (
    <div className={classNames.eventContent}>
      <Agenda.EventTime className={classNames.eventMeta} event={event} />
      <Agenda.EventTitle className={classNames.eventTitle}>
        {event.subject}
      </Agenda.EventTitle>
      <TeacherBadge event={event} />
    </div>
  )
}

function AgendaAllDayEventContent({ event }: { event: TimetableAgendaEvent }) {
  return (
    <div className="flex min-w-0 items-center gap-1.5 truncate">
      <TeacherAvatar event={event} className="size-4" />
      <span className="truncate">
        {event.title} · {event.teacher}
      </span>
    </div>
  )
}

function AgendaMonthEventContent({ event }: { event: TimetableAgendaEvent }) {
  return (
    <div className="flex min-w-0 flex-col gap-1 leading-tight">
      <span className="line-clamp-2 text-[11px] font-semibold">
        {event.title}
      </span>
      <div className="flex min-w-0 items-center gap-1 text-[10px] opacity-85">
        <TeacherAvatar event={event} className="size-4" />
        <span className="min-w-0 truncate">{event.teacher}</span>
      </div>
    </div>
  )
}

function TeacherBadge({ event }: { event: TimetableAgendaEvent }) {
  return (
    <div className={classNames.eventTeacher}>
      <TeacherAvatar event={event} className="size-4" />
      <span className="truncate">{event.teacher}</span>
    </div>
  )
}

function TeacherAvatar({
  className,
  event
}: {
  className?: string
  event: TimetableAgendaEvent
}) {
  return (
    <Avatar className={`shrink-0 ${className ?? ''}`}>
      {event.teacherAvatar && (
        <Avatar.Image src={event.teacherAvatar} alt={event.teacher} />
      )}
      <Avatar.Fallback>{getInitials(event.teacher)}</Avatar.Fallback>
    </Avatar>
  )
}

function TimetableFormSelect({
  error,
  label,
  options,
  placeholder,
  value,
  onChange
}: {
  error?: string
  label: string
  options: string[]
  placeholder: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className={classNames.field}>
      <Select
        fullWidth
        aria-label={label}
        aria-invalid={Boolean(error)}
        placeholder={placeholder}
        value={value || null}
        onChange={nextValue => onChange(nextValue ? String(nextValue) : '')}>
        <Label className={classNames.fieldLabel}>{label}</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {options.map(option => (
              <ListBox.Item key={option} id={option} textValue={option}>
                {option}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      {error && <p className={classNames.fieldError}>{error}</p>}
    </div>
  )
}

function TimetableTimeField({
  error,
  label,
  value,
  onChange
}: {
  error?: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className={classNames.field}>
      <TimeField
        fullWidth
        aria-label={label}
        granularity="minute"
        hourCycle={24}
        isInvalid={Boolean(error)}
        value={getTimeFieldValue(value)}
        onChange={nextValue =>
          onChange(nextValue ? formatTimeFieldValue(nextValue) : '')
        }>
        <Label className={classNames.fieldLabel}>{label}</Label>
        <TimeField.Group fullWidth>
          <TimeField.Input>
            {segment => <TimeField.Segment segment={segment} />}
          </TimeField.Input>
        </TimeField.Group>
      </TimeField>
      {error && <p className={classNames.fieldError}>{error}</p>}
    </div>
  )
}

function getAgendaDate(date: CalendarDate, view: TimetableView) {
  if (view !== 'week') {
    return date
  }

  return date.subtract({ days: getMondayOffset(date) }).add({ days: 3 })
}

function getDateForDayName(date: CalendarDate, dayName: string) {
  const focusedDate = getAgendaDate(date, 'week')
  const nativeDate = new Date(
    focusedDate.year,
    focusedDate.month - 1,
    focusedDate.day
  )
  const startOfWeek = focusedDate.subtract({ days: nativeDate.getDay() })
  const dayIndex = dayOptions.findIndex(day => day === dayName)

  return startOfWeek.add({ days: Math.max(dayIndex, 0) })
}

function validateTimetableForm(form: TimetableFormState) {
  const errors: TimetableFormErrors = {}
  const filledRows = getFilledTimetableRows(form)

  if (!form.className.trim()) {
    errors.className = 'Class is required.'
  }

  if (!form.section.trim()) {
    errors.section = 'Section is required.'
  }

  if (!form.subjectGroup.trim()) {
    errors.subjectGroup = 'Subject group is required.'
  }

  if (!form.periodStartTime.trim()) {
    errors.periodStartTime = 'Period start time is required.'
  }

  if (!form.duration.trim()) {
    errors.duration = 'Duration is required.'
  }

  if (
    !filledRows.length ||
    filledRows.some(
      row =>
        !row.subject.trim() ||
        !row.teacher.trim() ||
        !row.day.trim() ||
        !row.startTime.trim() ||
        !row.endTime.trim()
    )
  ) {
    errors.timetableRows = 'Complete every timetable row.'
  }

  if (
    filledRows.some(
      row =>
        row.startTime &&
        row.endTime &&
        parseTimeToMinutes(row.endTime) <= parseTimeToMinutes(row.startTime)
    )
  ) {
    errors.timetableRows = 'End time must be after start time.'
  }

  return errors
}

function getFilledTimetableRows(form: TimetableFormState) {
  return form.timetableRows.filter(
    row =>
      row.subject.trim() ||
      row.teacher.trim() ||
      row.startTime.trim() ||
      row.endTime.trim()
  )
}

function getTimeFieldValue(value: string) {
  if (!value) {
    return null
  }

  try {
    return parseTime(value)
  } catch {
    return null
  }
}

function formatTimeFieldValue(value: { hour: number; minute: number }) {
  return `${String(value.hour).padStart(2, '0')}:${String(
    value.minute
  ).padStart(2, '0')}`
}

function parseTimeInput(value: string) {
  const [hour = '0', minute = '0'] = value.split(':')

  return {
    hour: Number(hour),
    minute: Number(minute)
  }
}

function parseTimeToMinutes(value: string) {
  const time = parseTimeInput(value)

  return time.hour * 60 + time.minute
}

function getSubjectColor(subject: string): TimetableEvent['color'] {
  const colorMap: Record<string, TimetableEvent['color']> = {
    Assembly: 'slate',
    Biology: 'pink',
    Chemistry: 'red',
    'Computer Science': 'cyan',
    English: 'green',
    'Lunch Break': 'amber',
    Maths: 'blue',
    Physics: 'purple',
    Sports: 'slate'
  }

  return colorMap[subject] ?? 'blue'
}

function getMondayOffset(date: CalendarDate) {
  const nativeDate = new Date(date.year, date.month - 1, date.day)
  const day = nativeDate.getDay()

  return day === 0 ? 6 : day - 1
}

function getDayName(date: CalendarDateTime) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
    new Date(date.year, date.month - 1, date.day)
  )
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function getTodayCalendarDate() {
  return dateToCalendarDate(new Date())
}

function dateToCalendarDate(date: Date) {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  )
}

function FilterSelect({
  label,
  options,
  placeholder,
  value,
  onChange
}: {
  label: string
  options: string[]
  placeholder: string
  value: string | null
  onChange: (value: string | null) => void
}) {
  return (
    <Select
      fullWidth
      aria-label={`Filter by ${label.toLowerCase()}`}
      placeholder={placeholder}
      value={value}
      onChange={nextValue => onChange(nextValue ? String(nextValue) : null)}>
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map(option => (
            <ListBox.Item key={option} id={option} textValue={option}>
              {option}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}

function isValidEvent(
  event: TimetableEvent | undefined
): event is TimetableEvent {
  return Boolean(
    event?.id &&
    event.title &&
    event.teacher &&
    event.subject &&
    event.room &&
    event.className &&
    event.section &&
    event.start &&
    event.end
  )
}
