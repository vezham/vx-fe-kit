import { Link as VLink, useNavigate } from '@tanstack/react-router'

import { Link } from '@vezham/react-v3'

import { Home } from '@vx/template/pages'

export default () => {
  const navigate = useNavigate()

  return (
    <>
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
    </>
  )
}
