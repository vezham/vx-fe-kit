import { Icon } from '@iconify/react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

import { Button } from '@vezham/react/v2'

export const Route = createLazyFileRoute('/(home)/cta/help-support/')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-4">
      <Button
        isIconOnly
        onClick={() => navigate({ to: '/', replace: true })}
        startContent={<Icon icon="mdi:chevron-left" />}></Button>
      <div>Help & support</div>
    </div>
  )
}
