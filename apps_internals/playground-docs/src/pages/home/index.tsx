import { Link as VLink, useNavigate } from '@tanstack/react-router'
import { HomeLayout } from 'fumadocs-ui/layouts/home'

import { Link, buttonVariants } from '@vezham/react-v3'

import { Home } from '@vx/template/pages'

import type { Locale } from '@app/docs'
import { baseOptions } from '@config/layout'

type Props = {
  locale?: Locale
}

export default ({ locale }: Props) => {
  const navigate = useNavigate()
  const lang = locale

  return (
    <HomeLayout {...baseOptions(locale)}>
      <VLink
        to="/{-$lang}/docs/$"
        params={{
          lang: locale,
          _splat: ''
        }}
        className={buttonVariants({ variant: 'primary' })}>
        <Link.Icon />
        Open Docs
        <Link.Icon />
      </VLink>

      <VLink to="/{-$lang}/pro" params={{ lang }} className="link">
        FROm Page
        <Link.Icon />
      </VLink>

      <Link onPress={() => navigate({ to: '/{-$lang}/pro', params: { lang } })}>
        <Link.Icon />
        Using HUI :)
        <Link.Icon />
      </Link>

      <Home
        onClick={() => navigate({ to: '/{-$lang}/pro', params: { lang } })}
      />
    </HomeLayout>
  )
}
