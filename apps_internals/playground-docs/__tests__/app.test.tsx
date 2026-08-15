import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { render, waitFor } from '@testing-library/react'

import { createRouter } from '@vx/start/router/tanstack'

import { routeTree } from '../src/routeTree.gen'

const renderApp = () => {
  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: ['/']
    }),
    routeTree
  })

  return render(<RouterProvider router={router} />)
}

describe('App', () => {
  it('should render successfully', async () => {
    const { baseElement } = renderApp()

    await waitFor(() => expect(baseElement).toBeTruthy())
  })

  it('should mount app shell container', async () => {
    const { baseElement } = renderApp()

    await waitFor(() =>
      expect(baseElement.querySelector('.vx-app')).toBeTruthy()
    )
  })
})
