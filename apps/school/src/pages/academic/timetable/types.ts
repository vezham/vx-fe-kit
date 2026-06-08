import { useAgenda } from '@heroui-pro/react'
import type { CalendarDateTime } from '@internationalized/date'
import type { Dispatch, SetStateAction } from 'react'

import { type SortDescriptor, useOverlayState } from '@vezham/react-v3'

export type TimetableView = 'day' | 'week' | 'month'

export type TimetableColor =
  | 'blue'
  | 'green'
  | 'purple'
  | 'amber'
  | 'pink'
  | 'cyan'
  | 'slate'
  | 'red'

export type Teacher = {
  id: string
  name: string
  subject: string
  avatar: string
}

export type TimetableEvent = {
  id: string
  title: string
  teacher: string
  className: string
  section: string
  subject: string
  day: string
  room: string
  color: TimetableColor
  start: CalendarDateTime
  end: CalendarDateTime
  isAllDay?: boolean
  isReadOnly?: boolean
  status?: 'confirmed' | 'unconfirmed'
}

export type TimetableFormRow = {
  id: string
  subject: string
  teacher: string
  day: string
  startTime: string
  endTime: string
}

export type TimetableFormState = {
  className: string
  section: string
  subjectGroup: string
  periodStartTime: string
  duration: string
  timetableRows: TimetableFormRow[]
}

export type TimetableFormErrors = Partial<
  Record<keyof TimetableFormState | keyof TimetableFormRow, string>
>

export type TimetableAgendaEvent = Omit<TimetableEvent, 'color'> & {
  color: string
  tone: TimetableColor
  teacherAvatar?: string
}

export type TimetableFilter = {
  className: string | null
  section: string | null
  teacher: string | null
  subject: string | null
  day: string | null
  view: TimetableView | null
}

export type FilterDropdownProps = {
  draftFilters: TimetableFilter
  onApply: () => void
  onReset: () => void
  setDraftFilters: Dispatch<SetStateAction<TimetableFilter>>
}

export type TimetableToolbarProps = {
  activeSortLabel: string
  draftFilters: TimetableFilter
  onApplyFilters: () => void
  onResetFilters: () => void
  onSortChange: (descriptor: SortDescriptor) => void
  setDraftFilters: Dispatch<SetStateAction<TimetableFilter>>
  sortDescriptor: SortDescriptor
}

export type TimetableCalendarProps = {
  agenda: ReturnType<typeof useAgenda>
  agendaEvents: TimetableAgendaEvent[]
}

export type DrawerState = ReturnType<typeof useDisclosure>

export type TimetableDrawerProps = {
  drawerState: DrawerState
  form: TimetableFormState
  formErrors: TimetableFormErrors
  onCancel: () => void
  onClose: () => void
  onFormChange: <K extends keyof TimetableFormState>(
    field: K,
    value: TimetableFormState[K]
  ) => void
  onSave: () => void
}

export function useDisclosure() {
  const state = useOverlayState()

  return {
    ...state,
    onOpen: state.open,
    onClose: state.close,
    onOpenChange: state.setOpen
  }
}
