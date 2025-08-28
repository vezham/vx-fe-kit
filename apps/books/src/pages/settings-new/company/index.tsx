'use client'

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Spacer
} from '@heroui/react'
import { Icon } from '@iconify/react'
import * as React from 'react'

import { checkPermit } from '../utils'
import { companyIndustries, companyTypes, states } from './data'
import { ProfileSettingCardProps } from './types'
import { profileSettingStyles as styles } from './variant'

const ProfileSetting = React.forwardRef<
  HTMLDivElement,
  ProfileSettingCardProps
>(({ className, ...props }, ref) => {
  const canUpdate = checkPermit('company', 'update')
  const readOnly = !canUpdate

  return (
    <div ref={ref} className={styles.container(className)} {...props}>
      {/* Profile */}
      <div>
        <p className={styles.sectionTitle}>Company Information</p>
        <p className={styles.sectionSubtitle}>
          Manage your company details and branding.
        </p>
        <Card className={styles.card} shadow="none">
          <CardBody>
            <div className="flex items-center gap-4">
              <Badge
                showOutline
                classNames={{ badge: styles.badge }}
                content={
                  <Button
                    isIconOnly
                    className={styles.badgeButton}
                    radius="full"
                    size="sm"
                    variant="bordered"
                    isDisabled={readOnly}>
                    <Icon
                      className={styles.badgeIcon}
                      icon="solar:pen-linear"
                    />
                  </Button>
                }
                placement="bottom-right"
                shape="circle">
                <Avatar
                  className={styles.avatar}
                  src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/e1b8ec120710c09589a12c0004f85825.jpg"
                />
              </Badge>
              <div>
                <p className={styles.companyName}>V Corp</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Spacer y={4} />

      {/* Company Type + State of Registration */}
      <div className={styles.grid}>
        <div className={styles.gridSection}>
          <p className={styles.inputLabel}>Company Type</p>
          <Select
            defaultSelectedKeys={['c-corporation']}
            isDisabled={readOnly}
            className={styles.select}>
            {companyTypes.map(companyType => (
              <SelectItem key={companyType.value}>
                {companyType.title}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className={styles.gridSection}>
          <p className={styles.inputLabel}>Registration State</p>
          <Select
            defaultSelectedKeys={['delaware']}
            isDisabled={readOnly}
            className={styles.select}>
            {states.map(state => (
              <SelectItem key={state.value}>{state.title}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <Spacer y={4} />

      {/* Company Name + Entity Ending */}
      <div className={styles.grid}>
        <div className={styles.gridSection}>
          <p className={styles.inputLabel}>Company Name</p>
          <Input
            className={styles.input}
            placeholder="V"
            isDisabled={readOnly}
          />
        </div>
        <div className={styles.gridSection}>
          <p className={styles.inputLabel}>Entity Ending</p>
          <Input
            className={styles.input}
            placeholder="Corp"
            isDisabled={readOnly}
          />
        </div>
      </div>

      <Spacer y={4} />

      {/* Industry */}
      <div>
        <p className={styles.inputLabel}>Company Industry</p>
        <Select
          defaultSelectedKeys={['technology']}
          className={styles.fullWidthSelect}
          isDisabled={readOnly}>
          {companyIndustries.map(companyIndustry => (
            <SelectItem key={companyIndustry.value}>
              {companyIndustry.title}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Spacer y={4} />

      {/* Address */}
      <div className={styles.grid}>
        <div className={styles.gridSection}>
          <p className={styles.inputLabel}>Street Name</p>
          <Input
            className={styles.input}
            placeholder="Geary 2234"
            isDisabled={readOnly}
          />
        </div>
        <div className={styles.gridSection}>
          <p className={styles.inputLabel}>Suite</p>
          <Input
            className={styles.input}
            placeholder="#166"
            isDisabled={readOnly}
          />
        </div>
      </div>

      <Spacer y={4} />

      <div className={styles.grid}>
        <div className={styles.gridSectiontwo}>
          <p className={styles.inputLabel}>State</p>
          <Select
            defaultSelectedKeys={['california']}
            className={styles.select}
            isDisabled={readOnly}>
            {states.map(state => (
              <SelectItem key={state.value}>{state.title}</SelectItem>
            ))}
          </Select>
        </div>
        <div className={styles.gridSectiontwo}>
          <p className={styles.inputLabel}>City</p>
          <Input
            className={styles.input}
            placeholder="San Francisco"
            isDisabled={readOnly}
          />
        </div>
        <div className={styles.gridSectiontwo}>
          <p className={styles.inputLabel}>Zip Code</p>
          <Input
            className={styles.input}
            placeholder="9409"
            isDisabled={readOnly}
          />
        </div>
      </div>

      <Spacer y={4} />

      <div className={styles.grid}>
        <div className={styles.gridSection}>
          <p className={styles.inputLabel}>Website</p>
          <Input
            className={styles.input}
            placeholder="https://v.corp"
            isDisabled={readOnly}
          />
        </div>
        <div className={styles.gridSection}>
          <p className={styles.inputLabel}>Phone</p>
          <Input
            className={styles.input}
            placeholder="+1 (555) 987-6543"
            isDisabled={readOnly}
          />
        </div>
      </div>

      <Spacer y={4} />

      <div>
        <p className={styles.inputLabel}>EIN / CIN</p>
        <Input
          className={styles.fullWidthSelect}
          placeholder="Type your company EIN here"
          isDisabled={readOnly}
        />
      </div>
    </div>
  )
})

ProfileSetting.displayName = 'ProfileSetting'

export default ProfileSetting
