import { Icon } from '@iconify/react'

import { Button } from '@vezham/react/v2'

const Recent = () => {
  return (
    <div className="flex justify-between">
      <div>Recently Added</div>
      <div>
        <Button isIconOnly startContent={<Icon icon="mdi:plus" />}></Button>
      </div>
    </div>
  )
}

export { Recent }
