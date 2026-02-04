import { createLazyFileRoute } from '@tanstack/react-router'

import { Blogs } from '../../pages'

export const Route = createLazyFileRoute('/blogs/')({
  component: () => <Blogs />
})
