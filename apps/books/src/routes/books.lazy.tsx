import { createLazyFileRoute } from '@tanstack/react-router'

import Books from '../layouts/books/index'

export const Route = createLazyFileRoute('/books')({
  component: () => <Books />
})
