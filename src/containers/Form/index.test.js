import { render, screen } from '@testing-library/react'
import Form from './index'

describe('Form Component Basic Rendering', () => {
  it('renders without crashing', () => {
    render(<Form />)
    expect(screen.getByRole('button', { name: 'Envoyer' })).toBeInTheDocument()
  })
})
