import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Home from './index'

// Set Jest timeout to 10 seconds
jest.setTimeout(30000)

describe('When Form is created', () => {
  it('a list of fields card is displayed', async () => {
    render(<Home />)
    await screen.findByText('Email')
    await screen.findByText('Nom')
    await screen.findByText('Prénom')
    await screen.findByText('Personel / Entreprise')
  })
})

describe('and a click is triggered on the submit button', () => {
  it('the success message is displayed', async () => {
    // Mock the onSuccess and onError functions
    const mockOnSuccess = jest.fn()
    const mockOnError = jest.fn()

    // Render the Home component with the mock functions as props
    render(<Home onSuccess={mockOnSuccess} onError={mockOnError} />)

    // Await for the button to be in the document
    const submitButton = await screen.findByText('Envoyer')

    // Trigger the click event on the submit button
    fireEvent.click(submitButton)

    // Wait for the expected text to appear in the document
    await screen.findByText('En cours')

    // Use waitFor to wait for all updates (including promises) to finish
    await waitFor(() => screen.findByText('Message envoyé !'), {
      timeout: 10000,
    })

    // Check if the mock functions have been called
  })
})
