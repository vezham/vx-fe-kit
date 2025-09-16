// Mock "For You" feed
export const forYouFeed: FeedItem[] = [
  {
    id: '1',
    title: 'New React Guidelines Updated',
    description:
      'Frontend team has updated the React coding standards. Please review the new patterns for hooks and state management.',
    type: 'document',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    author: 'David Chen'
  },
  {
    id: '2',
    title: 'Sprint Planning Meeting',
    description:
      "Don't forget about tomorrow's sprint planning session at 10 AM.",
    type: 'task',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    author: 'Marcus Williams'
  },
  {
    id: '3',
    title: 'Design System v2.0 Released',
    description:
      'The new design system includes updated components and improved accessibility features.',
    type: 'update',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    author: 'Sarah Johnson'
  }
]

export interface FeedItem {
  id: string
  title: string
  description: string
  type: 'document' | 'news' | 'task' | 'update'
  timestamp: Date
  author?: string
}

// Current user data
export const currentUser: User = {
  id: '1',
  name: 'Praveen',
  role: 'Frontend Developer',
  department: 'Engineering',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
}

export interface User {
  id: string
  name: string
  role: string
  department: string
  avatar: string
}
