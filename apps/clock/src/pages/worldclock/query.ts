import { useNavigate, useSearch } from '@tanstack/react-router'

type WorldClockSearch = {
  drawer?: 'add' | 'edit'
  id?: string
}

export const useWorldClockQuery = () => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false }) as WorldClockSearch

  const openAdd = () => {
    navigate({
      search: { drawer: 'add' }
    })
  }

  const openEdit = (id: number) => {
    navigate({
      search: { drawer: 'edit', id: String(id) }
    })
  }

  const closeDrawer = () => {
    navigate({ search: {} })
  }

  return {
    drawer: search.drawer,
    editingId: search.id ? Number(search.id) : null,
    openAdd,
    openEdit,
    closeDrawer
  }
}
