'use client'

import { Icon } from '@iconify/react/dist/iconify.js'
import { useRouteContext } from '@tanstack/react-router'

import { Button } from '@vezham/react/v2'

const HeadContent = () => {
  const { handleBack } = useRouteContext({ from: '/reports' })

  return (
    <div className="block md:hidden">
      <Button isIconOnly radius="full" size="md" onPress={() => handleBack()}>
        <Icon icon="lucide:chevron-left" width={15} />
      </Button>
    </div>
  )
}

export default HeadContent
