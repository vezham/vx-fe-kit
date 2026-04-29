import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic1/classes/')({
  component: ClassesRoute
})

function ClassesRoute() {
  return <AcademicSection title="Classes" />
}

function AcademicSection({ title }: { title: string }) {
  return (
    <section className="space-y-2">
      <p className="text-muted-foreground text-sm">Academic</p>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </section>
  )
}
