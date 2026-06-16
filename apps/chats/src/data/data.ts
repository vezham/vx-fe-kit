import { Compass, CopyPicture, SquarePlus } from '@gravity-ui/icons'

import { CHAT_THREADS } from '../store/useChats/data'
import { ChatModel, ChatNavItem, ChatSearchMode } from './types'

export const CHAT_NAV_ITEMS: readonly ChatNavItem[] = [
  { href: '/new', icon: SquarePlus, id: 'new', label: 'New Chat' },
  { href: '/library', icon: CopyPicture, id: 'library', label: 'Library' },
  { href: '/explore', icon: Compass, id: 'explore', label: 'Explore' }
] as const

export const CHAT_MODELS: readonly ChatModel[] = [
  { id: 'gpt-5.4', label: 'GPT-5.4' },
  { id: 'claude-4.6-opus', label: 'Claude 4.6 Opus' },
  { id: 'claude-4.6-sonnet', label: 'Claude 4.6 Sonnet' },
  { id: 'gemini-3.1-pro', label: 'Gemini 3.1 Pro' }
] as const

export const CHAT_SEARCH_MODES: readonly ChatSearchMode[] = [
  { id: 'deep-search', label: 'Deep Search' },
  { id: 'quick-search', label: 'Quick Search' }
] as const

export const SUGGESTED_PROMPTS: readonly string[] = [
  "Summarize this week's product and design updates into a team-ready status note.",
  'Turn a rough product brief into a launch checklist with owners and deadlines.',
  'Rewrite this paragraph for a skeptical executive who cares about ROI.',
  'Brainstorm onboarding flow names for a data-heavy analytics product.',
  'Draft a weekly 1:1 agenda that surfaces blockers and growth goals.',
  'Compare three pricing models and recommend one for a usage-based SaaS.'
] as const

export const DEFAULT_CHAT_THREAD_ID = CHAT_THREADS[0]?.id ?? ''
