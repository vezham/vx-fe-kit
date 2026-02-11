import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/(home)/notes/folders/subfolders/$subfoldersId/'
)({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/notes/folders/subfolders/$subfoldersId/"!</div>
}
