import { createLazyFileRoute } from '@tanstack/react-router'

import { SettingsPage } from '@/src/views/settings-page'

export const Route = createLazyFileRoute('/settings/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div>
      <SettingsPage />
    </div>
  )
}
