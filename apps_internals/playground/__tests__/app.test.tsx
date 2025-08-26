import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Page from '../src/pages/home'

const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <Page />
  </QueryClientProvider>
)

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)

    expect(baseElement).toBeTruthy()
  })

  it('should have a greeting as the title', () => {
    const { getAllByText } = render(<App />)

    expect(getAllByText(new RegExp('Hello', 'gi')).length > 0).toBeTruthy()
  })
})
