import * as React from 'react'

import { Label, Tooltip } from '@vezham/react/v3'

import { Icons } from '../../../../components/ui/icons'
import { Widget, WidgetContent } from '../../../../components/ui/widget'

type Stock = {
  logo: React.FC<React.SVGProps<SVGSVGElement>>
  ticker: string
  companyName: string
  price: number
}

const stocks: Stock[] = [
  {
    logo: Icons.apple,
    ticker: 'AAPL',
    price: 262.82,
    companyName: 'Apple Inc.'
  },
  {
    logo: Icons.salesforce,
    ticker: 'CRM',
    price: 307.46,
    companyName: 'Salesforce, Inc.'
  },
  {
    logo: Icons.starbucks,
    ticker: 'SBUX',
    price: 86.09,
    companyName: 'Starbucks Corp.'
  },
  {
    logo: Icons.tesla,
    ticker: 'TSLA',
    price: 433.72,
    companyName: 'Tesla Inc.'
  }
]

export default function Stocks05() {
  return (
    <Widget>
      <WidgetContent className="items-center">
        <div className="grid size-full grid-cols-2 items-center gap-6">
          {stocks.map(({ logo: Logo, ticker, price, companyName }) => (
            <Tooltip delay={300} key={ticker}>
              <Tooltip.Trigger asChild>
                <div className="flex flex-col items-center justify-center gap-1">
                  <Logo className="fill-foreground size-8 rounded-full" />
                  <Label className="text-base">${price}</Label>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <p>{companyName}</p>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </div>
      </WidgetContent>
    </Widget>
  )
}
