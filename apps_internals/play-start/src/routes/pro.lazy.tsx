import { createLazyFileRoute } from '@tanstack/react-router'

// import Page from '@pages/pro'
import Page from '../pages/pro'

export const Route = createLazyFileRoute('/pro')({
  component: () => <Page />
})
