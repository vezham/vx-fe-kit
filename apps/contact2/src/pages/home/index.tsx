import { Icon } from '@iconify/react'
import React, { useState } from 'react'

import { Button, Input } from '@vezham/react/v3'

const initialContacts = [
  { id: 1, name: 'Krishna' },
  { id: 2, name: 'Vikram' }
]

export default function ContactsApp() {
  const [contacts, setContacts] = useState(initialContacts)
  const [selectedId, setSelectedId] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [search, setSearch] = useState('')

  const selected = contacts.find(c => c.id === selectedId)

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const addContact = () => {
    const name = prompt('Enter contact name')
    if (!name) return
    const newContact = { id: Date.now(), name }
    setContacts([newContact, ...contacts])
    setSelectedId(newContact.id)
  }

  const editContact = () => {
    const name = prompt('Edit contact name', selected?.name)
    if (!name) return
    setContacts(prev =>
      prev.map(c => (c.id === selectedId ? { ...c, name } : c))
    )
  }

  return (
    <div className="flex h-screen w-full bg-neutral-100">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="flex w-[280px] flex-col gap-4 border-r bg-white p-4">
          <h2 className="text-sm font-semibold text-gray-500">All Contacts</h2>

          <div className="flex flex-col gap-2">
            {filtered.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl p-2 ${
                  selectedId === c.id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                  {c.name[0]}
                </div>
                <span>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              variant="ghost"
              onClick={() => setSidebarOpen(p => !p)}>
              <Icon icon="lucide:panel-left" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={editContact}>Edit</Button>
            <Button isIconOnly onClick={addContact}>
              <Icon icon="lucide:plus" />
            </Button>
            <Input
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Detail */}
        {selected && (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex w-[420px] flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-gray-300 to-purple-400 p-10 text-white">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border text-6xl">
                {selected.name[0]}
              </div>

              <h1 className="text-2xl font-semibold">{selected.name}</h1>

              <div className="flex gap-4">
                <Button isIconOnly>
                  <Icon icon="lucide:message-circle" />
                </Button>
                <Button isIconOnly>
                  <Icon icon="lucide:phone" />
                </Button>
                <Button isIconOnly>
                  <Icon icon="lucide:video" />
                </Button>
                <Button isIconOnly>
                  <Icon icon="lucide:mail" />
                </Button>
              </div>

              <div className="mt-4 flex w-full flex-col gap-3">
                <div className="rounded-xl bg-white/20 p-4">
                  Contact Photo & Poster
                </div>
                <div className="rounded-xl bg-white/20 p-6">Notes</div>
                <div className="rounded-xl bg-white/20 p-4">Send Message</div>
                <div className="rounded-xl bg-white/20 p-4">Share Contact</div>
                <div className="rounded-xl bg-white/20 p-4">Block Contact</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
