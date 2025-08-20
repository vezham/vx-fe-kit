'use client'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  cn,
  Input,
  Select,
  SelectItem
} from '@heroui/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { companyIndustries, companyTypes, states } from './data'
import { CompanyProps } from './types'
import {
  getCardClassName,
  getInputProps,
  getSelectProps,
  getTitleClassName
} from './variant'

const CompanyInformationForm = React.forwardRef<HTMLFormElement, CompanyProps>(
  ({ className, isDarkmode, ...props }, ref) => {
    const inputProps = getInputProps(isDarkmode)
    const selectProps = getSelectProps(isDarkmode)

    return (
      <>
        <div>
          <p className="text-base font-medium">Company Information</p>
          <p className="text-default-400 mt-1 text-sm font-normal">
            Manage your company details and branding.
          </p>

          <Card className={getCardClassName(isDarkmode)} shadow="none">
            <CardBody>
              <div className="flex items-center gap-4">
                <Badge
                  showOutline
                  classNames={{ badge: 'w-5 h-5' }}
                  content={
                    <Button
                      isIconOnly
                      className="bg-background text-default-500 h-5 w-5 min-w-5 p-0"
                      radius="full"
                      size="sm"
                      variant="bordered">
                      <Icon
                        className="h-[9px] w-[9px]"
                        icon="solar:pen-linear"
                      />
                    </Button>
                  }
                  placement="bottom-right"
                  shape="circle">
                  <Avatar className="h-16 w-16 bg-black" src="assets/SVG.png" />
                </Badge>
                <div>
                  <p className={getTitleClassName(isDarkmode)}>V Corp</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <form
          ref={ref}
          className={cn(
            'flex grid grid-cols-12 flex-col gap-4 py-8',
            className
          )}
          {...props}>
          <Select
            className="col-span-12 md:col-span-6"
            items={companyTypes}
            label="Company Type"
            name="company-type"
            placeholder="C Corporation"
            {...selectProps}>
            {companyType => (
              <SelectItem key={companyType.value}>
                {companyType.title}
              </SelectItem>
            )}
          </Select>

          <Select
            className="col-span-12 md:col-span-6"
            items={states}
            label="Registration State"
            name="registration-state"
            placeholder="Delaware"
            {...selectProps}>
            {registrationState => (
              <SelectItem key={registrationState.value}>
                {registrationState.title}
              </SelectItem>
            )}
          </Select>

          <Input
            className="col-span-12 md:col-span-6"
            label="Company Name"
            name="company-name"
            placeholder="V"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="Entity Ending"
            name="entity-ending"
            placeholder="Corp."
            {...inputProps}
          />

          <Select
            className="col-span-12"
            items={companyIndustries}
            label="Company Industry"
            name="company-industry"
            placeholder="B2C SaaS"
            {...selectProps}>
            {companyIndustry => (
              <SelectItem key={companyIndustry.value}>
                {companyIndustry.title}
              </SelectItem>
            )}
          </Select>

          <Input
            className="col-span-12 md:col-span-6"
            label="Street Name"
            name="street-name"
            placeholder="Geary 2234"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="Suite"
            name="suite"
            placeholder="#166"
            {...inputProps}
          />

          <Select
            className="col-span-12 md:col-span-4"
            items={states}
            label="State"
            name="state"
            placeholder="Delaware"
            {...selectProps}>
            {registrationState => (
              <SelectItem key={registrationState.value}>
                {registrationState.title}
              </SelectItem>
            )}
          </Select>

          <Input
            className="col-span-12 md:col-span-4"
            label="City"
            name="city"
            placeholder="San Francisco"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-4"
            label="Zip Code"
            name="zip-code"
            placeholder="9409"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="Website"
            name="website"
            placeholder="https://v.corp"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="Phone"
            name="phone"
            placeholder="+1 (555) 987-6543"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="EIN"
            name="ein"
            placeholder="Type your company EIN here"
            {...inputProps}
          />

          <Input
            className="col-span-12 md:col-span-6"
            label="Confirm EIN"
            name="confirm-ein"
            placeholder="Confirm your company EIN here"
            {...inputProps}
          />
        </form>
      </>
    )
  }
)

CompanyInformationForm.displayName = 'CompanyInformationForm'
export default CompanyInformationForm
