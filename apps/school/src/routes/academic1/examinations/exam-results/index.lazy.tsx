import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/academic1/examinations/exam-results/'
)({
  component: ExamResultsRoute
})

function ExamResultsRoute() {
  return <AcademicSection title="Exam Results" />
}

function AcademicSection({ title }: { title: string }) {
  return (
    <section className="space-y-2">
      <p className="text-muted-foreground text-sm">Examinations</p>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </section>
  )
}
