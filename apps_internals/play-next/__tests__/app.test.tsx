import { render } from '@testing-library/react'

import { Provider } from '@vx/start/next'

import Shell from '../src/app/(routes)/(home)/page'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn()
  })
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
