import { Link as VLink, useNavigate } from '@tanstack/react-router'
import { HomeLayout } from 'fumadocs-ui/layouts/home'

import { Link } from '@vezham/react-v3'

import { Home } from '@vx/template/pages'

import { baseOptions } from '@src/lib/layout.shared'

export default () => {
  const navigate = useNavigate()

  return (
    <HomeLayout {...baseOptions()}>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-xl font-medium">Playground Docs</h1>
        <VLink
          to="/docs/$"
          params={{
            _splat: ''
          }}
          className="bg-fd-primary text-fd-primary-foreground mx-auto rounded-lg px-3 py-2 text-sm font-medium">
          Open Docs
        </VLink>
      </div>

      <VLink to="/pro" className="link">
        FROm Page
        <Link.Icon />
      </VLink>

      <Link onPress={() => navigate({ to: '/pro' })}>
        <Link.Icon />
        Using HUI :)
        <Link.Icon />
      </Link>

      <Home onClick={() => navigate({ to: '/pro' })} />
    </HomeLayout>
  )
}
