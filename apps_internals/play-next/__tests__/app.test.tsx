import { render, waitFor } from '@testing-library/react'

import { Provider } from '@vx/start/next'

import Shell from '../src/app/(routes)/(home)/page'

const renderApp = () =>
  render(
    <Provider strict={false}>
      <Shell />
    </Provider>
  )

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
