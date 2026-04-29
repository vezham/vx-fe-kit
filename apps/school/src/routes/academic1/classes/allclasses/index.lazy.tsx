import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic1/classes/allclasses/')({
  component: AllClassesRoute
})

function AllClassesRoute() {
  return <AcademicSection title="All Classes" />
}

function AcademicSection({ title }: { title: string }) {
  return (
    <section className="space-y-2">
      <p className="text-muted-foreground text-sm">Classes</p>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </section>
  )
}
