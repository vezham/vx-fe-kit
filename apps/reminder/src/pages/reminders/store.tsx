import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

export type Reminder = {
  id: number
  title: string
  notes: string
  date?: string
  time?: string
  list?: string
  flagged: boolean
  completed: boolean
  archived: boolean
  archivedAt?: string
  deleted: boolean
  createdAt: string
}

type ReminderContextType = {
  reminders: Reminder[]
  lists: string[]
  addReminder: (data: Omit<Reminder, 'id' | 'createdAt'>) => void
  addList: (name: string) => void
  deleteList: (listName: string) => void
  updateReminder: (
    id: number,
    updates: Partial<Omit<Reminder, 'id' | 'createdAt'>>
  ) => void
  toggleFlag: (id: number) => void
  toggleComplete: (id: number) => void
  deleteReminder: (id: number) => void
  restoreFromTrash: (id: number) => void
  permanentlyDelete: (id: number) => void
  toggleArchive: (id: number) => void

  counts: {
    all: number
    today: number
    scheduled: number
    completed: number
    flagged: number
    archive: number
    trash: number
  }

  getListCount: (listName: string) => number
}

const ReminderContext = createContext<ReminderContextType | null>(null)

export const ReminderProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const stored = localStorage.getItem('reminders')
    return stored ? JSON.parse(stored) : []
  })

  const [lists, setLists] = useState<string[]>(() => {
    const stored = localStorage.getItem('lists')
    return stored ? JSON.parse(stored) : ['reminders']
  })

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders))
  }, [reminders])

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists))
  }, [lists])

  const addReminder = (data: Omit<Reminder, 'id' | 'createdAt'>) => {
    const newReminder: Reminder = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }

    setReminders(prev => [...prev, newReminder])
  }

  const addList = (name: string) => {
    if (!name.trim()) return

    setLists(prev => (prev.includes(name) ? prev : [...prev, name]))
  }

  const deleteList = (listName: string) => {
    setLists(prev => prev.filter(l => l !== listName))
    setReminders(prev =>
      prev.map(r => (r.list === listName ? { ...r, list: 'reminders' } : r))
    )
  }

  const updateReminder = (
    id: number,
    data: Partial<Omit<Reminder, 'id' | 'createdAt'>>
  ) => {
    setReminders(prev => prev.map(r => (r.id === id ? { ...r, ...data } : r)))
  }

  const toggleFlag = (id: number) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, flagged: !r.flagged } : r))
    )
  }

  const toggleComplete = (id: number) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, completed: !r.completed } : r))
    )
  }

  const deleteReminder = (id: number) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, deleted: true } : r))
    )
  }

  const restoreFromTrash = (id: number) => {
    setReminders(prev =>
      prev.map(r => (r.id === id ? { ...r, deleted: false } : r))
    )
  }

  const permanentlyDelete = (id: number) => {
    setReminders(prev => prev.filter(r => r.id !== id))
  }

  const toggleArchive = (id: number) => {
    setReminders(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              archived: !r.archived,
              archivedAt: !r.archived ? new Date().toISOString() : undefined
            }
          : r
      )
    )
  }

  const counts = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0]

    return {
      all: reminders.filter(r => !r.deleted && !r.archived).length,

      today: reminders.filter(
        r => !r.deleted && !r.archived && r.date === todayStr
      ).length,

      scheduled: reminders.filter(r => !r.deleted && !r.archived && !!r.date)
        .length,

      completed: reminders.filter(r => !r.deleted && !r.archived && r.completed)
        .length,

      flagged: reminders.filter(r => !r.deleted && !r.archived && r.flagged)
        .length,

      archive: reminders.filter(r => r.archived && !r.deleted).length,

      trash: reminders.filter(r => r.deleted).length
    }
  }, [reminders])

  const getListCount = (listName: string) => {
    return reminders.filter(
      r => r.list === listName && !r.deleted && !r.archived
    ).length
  }

  const value: ReminderContextType = {
    reminders,
    lists,

    addReminder,
    addList,
    deleteList,
    updateReminder,

    toggleFlag,
    toggleComplete,
    deleteReminder,
    restoreFromTrash,
    permanentlyDelete,
    toggleArchive,

    counts,
    getListCount
  }

  return (
    <ReminderContext.Provider value={value}>
      {children}
    </ReminderContext.Provider>
  )
}

export const useReminders = () => {
  const context = useContext(ReminderContext)

  if (!context) {
    throw new Error('Error')
  }

  return context
}
