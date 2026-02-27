import { createLazyFileRoute } from '@tanstack/react-router'
import { div } from 'framer-motion/client'

export const Route = createLazyFileRoute('/groups/$groupId/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>GroupID</div>
}
