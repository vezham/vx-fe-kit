import { Icon } from '@iconify/react'

import { Button } from '@vezham/react/v2'

const Favorites = () => {
  return (
    <div className="flex justify-between">
      <div>Favorites</div>
      <div>
        <Button isIconOnly startContent={<Icon icon="mdi:plus" />}></Button>
      </div>
    </div>
  )
}

export { Favorites }
