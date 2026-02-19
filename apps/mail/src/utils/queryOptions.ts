import { useNavigate, useSearch } from '@tanstack/react-router'

export const useCreateMailQuery = () => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false }) as {
    compose?: 'new'
  }

  const isOpen = search.compose === 'new'

  const openCompose = () => {
    navigate({
      search: old => ({
        ...old,
        compose: 'new'
      })
    })
  }

  const closeCompose = () => {
    navigate({
      search: old => ({
        ...old,
        compose: undefined
      }),
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
