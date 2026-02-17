import React, { createContext, useContext, useEffect, useState } from 'react'

import { loadFromStorage, saveToStorage } from '../../utils/storage'
import { Note } from './types'

type NotesContextType = {
  notes: Note[]
  counts: {
    all: number
    pinned: number
    archived: number
    trash: number
  }
  addNote: (title: string, content: string) => void
  updateNote: (id: number, title: string, content: string) => void
  togglePin: (id: number) => void
  archiveNote: (id: number) => void
  unarchiveNote: (id: number) => void
  moveToTrash: (id: number) => void
  restoreNote: (id: number) => void
  permanentlyDelete: (id: number) => void
}

const NotesContext = createContext<NotesContextType | null>(null)

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [notes, setNotes] = useState<Note[]>(() => loadFromStorage('notes', []))

  useEffect(() => {
    saveToStorage('notes', notes)
  }, [notes])

  const counts = {
    all: notes.filter(n => !n.isDeleted && !n.isArchived).length,
    pinned: notes.filter(n => n.isPinned && !n.isDeleted && !n.isArchived)
      .length,
    archived: notes.filter(n => n.isArchived && !n.isDeleted).length,
    trash: notes.filter(n => n.isDeleted).length
  }

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      createdAt: Date.now(),
      isPinned: false,
      isArchived: false,
      isDeleted: false
    }
    setNotes(prev => [newNote, ...prev])
  }

  const updateNote = (id: number, title: string, content: string) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, title, content } : n))
    )
  }

  const togglePin = (id: number) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    )
  }

  const archiveNote = (id: number) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, isArchived: true, isPinned: false } : n
      )
    )
  }

  const unarchiveNote = (id: number) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, isArchived: false } : n))
    )
  }

  const moveToTrash = (id: number) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id
          ? { ...n, isDeleted: true, isArchived: false, isPinned: false }
          : n
      )
    )
  }

  const restoreNote = (id: number) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, isDeleted: false } : n))
    )
  }

  const permanentlyDelete = (id: number) => {
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        counts,
        addNote,
        updateNote,
        togglePin,
        archiveNote,
        unarchiveNote,
        moveToTrash,
        restoreNote,
        permanentlyDelete
      }}>
      {children}
    </NotesContext.Provider>
  )
}

export const useNotes = () => {
  const context = useContext(NotesContext)
  if (!context) throw new Error('useNotes must be used inside NotesProvider')
  return context
}
