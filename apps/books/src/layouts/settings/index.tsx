// pages/settings-new/index.tsx

import { Button } from '@heroui/react'
import { PlusFilledIcon } from '@heroui/shared-icons'
import Settings from '../../pages/settings-new/settings-layout'

const Index = () => {
  return (
    <Settings
      endContent={
        <>
          <Button size="sm" variant="solid" color="primary" className="flex-1">
            Save
          </Button>
          <Button size="sm" variant="solid" className="flex-1">
            <PlusFilledIcon /> Invite User
          </Button>
        </>
      }
    />
  )
}

export default Index
