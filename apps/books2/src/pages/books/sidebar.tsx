'use client'

import { Icon } from '@iconify/react'
import { useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import {
  Avatar,
  Button,
  InputGroup,
  ScrollShadow,
  Surface
} from '@vezham/react/v3'

type MailItem = {
  id: string
  name: string
  avatar: string
  subject: string
  preview: string
  time: string
  unread?: boolean
  starred?: boolean
}

type Props = {
  onItemClick?: (id: string) => void
}

const initialData: MailItem[] = [
  {
    id: '1',
    name: 'Michael Curry',
    avatar: 'https://i.pravatar.cc/150?img=1',
    subject: 'Flash Sale for 48 Hours Only',
    preview: 'Hi Calvin, I’m excited to share that w...',
    time: '10:21 AM',
    unread: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    subject: 'New Product Launch Announcement',
    preview: 'Hello Team, I’m thrilled to announce...',
    time: '9:15 AM'
  },
  {
    id: '3',
    name: 'David Lee',
    subject: 'Weekly Team Meeting Reminder',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Good afternoon everyone, just a re...',
    time: 'Dec 14',
    starred: true
  },
  {
    id: '4',
    name: 'Emma Stone',
    subject: 'Quarterly Budget Review',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Hi Team, please prepare your report...',
    time: 'Dec 12',
    unread: true
  },
  {
    id: '5',
    name: 'Liam Brown',
    subject: 'Feedback Request on Project X',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Hey everyone, I would love your fee...',
    time: 'Dec 12'
  },
  {
    id: '6',
    name: 'Olivia Wang',
    subject: 'Office Holiday Party Details',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Hello all, I’m happy to announce the...',
    time: 'Dec 12'
  },
  {
    id: '7',
    name: 'James Smith',
    subject: 'Client Presentation Prep',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Team, let’s meet tomorrow to finaliz...',
    time: 'Dec 8',
    starred: true
  },
  {
    id: '8',
    name: 'Sophia Martinez',
    subject: 'Annual Performance Review Schedule',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Hi Team, the schedule for annual pe...',
    time: 'Dec 3',
    unread: true
  },
  {
    id: '9',
    name: 'William Johnson',
    subject: 'New Training Program Launch',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Greetings, I’m excited to inform you...',
    time: 'Nov 28',
    unread: true
  },
  {
    id: '10',
    name: 'Emily Davis',
    subject: 'Team Building Retreat',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Join us for a weekend of team buildi...',
    time: 'Nov 27',
    unread: true
  },
  {
    id: '7',
    name: 'James Smith',
    subject: 'Client Presentation Prep',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Team, let’s meet tomorrow to finaliz...',
    time: 'Dec 8',
    starred: true
  },
  {
    id: '8',
    name: 'Sophia Martinez',
    subject: 'Annual Performance Review Schedule',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Hi Team, the schedule for annual pe...',
    time: 'Dec 3',
    unread: true
  },
  {
    id: '9',
    name: 'William Johnson',
    subject: 'New Training Program Launch',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Greetings, I’m excited to inform you...',
    time: 'Nov 28',
    unread: true
  },
  {
    id: '10',
    name: 'Emily Davis',
    subject: 'Team Building Retreat',
    avatar: 'https://i.pravatar.cc/150?img=1',
    preview: 'Join us for a weekend of team buildi...',
    time: 'Nov 27',
    unread: true
  }
]

export default function BookSidebar({ onItemClick }: Props) {
  const [mails, setMails] = useState(initialData)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    if (!search.trim()) return mails
    return mails.filter(
      m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.subject.toLowerCase().includes(search.toLowerCase()) ||
        m.preview.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, mails])

  const toggleStar = (id: string) => {
    setMails(prev =>
      prev.map(m => (m.id === id ? { ...m, starred: !m.starred } : m))
    )
  }

  return (
    <Surface className="flex h-screen flex-col pt-4 pb-4" variant="transparent">
      <InputGroup
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4">
        <InputGroup.Prefix>
          {' '}
          <Icon icon="lucide:search" className="text-default-400" />
        </InputGroup.Prefix>
        <InputGroup.Input placeholder="Search...." />
      </InputGroup>
      <ScrollShadow hideScrollBar className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {filtered.map(mail => (
            <Surface
              key={mail.id}
              onClick={() => {
                onItemClick?.(mail.id)
              }}
              variant="tertiary"
              className="hover:bg-content2 flex items-start gap-4 rounded-xl p-3 transition">
              <Avatar size="md">
                <Avatar.Image src={mail.avatar}></Avatar.Image>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="truncate text-sm">{mail.name}</span>
                </div>
                <p className="truncate text-xs font-medium">{mail.subject}</p>
                <p className="text-default-500 truncate text-xs">
                  {mail.preview}
                </p>
              </div>
              <div className="flex flex-col items-end justify-end gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-default-500 text-xs">{mail.time}</span>
                  {mail.unread && (
                    <span className="bg-primary h-2 w-2 rounded-full" />
                  )}
                </div>
                <Icon
                  onClick={() => toggleStar(mail.id)}
                  icon={mail.starred ? 'lucide:star' : 'lucide:star'}
                  className={
                    mail.starred
                      ? 'text-warning fill-warning'
                      : 'text-default-300'
                  }
                />
              </div>
            </Surface>
          ))}
          {filtered.length === 0 && (
            <div className="text-default-400 text-center">No results found</div>
          )}
        </div>
      </ScrollShadow>
    </Surface>
  )
}
