import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic/syllabus/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello "/academic/syllabus/"!</div>
}
