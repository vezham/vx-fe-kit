'use client'

import { cn, Input, Select, SelectItem, Spacer } from '@heroui/react'
import * as React from 'react'

interface AccountSettingCardProps {
  className?: string
}

const currencyTypes = [
  { title: 'USD - US Dollar', value: 'usd-us_dollar' },
  { title: 'EUR - EURO ', value: 'eur-euro' },
  { title: 'GBP - British Pound', value: 'gbp-britishpound' },
  { title: 'CAD - Canadian Dollar', value: 'cad-canadian_dollar' }
]

const financialTypes = [
  { title: 'January', value: 'january' },

  { title: 'April', value: 'april' },

  { title: 'July', value: 'july' },

  { title: 'October', value: 'october' }
]

const AccountSetting = React.forwardRef<
  HTMLDivElement,
  AccountSettingCardProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-2', className)} {...props}>
    {/* Theme */}
    <div className="grid grid-cols-12 items-center gap-2">
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">
          Tax ID / GST / VAT{' '}
        </p>
        <Input className="mt-2" placeholder="12-3456789" />
      </div>
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">
          Default Currency
        </p>

        <Select defaultSelectedKeys={['usd-us_dollar']} className="mt-2">
          {currencyTypes.map(currency => (
            <SelectItem key={currency.value}>{currency.title}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
    <Spacer y={4} />
    <div>
      <p className="text-default-700 text-base font-medium">
        Financial Settings / Information
      </p>
    </div>
    <Spacer y={4} />
    <div className="grid grid-cols-12 items-center gap-2">
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">
          Fiscal Year Start
        </p>
        <Select defaultSelectedKeys={['january']} className="mt-2">
          {financialTypes.map(fiscal => (
            <SelectItem key={fiscal.value}>{fiscal.title}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">Invoice Prefix</p>
        <Input className="mt-2" placeholder="INV-" />
      </div>
    </div>
    <Spacer y={4} />
    <div className="grid grid-cols-12 items-center gap-2">
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">
          Default Tax Rate (18%){' '}
        </p>
        <Input className="mt-2" placeholder="18" />
      </div>
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">
          Default Payment Terms (days)
        </p>
        <Input className="mt-2" placeholder="30" />
      </div>
    </div>
  </div>
))

AccountSetting.displayName = 'AccountSetting'

export default AccountSetting
