import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/books-settings/integrations/inde')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/books-settings/integrations/inde"!</div>
}
