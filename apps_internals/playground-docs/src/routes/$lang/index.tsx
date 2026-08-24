import { Link, createFileRoute } from '@tanstack/react-router'
import { HomeLayout } from 'fumadocs-ui/layouts/home'

import { resolveLocale } from '@src/lib/i18n'
import { baseOptions } from '@src/lib/layout.shared'

export const Route = createFileRoute('/$lang/')({
  component: Home
})

function Home() {
  const { lang: langParam } = Route.useParams()
  const lang = resolveLocale(langParam)

  return (
    <HomeLayout {...baseOptions(lang)}>
      <div className="my-auto p-4 text-center">
        <h1 className="mb-4 text-xl font-medium">Playground Docs</h1>
        <Link
          to="/{-$lang}/docs/$"
          params={{
            lang,
            _splat: ''
          }}
          className="bg-fd-primary text-fd-primary-foreground mx-auto rounded-lg px-3 py-2 text-sm font-medium">
          Open Docs
        </Link>
      </div>
    </HomeLayout>
  )
}
