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

  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const list = notes.filter(n => !n.isArchived && !n.isDeleted)

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">All Notes</h1>

      {list.map(note => (
        <NoteListItem
          key={note.id}
          note={note}
          onView={() => setSelectedNote(note)}
          onEdit={() => {
            setEditNote(note)
            setOpenEdit(true)
          }}
          onPin={() => togglePin(note.id)}
          onArchive={() => archiveNote(note.id)}
          onDelete={() => moveToTrash(note.id)}
        />
      ))}

      <NoteModal
        isOpen={openEdit}
        onOpenChange={setOpenEdit}
        editNote={editNote}
      />

      <NoteDetailModal
        isOpen={!!selectedNote}
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
        onPin={() => togglePin(selectedNote!.id)}
        onArchive={() => {
          archiveNote(selectedNote!.id)
          setSelectedNote(null)
        }}
        onDelete={() => {
          moveToTrash(selectedNote!.id)
          setSelectedNote(null)
        }}
      />
    </div>
  )
}

export default AllNotesPage
