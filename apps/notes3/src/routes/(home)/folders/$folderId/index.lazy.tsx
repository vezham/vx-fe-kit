import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/folders/$folderId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/folders/$folderId/"!</div>
}
