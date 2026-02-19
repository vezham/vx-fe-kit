import { useNavigate, useRouterState, useSearch } from '@tanstack/react-router'

export const useComposeQuery = () => {
  const navigate = useNavigate()
  const { location } = useRouterState()

  const params = new URLSearchParams(location.search)
  const isOpen = params.get('compose') === 'new'

  const openCompose = () => {
    const newParams = new URLSearchParams(location.search)
    newParams.set('compose', 'new')

    navigate({
      search: Object.fromEntries(newParams.entries())
    })
  }

  const closeCompose = () => {
    const newParams = new URLSearchParams(location.search)
    newParams.delete('compose')

    navigate({
      search: Object.fromEntries(newParams.entries()),
      replace: true
    })
  }

  return { isOpen, openCompose, closeCompose }
}

export type FilterOption = 'all' | 'read' | 'unread' | 'none'

export const useInboxQuery = () => {
  const navigate = useNavigate({ from: '/mail/inbox' })
  const search = useSearch({ strict: false }) as {
    view?: FilterOption
  }

  const view = search.view ?? 'all'

  const setView = (newView: FilterOption) => {
    navigate({
      search: old => ({
        ...old,
        view: newView === 'all' ? undefined : newView
      }),
      replace: true
    })
  }

  return { view, setView }
}

export const useInboxDrawerQuery = () => {
  const navigate = useNavigate({ from: '/mail/inbox' })
  const search = useSearch({ strict: false }) as {
    drawer?: 'view'
    id?: string
  }

  const cleanId =
    search.id && search.id.startsWith('"')
      ? JSON.parse(search.id)
      : (search.id ?? null)

  const isOpen = search.drawer === 'view' && !!cleanId

  const openDrawer = (id: string) => {
    navigate({
      search: old => ({
        ...old,
        drawer: 'view',
        id
      })
    })
  }

  const closeDrawer = () => {
    navigate({
      search: old => ({
        ...old,
        drawer: undefined,
        id: undefined
      }),
      replace: true
    })
  }

  return { isOpen, id: cleanId, openDrawer, closeDrawer }
}
