import {
  ArrowDownToLine,
  ArrowsRotateLeft,
  FileText,
  PaperPlane
} from '@gravity-ui/icons'
import type { ComponentType } from 'react'

export type TransactionType = 'sent' | 'received' | 'swapped' | 'contract'

export type Transaction = {
  readonly id: string
  readonly type: TransactionType
  readonly typeLabel: string
  readonly typeIcon: ComponentType<{ className?: string }>
  readonly asset: string
  readonly assetAvatar: string
  readonly assetColor: string
  readonly amount: string
  readonly usdValue: string
  readonly usd: number
  readonly date: string
  /** Unix timestamp for sort. */
  readonly timestamp: number
  readonly hash: string
  readonly status: 'confirmed' | 'pending' | 'failed'
}

const CDN =
  'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/templates/finances'

const ICON_BY_TYPE: Readonly<
  Record<TransactionType, ComponentType<{ className?: string }>>
> = {
  contract: FileText,
  received: ArrowDownToLine,
  sent: PaperPlane,
  swapped: ArrowsRotateLeft
}

const LABEL_BY_TYPE: Readonly<Record<TransactionType, string>> = {
  contract: 'Contract Interaction',
  received: 'Received',
  sent: 'Sent',
  swapped: 'Swapped'
}

type TransactionInput = Omit<Transaction, 'typeIcon' | 'typeLabel'>

const RAW_TRANSACTIONS: readonly TransactionInput[] = [
  {
    amount: '0.12312453',
    asset: 'ETH',
    assetAvatar: `${CDN}/eth.png`,
    assetColor: 'bg-[#627EEA]',
    date: 'Dec 8, 2025 · 12:32 PM',
    hash: '0xaa2bf905d3…',
    id: 'tx-1',
    status: 'confirmed',
    timestamp: 1765221120000,
    type: 'contract',
    usd: 320.65,
    usdValue: '$320.65'
  },
  {
    amount: '500.00',
    asset: 'USDC',
    assetAvatar: `${CDN}/usdc.png`,
    assetColor: 'bg-[#2775CA]',
    date: 'Dec 7, 2025 · 11:43 AM',
    hash: '0xbb4e0d712f…',
    id: 'tx-2',
    status: 'confirmed',
    timestamp: 1765131780000,
    type: 'received',
    usd: 500,
    usdValue: '$500.00'
  },
  {
    amount: '1.42',
    asset: 'ETH',
    assetAvatar: `${CDN}/eth.png`,
    assetColor: 'bg-[#627EEA]',
    date: 'Nov 28, 2025 · 08:14 AM',
    hash: '0xcc1a2f4e39…',
    id: 'tx-3',
    status: 'confirmed',
    timestamp: 1764317640000,
    type: 'sent',
    usd: 3384.1,
    usdValue: '$3,384.10'
  },
  {
    amount: '0.1543',
    asset: 'BTC',
    assetAvatar: `${CDN}/btc.png`,
    assetColor: 'bg-[#F7931A]',
    date: 'Oct 5, 2025 · 06:21 PM',
    hash: '0xdd6b5a1635…',
    id: 'tx-4',
    status: 'confirmed',
    timestamp: 1759694460000,
    type: 'swapped',
    usd: 9385.22,
    usdValue: '$9,385.22'
  },
  {
    amount: '12.4',
    asset: 'SOL',
    assetAvatar: `${CDN}/solana.png`,
    assetColor: 'bg-[#9945FF]',
    date: 'Oct 2, 2025 · 02:12 PM',
    hash: '0xee7c6f5410…',
    id: 'tx-5',
    status: 'confirmed',
    timestamp: 1759414320000,
    type: 'received',
    usd: 2692.16,
    usdValue: '$2,692.16'
  },
  {
    amount: '850.00',
    asset: 'USDC',
    assetAvatar: `${CDN}/usdc.png`,
    assetColor: 'bg-[#2775CA]',
    date: 'Sep 29, 2025 · 09:54 AM',
    hash: '0xff9d0a7102…',
    id: 'tx-6',
    status: 'confirmed',
    timestamp: 1759139640000,
    type: 'sent',
    usd: 850,
    usdValue: '$850.00'
  },
  {
    amount: '0.812',
    asset: 'BNB',
    assetAvatar: `${CDN}/bnb.png`,
    assetColor: 'bg-[#F3BA2F]',
    date: 'Sep 21, 2025 · 11:06 AM',
    hash: '0x124d5e817b…',
    id: 'tx-7',
    status: 'confirmed',
    timestamp: 1758452760000,
    type: 'swapped',
    usd: 653.4,
    usdValue: '$653.40'
  },
  {
    amount: '40.00',
    asset: 'LINK',
    assetAvatar: `${CDN}/link.png`,
    assetColor: 'bg-[#2A5ADA]',
    date: 'Sep 18, 2025 · 05:38 PM',
    hash: '0x329a4b1d2e…',
    id: 'tx-8',
    status: 'pending',
    timestamp: 1758216480000,
    type: 'contract',
    usd: 558,
    usdValue: '$558.00'
  }
] as const

export const TRANSACTIONS: readonly Transaction[] = RAW_TRANSACTIONS.map(
  tx => ({
    ...tx,
    typeIcon: ICON_BY_TYPE[tx.type],
    typeLabel: LABEL_BY_TYPE[tx.type]
  })
)
