import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from '../src/pages/home'

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />)

    expect(baseElement).toBeTruthy()
  })

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />)

    expect(getByText(/Home | /gi)).toBeTruthy()
  })
})
