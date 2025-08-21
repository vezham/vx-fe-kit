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
  SelectItem,
  Spacer
} from '@heroui/react'
import { Icon } from '@iconify/react'
import * as React from 'react'

interface ProfileSettingCardProps {
  className?: string
}

const companyTypes = [
  { title: 'Sole Proprietor', value: 'sole-proprietor' },
  { title: 'Partnership', value: 'partnership' },
  { title: 'C Corporation', value: 'c-corporation' },
  { title: 'S Comporation', value: 's-comporation' },
  { title: 'LLC (Limited Liability Company)', value: 'llc' }
]

const companyIndustries = [
  { title: 'Technology', value: 'technology' },
  { title: 'Finance', value: 'finance' },
  { title: 'Healthcare', value: 'healthcare' },
  { title: 'Retail', value: 'retail' },
  { title: 'Manufacturing', value: 'manufacturing' }
]

const states = [
  { title: 'Alabama', value: 'alabama' },
  { title: 'Alaska', value: 'alaska' },
  { title: 'Arizona', value: 'arizona' },
  { title: 'Arkansas', value: 'arkansas' },
  { title: 'California', value: 'california' },
  { title: 'Colorado', value: 'colorado' },
  { title: 'Connecticut', value: 'connecticut' },
  { title: 'Delaware', value: 'delaware' },
  { title: 'Florida', value: 'florida' },
  { title: 'Georgia', value: 'georgia' },
  { title: 'Hawaii', value: 'hawaii' },
  { title: 'Idaho', value: 'idaho' },
  { title: 'Illinois', value: 'illinois' },
  { title: 'Indiana', value: 'indiana' },
  { title: 'Iowa', value: 'iowa' },
  { title: 'Kansas', value: 'kansas' },
  { title: 'Kentucky', value: 'kentucky' },
  { title: 'Louisiana', value: 'louisiana' },
  { title: 'Maine', value: 'maine' },
  { title: 'Maryland', value: 'maryland' },
  { title: 'Massachusetts', value: 'massachusetts' },
  { title: 'Michigan', value: 'michigan' },
  { title: 'Minnesota', value: 'minnesota' },
  { title: 'Mississippi', value: 'mississippi' },
  { title: 'Missouri', value: 'missouri' },
  { title: 'Montana', value: 'montana' },
  { title: 'Nebraska', value: 'nebraska' },
  { title: 'Nevada', value: 'nevada' },
  { title: 'New Hampshire', value: 'new-hampshire' },
  { title: 'New Jersey', value: 'new-jersey' },
  { title: 'New Mexico', value: 'new-mexico' },
  { title: 'New York', value: 'new-york' },
  { title: 'North Carolina', value: 'north-carolina' },
  { title: 'North Dakota', value: 'north-dakota' },
  { title: 'Ohio', value: 'ohio' },
  { title: 'Oklahoma', value: 'oklahoma' },
  { title: 'Oregon', value: 'oregon' },
  { title: 'Pennsylvania', value: 'pennsylvania' },
  { title: 'Rhode Island', value: 'rhode-island' },
  { title: 'South Carolina', value: 'south-carolina' },
  { title: 'South Dakota', value: 'south-dakota' },
  { title: 'Tennessee', value: 'tennessee' },
  { title: 'Texas', value: 'texas' },
  { title: 'Utah', value: 'utah' },
  { title: 'Vermont', value: 'vermont' },
  { title: 'Virginia', value: 'virginia' },
  { title: 'Washington', value: 'washington' },
  { title: 'West Virginia', value: 'west-virginia' },
  { title: 'Wisconsin', value: 'wisconsin' },
  { title: 'Wyoming', value: 'wyoming' }
]

const ProfileSetting = React.forwardRef<
  HTMLDivElement,
  ProfileSettingCardProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-2', className)} {...props}>
    {/* Profile */}
    <div>
      <p className="text-default-700 text-base font-medium">
        Company Information
      </p>
      <p className="text-default-400 mt-1 text-sm font-normal">
        Manage your company details and branding.
      </p>
      <Card className="bg-default-100 mt-4" shadow="none">
        <CardBody>
          <div className="flex items-center gap-4">
            <Badge
              showOutline
              classNames={{
                badge: 'w-5 h-5'
              }}
              content={
                <Button
                  isIconOnly
                  className="bg-background text-default-500 h-5 w-5 min-w-5 p-0"
                  radius="full"
                  size="sm"
                  variant="bordered">
                  <Icon className="h-[9px] w-[9px]" icon="solar:pen-linear" />
                </Button>
              }
              placement="bottom-right"
              shape="circle">
              <Avatar className="h-16 w-16" src="public/assets/SVG.png" />
            </Badge>
            <div>
              <p className="text-default-600 text-sm font-medium">V Corp</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
    <Spacer y={4} />
    {/* Title */}
    <div className="grid grid-cols-12 items-center gap-2">
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">Company Type</p>
        <Select defaultSelectedKeys={['c-corporation']} className="mt-2">
          {companyTypes.map(companyType => (
            <SelectItem key={companyType.value}>{companyType.title}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">
          Registartion State
        </p>

        <Select defaultSelectedKeys={['delaware']} className="mt-2">
          {states.map(state => (
            <SelectItem key={state.value}>{state.title}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
    <Spacer y={4} />
    <div className="grid grid-cols-12 items-center gap-2">
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">Company Name</p>
        <Input className="mt-2" placeholder="V" />
      </div>
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">Entity Ending</p>
        <Input className="mt-2" placeholder="Corp" />
      </div>
    </div>
    <Spacer y={4} />
    <div>
      <p className="text-default-700 text-base font-medium">Company Industry</p>
      <Select defaultSelectedKeys={['technology']} className="col-span-12 mt-2">
        {companyIndustries.map(companyIndustry => (
          <SelectItem key={companyIndustry.value}>
            {companyIndustry.title}
          </SelectItem>
        ))}
      </Select>
    </div>
    <Spacer y={4} />
    <div className="grid grid-cols-12 items-center gap-2">
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">Street Name</p>
        <Input className="mt-2" placeholder="Geary 2234" />
      </div>
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">Suite</p>
        <Input className="mt-2" placeholder="#166" />
      </div>
    </div>
    <Spacer y={4} />
    <div className="grid grid-cols-12 items-center gap-2">
      <div className="col-span-12 md:col-span-4">
        <p className="text-default-700 text-base font-medium">State</p>

        <Select defaultSelectedKeys={['california']} className="mt-2">
          {states.map(state => (
            <SelectItem key={state.value}>{state.title}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="col-span-12 md:col-span-4">
        <p className="text-default-700 text-base font-medium">City</p>
        <Input className="mt-2" placeholder="San Francisco" />
      </div>
      <div className="col-span-12 md:col-span-4">
        <p className="text-default-700 text-base font-medium">Zip Code</p>
        <Input className="mt-2" placeholder="9409" />
      </div>
    </div>
    <Spacer y={4} />
    <div className="grid grid-cols-12 items-center gap-2">
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">Website</p>
        <Input className="mt-2" placeholder="https://v.corp" />
      </div>
      <div className="col-span-12 md:col-span-6">
        <p className="text-default-700 text-base font-medium">Phone</p>
        <Input className="mt-2" placeholder="+1 (555) 987-6543" />
      </div>
    </div>
    <Spacer y={4} />
    <div>
      <p className="text-default-700 text-base font-medium">EIN / CIN</p>
      <Input
        className="col-span-12 mt-2"
        placeholder="Type your company EIN here"
      />
    </div>
  </div>
))

ProfileSetting.displayName = 'ProfileSetting'

export default ProfileSetting
