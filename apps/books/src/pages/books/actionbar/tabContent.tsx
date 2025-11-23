import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@vezham/react/v2'

const TabContent = () => {
  const [selectedPeriod, setSelectedPeriod] = React.useState('Monthly')
  return (
    <div className="flex gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button
            size="md"
            className="bg-default-100 hover:bg-default-200 w-full sm:w-auto"
            startContent={<Icon icon="lucide:calendar" width={20} />}>
            {' '}
            {selectedPeriod}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Date period options"
          selectionMode="single"
          selectedKeys={[selectedPeriod]}
          onSelectionChange={keys =>
            setSelectedPeriod(Array.from(keys)[0] as string)
          }>
          <DropdownItem key="Weekly">Weekly</DropdownItem>
          <DropdownItem key="Monthly">Monthly</DropdownItem>
          <DropdownItem key="Quarterly">Quarterly</DropdownItem>
          <DropdownItem key="Yearly">Yearly</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button
        size="md"
        variant="solid"
        color="primary"
        className="w-full sm:w-auto"
        startContent={<Icon icon="solar:download-line-duotone" width={20} />}>
        Upload Sales
      </Button>
    </div>
  )
}

export default TabContent
