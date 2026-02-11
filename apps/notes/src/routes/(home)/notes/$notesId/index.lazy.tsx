import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/notes/$notesId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/notes/$notesId/"!</div>
}
