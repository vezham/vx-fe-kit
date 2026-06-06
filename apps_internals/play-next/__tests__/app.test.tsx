import { render } from '@testing-library/react'
import { vi } from 'vitest'

import { Provider } from '@vx/start/vite'

import Shell from '../src/app/(routes)/(home)/page'

vi.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => null
}))

const App = () => (
  <Provider strict={false}>
    <Shell />
  </Provider>
)

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)

    expect(baseElement).toBeTruthy()
  })

  it('should mount app shell container', () => {
    const { container } = render(<App />)

    expect(container.querySelector('.vx-app')).toBeTruthy()
  })
})
