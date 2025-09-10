import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/reports/')({
  beforeLoad: () => {
    throw redirect({
      to: '/reports/overview'
    })
  },
  context: () => ({
    context: () => ({
      handleBack: undefined as unknown as () => void
    })
  })
})
