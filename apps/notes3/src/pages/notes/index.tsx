import { useState } from 'react'

import { useNotes } from '../notes/store'
import { Note } from '../notes/types'
import NoteModal from './createmodal'
import NoteDetailModal from './detailmodal'
import NoteListItem from './notesList'

const AllNotesPage = () => {
  const { notes, togglePin, archiveNote, moveToTrash } = useNotes()

  const [editNote, setEditNote] = useState<Note | null>(null)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null)

  const list = notes.filter(n => !n.isArchived && !n.isDeleted)

  const selectedNote = notes.find(n => n.id === selectedNoteId) || null

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">All Notes</h1>

      {list.map(note => (
        <NoteListItem
          key={note.id}
          note={note}
          onView={() => setSelectedNoteId(note.id)}
          onEdit={() => {
            setEditNote(note)
            setOpenEdit(true)
          }}
          onPin={() => togglePin(note.id)}
          onArchive={() => archiveNote(note.id)}
          onDelete={() => {
            console.log('Deleting note:', note.id)
            moveToTrash(note.id)
            if (selectedNoteId === note.id) {
              setSelectedNoteId(null)
            }
          }}
        />
      ))}

      <NoteModal
        isOpen={openEdit}
        onOpenChange={setOpenEdit}
        editNote={editNote}
      />

      <NoteDetailModal
        isOpen={!!selectedNote && !selectedNote.isDeleted}
        note={selectedNote}
        onClose={() => setSelectedNoteId(null)}
        onPin={() => {
          if (!selectedNote) return
          togglePin(selectedNote.id)
        }}
        onArchive={() => {
          if (!selectedNote) return
          archiveNote(selectedNote.id)
          setSelectedNoteId(null)
        }}
        onDelete={() => {
          if (!selectedNote) return
          moveToTrash(selectedNote.id)
          setSelectedNoteId(null)
        }}
      />
    </div>
  )
}

export default AllNotesPage
