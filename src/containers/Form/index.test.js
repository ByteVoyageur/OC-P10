import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Form from './index'
import mockContactApi from './mockContactApi'

jest.mock('./mockContactApi', () => ({
  __esModule: true, // this property makes it work
  default: jest.fn(),
}))

describe('Form Component Basic Rendering', () => {
  it('renders without crashing', () => {
    render(<Form />)
    expect(screen.getByRole('button', { name: 'Envoyer' })).toBeInTheDocument()
  })
})
