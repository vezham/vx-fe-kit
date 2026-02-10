import { Icon } from '@iconify/react'

import { Button } from '@vezham/react/v2'

const ScheduleSection = () => {
  return (
    <div className="flex justify-between">
      <div>Scheduled</div>
      <div>
        <Button isIconOnly startContent={<Icon icon="mdi:plus" />}></Button>
      </div>
    </div>
  )
}

export default ScheduleSection
