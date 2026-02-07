import { createLazyFileRoute } from '@tanstack/react-router'

import Home from '../pages/home'
import Home2 from '../pages/home2'
import MenuBar from '../pages/menu'

export const Route = createLazyFileRoute('/')({
  // component: () => <Home />
  // component: () => <Home2 />
  component: () => <MenuBar />
})
