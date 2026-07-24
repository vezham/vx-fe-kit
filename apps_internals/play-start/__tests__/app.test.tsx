import { render } from '@testing-library/react'

import { Provider } from '@vx/start/tanstack'

// import { Shell } from '../src/app/shell'
import Shell from '../src/pages/home'

// wjdlz/TODO: NOH fix with LLM

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
