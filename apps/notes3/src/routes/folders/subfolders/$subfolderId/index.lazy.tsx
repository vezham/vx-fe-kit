import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/folders/subfolders/$subfolderId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/folders/subfolders/$subfolderId/"!</div>
}
