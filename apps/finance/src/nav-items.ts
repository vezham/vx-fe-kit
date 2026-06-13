import {
  ArrowRightFromSquare,
  ChartPie,
  CircleQuestion,
  CreditCard,
  Gear,
  House,
  Percent,
  Receipt
} from '@gravity-ui/icons'
import type { ComponentType } from 'react'

export type NavItem = {
  readonly href: string
  readonly label: string
  readonly icon: ComponentType<{ className?: string }>
  readonly badge?: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/', icon: House, label: 'Dashboard' },
  { href: '/portfolio', icon: ChartPie, label: 'Portfolio' },
  { href: '/spending', icon: CreditCard, label: 'Spending' },
  { href: '/transactions', icon: Receipt, label: 'Transactions' },
  { badge: 'New', href: '/earn', icon: Percent, label: 'Earn' },
  { href: '/settings', icon: Gear, label: 'Settings' }
] as const

export const FOOTER_ITEMS: readonly NavItem[] = [
  { href: '/help', icon: CircleQuestion, label: 'Help & Information' },
  { href: '/logout', icon: ArrowRightFromSquare, label: 'Log out' }
] as const
