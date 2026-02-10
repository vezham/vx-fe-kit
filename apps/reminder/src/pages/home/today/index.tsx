import { Icon } from '@iconify/react'

import { Button } from '@vezham/react/v2'

const TodaySection = () => {
  return (
    <div className="flex justify-between">
      <div>Today</div>
      <div>
        <Button isIconOnly startContent={<Icon icon="mdi:plus" />}></Button>
      </div>
    </div>
  )
}

export default TodaySection
