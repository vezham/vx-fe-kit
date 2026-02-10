import { Icon } from '@iconify/react'

import { Button } from '@vezham/react/v2'

const FlagSection = () => {
  return (
    <div className="flex justify-between">
      <div>Flagged</div>
      <div>
        <Button isIconOnly startContent={<Icon icon="mdi:plus" />}></Button>
      </div>
    </div>
  )
}

export default FlagSection
