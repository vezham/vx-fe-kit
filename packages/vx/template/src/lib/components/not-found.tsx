import { EmptyState, Typography, buttonVariants } from '@vezham/react-v3'

type NotFoundProps = {
  app?: string
  homeUrl?: string
}

export const NotFound = ({ app = 'Vx', homeUrl = '/' }: NotFoundProps) => (
  <main className="vx-not-found mx-auto flex min-h-80 max-w-xl items-center justify-center p-6 text-center">
    <EmptyState>
      <div className="flex flex-col gap-3">
        <Typography.Heading className="text-muted" level={1}>
          404
        </Typography.Heading>
        <Typography.Heading level={2}>Page not found</Typography.Heading>
        <Typography.Paragraph color="muted">
          {app} could not find the page you requested.
        </Typography.Paragraph>
        <a className={buttonVariants({ variant: 'secondary' })} href={homeUrl}>
          Back to Home
        </a>
      </div>
    </EmptyState>
  </main>
)
