import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/(home)/folders/subfolders/$subfolderId/'
)({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/folders/subfolders/$subfolderId/"!</div>
}
