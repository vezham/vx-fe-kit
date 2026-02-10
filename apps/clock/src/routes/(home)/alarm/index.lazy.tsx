import { createLazyFileRoute } from '@tanstack/react-router'

import { AlarmSection } from '../../../pages/alarm'

export const Route = createLazyFileRoute('/(home)/alarm/')({
  component: () => <AlarmSection />
})
