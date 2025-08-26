// pages/settings-new/index.tsx

import { Button } from '@heroui/react'
import { PlusFilledIcon } from '@heroui/shared-icons'
import Settings from '../../pages/settings-new/settings-layout'

const Index = () => {
  return (
    <Settings
      endContent={
        <>
          <Button
            size="sm"
            variant="solid"
            color="primary"
            className="w-full sm:w-auto">
            Save
          </Button>
          <Button size="sm" variant="solid" className="w-full sm:w-auto">
            <PlusFilledIcon /> Invite User
          </Button>
        </>
      }
    />
  )
}

export default Index
