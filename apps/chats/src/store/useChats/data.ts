import { ChatThread } from './types'

export const SHOWCASE_MARKDOWN = `Here is a concise answer with **markdown** support:

\`\`\`ts
export type ChatStatus = "ready" | "streaming" | "submitted";
\`\`\`

- Presentation-only Pro components
- Your app owns the message array and SDK wiring
- Compose \`ChatMessage\`, \`Markdown\`, and \`ChainOfThought\` explicitly`

export const SHOWCASE_THREAD: ChatThread = {
  id: 'pro-ai-showcase',
  messages: [
    {
      id: 'showcase-1',
      role: 'user',
      text: 'Walk me through the HeroUI Pro AI chat components.'
    },
    {
      id: 'showcase-2',
      loaderLabel: 'Thinking...',
      role: 'assistant',
      status: 'streaming',
      text: 'Thinking...'
    },
    {
      id: 'showcase-3',
      role: 'user',
      text: 'Show me reasoning, markdown, and code highlighting.'
    },
    {
      actions: 'full',
      avatar: {
        alt: 'Assistant',
        fallback: 'AI'
      },
      id: 'showcase-4',
      markdown: SHOWCASE_MARKDOWN,
      reasoning: {
        defaultExpanded: false,
        steps: [
          {
            content:
              'Reviewed the Pro demos for Markdown block memoization and Shiki-powered CodeBlock rendering.',
            label: 'Search'
          },
          {
            content:
              'Mapped reasoning UI to ChainOfThought and loading states to TextShimmer plus ChatLoader.',
            label: 'Plan'
          }
        ],
        trigger: 'Thought for 4 seconds'
      },
      role: 'assistant',
      showAvatar: true
    },
    {
      id: 'showcase-5',
      role: 'user',
      text: 'Show me tool calls — streaming, grouped, and approval.'
    },
    {
      id: 'showcase-5b',
      role: 'assistant',
      toolGroup: {
        label: '2 tool calls',
        tools: [
          {
            argsText: '{"query":"HeroUI Pro chat components"}',
            output: { hits: 12, top: 'ChatTool' },
            state: 'output-available',
            toolName: 'searchDocs'
          },
          {
            argsText: '{"path":"/components/chat-tool"}',
            output: { title: 'ChatTool', words: 420 },
            state: 'output-available',
            toolName: 'fetchPage'
          }
        ]
      }
    },
    {
      id: 'showcase-5c',
      role: 'user',
      text: 'What if a tool needs approval?'
    },
    {
      id: 'showcase-5d',
      role: 'assistant',
      tools: [
        {
          argsText: '{"to":"team@acme.com","subject":"Launch update"}',
          state: 'requires-action',
          toolName: 'sendEmail'
        }
      ]
    },
    {
      id: 'showcase-6',
      role: 'user',
      text: 'What do skeleton loaders look like while a reply is pending?'
    },
    {
      id: 'showcase-6b',
      loaderLabel: 'Loading response',
      role: 'assistant',
      status: 'skeleton'
    },
    {
      id: 'showcase-7',
      role: 'user',
      text: 'Show media and compact actions too.'
    },
    {
      actions: 'minimal',
      id: 'showcase-8',
      image: {
        alt: 'Component architecture diagram placeholder',
        src: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/egg.webp'
      },
      role: 'assistant',
      showAvatar: true,
      text: 'Assistant messages can include media and a minimal action set beneath the body.'
    },
    {
      id: 'showcase-9',
      role: 'user',
      text: 'Show sources and file attachments.'
    },
    {
      attachments: [
        {
          mimeType: 'image/png',
          name: 'dashboard-wireframe.png',
          src: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/egg.webp'
        }
      ],
      id: 'showcase-9b',
      role: 'user',
      text: 'What can you tell me about this wireframe?'
    },
    {
      id: 'showcase-9c',
      role: 'assistant',
      sourceGroup: {
        label: '3 sources',
        sources: [
          {
            description:
              'HeroUI Pro ships presentation-only AI chat compounds for React.',
            sourceType: 'url',
            title: 'HeroUI Pro',
            url: 'https://heroui.com'
          },
          {
            description:
              'Slot-based styling utilities used across Pro components.',
            sourceType: 'url',
            title: 'Tailwind Variants',
            url: 'https://tailwind-variants.org'
          },
          {
            sourceType: 'document',
            title: 'design-system-audit.pdf'
          }
        ]
      },
      text: 'The wireframe follows a familiar dashboard shell with a persistent sidebar, top bar, and a scrollable content region for cards and charts.'
    }
  ],
  modelId: 'gpt-5.4',
  preview:
    'Demo thread for Markdown, ChainOfThought, ChatTool, sources, attachments, loaders, and message actions.',
  searchModeId: 'deep-search',
  title: 'Pro AI components showcase',
  updatedAt: 'Just now',
  user: {
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg',
    email: 'darnell@email.com',
    name: 'Darnell Howe'
  }
}

export const CHAT_THREADS: ChatThread[] = [
  SHOWCASE_THREAD,
  {
    id: 'quick-recipes-for-dinner',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        text: "I don't have much time tonight. Any quick dinner ideas?"
      },
      {
        actions: 'full',
        id: 'msg-2',
        role: 'assistant',
        text: 'Sure! Are you cooking for yourself or more people?'
      },
      {
        id: 'msg-3',
        role: 'user',
        text: 'Just for me. Something easy but not boring 😅'
      },
      {
        actions: 'full',
        id: 'msg-4',
        listItems: [
          'Garlic chicken stir-fry. Chicken breast, garlic, soy sauce, and frozen veggies. Serve with rice or tortillas.',
          'Pasta aglio e olio with a twist. Pasta, olive oil, garlic, chili flakes - add shrimp or mushrooms if you have them.',
          'Egg wrap or omelette. Eggs, cheese, whatever veggies you have, wrapped in a tortilla.'
        ],
        role: 'assistant',
        text: 'Got it. Here are a few quick options (15-20 min):'
      },
      {
        id: 'msg-5',
        role: 'user',
        text: 'how it looks option 3? i want to see if i would like it'
      },
      {
        actions: 'minimal',
        id: 'msg-6',
        image: {
          alt: 'Omelette with cherry tomatoes and parsley',
          src: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/egg.webp'
        },
        role: 'assistant',
        text: 'Sure! It looks like this:'
      }
    ],
    modelId: 'gpt-5.4',
    preview: 'Quick dinner ideas with simple ingredients and one-pan options.',
    searchModeId: 'deep-search',
    title: 'Quick recipes for dinner',
    updatedAt: '2m ago',
    user: {
      avatar:
        'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg',
      email: 'darnell@email.com',
      name: 'Darnell Howe'
    }
  },
  {
    id: 'launch-plan-for-q3-rollout',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        text: 'Help me draft a launch plan for our Q3 rollout of the analytics dashboard.'
      },
      {
        actions: 'full',
        id: 'msg-2',
        role: 'assistant',
        text: "Absolutely. To make it realistic, I'll break it into internal alignment, beta validation, launch assets, and post-launch measurement."
      },
      {
        actions: 'full',
        id: 'msg-3',
        listItems: [
          'Week 1: align product, sales, and support on positioning.',
          'Week 2: run a beta with design partners and collect objection themes.',
          'Week 3: finalize launch assets, release notes, and onboarding tours.',
          'Week 4: launch publicly and monitor activation, retention, and support volume.'
        ],
        role: 'assistant',
        text: "Here's a concise four-week rollout plan:"
      }
    ],
    modelId: 'gpt-5.4',
    preview:
      'Q3 analytics dashboard rollout plan with launch timeline and KPIs.',
    searchModeId: 'deep-search',
    title: 'Launch plan for Q3 rollout',
    updatedAt: '18m ago',
    user: {
      avatar:
        'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg',
      email: 'darnell@email.com',
      name: 'Darnell Howe'
    }
  },
  {
    id: 'rewrite-homepage-value-prop',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        text: 'Can you rewrite our homepage value proposition to be more specific for product teams?'
      },
      {
        actions: 'full',
        id: 'msg-2',
        role: 'assistant',
        text: 'Yes. The fastest improvement is to stop describing the tool as generic AI and instead anchor it in product workflows, speed, and decision clarity.'
      },
      {
        actions: 'full',
        id: 'msg-3',
        listItems: [
          'Turn customer feedback into prioritized product decisions.',
          'Give PMs and design teams one shared workspace for research, synthesis, and launch planning.',
          'Reduce the time from insight to roadmap with AI-assisted summaries and action plans.'
        ],
        role: 'assistant',
        text: 'Here are three stronger positioning directions:'
      }
    ],
    modelId: 'claude-4.6-sonnet',
    preview: 'Homepage messaging focused on PM workflows and faster decisions.',
    searchModeId: 'quick-search',
    title: 'Rewrite homepage value prop',
    updatedAt: '1h ago',
    user: {
      avatar:
        'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg',
      email: 'darnell@email.com',
      name: 'Darnell Howe'
    }
  },
  {
    id: 'weekly-team-update-summary',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        text: "Summarize this week's design and engineering updates into a team-ready status note."
      },
      {
        actions: 'full',
        id: 'msg-2',
        role: 'assistant',
        text: 'Done. I kept it concise and grouped progress, risks, and next steps so it can be pasted directly into Slack or Notion.'
      },
      {
        actions: 'full',
        id: 'msg-3',
        listItems: [
          'Progress: dashboard filters shipped to staging and onboarding flows are in QA.',
          'Risks: one API latency regression is still under investigation.',
          'Next: finalize billing edge cases and launch the design system audit next week.'
        ],
        role: 'assistant',
        text: 'Weekly status summary:'
      }
    ],
    modelId: 'gemini-3.1-pro',
    preview: 'Team-ready summary of product, design, and engineering updates.',
    searchModeId: 'quick-search',
    title: 'Weekly team update summary',
    updatedAt: 'Yesterday',
    user: {
      avatar:
        'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg',
      email: 'darnell@email.com',
      name: 'Darnell Howe'
    }
  }
] as const
