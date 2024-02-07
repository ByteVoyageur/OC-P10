import { fireEvent, render, screen } from '@testing-library/react'
import Home from './index'

describe('When Form is created', () => {
  it('a list of fields card is displayed', async () => {
    render(<Home />)
    await screen.findByText('Email')
    await screen.findByText('Nom')
    await screen.findByText('Prénom')
    await screen.findByText('Personel / Entreprise')
  })
  describe('and a click is triggered on the submit button', () => {
    it('the success message is displayed', async () => {
      render(<Home />)
      // Await for the button to be in the document
      const submitButton = await screen.findByText('Envoyer')
      // Trigger the click event on the submit button
      fireEvent.click(submitButton)
      // Wait for the expected text to appear in the document
      await screen.findByText('En cours')
      await screen.findByText('Message envoyé !')
    })
  })
})

describe('When a page is created', () => {
  it('a list of events is displayed', () => {
    // to implement
  })
  it('a list a people is displayed', () => {
    // to implement
  })
  it('a footer is displayed', () => {
    // to implement
  })
  it('an event card, with the last event, is displayed', () => {
    // to implement
  })
})
