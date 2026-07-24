'use client'

import VLink from 'next/link'
import { useRouter } from 'next/navigation'

import { Link } from '@vezham/react-v3'

import { Home } from '@vx/template/pages'

export default () => {
  const router = useRouter()

  return (
    <>
      <VLink href="/pro" className="link">
        FROm Page
        <Link.Icon />
      </VLink>

      <Link onPress={() => router.push('/pro')}>
        <Link.Icon />
        Using HUI :)
        <Link.Icon />
      </Link>

      <Home onClick={() => router.push('/pro')} />
    </>
  )
}
