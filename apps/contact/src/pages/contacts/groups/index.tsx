import { Icon } from '@iconify/react'

import { Button } from '@vezham/react/v2'

const GroupSection = () => {
  return (
    <div className="flex justify-between">
      <div>Groups</div>
      <div>
        <Button isIconOnly startContent={<Icon icon="mdi:plus" />}></Button>
      </div>
    </div>
  )
}

export { GroupSection }
