import { Icon } from '@iconify/react'

import { Button } from '@vezham/react/v2'

const TimerSection = () => {
  return (
    <div className="flex justify-between">
      <div>Timer</div>
      <div>
        <Button isIconOnly startContent={<Icon icon="mdi:plus" />}></Button>
      </div>
    </div>
  )
}

export { TimerSection }
