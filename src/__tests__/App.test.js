import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'

test('renders get started link', () => {
  const { getByText } = render(<App/>)
  const linkElement = getByText(/Get Started!/i)
  expect(linkElement).toBeInTheDocument()
})
