import { render, waitFor } from '@testing-library/react'

import Page from '../src/app/(routes)/(home)/page'
import RootLayout from '../src/app/layout'

const renderApp = () =>
  render(
    <RootLayout>
      <Page />
    </RootLayout>
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
