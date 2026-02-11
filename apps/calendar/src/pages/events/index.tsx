import { Icon } from '@iconify/react'

import { Button } from '@vezham/react/v2'

const EventSection = () => {
  return (
    <div className="flex justify-between">
      <div>Events</div>
      <div>
        <Button isIconOnly startContent={<Icon icon="mdi:plus" />}></Button>
      </div>
    </div>
  )
}

export { EventSection }
