'use client'

import * as React from 'react'

import { Input, Select, SelectItem, Spacer, cn } from '@vezham/react/v2'

import { currencyTypes, financialTypes } from './data'
import { AccountSettingCardProps } from './types'
import { accountSettingStyles as styles } from './variant'

const AccountSetting = React.forwardRef<
  HTMLDivElement,
  AccountSettingCardProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.container, className)} {...props}>
    <div className={styles.grid}>
      <div className={styles.gridSection}>
        <p className={styles.inputLabel}>Tax ID / GST / VAT</p>
        <Input className="mt-2" placeholder="12-3456789" />
      </div>
      <div className={styles.gridSection}>
        <p className={styles.inputLabel}>Default Currency</p>
        <Select defaultSelectedKeys={['usd-us_dollar']} className="mt-2">
          {currencyTypes.map(currency => (
            <SelectItem key={currency.value}>{currency.title}</SelectItem>
          ))}
        </Select>
      </div>
    </div>

    <Spacer y={4} />

    <div>
      <p className={styles.sectionTitle}>Financial Settings / Information</p>
    </div>

    <Spacer y={4} />

    <div className={styles.grid}>
      <div className={styles.gridSection}>
        <p className={styles.inputLabel}>Fiscal Year Start</p>
        <Select defaultSelectedKeys={['january']} className="mt-2">
          {financialTypes.map(fiscal => (
            <SelectItem key={fiscal.value}>{fiscal.title}</SelectItem>
          ))}
        </Select>
      </div>
      <div className={styles.gridSection}>
        <p className={styles.inputLabel}>Invoice Prefix</p>
        <Input className="mt-2" placeholder="INV-" />
      </div>
    </div>

    <Spacer y={4} />

    <div className={styles.grid}>
      <div className={styles.gridSection}>
        <p className={styles.inputLabel}>Default Tax Rate (18%)</p>
        <Input className="mt-2" placeholder="18" />
      </div>
      <div className={styles.gridSection}>
        <p className={styles.inputLabel}>Default Payment Terms (days)</p>
        <Input className="mt-2" placeholder="30" />
      </div>
    </div>
  </div>
))

AccountSetting.displayName = 'AccountSetting'

export default AccountSetting
