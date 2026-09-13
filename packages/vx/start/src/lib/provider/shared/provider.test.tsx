import { useQueryClient } from '@tanstack/react-query'
import { cleanup, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { defineConfig } from '../next'
import { ClientDevtools } from './devtools'
import { createProvider } from './provider'

vi.mock('@vezham/react-v2', () => ({
  VezhamProvider: ({ children }: { children: ReactNode }) => children,
  cn: (...names: string[]) => names.join(' ')
}))
vi.mock('@vezham/use-logger', () => ({ defineLogger: vi.fn() }))
vi.mock('@vx/env/next', () => ({ APP_NAME: 'Test', APP_VER: '1' }))
vi.mock('../next/provider', () => ({
  Provider: ({ children }: { children: ReactNode }) => children
}))
vi.mock('@vx/devtools', () => ({
  Devtools: ({ query = true }: { query?: boolean }) => (
    <span data-testid="devtools">{String(query)}</span>
  )
}))

afterEach(cleanup)
const env = { APP_NAME: 'Test', __DEV__: true, __DEBUG__: false }

describe('provider query isolation', () => {
  it('disables standalone query devtools without a query provider', async () => {
    render(<ClientDevtools env />)
    expect(await screen.findByText('false')).toBeTruthy()
  })

  it('enables standalone query devtools when a query provider is present', async () => {
    const Provider = createProvider({ env })
    render(
      <Provider>
        <ClientDevtools env />
      </Provider>
    )
    expect(await screen.findByText('true')).toBeTruthy()
  })

  it('does not share a query cache across server renders', () => {
    const Provider = createProvider({ env })
    const Probe = ({ write = false }: { write?: boolean }) => {
      const client = useQueryClient()
      if (write) client.setQueryData(['user'], 'first-request')
      return <span>{client.getQueryData<string>(['user']) ?? 'empty'}</span>
    }
    expect(
      renderToString(
        <Provider>
          <Probe write />
        </Provider>
      )
    ).toContain('first-request')
    expect(
      renderToString(
        <Provider>
          <Probe />
        </Provider>
      )
    ).toContain('empty')
  })

  it('retains cached data across client rerenders', () => {
    const Provider = createProvider({ env })
    const Probe = ({ write = false }: { write?: boolean }) => {
      const client = useQueryClient()
      if (write) client.setQueryData(['value'], 'retained')
      return <span>{client.getQueryData<string>(['value']) ?? 'empty'}</span>
    }
    const view = render(
      <Provider>
        <Probe write />
      </Provider>
    )
    view.rerender(
      <Provider>
        <Probe />
      </Provider>
    )
    expect(screen.getByText('retained')).toBeTruthy()
  })

  it('passes disabled query state through to client devtools', async () => {
    const Provider = createProvider({
      env,
      renderDevtools: ({ query }) => <ClientDevtools env query={query} />
    })
    render(<Provider query={false} />)
    expect(await screen.findByText('false')).toBeTruthy()
  })
})

it('honors Next document language and defaults to English', () => {
  expect(renderToString(defineConfig({ lang: 'ta' }))).toContain('lang="ta"')
  expect(renderToString(defineConfig({}))).toContain('lang="en"')
})
