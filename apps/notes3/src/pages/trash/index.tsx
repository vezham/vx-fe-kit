import { useState } from 'react'

import NoteModal from '../notes/createmodal'
import NoteDetailModal from '../notes/detailmodal'
import NoteListItem from '../notes/notesList'
import { useNotes } from '../notes/store'
import { Note } from '../notes/types'

const TrashPage = () => {
  const { notes, restoreNote, permanentlyDelete } = useNotes()

  const [editNote, setEditNote] = useState<Note | null>(null)
  const [openEdit, setOpenEdit] = useState(false)

  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const list = notes.filter(n => n.isDeleted)

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Trash</h1>

      {list.map(note => (
        <NoteListItem
          key={note.id}
          note={note}
          onView={() => setSelectedNote(note)}
          onRestore={() => restoreNote(note.id)}
          onPermanentDelete={() => permanentlyDelete(note.id)}
          onEdit={() => {
            setEditNote(note)
            setOpenEdit(true)
          }}
        />
      ))}

      <NoteModal
        isOpen={openEdit}
        onOpenChange={setOpenEdit}
        editNote={editNote}
      />

      <NoteDetailModal
        isOpen={!!selectedNote}
        note={notes.find(n => n.id === selectedNote?.id) || null}
        onClose={() => setSelectedNote(null)}
        onRestore={() => {
          restoreNote(selectedNote!.id)
          setSelectedNote(null)
        }}
        onPermanentDelete={() => {
          permanentlyDelete(selectedNote!.id)
          setSelectedNote(null)
        }}
      />
    </div>
  )
}

export default TrashPage
