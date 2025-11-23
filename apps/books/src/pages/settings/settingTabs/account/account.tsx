import React from 'react'

import { Input, Select, SelectItem, cn } from '@vezham/react/v2'

import { currencyTypes, financialTypes } from './data'
import { AccountProps } from './types'
import { getInputProps, getSelectProps } from './variant'

const account = React.forwardRef<HTMLFormElement, AccountProps>(
  ({ className, isDarkmode, ...props }, ref) => {
    const inputProps = getInputProps(isDarkmode)
    const selectProps = getSelectProps(isDarkmode)

    return (
      <div>
        <form
          ref={ref}
          className={cn(
            'flex grid grid-cols-12 flex-col gap-4 py-4',
            className
          )}
          {...props}>
          <Input
            className="col-span-12 md:col-span-6"
            label="Tax ID/ GST/ VAT"
            name="tax"
            placeholder="12 - 3456789"
            {...inputProps}
          />
          <Select
            className="col-span-12 md:col-span-6"
            items={currencyTypes}
            label="Default Currency"
            name="currency"
            placeholder="USD - US Dollar"
            {...selectProps}>
            {registrationState => (
              <SelectItem key={registrationState.value}>
                {registrationState.title}
              </SelectItem>
            )}
          </Select>
        </form>
        <p className="text-base font-medium">
          Financial Settings / Information
        </p>
        <form
          ref={ref}
          className={cn(
            'flex grid grid-cols-12 flex-col gap-4 py-4',
            className
          )}
          {...props}>
          <Select
            className="col-span-12 md:col-span-6"
            items={financialTypes}
            label="Fiscal Year Start"
            name="fiscal"
            placeholder="January"
            {...selectProps}>
            {registrationState => (
              <SelectItem key={registrationState.value}>
                {registrationState.title}
              </SelectItem>
            )}
          </Select>

          <Input
            className="col-span-12 md:col-span-6"
            label="Invoice Prefix"
            name="invoice"
            placeholder="INV-"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="Default Tax Rate (%)"
            name="tax_rate"
            placeholder="18"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="Default Payment Terms (days)"
            name="paymentterms"
            placeholder="30"
            {...inputProps}
          />
        </form>
      </div>
    )
  }
)

export default account
