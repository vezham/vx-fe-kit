import { ExploreCategory } from './types'

export const EXPLORE_CATEGORIES: ExploreCategory[] = [
  {
    id: 'work',
    prompts: [
      {
        description:
          'Generate a team-ready weekly status note from scattered updates.',
        id: 'explore-work-1',
        title: 'Write my weekly team update'
      },
      {
        description:
          'Produce a one-pager for a product brief with problem, solution, and scope.',
        id: 'explore-work-2',
        title: 'One-page product brief'
      },
      {
        description:
          'Draft a ready-to-send release note for a new feature launch.',
        id: 'explore-work-3',
        title: 'Feature release note'
      }
    ],
    subtitle: 'Status notes, specs, and planning helpers.',
    title: 'At work'
  },
  {
    id: 'writing',
    prompts: [
      {
        description:
          'Rewrite a rough paragraph for a skeptical executive reader.',
        id: 'explore-writing-1',
        title: 'Rewrite for an executive'
      },
      {
        description:
          'Turn meeting notes into a tight narrative summary with decisions and owners.',
        id: 'explore-writing-2',
        title: 'Meeting notes to narrative'
      },
      {
        description:
          'Tighten marketing copy with specific, benefit-led phrasing for product teams.',
        id: 'explore-writing-3',
        title: 'Sharper marketing copy'
      }
    ],
    subtitle: 'Clearer, faster, and more specific.',
    title: 'Writing & editing'
  },
  {
    id: 'planning',
    prompts: [
      {
        description:
          'Turn a product brief into a week-by-week launch checklist with owners.',
        id: 'explore-planning-1',
        title: 'Launch checklist from a brief'
      },
      {
        description:
          'Plan a 30/60/90 for a new hire on a product team with clear milestones.',
        id: 'explore-planning-2',
        title: '30/60/90 for a new hire'
      },
      {
        description:
          'Draft a quarterly planning agenda that balances roadmap and metrics.',
        id: 'explore-planning-3',
        title: 'Quarterly planning agenda'
      }
    ],
    subtitle: 'Structured plans and agendas you can actually use.',
    title: 'Planning & ops'
  }
] as const
