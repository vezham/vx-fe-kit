import { EmptyState } from '@vezham/react-v3'

type NotFoundProps = {
  app?: string
}

export const NotFound = ({ app = 'Vx' }: NotFoundProps) => (
  <main className="vx-not-found mx-auto flex min-h-80 max-w-xl items-center justify-center p-6 text-center">
    <EmptyState>
      <div className="flex flex-col gap-2">
        <p className="text-muted text-sm font-medium">404</p>
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-muted text-sm">
          {app} could not find the page you requested.
        </p>
      </div>
    </EmptyState>
  </main>
)
