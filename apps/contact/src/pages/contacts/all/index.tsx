import { Icon } from '@iconify/react'

import { Button } from '@vezham/react/v2'

const AllSection = () => {
  return (
    <div className="flex justify-between">
      <div>All</div>
      <div>
        <Button isIconOnly startContent={<Icon icon="mdi:plus" />}></Button>
      </div>
    </div>
  )
}

export { AllSection }
