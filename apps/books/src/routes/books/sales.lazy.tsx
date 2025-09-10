import { createLazyFileRoute } from '@tanstack/react-router'

import Sales from '../../pages/books/sales'

export const Route = createLazyFileRoute('/books/sales')({
  component: () => <Sales />
})
