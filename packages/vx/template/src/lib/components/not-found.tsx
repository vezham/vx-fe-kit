'use client'

import { useSyncExternalStore } from 'react'

import { EmptyState, Typography, buttonVariants } from '@vezham/react-v3'

const getPathname = () => window.location.pathname || '/'
const getServerPathname = () => ''
const getNotFoundImageSrc = (version: string) =>
  `https://static.cdn.vezham.com/vassets/no-internet.svg?vx=${encodeURIComponent(version)}`
const subscribeToPathname = (onPathnameChange: () => void) => {
  window.addEventListener('popstate', onPathnameChange)

  return () => window.removeEventListener('popstate', onPathnameChange)
}

type Props = {
  app?: string
  version?: string
  homeUrl?: string
}

export const NotFound = ({ app = 'Vx', homeUrl = '/', version }: Props) => {
  const pathname = useSyncExternalStore(
    subscribeToPathname,
    getPathname,
    getServerPathname
  )
  const imageSrc = version ? getNotFoundImageSrc(version) : undefined

  return (
    <main className="vx-not-found mx-auto flex min-h-80 max-w-xl items-center justify-center p-6 text-center">
      <EmptyState>
        <div className="vx-not-found__content flex flex-col gap-3">
          {imageSrc ? (
            <img
              alt="Page not found"
              className="vx-not-found__image"
              src={imageSrc}
            />
          ) : null}
          <Typography.Heading
            className="vx-not-found__code text-muted"
            level={1}>
            404
          </Typography.Heading>
          <Typography.Heading className="vx-not-found__title" level={2}>
            Page not found
          </Typography.Heading>
          <Typography.Paragraph
            className="vx-not-found__description"
            color="muted">
            {app} could not find the page you requested
            <span className="vx-not-found__path" data-vx-not-found-path>
              {pathname ? `: ${pathname}` : null}
            </span>
            .
          </Typography.Paragraph>
          <a
            className={`vx-not-found__home ${buttonVariants({ variant: 'secondary' })}`}
            href={homeUrl}>
            Back to Home
          </a>
        </div>
      </EmptyState>
    </main>
  )
}
