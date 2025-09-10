import { createLazyFileRoute } from '@tanstack/react-router'

import Purchase from '../../pages/books/purchase'

export const Route = createLazyFileRoute('/books/purchase')({
  component: () => <Purchase />
})
