import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const AccountsIndex = () => {
  const navigate = useNavigate()

  const { accountsId } = Route.useParams()

  useEffect(() => {
    navigate({
      to: '/bank/accounts/$accountsId/overview',
      params: { accountsId },
      replace: true
    })
  }, [navigate, accountsId])

  return null
}

export const Route = createLazyFileRoute('/bank/accounts/$accountsId/')({
  component: AccountsIndex
})
