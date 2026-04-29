import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic1/classroom/')({
  component: ClassroomRoute
})

function ClassroomRoute() {
  return <AcademicSection title="Class Room" />
}

function AcademicSection({ title }: { title: string }) {
  return (
    <section className="space-y-2">
      <p className="text-muted-foreground text-sm">Academic</p>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </section>
  )
}
