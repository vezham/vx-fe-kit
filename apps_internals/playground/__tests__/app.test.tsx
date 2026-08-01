import {
  RouterProvider,
  createMemoryHistory,
  createRouter
} from '@tanstack/react-router'
import { render, waitFor } from '@testing-library/react'

import { Provider } from '@vx/start/vite'

import { routeTree } from '../src/routeTree.gen'

const renderApp = () => {
  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: ['/']
    }),
    routeTree
  })

  return render(
    <Provider strict={false}>
      <RouterProvider router={router} />
    </Provider>
  )
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
