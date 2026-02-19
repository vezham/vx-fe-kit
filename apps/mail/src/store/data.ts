import { HeaderAction } from '../components/header/types'

export const emailData = {
  lastWeek: [
    {
      id: '1',
      sender: 'GitHub Security',
      subject: 'A new device logged into your account',
      preview:
        'Review a recent login from a new device. There was a recent sign-in to your account from a new device.',
      date: '2024-05-15',
      formattedDate: '11:35 AM',
      isUnread: true,
      category: 'important'
    },
    {
      id: '2',
      sender: 'Slack HQ',
      subject: 'Your temporary Slack login code',
      preview: 'Login to Slack using code: 783451',
      date: '2024-05-14',
      formattedDate: '11:34 AM',
      isUnread: true,
      category: 'social'
    },
    {
      id: '3',
      sender: 'Figma Team',
      subject: 'Your Figma verification code is 432156',
      preview: 'Use this code to verify your Figma account',
      date: '2024-05-12',
      formattedDate: '11:31 AM',
      isUnread: true,
      category: 'updates'
    }
  ],
  lastMonth: [
    {
      id: '4',
      sender: 'Adobe Creative Cloud',
      subject: 'Your subscription is about to renew',
      preview:
        'Your Adobe Creative Cloud subscription will renew on June 1st. Review your plan details.',
      date: '2024-04-30',
      formattedDate: '11:20 AM',
      labels: [
        {
          name: 'Subscription',
          color: 'warning'
        }
      ],
      category: 'updates',
      isUnread: true
    },
    {
      id: '5',
      sender: 'AWS Billing',
      subject: 'Your AWS bill for April 2024',
      preview: 'Your AWS usage this month resulted in charges of $156.78',
      date: '2024-04-28',
      formattedDate: '9:17 AM',
      category: 'important'
    }
  ],
  january: [
    {
      id: '6',
      sender: 'LinkedIn Jobs',
      subject: "10 new jobs for 'Frontend Developer'",
      preview:
        'See new jobs that match your saved search for Frontend Developer positions',
      date: '2024-01-27',
      formattedDate: 'Jan 27',
      category: 'promotion'
    },
    {
      id: '7',
      sender: 'Airbnb',
      subject: 'Your upcoming stay in Barcelona',
      preview:
        'Get ready for your trip! Your reservation at Sunny Barcelona Apartment starts on February 10',
      date: '2024-01-26',
      formattedDate: 'Jan 26',
      category: 'important'
    },
    {
      id: '8',
      sender: 'Stripe',
      subject: 'Payment processing success',
      preview: 'Your payment of $1,200.00 has been processed successfully',
      date: '2024-01-23',
      formattedDate: 'Jan 23',
      category: 'updates'
    },
    {
      id: '9',
      sender: 'Legal Team',
      subject: 'Contract review requested - URGENT',
      preview:
        'Please review the attached contract before our meeting tomorrow',
      date: '2024-01-22',
      formattedDate: 'Jan 22',
      hasAttachment: true
    },
    {
      id: '10',
      sender: 'Medium Digest',
      subject: 'Top stories for you: Building scalable React applications',
      preview:
        'Your weekly Medium digest with stories based on your reading history',
      date: '2024-01-20',
      formattedDate: 'Jan 20',
      category: 'social'
    }
  ],
  december: [
    {
      id: '11',
      sender: 'Spotify',
      subject: 'Your 2023 Wrapped is here!',
      preview: 'See your most listened to artists and songs of 2023',
      date: '2023-12-29',
      formattedDate: 'Dec 29',
      category: 'social'
    },
    {
      id: '12',
      sender: 'DocuSign',
      subject: 'Documents ready for signature',
      preview:
        'The following documents require your signature: Employment Agreement',
      date: '2023-12-25',
      formattedDate: 'Dec 25',
      hasAttachment: true
    },
    {
      id: '13',
      sender: 'Google Cloud Platform',
      subject: 'Unusual activity detected in your account',
      preview:
        'We detected unusual sign-in activity on your Google Cloud Platform account',
      date: '2023-12-20',
      formattedDate: 'Dec 20',
      category: 'important'
    }
  ],
  november: [
    {
      id: '14',
      sender: 'Product Hunt',
      subject: '5 new AI tools that will change your workflow',
      preview:
        'Check out these AI productivity tools trending on Product Hunt this week',
      date: '2023-11-29',
      formattedDate: 'Nov 29',
      category: 'promotion'
    },
    {
      id: '15',
      sender: 'Twitter',
      subject: 'Security alert: New login on Windows device',
      preview:
        'We noticed a new login to your Twitter account from a Windows device in San Francisco, CA',
      date: '2023-11-20',
      formattedDate: 'Nov 20',
      category: 'important'
    },
    {
      id: '16',
      sender: 'HackerRank',
      subject: 'New challenge: Algorithm optimization',
      preview: "Complete this week's coding challenge to earn your badge",
      date: '2023-11-15',
      formattedDate: 'Nov 15',
      category: 'social'
    }
  ]
}

export const sidebarData = [
  {
    title: '',
    items: [
      {
        icon: 'lucide:cpu',
        label: 'Autopilot',
        href: '/mail/autopilot',
        iconColor: 'text-purple-500'
      }
    ]
  },
  {
    title: 'Views',
    items: [
      {
        icon: 'lucide:inbox',
        label: 'Inbox',
        count: 1,
        href: '/mail/inbox',
        iconColor: 'text-blue-500'
      },
      {
        icon: 'lucide:list',
        label: 'Categories',
        count: 3,
        href: '/mail/categories',
        iconColor: 'text-amber-500'
      },
      {
        icon: 'lucide:calendar',
        label: 'Calendar',
        count: 1,
        href: '/mail/calendar',
        iconColor: 'text-green-500'
      },
      {
        icon: 'lucide:tag',
        label: 'Labels',
        href: '/mail/label',
        iconColor: 'text-red-500'
      },
      {
        icon: 'lucide:github',
        label: 'GitHub',
        href: '/mail/github',
        iconColor: 'text-gray-700'
      }
    ]
  },
  {
    title: 'Mail',
    items: [
      { icon: 'lucide:mail', label: 'All Mail', href: '/mail/all' },
      { icon: 'lucide:send', label: 'Sent', href: '/mail/sent' },
      { icon: 'lucide:file', label: 'Drafts', href: '/mail/drafts' },
      { icon: 'lucide:alert-triangle', label: 'Spam', href: '/mail/spam' }
    ]
  },
  {
    title: '',
    items: [
      { icon: 'lucide:settings', label: 'Settings', href: '/settings' },
      {
        icon: 'lucide:layout-template',
        label: 'Templates',
        href: '/templates'
      },
      { icon: 'lucide:trash-2', label: 'Trash', href: '/mail/trash' },
      {
        icon: 'lucide:message-square',
        label: 'Send feedback',
        href: '/feedback'
      }
    ]
  }
]

export const headerData: HeaderAction[] = [
  { icon: 'lucide:archive', ariaLabel: 'Archive' },
  { icon: 'lucide:trash', ariaLabel: 'Delete' },
  { icon: 'lucide:mail-open', ariaLabel: 'Mark as read' },
  { icon: 'lucide:clock', ariaLabel: 'Snooze' },
  { icon: 'lucide:tag', ariaLabel: 'Tag' },
  { icon: 'lucide:more-horizontal', ariaLabel: 'More options' }
]
