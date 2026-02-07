import { Icon } from '@iconify/react'

import { Button } from '@vezham/react/v2'

const AlarmSection = () => {
  return (
    <div className="flex justify-between">
      <div>Alarm</div>
      <div>
        <Button isIconOnly startContent={<Icon icon="mdi:plus" />}></Button>
      </div>
    </div>
  )
}

export default AlarmSection
