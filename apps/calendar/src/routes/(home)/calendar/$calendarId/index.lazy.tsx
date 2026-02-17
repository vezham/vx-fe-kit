import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(home)/calendar/$calendarId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/(home)/calendar/$calendarId/"!</div>
}
