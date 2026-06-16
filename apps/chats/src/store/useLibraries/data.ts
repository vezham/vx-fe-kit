import { LibraryItem } from './types'

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    description:
      'Demo thread for Markdown, ChainOfThought, loaders, and message actions.',
    id: 'lib-pro-ai-showcase',
    tags: ['Demo', 'Components'],
    threadId: 'pro-ai-showcase',
    title: 'Pro AI components showcase',
    updatedAt: 'Just now'
  },
  {
    description:
      'Prompts, tone presets, and examples for quick, interesting weeknight dinners.',
    id: 'lib-quick-dinners',
    tags: ['Cooking', 'Everyday'],
    threadId: 'quick-recipes-for-dinner',
    title: 'Quick weeknight dinners',
    updatedAt: 'Yesterday'
  },
  {
    description:
      'A reusable framework for software launch plans: alignment, beta, assets, measurement.',
    id: 'lib-launch-plan',
    tags: ['Product', 'GTM'],
    threadId: 'launch-plan-for-q3-rollout',
    title: 'Launch plan framework',
    updatedAt: '3 days ago'
  },
  {
    description:
      'Homepage positioning variants for product teams, tuned for skeptical decision makers.',
    id: 'lib-homepage-copy',
    tags: ['Marketing', 'Copywriting'],
    threadId: 'rewrite-homepage-value-prop',
    title: 'Homepage positioning variants',
    updatedAt: 'Last week'
  },
  {
    description:
      'Weekly status templates that group progress, risks, and next steps in one paste-friendly note.',
    id: 'lib-weekly-status',
    tags: ['Team', 'Ops'],
    threadId: 'weekly-team-update-summary',
    title: 'Weekly status templates',
    updatedAt: 'Last week'
  },
  {
    description:
      '1:1 agenda prompts that balance growth, blockers, and wellbeing.',
    id: 'lib-one-on-ones',
    tags: ['Management'],
    title: 'Manager 1:1 agendas',
    updatedAt: 'Earlier this month'
  },
  {
    description:
      'Pricing comparison frameworks for usage-based, seat-based, and hybrid SaaS models.',
    id: 'lib-pricing-models',
    tags: ['Business', 'Pricing'],
    title: 'Pricing model comparisons',
    updatedAt: 'Earlier this month'
  }
] as const
