type AcademicSectionPageProps = {
  title: string
  eyebrow?: string
}

export function AcademicSectionPage({
  title,
  eyebrow = 'Academic'
}: AcademicSectionPageProps) {
  return (
    <section className="space-y-2">
      <p className="text-muted-foreground text-sm">{eyebrow}</p>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </section>
  )
}
